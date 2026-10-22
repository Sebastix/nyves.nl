import { ref, readonly, onScopeDispose } from 'vue'
import { SimplePool } from 'nostr-tools/pool'

// Global shared pool instance
let sharedPoolInstance = null
let connectionCount = 0
let trackedRelays = new Set() // Track relay URLs manually

const default_relays = [
  'wss://rely.nyves.nl'
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
   * All url variants a relay connection can be stored under in the pool.
   * Different nostr-tools versions (and different relay urls) keep or strip the
   * trailing slash, so both variants are checked.
   * @param {string} url - Relay url
   * @returns {string[]} Url variants (without duplicates)
   */
  const relayUrlVariants = (url) => {
    if (!url) return []

    const variants = new Set()
    const add = (value) => {
      variants.add(value)
      variants.add(value.replace(/\/+$/, ''))
      variants.add(value.replace(/\/+$/, '') + '/')
    }

    add(url)
    try {
      const parsed = new URL(url.includes('://') ? url : `wss://${url}`)
      if (parsed.protocol === 'http:') parsed.protocol = 'ws:'
      if (parsed.protocol === 'https:') parsed.protocol = 'wss:'
      add(parsed.toString())
    } catch (e) {
      // url is not parseable, the raw variants above are enough
    }

    return [...variants]
  }

  /**
   * Get the relay connection object of the shared pool for a relay url.
   * Recent nostr-tools versions store the relays in a Map, older ones in a
   * plain object, both are supported here.
   * @param {string} relayUrl - Relay url
   * @returns {Object|null} The relay connection or null when not connected
   */
  const getPoolRelay = (relayUrl) => {
    const relays = sharedPoolInstance?.relays
    if (!relays || !relayUrl) return null

    const isMap = typeof relays.get === 'function'
    for (const variant of relayUrlVariants(relayUrl)) {
      const relay = isMap ? relays.get(variant) : relays[variant]
      if (relay) return relay
    }
    return null
  }

  /**
   * Remove a relay connection from the shared pool so it will be reconnected
   * on the next query.
   * @param {string} relayUrl - Relay url
   */
  const removePoolRelay = (relayUrl) => {
    const relays = sharedPoolInstance?.relays
    if (!relays || !relayUrl) return

    const isMap = typeof relays.delete === 'function'
    relayUrlVariants(relayUrl).forEach((variant) => {
      if (isMap) {
        relays.delete(variant)
      } else {
        delete relays[variant]
      }
    })
  }

  /**
   * Wait for a given time, but stop waiting as soon as the signal is aborted
   * @param {number} ms - Milliseconds to wait
   * @param {AbortSignal} [signal] - Optional abort signal
   * @returns {Promise<void>}
   */
  const waitFor = (ms, signal) => new Promise((resolve) => {
    if (signal?.aborted) return resolve()

    const handle = setTimeout(resolve, ms)
    signal?.addEventListener('abort', () => {
      clearTimeout(handle)
      resolve()
    }, { once: true })
  })

  /**
   * Check WebSocket connection status for a relay
   * @param {string} relayUrl - Relay URL to check
   * @returns {string} Connection status: 'open', 'connecting', 'closing', 'closed'
   */
  const getRelayConnectionStatus = (relayUrl) => {
    if (!sharedPoolInstance || !sharedPoolInstance.relays) {
      return 'closed'
    }

    const relay = getPoolRelay(relayUrl)
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
   * @param {Object} [params] - Optional query params, an abort signal stops waiting early
   * @returns {Promise<void>} Promise that resolves when connections are ready
   */
  const ensureRelayConnections = async (relays, params = {}) => {
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
        removePoolRelay(normalizedUrl)

        // Wait a bit for connection to establish (stops early when aborted)
        await waitFor(800, params?.abort)
      } else if (status === 'connecting') {
        // Wait for connection to open (stops early when aborted)
        console.log(`⏳ Waiting for ${normalizedUrl} to connect...`)
        await waitFor(2500, params?.abort)
      }
    })

    await Promise.all(connectionPromises)
  }

  /**
   * Enhanced pool query that tracks relay URLs and manages connections
   * @param {string[]} relays - Array of relay URLs
   * @param {Object} filter - Nostr filter object
   * @param {Object} [params] - Optional query params forwarded to the pool, e.g.
   *   `{ abort: signal }` to cancel an in-flight query when a component unmounts
   * @returns {Promise} Query promise
   */
  const queryRelays = async (relays, filter, params = {}) => {
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

    // Already cancelled by the caller: don't open a relay subscription at all
    if (params?.abort?.aborted) {
      return []
    }

    // Ensure all relay connections are open before querying
    await ensureRelayConnections(normalizedRelays, params)

    if (params?.abort?.aborted) {
      return []
    }

    return sharedPoolInstance.querySync(normalizedRelays, filter, params)
  }

  /**
   * Enhanced pool subscription that tracks relay URLs and manages connections
   * @param {string[]} relays - Array of relay URLs  
   * @param {Object} filter - Nostr filter object
   * @param {Object} [params] - Optional subscription params forwarded to the pool, e.g.
   *   `{ abort: signal }` to cancel an in-flight subscription when a component unmounts
   * @returns {Promise<Object>} Subscription object promise
   */
  const subscribeToRelays = async (relays, filter, params = {}) => {
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

    // Already cancelled by the caller: don't open a relay subscription at all
    if (params?.abort?.aborted) {
      return { close: () => {} }
    }

    // Ensure all relay connections are open before subscribing
    await ensureRelayConnections(normalizedRelays, params)

    if (params?.abort?.aborted) {
      return { close: () => {} }
    }

    return sharedPoolInstance.subscribeMany(normalizedRelays, [filter], params)
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