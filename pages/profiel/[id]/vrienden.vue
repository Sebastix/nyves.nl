<script setup>
import { nip19 } from 'nostr-tools'
import LoadingSpinner from '../../../components/LoadingSpinner.vue';

const route = useRoute()
const { fetchProfile } = useNostrProfile()
const { queryRelays } = useSharedRelayPool()

// Get npub/id from route params - in [id] folder structure, the param is named 'id'
const npub = route.params.id
console.log('NPub from vrienden route:', npub)

// Profile and friends data
const profile = ref(null)
const vrienden = ref([])
const contactListEvent = ref(null)
const rawContactData = ref([])
const loading = ref(true)
const loadingFriends = ref(false)
const error = ref(null)

// Validate NPub format
const validateNpub = (npubString) => {
  if (!npubString || !npubString.startsWith('npub1')) {
    return false
  }
  
  try {
    const decoded = nip19.decode(npubString)
    return decoded.type === 'npub'
  } catch (e) {
    return false
  }
}

// Fetch Kind 3 contact list events
const fetchContactList = async (pubkey) => {
  console.log('🔍 Fetching Kind 3 contact list for:', pubkey)
  
  try {
    // Define relays to check for contact lists
    const relays = [
      'wss://relay.damus.io',
      'wss://nos.lol', 
      'wss://relay.primal.net',
      'wss://relay.vertexlab.io',
      'wss://relay.ditto.pub'
    ]
    
    const filter = {
      kinds: [3], // Kind 3 = Contact List
      authors: [pubkey],
      limit: 3 // Get recent contact lists
    }
    
    console.log('📡 Querying relays for Kind 3 events:', { filter, relays })
    
    const events = await queryRelays(relays, filter)
    
    console.log(`📥 Found ${events.length} Kind 3 events:`, events)
    
    if (events.length > 0) {
      // Sort by created_at to get most recent
      const sortedEvents = events.sort((a, b) => b.created_at - a.created_at)
      const latestEvent = sortedEvents[0]
      
      console.log('📋 Latest contact list event:', latestEvent)
      
      contactListEvent.value = latestEvent
      
      // Parse p tags (pubkeys being followed)
      const contacts = latestEvent.tags
        .filter(tag => tag[0] === 'p' && tag[1]) // Filter for 'p' tags with pubkey
        .map(tag => ({
          pubkey: tag[1], // hex pubkey
          npub: nip19.npubEncode(tag[1]), // convert to npub
          relay: tag[2] || null, // optional relay URL
          petname: tag[3] || null // optional petname
        }))
      
      console.log(`👥 Parsed ${contacts.length} contacts from Kind 3:`, contacts)
      
      rawContactData.value = contacts
      
      return contacts
    } else {
      console.log('❌ No Kind 3 contact list found for this user')
      rawContactData.value = []
      return []
    }
    
  } catch (error) {
    console.error('❌ Error fetching contact list:', error)
    throw error
  }
}

// Load profiles for contacts (optional - can be heavy)
const loadContactProfiles = async (contacts, limit = 10) => {
  console.log(`👤 Loading profiles for first ${limit} contacts...`)
  
  if (contacts.length === 0) return []
  
  loadingFriends.value = true
  
  try {
    // Take only first N contacts to avoid overwhelming
    const contactsToLoad = contacts.slice(0, limit)
    
    const profilePromises = contactsToLoad.map(async (contact) => {
      try {
        const profileData = await fetchProfile(contact.pubkey)
        return {
          ...contact,
          profile: profileData
        }
      } catch (e) {
        console.warn('Failed to load profile for:', contact.npub)
        return {
          ...contact,
          profile: null
        }
      }
    })
    
    const contactsWithProfiles = await Promise.all(profilePromises)
    
    console.log('✅ Loaded contact profiles:', contactsWithProfiles)
    
    return contactsWithProfiles.filter(contact => contact.profile) // Only return contacts with successful profile loads
    
  } catch (error) {
    console.error('❌ Error loading contact profiles:', error)
    return []
  } finally {
    loadingFriends.value = false
  }
}

