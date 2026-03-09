<script setup>
import { Shader, SimplexNoise } from 'shaders/vue'

</script>

<template>
  <div>
    <header>

    </header>
    <main class="text-center p-20 bg-purple-200">
      <img src="~/assets/nuxtstack-cover.png" class="rounded-4xl mx-auto mb-20 shadow-2xl" alt="Nuxstack "/>
      <h1 class="text-4xl font-bold mb-20">Welcome to Nuxtstack</h1>
      <Shader class="h-64 overflow-hidden rounded-4xl">
        <SimplexNoise colorA="#3c0366" colorB="#a477fd" scale="1.5" balance="0.8" contrast="0.5" speed="0.25" />
      </Shader>
      <hr class="my-20 border-white" />
      <NostrComponentsArticles
          :tag-filter="['nostr']"
          :show-author="true"
          :show-topics="false"
          :limit="10"
          grid-cols="md:grid-cols-2 xl:grid-cols-3"
      />
    </main>
    <Footer />
  </div>
</template>