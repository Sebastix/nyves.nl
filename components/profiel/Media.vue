<script setup>
const { queryRelays } = useSharedRelayPool()

const loading = ref(true)
const mediaData = ref([])

const props = defineProps({
  profile: {
    type: Object,
    required: true
  },
  nyvesProfile: {
    type: Object,
    required: true
  }
})

const fetchMedia = async (pubkey) => {
  // todo - get read relay from this pubkey
  const relays = [
    'wss://relay.damus.io',
    'wss://nos.lol',
    'wss://relay.snort.social',
    'wss://relay.primal.net'
  ]
  const filter = {
    kinds: [20], // Kind 20 = picture (NIP-68)
    // todo - add NIP-71 with kinds 21, 22, 34235 and 34236
    authors: [pubkey],
    limit: 20
  }
  const events = await queryRelays(relays, filter)
  if (events.length > 0) {
    mediaData.value = events
    loading.value = false
  } else {
    console.log('No kind 20 events found for this profile')
    loading.value = false
  }
}

onMounted(async () => {
  try {
    await fetchMedia(props.profile.pubkey)
  } catch (e) {
    loading.value = false
    console.error(e)
  }
})

onUnmounted(async () => {

})
</script>

<template>
  <!-- Foto's & Video's Section -->
  <div class="border border-gray-200 bg-[#fcfcfc] rounded-sm mb-3">
    <h3 class="nyves-bg-gray-header p-2 text-nyves-blue font-bold flex justify-between">
      <span>Foto's & video's</span>
      <NuxtLink to="#gespot" class="text-xs/5 font-normal">Gespot! ({{ nyvesProfile.spots }})</NuxtLink>
    </h3>
    <div v-if="loading">
      <div class="animate-spin rounded-full size-16 border-b-2 border-nyves-blue mx-auto my-16"></div>
    </div>
    <p class="p-2 text-sm" v-else-if="!mediaData.length">
      Geen items gevonden
    </p>
    <div v-else class="grid grid-cols-4 lg:grid-cols-5 gap-2 p-2 text-xs text-black">
      <div v-for="item in mediaData" :key="item.id">
        <NuxtLink :to="`${item.tags[0][1].split(' ')[1]}`" target="_blank">
          <img :src="`${item.tags[0][1].split(' ')[1]}`" class="bg-gray-200 border border-gray-300 hover:border-gray-600 transition-border duration-150 shadow-md/5" :alt="`${item.content}`" />
        </NuxtLink>
      </div>
    </div>
    <div class="my-1">
      <NuxtLink :to="`${profile.npub}/media`" class="text-xs mx-2">› Bekijk alle foto's en video's</NuxtLink>
    </div>
  </div>
</template>

<style scoped>

</style>