// Load profile and friends data
const loadProfileAndFriends = async () => {
  loading.value = true
  error.value = null
  
  try {
    if (!validateNpub(npub)) {
      error.value = 'Ongeldig NPub format voor vrienden pagina'
      return
    }
    
    // Decode npub to get hex pubkey
    const decoded = nip19.decode(npub)
    const pubkey = decoded.data
    
    console.log('Loading profile and friends for:', { npub, pubkey })
    
    // Load profile data
    const profileData = await fetchProfile(pubkey)
    
    if (profileData) {
      profile.value = {
        ...profileData,
        npub: npub,
        pubkey: pubkey
      }
      
      // Load Kind 3 contact list 
      console.log('📋 Loading Kind 3 contact list...')
      
      try {
        const contacts = await fetchContactList(pubkey)
        
        if (contacts.length > 0) {
          console.log(`👥 Found ${contacts.length} contacts, loading profiles...`)
          
          // Load profiles for first 20 contacts
          const contactsWithProfiles = await loadContactProfiles(contacts, 30)
          vrienden.value = contactsWithProfiles
          
          console.log(`✅ Successfully loaded ${vrienden.value.length} vrienden with profiles`)
        } else {
          console.log('📭 No contacts found in Kind 3 events')
          vrienden.value = []
        }
        
      } catch (friendsError) {
        console.error('❌ Error loading friends:', friendsError)
        // Don't fail the whole page if friends loading fails
        vrienden.value = []
      }
      
      // Update page title
      useSeoMeta({
        title: `Vrienden van ${profileData.display_name || profileData.name || 'Profiel'} - Nyves`,
        description: `Bekijk de vrienden van ${profileData.display_name || profileData.name} op Nyves`
      })
    } else {
      error.value = 'Profiel niet gevonden op relays'
    }
    
  } catch (e) {
    console.error('Error loading profile and friends:', e)
    error.value = 'Er ging iets mis bij het laden van de gegevens'
  } finally {
    loading.value = false
  }
}

// Enhanced route validation 
definePageMeta({
  validate(route) {
    console.log('Validating vrienden route:', route.params.id)
    
    // Validate that id parameter is valid npub format
    const npub = route.params.id
    if (!npub || !npub.startsWith('npub1')) {
      console.log('Vrienden route validation failed: not npub format')
      return false
    }
    
    try {
      const decoded = nip19.decode(npub)
      const isValid = decoded.type === 'npub'
      console.log('Vrienden route validation result:', isValid)
      return isValid
    } catch (e) {
      console.log('Vrienden route validation error:', e)
      return false
    }
  },
})

// Load data on mount and route changes
onMounted(async () => {
  await loadProfileAndFriends()
  useSeoMeta({
    title: `Vrienden van ${profile.value.display_name || profile.value.name || 'Profiel'} - Nyves`,
    description: `Lijst met vrienden van ${profile.value.display_name || profile.value.name} op Nyves`
  })
})

watch(() => route.params.id, loadProfileAndFriends)

// Default SEO
useSeoMeta({
  title: 'Vrienden - Nyves',
  description: 'Bekijk vrienden op Nyves'
})
</script>

