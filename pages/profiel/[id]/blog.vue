<script setup>
import { nip19 } from 'nostr-tools'

const route = useRoute()
const { t } = useI18n()
const { fetchProfile } = useNostrProfile()

const npub = route.params.id
const loading = ref(true)
const profile = ref(null)

// Name to show in the title/description, with a localized fallback
const displayName = () => profile.value?.display_name
  || profile.value?.name
  || t('profiel_paginas.index_fallback')

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
      title: () => t('profiel_paginas.seo_prefix', [displayName()]),
      description: () => t('profiel_paginas.blog_seo', [displayName()])
    })
  } catch (e) {
    console.error(e)
  }
})

onUnmounted(() => {

})


// Default SEO
useSeoMeta({
  title: () => `${t('profiel.nav.blog')} - Nyves`,
  description: () => t('profiel_paginas.blog_seo', [displayName()])
})
</script>

<template>
  <div class="mt-3">
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center min-h-64">
      <div class="text-center">
        <LoadingSpinner class="size-12 mx-auto mb-12" />
        <p class="text-gray-600">{{ $t('profiel_paginas.loading') }}</p>
      </div>
    </div>
    <div v-if="profile">
      <ProfielProfileHeader :profile="profile" />
      <section class="border border-gray-200 bg-[#fcfcfc] rounded-sm">
        <h2 class="nyves-bg-gray-header font-bold text-nyves-blue mb-0 p-2">
          {{ $t('profiel_paginas.blog_page_heading', [profile.name || profile.display_name || '...']) }}
        </h2>
        <ProfielBlog :profile="profile" />
      </section>
    </div>
  </div>
</template>

<style scoped>

</style>