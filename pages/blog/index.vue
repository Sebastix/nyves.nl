<script setup>
useSeoMeta({
  title: `Blog`,
  description: ``
})
</script>

<template>
  <NostrComponentsArticles
      :tag-filter="['nyves']"
      :show-author="true"
      :show-topics="false"
      :limit="10"
      grid-cols="md:grid-cols-2 xl:grid-cols-3"
  />
</template>