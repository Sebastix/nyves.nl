<script setup>
// Hero component voor Nyves homepage
</script>

<template>
  <section class="text-center py-12 px-4">
    <!-- Logo -->
    <div class="mb-8">
      <img 
        src="~/assets/nyves-logo.png" 
        alt="Nyves Logo" 
        class="mx-auto size-64 rounded-2xl shadow-2xl/30"
      />
    </div>

    <!-- Hero Content -->
    <div class="max-w-3xl mx-auto">
      <!-- Hoofdtitel -->
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        Welkom bij <span class="text-nyves-orange">Nyves</span>
      </h1>

      <!-- Beschrijving -->
      <div class="space-y-4 text-lg md:text-xl text-gray-600 leading-relaxed">

        <p class="text-2xl">
          Breng jouw Hyves profiel terug tot leven.
        </p>
        
        <p class="text-gray-500 text-base">
          Dankzij <strong class="text-nyves-blue-purple">Nostr</strong>. Dit is een open en simpel protocol waarmee data gedistribueerd wordt via <strong class="text-nyves-blue-purple">relays</strong>.
          <br />
          Ieder profiel heeft dankzij <strong class="text-nyves-blue-purple">cryptografisch gesigneerde content</strong> alle macht. Iedereen kan verifiëren wat ieders content is.
        </p>
        <p>
          Nyves is dus geen platform.
        </p>
      </div>

      <!-- Call to Action buttons -->
      <div class="mt-8 flex flex-row justify-center gap-4">
        <NuxtLink 
          to="/zoek" 
          class="inline-flex items-center px-8 py-3 bg-nyves-orange hover:bg-nyves-orange/90 text-white! font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Zoek Profielen
        </NuxtLink>
        <NuxtLink to="/profiel/npub1qe3e5wrvnsgpggtkytxteaqfprz0rgxr8c3l34kk3a9t7e2l3acslezefe" class="text-base/10">
          of bekijk dit voorbeeld
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>