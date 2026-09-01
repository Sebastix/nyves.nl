<script setup>
import { nip19 } from 'nostr-tools'
const { queryRelays } = useSharedRelayPool()

const loading = ref(true)
const blogsData = ref([])

const { formatDate, formatTime } = useDateHelpers()

const props = defineProps({
  profile: {
    type: Object,
    required: true
  },
})

const fetchBlogs = async (pubkey) => {
  const relays = [
    'wss://relay.damus.io',
    'wss://nos.lol',
    'wss://relay.primal.net',
    'wss://relay.ditto.pub'
  ]
  const filter = {
    kinds: [30023], // Kind 30023 (NIP-23)
    authors: [pubkey],
    limit: 10
  }
  const events = await queryRelays(relays, filter)
  if (events.length > 0) {
    blogsData.value = events
    loading.value = false
  }
  else {
    console.log('No kind 30023 events found for this profile')
    loading.value = false
  }
}

onMounted(async () => {
  try {
    await fetchBlogs(props.profile.pubkey)
    // todo - add a composeable to fetch media from notes (event kind 1s)
  } catch (e) {
    loading.value = false
    console.error(e)
  }
})

onUnmounted(async () => {

})
</script>

<template>
  <div v-if="loading">
    <LoadingSpinner class="size-12 mx-auto my-12" />
  </div>
  <p v-else-if="blogsData.length === 0" class="p-2 text-sm">
    Geen items gevonden
  </p>
  <div v-else class="flex px-2" v-for="item in blogsData" :key="item.id">
    <template v-if="item.tags" v-for="(tag, key) in item.tags" :key="tag[0]">
      <h4 v-if="tag[0] === 'title'" class="mb-2">
        <!-- @todo generate nevent or naddr identifier voor de link hier -->
        <NuxtLink :to="`https://nostrver.se/e/${nip19.neventEncode(item)}`" target="_blank">
          {{ item.tags[key][1] }}<svg class="size-3 inline align-baseline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </NuxtLink>
        <br />
        <small>{{ formatDate(item.created_at) }}, {{ formatTime(item.created_at) }}</small>
      </h4>
    </template>
  </div>
</template>

<style scoped>

</style>