<script setup>
const { queryRelays } = useSharedRelayPool()

const loading = ref(true)
const mediaData = ref([])
const { openModal } = useModal();

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
    'wss://relay.primal.net',
    'wss://relay.divine.video'
  ]
  const filter = {
    kinds: [20, 21, 34236], // Kind 20 = picture, kind 21 = video (NIP-68)
    // todo - add NIP-71 with kinds 21, 22, 34235 and 34236
    authors: [pubkey],
    limit: 25
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
  <!-- Foto's & Video's Section -->
  <div class="border border-gray-200 bg-[#fcfcfc] rounded-sm mb-3">
    <h3 class="nyves-bg-gray-header p-2 text-nyves-blue font-bold flex justify-between">
      <span>Foto's & video's</span>
      <NuxtLink to="#gespot" class="text-xs/5 font-normal">Gespot! ({{ nyvesProfile.spots }})</NuxtLink>
    </h3>
    <div v-if="loading">
      <LoadingSpinner class="size-12 mx-auto my-12" />
    </div>
    <p class="p-2 text-sm" v-else-if="!mediaData.length">
      Geen items gevonden
    </p>
    <div v-else class="grid grid-cols-3 md:grid-cols-5 justify-center gap-1 p-2 text-xs text-black">
      <template v-for="item in mediaData" :key="item.id">
        <template v-if="item.tags" v-for="(tag, key) in item.tags" :key="tag[0]">
          <template v-if="tag[0] === 'imeta'">
            <video v-if="item.tags[key][2].split(' ')[1] === 'video/mp4'" controls muted loop>
              <source :src="`${item.tags[key][1].split(' ')[1]}`" type="video/mp4" />
              <img :src="`${item.tags[key][3].split(' ')[1]}`" :alt="`${item.content}`" />
            </video>
            <NuxtLink v-else @click="openModal('media', item.tags[key][1].split(' ')[1])">
              <img :src="`${item.tags[key][1].split(' ')[1]}`" class="bg-gray-200 border border-gray-300 hover:border-gray-600 transition-border duration-150 shadow-md/5" :alt="`${item.content}`" />
            </NuxtLink>
          </template>
        </template>
      </template>
    </div>
    <div class="my-1">
      <NuxtLink :to="`${profile.npub}/media`" class="text-xs mx-2">› Bekijk alle foto's en video's</NuxtLink>
    </div>
  </div>
</template>

<style scoped>

</style>