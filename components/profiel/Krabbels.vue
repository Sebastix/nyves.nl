<script setup>
import { nip19 } from 'nostr-tools'
const { queryRelays } = useSharedRelayPool()

const { formatDate, getDateObject } = useDateHelpers()

const loading = ref(true)
const krabbelsData = ref([])

const props = defineProps({
  profile: {
    type: Object,
    required: true
  },
})

const fetchKrabbels = async (pubkey) => {
  const relays = [
    'wss://relay.ditto.pub'
  ]
  const filter = {
    kinds: [1111], // Kind 1111 (NIP-22)
    '#P': [pubkey], // Reference to profile pubkey
    '#K': ['0'],    // Reference to kind 0 event
    '#p': [pubkey],
    '#k': ['0'],
    limit: 10
  }
  const events = await queryRelays(relays, filter)
  if (events.length > 0) {
    console.log(events)
    krabbelsData.value = events
    loading.value = false
  }
  else {
    console.log('No kind 1111 events found for this profile')
    loading.value = false
  }
}

const render = (content) => {

}

onMounted(async () => {
  try {
    await fetchKrabbels(props.profile.pubkey)
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
  <p v-else-if="krabbelsData.length === 0" class="p-2 text-sm">
    Geen items gevonden
  </p>
  <div v-else v-for="krabbel in krabbelsData" :key="krabbel.id" class="border-b border-gray-200 p-2">
    <div class="flex gap-2">
      <div>
        <NuxtLink :to="`/profiel/${nip19.npubEncode(krabbel.pubkey)}`">
          <NostrComponentsProfilePicture :pubkey="krabbel.pubkey" class="!size-12" />
        </NuxtLink>
      </div>
      <div>
        <NuxtLink :to="`/profiel/${nip19.npubEncode(krabbel.pubkey)}`">
          <NostrComponentsPubkeyToName :pubkey="krabbel.pubkey" class="font-bold text-xs" />
        </NuxtLink>
        <NostrComponentsNoteContent :event="krabbel" />
        <div class="text-xs text-[#a9a9a9]">
          {{ formatDate(krabbel.created_at) }} {{ getDateObject(krabbel.created_at).getHours() }}:{{ getDateObject(krabbel.created_at).getMinutes() }} <NuxtLink to="#">Reageer</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>