<script setup>
import { nip19 } from 'nostr-tools'

const { fetchProfileByPubkey } = useNostrProfile()
const { pool, queryRelays, closeRelays } = useSharedRelayPool()

const loading = ref(true)
const profiles = ref([])

const props = defineProps({
  filters: {
    type: Object,
    required: true
  },
  limit: {
    type: Number,
    required: true
  }
})

onMounted(async () => {
  try {
    const filter = {
      authors: [],
    };
    if (props.filters.authors) {
      // Loop over each author in filters.authors
      for (const author of props.filters.authors) {
        const pub_hex = nip19.decode(author)
        filter.authors.push(pub_hex.data);
        const profile = await fetchProfileByPubkey(pub_hex.data)
        profiles.value.push(profile)
      }
    }
    if (profiles.value.length > 0) {
      loading.value = false;
    }
    //
    // const relays = ['wss://relay.ditto.pub', 'wss://rely.nyves.nl']
    // const filter = {
    //   authors: [],
    //   kinds: [16767],
    //   limit: props.limit
    // }
    // if (props.filters.authors) {
    //   // Loop over each author in filters.authors
    //   props.filters.authors.forEach((author) => {
    //     const pub_hex = nip19.decode(author)
    //     filter.authors.push(pub_hex.data);
    //   });
    // }
    // const events = await queryRelays(relays, filter)
    // if (events.length > 0) {
    //   events.forEach((event, index) => {
    //     if (
    //         event.tags[2] && event.tags[2][0] === 'c'
    //     ) {
    //       profiles.value.push({
    //         'background': event.tags[0][0] === 'c' ? event.tags[0][1] : '',
    //         'text': event.tags[1][0] === 'c' ? event.tags[1][1] : '',
    //         'primary': event.tags[2][0] === 'c' ? event.tags[2][1] : '',
    //         'pubkey': event.pubkey,
    //         'npub': nip19.npubEncode(event.pubkey)
    //       })
    //     }
    //   })
    //   loading.value = false
    // } else {
    //   loading.value = false
    // }
  } catch (e) {
    console.log(e)
    loading.value = false
  }
})

onUnmounted(() => {

})
</script>

<template>
  <div v-if="loading">
    <LoadingSpinner class="mx-auto my-24" />
  </div>
  <div v-else class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 items-center">
    <div
        v-for="(profile, index) in profiles"
    >
      <div
          :style="`background-color: ${profile.background}; color: ${profile.text}`"
          class="w-full aspect-square grid content-center">
        <NuxtLink :to="`/profiel/${profile.npub}`" class="border-3 rounded-sm mx-auto transform hover:-translate-y-0.5 transition-all duration-200" :style="`color: ${profile.primary} !important`">
          <NostrComponentsProfilePicture :pubkey="profile.pubkey" />
        </NuxtLink>
        <NuxtLink :to="`/profiel/${profile.npub}`" class="text-sm mx-auto" :style="`color: ${profile.primary} !important`">
          <NostrComponentsPubkeyToName :pubkey="profile.pubkey" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>