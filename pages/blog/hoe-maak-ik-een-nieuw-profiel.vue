<script setup>
const { t } = useI18n()

useSeoMeta({
  title: () => `${t('blog_article.static.create_new_profile.title')} - Nyves`,
  description: () => t('blog_article.static.create_new_profile.title')
})
</script>

<template>
  <section class="leading-relaxed max-w-2xl mx-auto">
    <h1 class="text-3xl text-nyves-blue my-3 text-center font-bold">{{ $t('blog_article.static.create_new_profile.title') }}</h1>
    <p>
      With https://ditto.pub.
    </p>
  </section>
</template>

<style scoped>

</style>