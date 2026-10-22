<script setup>
import { nip19 } from 'nostr-tools'

const route = useRoute()
const { fetchProfile } = useNostrProfile()

const npub = route.params.id
const loading = ref(true)
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
    loading.value = false
    useSeoMeta({
      title: `WieWatWaars van ${profile.value.display_name || profile.value.name || 'WieWatWaars'} - Nyves`,
      description: `Alle WieWatWaar berichten van het profiel van ${profile.value.display_name || profile.value.name} op Nyves`
    })
    // TODO Fetch event kinds 1s
  } catch (e) {
    console.error(e)
  }
})

onUnmounted(() => {

})

// Default SEO
useSeoMeta({
  title: 'WieWatWaars - Nyves',
  description: 'WieWatWaars profiel pagina'
})
</script>

<template>
  <div class="mt-3">
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center min-h-64">
      <div class="text-center">
        <LoadingSpinner class="size-12 mx-auto mb-12" />
        <p class="text-gray-600">Een moment geduld...</p>
      </div>
    </div>
    <div v-if="profile">
      <ProfielProfileHeader :profile="profile" />
      <section class="border border-gray-200 bg-[#fcfcfc] rounded-sm">
        <h2 class="nyves-bg-gray-header font-bold text-nyves-blue mb-0 p-2">
          WieWatWaar
        </h2>
        <ProfielWieWatWaars :profile="profile" :filters="{}" />
      </section>
    </div>
  </div>
</template>

<style scoped>

</style>