import { ref, readonly, onScopeDispose } from 'vue'
import { SimplePool } from 'nostr-tools/pool'

// Global shared pool instance
let sharedPoolInstance = null
let connectionCount = 0
let trackedRelays = new Set() // Track relay URLs manually

const default_relays = [
  'wss://relay.nyves.nl'
]

/**
 * Shared Nostr relay pool manager
 * Provides a single SimplePool instance shared across all composables
 * Automatically manages connections and cleanup
 */
export const useSharedRelayPool = () => {
  // Create pool if it doesn't exist
  if (!sharedPoolInstance) {
    sharedPoolInstance = new SimplePool()
    console.log('🔗 Created shared Nostr relay pool')
  }

  // Increment connection count
  connectionCount++
  //console.log(`📊 Shared pool connections: ${connectionCount}`)

  // Connection stats (reactive)
  const stats = ref({
    connections: connectionCount,
    poolExists: !!sharedPoolInstance
  })

  /**
   * Get the shared pool instance
   * @returns {SimplePool} The shared SimplePool instance
   */
  const getPool = () => {
    if (!sharedPoolInstance) {
      throw new Error('Shared pool not available')
    }
    return sharedPoolInstance
  }

  /**
   * Check WebSocket connection status for a relay
   * @param {string} relayUrl - Relay URL to check
   * @returns {string} Connection status: 'open', 'connecting', 'closing', 'closed'
   */
  const getRelayConnectionStatus = (relayUrl) => {
    if (!sharedPoolInstance || !sharedPoolInstance.relays) {
      return 'closed'
    }

    const relay = sharedPoolInstance.relays[relayUrl]
    if (!relay || !relay.ws) {
      return 'closed'
    }

    // WebSocket readyState constants
    // 0: CONNECTING, 1: OPEN, 2: CLOSING, 3: CLOSED
    const readyState = relay.ws.readyState
    switch (readyState) {
      case 0: return 'connecting'
      case 1: return 'open' 
      case 2: return 'closing'
      case 3: return 'closed'
      default: return 'unknown'
    }
  }

  /**
   * Ensure relay connections are open before querying
   * @param {string[]} relays - Array of relay URLs
   * @returns {Promise<void>} Promise that resolves when connections are ready
   */
  const ensureRelayConnections = async (relays) => {
    if (!sharedPoolInstance) {
      throw new Error('Shared pool not available')
    }

    const connectionPromises = relays.map(async (relay) => {
      const normalizedUrl = relay.startsWith('wss://') || relay.startsWith('ws://') ? relay : `wss://${relay}`
      const status = getRelayConnectionStatus(normalizedUrl)
      
      //console.log(`🔍 Checking relay ${normalizedUrl}: ${status}`)
      
      if (status === 'closed' || status === 'closing') {
        //console.log(`🔄 Reconnecting to ${normalizedUrl}...`)
        
        // Force cleanup of closed connection
        if (sharedPoolInstance.relays[normalizedUrl]) {
          delete sharedPoolInstance.relays[normalizedUrl]
        }
        
        // Wait a bit for connection to establish
        await new Promise(resolve => setTimeout(resolve, 800))
      } else if (status === 'connecting') {
        // Wait for connection to open
        console.log(`⏳ Waiting for ${normalizedUrl} to connect...`)
        await new Promise(resolve => setTimeout(resolve, 2500))
      }
    })

    await Promise.all(connectionPromises)
  }

  /**
   * Enhanced pool query that tracks relay URLs and manages connections
   * @param {string[]} relays - Array of relay URLs
   * @param {Object} filter - Nostr filter object
   * @returns {Promise} Query promise
   */
  const queryRelays = async (relays, filter) => {
    if (!sharedPoolInstance) {
      throw new Error('Shared pool not available')
    }

    // Normalize and track relay URLs
    const normalizedRelays = relays.map(relay => {
      const normalizedUrl = relay.startsWith('wss://') || relay.startsWith('ws://') ? relay : `wss://${relay}`
      trackedRelays.add(normalizedUrl)
      return normalizedUrl
    })

    //console.log(`📡 Querying ${normalizedRelays.length} relays, total tracked: ${trackedRelays.size}`)
    
    // Ensure all relay connections are open before querying
    await ensureRelayConnections(normalizedRelays)
    
    return sharedPoolInstance.querySync(normalizedRelays, filter)
  }

  /**
   * Enhanced pool subscription that tracks relay URLs and manages connections
   * @param {string[]} relays - Array of relay URLs  
   * @param {Object} filter - Nostr filter object
   * @returns {Promise<Object>} Subscription object promise
   */
  const subscribeToRelays = async (relays, filter) => {
    if (!sharedPoolInstance) {
      throw new Error('Shared pool not available')
    }

    // Normalize and track relay URLs
    const normalizedRelays = relays.map(relay => {
      const normalizedUrl = relay.startsWith('wss://') || relay.startsWith('ws://') ? relay : `wss://${relay}`
      trackedRelays.add(normalizedUrl)
      return normalizedUrl
    })

    //console.log(`🔔 Subscribing to ${normalizedRelays.length} relays, total tracked: ${trackedRelays.size}`)
    
    // Ensure all relay connections are open before subscribing
    await ensureRelayConnections(normalizedRelays)
    
    return sharedPoolInstance.subscribeMany(normalizedRelays, [filter], {})
  }

  /**
   * Close specific relays
   * @param {string[]} relays - Array of relay URLs to close
   */
  const closeRelays = (relays) => {
    if (sharedPoolInstance) {
      sharedPoolInstance.close(relays)
      
      // Remove from tracked relays
      relays.forEach(relay => {
        const normalizedUrl = relay.startsWith('wss://') || relay.startsWith('ws://') ? relay : `wss://${relay}`
        trackedRelays.delete(normalizedUrl)
      })
      
      //console.log(`🔌 Closed ${relays.length} relays, remaining tracked: ${trackedRelays.size}`)
    }
  }

  /**
   * Get detailed connection status for all tracked relays
   * @returns {Object} Detailed connection status
   */
  const getConnectionStatus = () => {
    const relayStatuses = {}
    
    trackedRelays.forEach(relay => {
      relayStatuses[relay] = getRelayConnectionStatus(relay)
    })

    return {
      connections: connectionCount,
      poolExists: !!sharedPoolInstance,
      relayStatuses,
      summary: {
        total: trackedRelays.size,
        open: Object.values(relayStatuses).filter(s => s === 'open').length,
        closed: Object.values(relayStatuses).filter(s => s === 'closed').length,
        connecting: Object.values(relayStatuses).filter(s => s === 'connecting').length,
        closing: Object.values(relayStatuses).filter(s => s === 'closing').length
      }
    }
  }

  /**
   * Get pool connection statistics
   * @returns {Object} Connection statistics
   */
  const getStats = () => ({
    connections: connectionCount,
    poolExists: !!sharedPoolInstance,
    relayUrls: Array.from(trackedRelays), // Use tracked relays instead
    poolRelayUrls: sharedPoolInstance ? Object.keys(sharedPoolInstance.relays || {}) : [], // Also include pool's internal relays
    trackedRelayCount: trackedRelays.size
  })

  /**
   * Force close the entire shared pool (emergency cleanup)
   * Should only be used when shutting down the entire application
   */
  const forceClosePool = () => {
    if (sharedPoolInstance) {
      const relayUrls = Array.from(trackedRelays)
      sharedPoolInstance.close(relayUrls)
      sharedPoolInstance = null
      connectionCount = 0
      trackedRelays.clear()
      console.log('🛑 Force closed shared pool and reset connection count')
    }
  }

  // Auto-cleanup when composable scope is disposed (component unmounts)
  onScopeDispose(() => {
    connectionCount = Math.max(0, connectionCount - 1)
    stats.value.connections = connectionCount

    // If no more connections, close the pool after a delay
    // This prevents immediate recreation if another component mounts quickly
    if (connectionCount === 0) {
      setTimeout(() => {
        if (connectionCount === 0 && sharedPoolInstance) {
          console.log('🔄 No active connections. Closing shared pool...')
          const relayUrls = Array.from(trackedRelays)
          sharedPoolInstance.close(relayUrls)
          sharedPoolInstance = null
          trackedRelays.clear()
        }
      }, 5000) // 5 second delay to allow for quick remounts
    }
  })

  return {
    pool: getPool(),
    stats: readonly(stats),
    queryRelays,
    subscribeToRelays,
    closeRelays,
    getStats,
    getConnectionStatus,
    getRelayConnectionStatus,
    ensureRelayConnections,
    forceClosePool
  }
}

/**
 * Utility function to get pool statistics from anywhere
 * Useful for debugging and monitoring
 */
export const getSharedPoolStats = () => ({
  connections: connectionCount,
  poolExists: !!sharedPoolInstance,
  relayUrls: Array.from(trackedRelays), // Use tracked relays instead
  poolRelayUrls: sharedPoolInstance ? Object.keys(sharedPoolInstance.relays || {}) : [],
  trackedRelayCount: trackedRelays.size
})