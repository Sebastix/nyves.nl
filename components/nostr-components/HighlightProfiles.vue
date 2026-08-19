<script setup>
import { nip19 } from 'nostr-tools'

const { pool, queryRelays, closeRelays } = useSharedRelayPool()

const loading = ref(true)
const profiles = ref([])

const props = defineProps({
  filters: {
    type: Array,
    required: true
  },
  limit: {
    type: Number,
    required: true
  }
})

onMounted(async () => {
  try {
    const relays = ['wss://relay.ditto.pub', 'wss://rely.nyves.nl']
    const filter = {
      kinds: [16767],
      limit: props.limit
    }
    const events = await queryRelays(relays, filter)
    if (events.length > 0) {
      events.forEach((event, index) => {
        if (
            event.tags[2] && event.tags[2][0] === 'c'
        ) {
          profiles.value.push({
            'background': event.tags[0][0] === 'c' ? event.tags[0][1] : '',
            'text': event.tags[1][0] === 'c' ? event.tags[1][1] : '',
            'primary': event.tags[2][0] === 'c' ? event.tags[2][1] : '',
            'pubkey': event.pubkey,
            'npub': nip19.npubEncode(event.pubkey)
          })
        }
      })
      loading.value = false
    } else {
      loading.value = false
    }
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
    <div class="animate-spin rounded-full size-8 border-b-2 border-nyves-blue inline-block mt-8"></div>
  </div>
  <div v-else class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 items-center">
    <div
        v-for="(profile, index) in profiles"
    >
      <div
          :style="`background-color: ${profile.background}; color: ${profile.text}`"
          class="w-full aspect-square grid content-center">
        <NuxtLink :to="`/profiel/${profile.npub}`" class="border-3 rounded-sm mx-auto" :style="`color: ${profile.primary} !important`">
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