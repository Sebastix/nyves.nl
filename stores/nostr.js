import { defineStore } from 'pinia'
import { ref, computed, readonly } from 'vue'
import * as nip19 from 'nostr-tools/nip19'

/**
 * Pinia store for managing Nostr connection and identity state
 * Provides application-wide access to user's Nostr identity and connection status
 */
export const useNostrStore = defineStore('nostr', () => {
  // ==== STATE ====
  const isConnected = ref(false)
  const publicKey = ref(null)
  const publicKeyNpub = ref(null)
  const connectionMethod = ref(null) // 'extension', 'imported', 'generated'
  const extensionAvailable = ref(false)
  const connectionError = ref(null)
  const lastConnected = ref(null)
  const profile = ref(null) // User profile metadata (kind 0)
  const relays = ref([]) // User's relay list (kind 10002)
  
  // Connection attempt tracking
  const isConnecting = ref(false)
  const connectionAttempts = ref(0)
  const maxConnectionAttempts = ref(3)
  
  // ==== GETTERS (COMPUTED) ====
  const connectionStatus = computed(() => {
    if (isConnecting.value) return 'connecting'
    if (isConnected.value) return 'connected'
    if (connectionError.value) return 'error'
    return 'disconnected'
  })
  
  const shortPublicKey = computed(() => {
    if (!publicKey.value) return null
    return `${publicKey.value.substring(0, 8)}...${publicKey.value.substring(publicKey.value.length - 8)}`
  })
  
  const canRetryConnection = computed(() => {
    return connectionAttempts.value < maxConnectionAttempts.value
  })
  
  const userDisplayName = computed(() => {
    if (!profile.value) return shortPublicKey.value
    return profile.value.name || profile.value.display_name || shortPublicKey.value
  })
  
  const hasProfile = computed(() => {
    return profile.value && (profile.value.name || profile.value.display_name || profile.value.about)
  })
  
  // ==== ACTIONS ====
  
  /**
   * Connect using NIP-07 browser extension
   */
  const connectWithExtension = async () => {
    if (!extensionAvailable.value) {
      throw new Error('No browser extension available')
    }
    
    try {
      isConnecting.value = true
      connectionError.value = null
      connectionAttempts.value++
      
      console.log('🔗 Connecting with browser extension...')
      
      // Get public key
      const pubkey = await window.nostr.getPublicKey()
      
      // Test signing capability
      const testEvent = {
        kind: 1,
        content: 'Test connection',
        tags: [],
        created_at: Math.floor(Date.now() / 1000)
      }

      // Store connection state
      await setConnectionState({
        publicKey: pubkey,
        method: 'nip07_browser-extension'
      })
      
      console.log('✅ Extension connection successful!')
      return true
      
    } catch (error) {
      connectionError.value = error.message
      console.error('❌ Extension connection failed:', error)
      throw error
    } finally {
      isConnecting.value = false
    }
  }

  
  /**
   * Set the connection state after successful authentication
   */
  const setConnectionState = async (connectionData) => {
    const { publicKey: pubkey, method } = connectionData
    
    try {
      // Update state
      publicKey.value = pubkey
      // Try to load user profile and relays
      await loadUserProfile()
      await loadUserRelays()
      // Convert hex to npub if needed
      await convertHexToNpub(pubkey)
      connectionMethod.value = method
      isConnected.value = true
      lastConnected.value = new Date().toISOString()
      connectionError.value = null
      connectionAttempts.value = 0

      console.log('🎯 Connection state updated:', {
        publicKey: shortPublicKey.value,
        method,
        npub: publicKeyNpub.value ? `${publicKeyNpub.value.substring(0, 12)}...` : null
      })
      
    } catch (error) {
      console.error('Failed to set connection state:', error)
      connectionError.value = error.message
    }
  }
  
  /**
   * Load user's profile metadata (kind 0)
   */
  const loadUserProfile = async () => {
    if (!publicKey.value) return
    
    try {
      console.log('📄 Loading user profile for:', publicKey.value)
      
      // Fetch profile metadata from relays
      const filter = {
        kinds: [0],
        authors: [publicKey.value],
        limit: 1
      }
      // List of lookup relays to find events kind 0 (profile metadata) for pubkey
      const relays = [
        'wss://relaypag.es',
        'wss://indexer.coracle.social',
        'wss://profiles.nostr1.com',
        'wss://purplepage.es',
        'wss://profiles.nostrver.se',
        'wss://index.hzrd149.com'
      ]
      // Use shared pool for profile loading
      const { useSharedPool } = await import('~/composables/useSharedRelayPool')
      const { pool } = useSharedPool()
      const events = await pool.querySync(relays, filter)
      const profileData = JSON.parse(events[0].content)

      if (events.length === 0) {
        console.log('⚠️ No profile metadata found for user')
        // Set basic profile with just the public key
        profile.value = {
          name: 'Anonymous',
          display_name: 'Anonymous',
          about: '',
          picture: '',
          banner: '',
          nip05: '',
          lud16: '',
          website: '',
          created_at: null,
          metadata: null
        }
      }
      if (profileData) {
        profile.value = {
          name: profileData.name || profileData.display_name || 'Anonymous',
          display_name: profileData.display_name || profileData.name || 'Anonymous',
          about: profileData.about || '',
          picture: profileData.picture || '',
          banner: profileData.banner || '',
          nip05: profileData.nip05 || '',
          lud16: profileData.lud16 || '',
          website: profileData.website || '',
          created_at: profileData.created_at || null,
          metadata: profileData
        }
        console.log('✅ Profile metadata loaded:', profile.value.name || profile.value.display_name)
      }
    } catch (error) {
      console.error('❌ Failed to load user profile:', error)
      // Set fallback profile on error
      profile.value = {
        name: 'Anonymous',
        display_name: 'Anonymous',
        about: '',
        picture: '',
        banner: '',
        nip05: '',
        lud16: '',
        website: '',
        created_at: null,
        metadata: null
      }
    }
  }
  
  /**
   * Load user's relay list (kind 10002)
   */
  const loadUserRelays = async () => {
    if (!publicKey.value) return
    
    try {
      // List of lookup relays to find events kind 10002 (relay list metadata) for pubkey
      const relays = [
        'wss://relaypag.es',
        'wss://indexer.coracle.social',
        'wss://profiles.nostr1.com',
        'wss://purplepage.es',
        'wss://profiles.nostrver.se',
        'wss://index.hzrd149.com'
      ]
      // TODO: Implement relay list loading
      // - Query kind 10002 events for user's relay list
      // - Parse and store relay configuration
      console.log('📡 Loading user relays... (TODO: implement)')
      
    } catch (error) {
      console.error('Failed to load user relays:', error)
    }
  }
  
  /**
   * Disconnect the current session
   */
  const disconnect = () => {
    isConnected.value = false
    publicKey.value = null
    publicKeyNpub.value = null
    connectionMethod.value = null
    connectionError.value = null
    lastConnected.value = null
    profile.value = null
    relays.value = []
    connectionAttempts.value = 0
    
    console.log('🔌 Disconnected from Nostr')
  }
  
  /**
   * Set extension availability status
   */
  const setExtensionAvailable = (available) => {
    extensionAvailable.value = available
  }
  
  /**
   * Clear connection error
   */
  const clearError = () => {
    connectionError.value = null
  }
  
  /**
   * Reset connection attempts counter
   */
  const resetConnectionAttempts = () => {
    connectionAttempts.value = 0
  }
  
  // ==== UTILITY FUNCTIONS ====
  
  /**
   * Convert hex public key to npub format
   */
  const convertHexToNpub = (hexPubkey) => {
    try {
      publicKeyNpub.value = nip19.npubEncode(hexPubkey)
    } catch (error) {
      console.error('Failed to convert hex to npub:', error)
      return null
    }
  }
  
  /**
   * Sign a Nostr event (wrapper for different connection methods)
   */
  const signEvent = async (unsignedEvent) => {
    if (!isConnected.value) {
      throw new Error('Not connected to Nostr')
    }
    
    try {
      switch (connectionMethod.value) {
        case 'nip07_browser-extension':
          if (!window.nostr?.signEvent) {
            throw new Error('Browser extension not available')
          }
          return await window.nostr.signEvent(unsignedEvent)

        default:
          throw new Error(`Unknown connection method: ${connectionMethod.value}`)
      }
    } catch (error) {
      console.error('Failed to sign event:', error)
      throw error
    }
  }
  
  // ==== RETURN PUBLIC API ====
  return {
    // State (readonly)
    isConnected: readonly(isConnected),
    publicKey: readonly(publicKey),
    publicKeyNpub: readonly(publicKeyNpub),
    connectionMethod: readonly(connectionMethod),
    extensionAvailable: readonly(extensionAvailable),
    connectionError: readonly(connectionError),
    lastConnected: readonly(lastConnected),
    profile: readonly(profile),
    relays: readonly(relays),
    isConnecting: readonly(isConnecting),
    connectionAttempts: readonly(connectionAttempts),
    
    // Getters
    connectionStatus,
    shortPublicKey,
    canRetryConnection,
    userDisplayName,
    hasProfile,
    
    // Actions
    connectWithExtension,
    setConnectionState,
    loadUserProfile,
    loadUserRelays,
    disconnect,
    setExtensionAvailable,
    clearError,
    resetConnectionAttempts,
    signEvent
  }
})