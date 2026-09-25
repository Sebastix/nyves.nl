<script setup>
useSeoMeta({
  title: `Blog - Nyves`,
  description: `Diverse artikelen rondom Nyves`
})
</script>

<template>
  <section class="leading-relaxed">
    <h1 class="text-3xl text-nyves-blue my-3 text-center font-bold">Blog</h1>
    <p class="text-center text-xl mb-6">
      Diverse artikelen rondom Nyves
    </p>
  </section>
  <section class="border border-gray-200 bg-[#fcfcfc] rounded-sm mb-8">
    <div class="h-[44px] nyves-bg-gray-header"></div>
    <NostrComponentsArticles
        author-filter="npub1nyves8d4m86ewyaaw9cxjgfvx2sek40j9q99recvf8zmw0drq6usjh9nc9"
        tag-filter=""
        :show-author="false"
        :show-topics="false"
        :limit="30"
        grid-cols="grid-cols-2 lg:grid-cols-3"
    />
  </section>
  <section class="max-w-2xl mx-auto">
    <p>
      Overige artikelen:
      <ul class="list-disc list-inside my-4">
        <li><NuxtLink to="/blog/verschil-tussen-nyves-en-hyves" class="nyves-btn nyves-btn-primary">Wat is het verschil tussen Nyves en Hyves?</NuxtLink></li>
      </ul>
    </p>
  </section>
</template>