<template>
  <div class="mt-3">

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center min-h-64">
      <div class="text-center">
        <LoadingSpinner class="size-12 mx-auto mb-12" />
        <p class="text-gray-600">Vrienden worden geladen...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex justify-center items-center min-h-64">
      <div class="text-center">
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {{ error }}
        </div>
        <NuxtLink 
          :to="`/profiel/${npub}`"
          class="text-nyves-blue hover:text-nyves-blue/80 underline"
        >
          ← Terug naar profiel
        </NuxtLink>
      </div>
    </div>

    <!-- Content -->
    <div v-else-if="profile">
      <!-- Header -->
      <div class="flex flex-row gap-x-2 profileHeader mb-2">
        <NuxtLink :to="`/profiel/${profile.npub}`">
          <NostrComponentsProfilePicture :pubkey="profile.pubkey" class="size-12" />
        </NuxtLink>
        <div class="grid grid-cols-2">
          <h1 class="col-span-2 text-3xl font-bold mb-1">
            <NuxtLink :to="`/profiel/${profile.npub}`">
              {{ profile.name }}
            </NuxtLink>
            <a :href="`${profile.urlWaybackMachine}/vrienden`" target="_blank" class="text-xs" v-if="profile.urlWaybackMachine">{{ profile.urlWaybackMachine }}</a>
          </h1>
          <div class="mb-2">
            <NuxtLink :to="`/profiel/${profile.npub}/over`" class="mr-4 text-xs">Over</NuxtLink>
            <NuxtLink :to="`/profiel/${profile.npub}/vrienden`" class="mr-4 text-xs font-bold !text-black">Vrienden</NuxtLink>
            <NuxtLink :to="`/profiel/${profile.npub}/media`" class="mr-4 text-xs">Foto's</NuxtLink>
            <NuxtLink :to="`/profiel/${profile.npub}/meer`" class="text-xs">Meer</NuxtLink>
          </div>
        </div>
        <button
            @click="toggleCustomDesign"
            class="justify-self-end text-xs mb-1 cursor-pointer px-1 hidden"
            :class="[ custom_design ? 'bg-linear-to-b from-[#65d018] to-[#49a811] text-white rounded-sm font-bold border border-[#96e05e] hover:border-[#44a806] text-shadow-xs' : '' ]"
        >
          <span class="text-white font-sans" v-if="custom_design">🛟 Toon in standaard design</span>
          <span class="text-nyves-blue" v-else>🛟 Toon eigen design!</span>
        </button>
      </div>

      <!-- Friends list -->
      <!-- Empty State -->
      <div v-if="vrienden.length === 0" class="text-center py-12">
        <div class="text-gray-400 mb-4">
          <svg class="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
        </div>
        <div v-if="rawContactData.length === 0">
          <h4 class="text-lg font-medium text-gray-900 mb-2">
            Geen Kind 3 contact lijst gevonden
          </h4>
          <p class="text-gray-600 mb-4">
            Deze gebruiker heeft nog geen publieke contact lijst (Kind 3 event) gepubliceerd.
          </p>
        </div>
        
        <div v-else>
          <h4 class="text-lg font-medium text-gray-900 mb-2">
            {{ rawContactData.length }} contacten gevonden, {{ vrienden.length }} profielen geladen
          </h4>
          <p class="text-gray-600 mb-4">
            Profielen worden nog geladen van de overige contacten...
          </p>
        </div>

        <!-- Kind 3 Debug Info -->
        <div v-if="contactListEvent" class="bg-gray-50 border border-gray-200 rounded-lg p-4 text-left max-w-2xl mx-auto mt-4">
          <h5 class="font-medium text-gray-900 mb-2">📋 Kind 3 Event Details</h5>
          <div class="text-sm text-gray-600 space-y-1">
            <div><strong>Event ID:</strong> <code>{{ contactListEvent.id?.substring(0, 16) }}...</code></div>
            <div><strong>Created:</strong> {{ new Date(contactListEvent.created_at * 1000).toLocaleString('nl-NL') }}</div>
            <div><strong>Total Tags:</strong> {{ contactListEvent.tags?.length || 0 }}</div>
            <div><strong>P Tags (Contacts):</strong> {{ rawContactData.length }}</div>
          </div>
        </div>
      </div>

      <!-- Vrienden Grid -->
      <div v-else class="space-y-6">
        
        <!-- Loaded Profiles -->
        <div v-if="vrienden.length > 0" class="border border-gray-200 bg-[#fcfcfc] rounded-sm">
          <h2 class="nyves-bg-gray-header font-bold text-nyves-blue mb-0 p-2">
            Vrienden ({{ rawContactData.length }})
          </h2>

          <form class="px-2 mb-4">
            <label>
              <input type="text" class="p-1 bg-white rounded-sm border border-gray-500 text-sm min-w-96" placeholder="Tik (de eerste letter van) de naam in:" />
            </label>
          </form>

          <div class="grid grid-cols-3 md:grid-cols-5 gap-1 mb-4 border-b border-b-gray-200 pb-2">
            <div
                v-for="vriend in vrienden"
                :key="vriend.npub"
                class="text-center"
            >
              <NuxtLink :to="`/profiel/${vriend.npub}`" class="text-xs">
                <NostrComponentsProfilePicture :pubkey="vriend.pubkey" />
                <NostrComponentsPubkeyToName :pubkey="vriend.pubkey" />
                <span class="font-mono">{{ vriend.npub.substring(0, 8) }}...</span>
              </NuxtLink>
            </div>
          </div>

          <template v-if="rawContactData.length > vrienden.length">
            <h3 class="text-lg font-semibold text-nyves-blue mb-2 p-2">
              Pubkeys ({{ rawContactData.length - vrienden.length }})
            </h3>
            <p class="text-center text-sm text-gray-600 bg-yellow-100 p-2 mb-3">
              💡 Profielen voor onderstaande contacten worden (nog) niet automatisch geladen om performance redenen.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-5 gap-2 p-2">
              <div
                  v-for="contact in rawContactData.slice(vrienden.length)"
                  :key="contact.npub"
                  class="flex items-center justify-between p-2 bg-white rounded border text-sm"
              >
                <div class="flex-1 min-w-0 text-xs">
                  <NostrComponentsPubkeyToName :pubkey="contact.pubkey" />
                </div>

                <NuxtLink
                    :to="`/profiel/${contact.npub}`"
                    class="text-nyves-blue hover:text-nyves-blue/80 text-xs underline"
                >
                  Bekijk
                </NuxtLink>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- Technical Info -->
    <div v-if="profile" class="max-w-4xl mx-auto px-4 pb-8 hidden">
      <div class="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 class="font-semibold text-gray-900 mb-2">🔧 Kind 3 Event Informatie</h4>
        <div class="text-sm text-gray-600 space-y-1">
          <div><strong>Route Pattern:</strong> <code>/profiel/[id]/vrienden</code></div>
          <div><strong>File Location:</strong> <code>pages/profiel/[id]/vrienden.vue</code> ✅</div>
          <div><strong>NPub Parameter:</strong> <code>{{ npub }}</code></div>
          <div><strong>Pubkey:</strong> <code>{{ profile.pubkey?.substring(0, 16) }}...</code></div>
          
          <div v-if="contactListEvent" class="pt-2 border-t border-gray-300 mt-3">
            <div><strong>Kind 3 Event ID:</strong> <code>{{ contactListEvent.id }}</code></div>
            <div><strong>Created At:</strong> {{ new Date(contactListEvent.created_at * 1000).toISOString() }}</div>
            <div><strong>Total Tags:</strong> {{ contactListEvent.tags?.length || 0 }}</div>
            <div><strong>Raw Contacts:</strong> {{ rawContactData.length }}</div>
            <div><strong>Loaded Profiles:</strong> {{ vrienden.length }}</div>
          </div>
          
          <div v-else class="pt-2 border-t border-gray-300 mt-3 text-orange-600">
            <div>❌ <strong>No Kind 3 Event Found:</strong> This user hasn't published a contact list</div>
          </div>
          
          <div class="pt-2 border-t border-gray-300 mt-3">
            <div><strong>Status:</strong> <span class="text-green-600">Kind 3 Integration Active ✅</span></div>
          </div>
        </div>
        
        <!-- Raw Event Data (Collapsible) -->
        <details v-if="contactListEvent" class="mt-4">
          <summary class="cursor-pointer font-medium text-gray-900 hover:text-nyves-blue">
            🔍 Raw Kind 3 Event Data (Click to expand)
          </summary>
          <pre class="mt-2 p-3 bg-gray-800 text-green-400 rounded text-xs overflow-x-auto">{{ JSON.stringify(contactListEvent, null, 2) }}</pre>
        </details>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>