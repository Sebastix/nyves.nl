<script setup>
import { nip19 } from 'nostr-tools'

const route = useRoute()
const { fetchProfile } = useNostrProfile()

// Get npub/id from route params - in [id] folder structure, the param is named 'id'
const npub = route.params.id
const profile = ref(null)

onMounted(async () => {
  try {
    // Decode npub to get hex pubkey
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
    // Load events of NIP-68 and NIP-71
  } catch (e) {
    console.error(e)
  }
})
</script>

<template>
  <div class="mt-3">
    <div class="mb-6" v-if="profile">
      <NuxtLink
          :to="`/profiel/${npub}`"
          class="hover:text-nyves-blue"
      >
        {{ profile.name || profile.display_name || '...' }}
      </NuxtLink>
      <h1 class="text-3xl font-bold text-gray-900 mb-2">
        Meer over {{ profile.name || profile.display_name || '...' }}
      </h1>
    </div>
  </div>
</template>

<style scoped>

</style>