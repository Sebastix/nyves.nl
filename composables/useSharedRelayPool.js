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
  console.log(`📊 Shared pool connections: ${connectionCount}`)

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
   * Enhanced pool query that tracks relay URLs
   * @param {string[]} relays - Array of relay URLs
   * @param {Object} filter - Nostr filter object
   * @returns {Promise} Query promise
   */
  const queryRelays = async (relays, filter) => {
    if (!sharedPoolInstance) {
      throw new Error('Shared pool not available')
    }

    // Track the relay URLs we're using
    relays.forEach(relay => {
      const normalizedUrl = relay.startsWith('wss://') || relay.startsWith('ws://') ? relay : `wss://${relay}`
      trackedRelays.add(normalizedUrl)
    })

    console.log(`📡 Querying ${relays.length} relays, total tracked: ${trackedRelays.size}`)
    
    return sharedPoolInstance.querySync(relays, filter)
  }

  /**
   * Enhanced pool subscription that tracks relay URLs
   * @param {string[]} relays - Array of relay URLs  
   * @param {Object} filter - Nostr filter object
   * @returns {Object} Subscription object
   */
  const subscribeToRelays = (relays, filter) => {
    if (!sharedPoolInstance) {
      throw new Error('Shared pool not available')
    }

    // Track the relay URLs we're using
    relays.forEach(relay => {
      const normalizedUrl = relay.startsWith('wss://') || relay.startsWith('ws://') ? relay : `wss://${relay}`
      trackedRelays.add(normalizedUrl)
    })

    console.log(`🔔 Subscribing to ${relays.length} relays, total tracked: ${trackedRelays.size}`)
    
    return sharedPoolInstance.subscribeMany(relays, [filter], {})
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
      
      console.log(`🔌 Closed ${relays.length} relays, remaining tracked: ${trackedRelays.size}`)
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
    console.log(`📉 Composable disposed. Remaining connections: ${connectionCount}`)
    
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