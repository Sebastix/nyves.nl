<script setup>
useSeoMeta({
  title: `Blog`,
  description: ``
})
</script>

<template>
  <NostrComponentsArticles
      author-filter="npub1nyves8d4m86ewyaaw9cxjgfvx2sek40j9q99recvf8zmw0drq6usjh9nc9"
      tag-filter=""
      :show-author="true"
      :show-topics="false"
      :limit="10"
      grid-cols="md:grid-cols-2 xl:grid-cols-3"
  />
</template>