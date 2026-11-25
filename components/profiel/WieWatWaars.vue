<script setup>
const localePath = useLocalePath()
import { nip19 } from 'nostr-tools';

const { queryRelays } = useSharedRelayPool()
const { formatDate, formatTime } = useDateHelpers()

const loading = ref(true)
const wwwData = ref([])

const props = defineProps({
  profile: {
    type: Object,
    required: true
  },
  filters: {
    type: Object,
    required: false
  }
})

const fetchWWWs = async (pubkey) => {
  const relays = [
    'wss://relay.damus.io',
    'wss://nos.lol',
    'wss://relay.primal.net',
    'wss://relay.ditto.pub'
  ]
  const filter = {
    kinds: [1],
    authors: [pubkey],
    limit: props.filters?.limit || 200
  }
  const events = await queryRelays(relays, filter)
  // Filter out replies (events with e-tags that reference root events)
  const filteredEvents = events.filter(event => {
    // Check if event has any e-tags
    const eTags = event.tags.filter(tag => tag[0] === 'e')

    // If no e-tags, it's not a reply
    if (eTags.length === 0) return true

    // If it has e-tags, check if any of them are root references
    // A reply typically has e-tags with markers like 'root' or 'reply'
    // or follows the positional format where first e-tag is root
    const hasRootReference = eTags.some(tag => {
      // Check for explicit 'root' marker in 4th position
      if (tag[3] === 'root') return true

      // Check for 'reply' marker - if there's a reply marker,
      // there should also be a root reference
      const hasReplyMarker = eTags.some(t => t[3] === 'reply')
      if (hasReplyMarker) return true

      // For older clients without markers, if there are multiple e-tags,
      // the first one is typically the root
      if (eTags.length > 1 && eTags[0] === tag) return true

      return false
    })

    // Return false if it has root references (is a reply)
    return !hasRootReference
  })
  wwwData.value = filteredEvents
  loading.value = false
}

onMounted(async () => {
  try {
    await fetchWWWs(props.profile.pubkey)
  } catch (e) {
    loading.value = false
    console.error(e)
  }
})

onUnmounted(async () => {

})

</script>

<template>
  <div v-if="loading" class="flex justify-center items-center min-h-64">
    <LoadingSpinner class="size-12 mx-auto mb-12" />
  </div>
  <p v-else-if="wwwData.length === 0" class="p-2 text-sm">
    {{ $t('common.no_items') }}
  </p>
  <div v-else class="grid grid-cols-1 md:grid-cols-{{props.filters?.cols || 3}} gap-2 px-2 www">
    <div v-for="item in wwwData" :key="item.id">
      <div class="flex gap-2 border-b border-gray-200">
        <div class="text-xs min-w-[48px] max-w-[72px]">
          <NuxtLink :to="localePath('profiel-id', { id: nip19.npubEncode(item.pubkey) })">
            <NostrComponentsProfilePicture :pubkey="item.pubkey" class="max-w-[48px]" />
            <NostrComponentsPubkeyToName :pubkey="item.pubkey" />
          </NuxtLink>
        </div>
        <div>
          <NostrComponentsNoteContent :event="item" class="text-base/6! lg:text-sm/6! font-relaxed tracking-tight content" />
          <p class="text-gray-500 font-light mb-2 text-sm">
            {{ formatDate(item.created_at) }}, {{ formatTime(item.created_at) }} <NuxtLink to="">{{ $t('profiel.www.replies', [0]) }} {{ $t('profiel.www.reply') }}</NuxtLink>
            <br />
            <svg class="size-3 inline-block align-middle mx-1 fill-nyves-blue" fill="#000000" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
              <path d="M1915.918 737.475c-10.955-33.543-42.014-56.131-77.364-56.131h-612.029l-189.063-582.1v-.112C1026.394 65.588 995.335 43 959.984 43c-35.237 0-66.41 22.588-77.365 56.245L693.443 681.344H81.415c-35.35 0-66.41 22.588-77.365 56.131-10.955 33.544.79 70.137 29.478 91.03l495.247 359.831-189.177 582.212c-10.955 33.657 1.13 70.25 29.817 90.918 14.23 10.278 30.946 15.487 47.66 15.487 16.716 0 33.432-5.21 47.775-15.6l495.134-359.718 495.021 359.718c28.574 20.781 67.087 20.781 95.662.113 28.687-20.668 40.658-57.261 29.703-91.03l-189.176-582.1 495.36-359.83c28.574-20.894 40.433-57.487 29.364-91.03" fill-rule="evenodd"/>
            </svg> {{ $t('profiel.www.respect', [0]) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>