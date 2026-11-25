<script setup>
import { nip19 } from 'nostr-tools';
import LoadingSpinner from '../../../components/LoadingSpinner.vue';

const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()
const { fetchProfile, fetchProfiles, getCachedName, getCachedProfile } = useNostrProfile()
const { queryRelays } = useSharedRelayPool()

// Get npub/id from route params - in [id] folder structure, the param is named 'id'
const npub = route.params.id

// Profile and friends data
const profile = ref(null)

// Name to show in the title/description, with a localized fallback
const displayName = () => profile.value?.display_name
  || profile.value?.name
  || t('profiel_paginas.index_fallback')
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

    const events = await queryRelays(relays, filter)

    if (events.length > 0) {
      // Sort by created_at to get most recent
      const sortedEvents = events.sort((a, b) => b.created_at - a.created_at)
      const latestEvent = sortedEvents[0]

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

    return contactsWithProfiles.filter(contact => contact.profile) // Only return contacts with successful profile loads
    
  } catch (error) {
    console.error('❌ Error loading contact profiles:', error)
    return []
  } finally {
    loadingFriends.value = false
  }
}

// Load profile and friends data
const loadProfileAndFriends = async (pubkey) => {
  error.value = null
  loadingFriends.value = true
  
  try {
    const contacts = await fetchContactList(pubkey)

    if (contacts.length > 0) {
      // Load profiles for first 20 contacts
      vrienden.value = await loadContactProfiles(contacts, 30)
    } else {
      console.log('📭 No contacts found in Kind 3 events')
      vrienden.value = []
    }
    loadingFriends.value = false
  } catch (e) {
    console.error('Error loading profile and friends:', e)
    error.value = t('profiel_paginas.profile_load_failed')
  } finally {
    loading.value = false
  }
}

// ---------------------------------------------------------------------------
// Search friends by name (input field 'search-friend')
// ---------------------------------------------------------------------------

// Minimum number of characters before the search starts matching
const MIN_SEARCH_LENGTH = 3

// Raw value of the search input
const searchQuery = ref('')

// Normalize a value so searching is case- and accent-insensitive
// (e.g. 'Sébastian' matches 'sebastian')
const normalizeValue = (value) => {
  if (value === null || value === undefined) return ''
  return String(value)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
}

// Normalized search term
const searchTerm = computed(() => normalizeValue(searchQuery.value))

// The search only starts matching when the query is at least 3 characters long
const isSearchActive = computed(() => searchTerm.value.length >= MIN_SEARCH_LENGTH)

// Name of a contact: from the loaded profile, or from the shared profile cache
// (the cache is filled by the ProfilePicture / PubkeyToName child components)
const contactName = (contact) => {
  const profile = contact?.profile
  return profile?.name
      || profile?.display_name
      || profile?.displayName
      || getCachedName(contact?.pubkey)
      || ''
}

// All values of a contact that can be matched by the search query
const searchableValues = (contact) => [
  contactName(contact),
  contact?.profile?.display_name,
  contact?.profile?.nip05,
  contact?.petname,
  contact?.npub,
  contact?.pubkey
]

// Check whether a single contact matches the current search query
const matchesSearch = (contact) => {
  if (!isSearchActive.value) return true
  return searchableValues(contact).some(value => normalizeValue(value).includes(searchTerm.value))
}

// Friends with a loaded profile (the grid)
const filteredVrienden = computed(() => {
  if (!isSearchActive.value) return vrienden.value
  return vrienden.value.filter(matchesSearch)
})

// Contacts without a loaded profile (the 'Pubkeys' section)
const otherContacts = computed(() => rawContactData.value.slice(vrienden.value.length))

const filteredOtherContacts = computed(() => {
  if (!isSearchActive.value) return otherContacts.value
  return otherContacts.value.filter(matchesSearch)
})

// Total number of matches for the current search query
const searchResultCount = computed(() => filteredVrienden.value.length + filteredOtherContacts.value.length)

// Whether the current search query has any match at all
const hasSearchResults = computed(() => searchResultCount.value > 0)

// Clear the search field and show all friends again
const clearSearch = () => {
  searchQuery.value = ''
}

