<script setup>
useSeoMeta({
  title: `Blog`,
  description: ``
})
</script>

<template>
  <section class="leading-relaxed">
    <h1 class="text-3xl text-nyves-blue my-3 text-center font-bold">Blog</h1>
  </section>
  <section class="border border-gray-200 bg-[#fcfcfc] rounded-sm mb-8">
    <div class="h-[44px] nyves-bg-gray-header"></div>
    <NostrComponentsArticles
        author-filter="npub1nyves8d4m86ewyaaw9cxjgfvx2sek40j9q99recvf8zmw0drq6usjh9nc9"
        tag-filter=""
        :show-author="true"
        :show-topics="false"
        :limit="10"
        grid-cols="md:grid-cols-2 xl:grid-cols-3"
    />
  </section>
</template>