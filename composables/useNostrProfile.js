import { reactive } from 'vue'
import * as nip19 from 'nostr-tools/nip19'

// Default 'indexer' relays to use for fetching profile data
const DEFAULT_RELAYS = [
  'wss://rely.nyves.nl',
  'wss://indexer.coracle.social',
  'wss://purplepag.es',
  'wss://profiles.nostr1.com',
  'wss://profiles.nostrver.se',
  'wss://relay.ditto.pub',
  //'wss://relaypage.es',
  //'wss://index.hzrd149.com',
  'wss://relay.vertexlab.io',
  'wss://user.kindpag.es'
]

// Reactive in-memory cache of resolved profiles, keyed by hex pubkey.
// Shared between components so a name that is fetched inside a child component
// (ProfilePicture, PubkeyToName) can be reused by a parent component to filter
// or search rendered elements without fetching the profile again.
const profileCache = reactive({})

/**
 * Store a resolved profile in the shared cache
 * @param {Object|null} profile - Profile metadata (must contain a pubkey)
 * @returns {Object|null} The same profile, for easy chaining
 */
const cacheProfile = (profile) => {
  if (profile && profile.pubkey) {
    profileCache[profile.pubkey] = profile
  }
  return profile
}

/**
 * Get a cached profile for a hex pubkey
 * @param {string} pubkey - Hex formatted public key
 * @returns {Object|null} Cached profile data or null when unknown
 */
const getCachedProfile = (pubkey) => {
  if (!pubkey) return null
  return profileCache[pubkey] || null
}

/**
 * Get the (display) name of a cached profile
 * @param {string} pubkey - Hex formatted public key
 * @returns {string} Name, display_name or an empty string when unknown
 */
const getCachedName = (pubkey) => {
  const cached = getCachedProfile(pubkey)
  if (!cached) return ''
  return cached.name || cached.display_name || cached.displayName || ''
}

export const useNostrProfile = () => {
  const { pool, queryRelays } = useSharedRelayPool()

  /**
   * Fetch profile metadata for a given npub
   * @param {string} npub - The npub key to fetch profile for
   * @param {string[]} relays - Optional array of relay URLs
   * @returns {Promise<Object|null>} Profile data or null if not found
   */
  const fetchProfile = async (npub, relays = DEFAULT_RELAYS) => {
    try {
      let pubkey = npub;
      // Decode npub to get hex pubkey
      if (npub.startsWith('npub1')) {
        const decoded = nip19.decode(npub)
        if (decoded.type !== 'npub') {
          throw new Error('Invalid npub format')
        }
        pubkey = decoded.data
      }

      // Return the cached profile when available, to avoid duplicate relay queries
      const cachedProfile = getCachedProfile(pubkey)
      if (cachedProfile) {
        return cachedProfile
      }

      // Create filter for kind 0 (metadata) events
      const filter = {
        kinds: [0],
        authors: [pubkey],
        limit: 1
      }

      // Get the most recent metadata event
      const events = await queryRelays(relays, filter)

      if (events.length === 0) {
        console.error('No profile event found for pubkey:', pubkey)
        return null
      }

      // Parse the content (should be JSON)
      const event = events[0]
      try {
        const metadata = JSON.parse(event.content)
        return cacheProfile({
          ...metadata,
          pubkey,
          npub,
          created_at: event.created_at,
          tags: event.tags
        })
      } catch (parseError) {
        console.error('Failed to parse profile metadata JSON:', parseError)
        return null
      }

    } catch (error) {
      console.error('Failed to fetch profile:', error)
      return null
    }
  }

  /**
   * Fetch multiple profiles at once
   * @param {string[]} npubs - Array of npub keys
   * @param {string[]} relays - Optional array of relay URLs
   * @returns {Promise<Object>} Object with npub as key and profile data as value
   */
  const fetchProfiles = async (npubs, relays = DEFAULT_RELAYS) => {
    try {
      // Decode all npubs to hex pubkeys
      const pubkeys = []
      const npubToHex = {}
      
      for (const npub of npubs) {
        try {
          const decoded = nip19.decode(npub)
          if (decoded.type === 'npub') {
            const pubkey = decoded.data
            pubkeys.push(pubkey)
            npubToHex[pubkey] = npub
          }
        } catch (error) {
          console.error(`Invalid npub format: ${npub}`, error)
        }
      }

      if (pubkeys.length === 0) {
        return {}
      }

      // Create filter for kind 0 (metadata) events
      const filter = {
        kinds: [0],
        authors: pubkeys
      }

      // Get metadata events
      const events = await queryRelays(relays, filter)
      
      // Group events by author and get the most recent for each
      const profilesByPubkey = {}
      
      events.forEach(event => {
        const existingEvent = profilesByPubkey[event.pubkey]
        if (!existingEvent || event.created_at > existingEvent.created_at) {
          profilesByPubkey[event.pubkey] = event
        }
      })

      // Parse profiles and return with npub as key
      const profiles = {}
      
      Object.values(profilesByPubkey).forEach(event => {
        try {
          const metadata = JSON.parse(event.content)
          const npub = npubToHex[event.pubkey]
          profiles[npub] = cacheProfile({
            ...metadata,
            pubkey: event.pubkey,
            npub,
            created_at: event.created_at,
            tags: event.tags
          })
        } catch (parseError) {
          console.error('Failed to parse profile metadata JSON for pubkey:', event.pubkey, parseError)
        }
      })

      return profiles

    } catch (error) {
      console.error('Failed to fetch profiles:', error)
      return {}
    }
  }

  /**
   * Fetch profile metadata for a given hex pubkey
   * @param {string} pubkey - The hex pubkey to fetch profile for
   * @param {string[]} relays - Optional array of relay URLs
   * @returns {Promise<Object|null>} Profile data or null if not found
   */
  const fetchProfileByPubkey = async (pubkey, relays = DEFAULT_RELAYS) => {
    try {
      // Return the cached profile when available, to avoid duplicate relay queries
      const cachedProfile = getCachedProfile(pubkey)
      if (cachedProfile) {
        return cachedProfile
      }

      // Create filter for kind 0 (metadata) events
      const filter = {
        kinds: [0],
        authors: [pubkey],
        limit: 1
      }

      // Get the most recent metadata event
      const events = await queryRelays(relays, filter)
      
      if (events.length === 0) {
        return null
      }

      // Parse the content (should be JSON)
      const event = events[0]
      try {
        const metadata = JSON.parse(event.content)
        
        // Convert pubkey to npub for completeness
        const npub = nip19.npubEncode(pubkey)
        
        return cacheProfile({
          ...metadata,
          pubkey,
          npub,
          created_at: event.created_at,
          tags: event.tags
        })
      } catch (parseError) {
        console.error('Failed to parse profile metadata JSON:', parseError)
        return null
      }

    } catch (error) {
      console.error('Failed to fetch profile by pubkey:', error)
      return null
    }
  }

  /**
   * Close all relay connections
   */
  const close = () => {
    pool.close(DEFAULT_RELAYS)
  }

  return {
    fetchProfile,
    fetchProfiles,
    fetchProfileByPubkey,
    getCachedProfile,
    getCachedName,
    close
  }
}
