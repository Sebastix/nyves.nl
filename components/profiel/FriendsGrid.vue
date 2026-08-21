<script setup>
import { nip19 } from 'nostr-tools'
import LoadingSpinner from '../LoadingSpinner.vue';

const { queryRelays } = useSharedRelayPool()

const contactListEvent = ref(null)
const contactsData = ref([])
const loading = ref(true)
const error = ref(null)

const props = defineProps({
  profile: {
    type: Object,
    required: true
  }
})

const fetchContactList = async (pubkey) => {
  loading.value = true
  error.value = null
  try {
    // todo - get read relay from this pubkey
    const relays = [
      'wss://relay.damus.io',
      'wss://nos.lol',
      'wss://relay.snort.social',
      'wss://relay.primal.net'
    ]

    const filter = {
      kinds: [3], // Kind 3 = Contact List
      authors: [pubkey],
      limit: 3 // Get recent contact lists
    }

    const events = await queryRelays(relays, filter)

    if (events.length > 0) {
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
          name: tag[3] || null // optional name
        }))
      // Random sort list of contacts
      contactsData.value = contacts
          .map(value => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value)
      //contactsData.value = contacts
      loading.value = false
    } else {
      console.log('No Kind 3 contact list found for this profile')
      contactsData.value = []
      loading.value = false
    }

  } catch (e) {
    console.error('Error fetching contact list:', error)
    throw error
  }
}

onMounted(async () => {
  await fetchContactList(props.profile.pubkey)
})
</script>

<template>
  <div class="border border-gray-200 bg-[#fcfcfc] rounded-sm">
    <!-- Friends Section -->
    <h3 class="nyves-bg-gray-header h-10 font-bold text-nyves-blue mb-2 p-2">
      <NuxtLink :to="`/profiel/${profile.npub}/vrienden`">
        Vrienden ({{ contactsData.length }})
      </NuxtLink>
    </h3>
    <!-- Loading State -->
    <div v-if="loading">
      <div class="text-center">
        <LoadingSpinner class="mx-auto my-16" />
      </div>
    </div>
    <div v-else class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-3 gap-1 mb-4">
      <template v-for="(contact, index) in contactsData" :key="contact.id">
        <div v-if="index < 9" class="text-center">
          <NuxtLink :to="`/profiel/${contact.npub}`" class="text-xs">
            <NostrComponentsProfilePicture :pubkey="contact.pubkey" />
            <NostrComponentsPubkeyToName :pubkey="contact.pubkey" />
          </NuxtLink>
        </div>
      </template>
    </div>
    <div class="my-1">
      <NuxtLink :to="`/profiel/${profile.npub}/vrienden`" class="text-xs mx-2">› Bekijk alle vrienden</NuxtLink>
    </div>
  </div>
</template>