// ---------------------------------------------------------------------------
// Names of the contacts in the 'Pubkeys' section are normally fetched by the
// PubkeyToName component. When the search starts, the missing names are
// fetched in one batch (one filter for all pubkeys) so those contacts can be
// matched by name as well. The results of the batch are stored in the shared
// profile cache, which makes the filter update automatically.
// ---------------------------------------------------------------------------
const loadingSearchNames = ref(false)
const searchNamesLoaded = ref(false)

const loadNamesForOtherContacts = async () => {
  if (searchNamesLoaded.value || loadingSearchNames.value) return

  const missingNames = otherContacts.value.filter(contact => !getCachedProfile(contact.pubkey) && contact.npub)
  if (missingNames.length === 0) {
    searchNamesLoaded.value = true
    return
  }

  loadingSearchNames.value = true
  try {
    await fetchProfiles(missingNames.map(contact => contact.npub))
  } catch (e) {
    console.error('❌ Error loading names for search:', e)
  } finally {
    loadingSearchNames.value = false
    searchNamesLoaded.value = true
  }
}

// Fetch the missing names as soon as a search query is active
watch(isSearchActive, (active) => {
  if (active) {
    loadNamesForOtherContacts()
  }
})

// Enhanced route validation 
definePageMeta({
  validate(route) {
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
  try {
    const decoded = nip19.decode(npub)
    const pubkey = decoded.data
    const profileData = await fetchProfile(pubkey)

    if (profileData) {
      profile.value = {
        ...profileData,
        npub: npub,
        pubkey: pubkey
      }
    }
    loading.value = false
    useSeoMeta({
      title: () => t('profiel_paginas.seo_prefix', [displayName()]),
      description: () => t('profiel_paginas.friends_seo', [displayName()])
    })
    await loadProfileAndFriends(pubkey)
  } catch (e) {
    console.log('Error loading profile:', e)
  }

})

watch(() => route.params.id, (id) => {
  // Reset the search (and its loaded names) when another profile is opened
  clearSearch()
  searchNamesLoaded.value = false
  loadProfileAndFriends(id)
})

// Default SEO
useSeoMeta({
  title: () => `${t('profiel.nav.friends')} - Nyves`,
  description: () => t('profiel_paginas.friends_seo', [displayName()])
})
</script>

<template>
  <div class="mt-3">
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center min-h-64">
      <div class="text-center">
        <LoadingSpinner class="size-12 mx-auto mb-12" />
        <p class="text-gray-600">{{ $t('profiel_paginas.loading') }}</p>
      </div>
    </div>
    <div v-if="profile">
      <ProfielProfileHeader :profile="profile" />

      <!-- Friends list -->
      <div v-if="loadingFriends" class="flex justify-center items-center min-h-64">
        <div class="text-center">
          <LoadingSpinner class="size-12 mx-auto mb-12" />
          <p class="text-gray-600">{{ $t('profiel_paginas.friends_loading', [profile.display_name || profile.name]) }}</p>
        </div>
      </div>
      <div v-else>
        <!-- Empty State -->
        <div v-if="vrienden.length === 0" class="text-center py-12">
          <div class="text-gray-400 mb-4">
            <svg class="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </div>
          <div v-if="rawContactData.length === 0">
            <h4 class="text-lg font-medium text-gray-900 mb-2">
              {{ $t('profiel_paginas.no_contact_list') }}
            </h4>
            <p class="text-gray-600 mb-4">
              {{ $t('profiel_paginas.no_contact_list_text') }}
            </p>
          </div>

          <div v-else>
            <h4 class="text-lg font-medium text-gray-900 mb-2">
              {{ $t('profiel_paginas.contacts_found', [rawContactData.length, vrienden.length]) }}
            </h4>
            <p class="text-gray-600 mb-4">
              {{ $t('profiel_paginas.contacts_loading_rest') }}
            </p>
          </div>
        </div>
        <!-- Content Grid -->
        <div v-else class="space-y-6">
          <!-- Loaded Profiles -->
          <div v-if="vrienden.length > 0" class="border border-gray-200 bg-[#fcfcfc] rounded-sm">
            <h2 class="nyves-bg-gray-header font-bold text-nyves-blue mb-0 p-2">
              {{ $t('profiel.friends.heading', [isSearchActive ? `${searchResultCount} / ${rawContactData.length}` : rawContactData.length]) }}
            </h2>

            <form class="px-2 mb-4" @submit.prevent>
              <label>
                <input
                    v-model="searchQuery"
                    type="search"
                    name="search-friend"
                    class="p-1 bg-white rounded-sm border border-gray-500 text-sm min-w-96"
                    :placeholder="$t('profiel_paginas.friend_search_placeholder')"
                    autocomplete="off"
                    @keydown.esc="clearSearch"
                />
              </label>
              <!-- Search feedback -->
              <p v-if="searchQuery.trim().length > 0 && !isSearchActive" class="text-xs text-gray-500 mt-1">
                {{ $t('profiel_paginas.search_min_chars', [MIN_SEARCH_LENGTH]) }}
              </p>
              <p v-else-if="isSearchActive" class="text-xs text-gray-600 mt-1">
                {{ $t('profiel_paginas.search_results', [searchResultCount, rawContactData.length, searchQuery.trim()]) }}
                <button type="button" class="ml-1 underline cursor-pointer" @click="clearSearch">{{ $t('profiel_paginas.clear_search') }}</button>
                <span v-if="loadingSearchNames" class="ml-1 text-gray-500">· {{ $t('profiel_paginas.search_names_loading') }}</span>
              </p>
            </form>

            <div
                v-if="filteredVrienden.length > 0"
                class="grid grid-cols-3 md:grid-cols-5 gap-1 mb-4 border-b border-b-gray-200 pb-2"
            >
              <div
                  v-for="vriend in filteredVrienden"
                  :key="vriend.npub"
                  class="text-center"
              >
                <NuxtLink :to="localePath({ name: 'profiel-id', params: { id: vriend.npub } })" class="text-xs">
                  <NostrComponentsProfilePicture :pubkey="vriend.pubkey" />
                  <NostrComponentsPubkeyToName :pubkey="vriend.pubkey" />
                </NuxtLink>
              </div>
            </div>

            <!-- No results for the current search query -->
            <div v-if="isSearchActive && !hasSearchResults && !loadingSearchNames" class="text-center py-8 px-2 text-gray-600">
              <p class="font-medium text-gray-900">
                {{ $t('profiel_paginas.search_no_results', [searchQuery.trim()]) }}
              </p>
              <p class="text-sm mt-1">
                <button type="button" class="underline cursor-pointer" @click="clearSearch">{{ $t('profiel_paginas.clear_search') }}</button>
                {{ $t('profiel_paginas.search_clear_hint') }}
              </p>
            </div>

            <template v-if="otherContacts.length > 0">
              <h3 class="text-lg font-semibold text-nyves-blue mb-2 p-2">
                {{ $t('profiel_paginas.pubkeys', [filteredOtherContacts.length]) }}
              </h3>
              <p class="text-center text-sm text-gray-600 bg-yellow-100 p-2 mb-3">
                💡 {{ $t('profiel_paginas.pubkeys_hint') }}
              </p>
              <div class="grid grid-cols-1 md:grid-cols-5 gap-2 p-2">
                <div
                    v-for="contact in filteredOtherContacts"
                    :key="contact.npub"
                    class="flex items-center justify-between p-2 bg-white rounded border text-sm"
                >
                  <div class="flex-1 min-w-0 text-xs">
                    <NostrComponentsPubkeyToName :pubkey="contact.pubkey" />
                  </div>

                  <NuxtLink
                      :to="localePath({ name: 'profiel-id', params: { id: contact.npub } })"
                      class="text-nyves-blue hover:text-nyves-blue/80 text-xs underline"
                  >
                    {{ $t('profiel_paginas.view') }}
                  </NuxtLink>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-if="error" class="flex justify-center items-center min-h-64">
      <div class="text-center">
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {{ error }}
        </div>
        <NuxtLink
            :to="localePath({ name: 'profiel-id', params: { id: npub } })"
            class="text-nyves-blue hover:text-nyves-blue/80 underline"
        >
          ← {{ $t('profiel_paginas.back_to_profile') }}
        </NuxtLink>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>