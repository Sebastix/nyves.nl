<script setup>
const { t } = useI18n()

useSeoMeta({
  title: () => `${t('nostr.search_title')} - Nyves`,
  description: () => t('nostr.search_seo_description')
})
</script>

<template>
  <section class="leading-relaxed max-w-2xl mx-auto">
    <h1 class="text-3xl text-nyves-blue my-3 text-center font-bold">Search</h1>
    <p class="text-center text-xl mb-12">
      Finding active profiles within the Nostr network
    </p>
    <p>
      https://vertexlab.io/docs/endpoints/search-profiles/
    </p>
  </section>
</template>

<style scoped>

</style>