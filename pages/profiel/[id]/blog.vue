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
      title: `Blog van ${profile.value.display_name || profile.value.name || 'Blog'} - Nyves`,
      description: `Blog artikelen van het profiel van ${profile.value.display_name || profile.value.name} op Nyves`
    })
  } catch (e) {
    console.error(e)
  }
})

onUnmounted(() => {

})

// Default SEO
useSeoMeta({
  title: 'Blog - Nyves',
  description: 'Blog profiel pagina'
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
          Blog artikelen van {{ profile.name || profile.display_name || '...' }}
        </h2>
        <ProfielBlog :profile="profile" />
      </section>
    </div>
  </div>
</template>

<style scoped>

</style>