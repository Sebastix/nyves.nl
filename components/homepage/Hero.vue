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
        {{ $t('welkom_bij') }} <span class="text-nyves-orange">Nyves</span>
      </h1>

      <!-- Beschrijving -->
      <div class="space-y-4 text-lg md:text-xl text-gray-600 leading-relaxed">

        <p class="text-2xl">
          {{ $t('bring_back_your_hyves_profile') }}
        </p>

        <i18n-t keypath="hero_intro" tag="p" class="text-gray-500 text-base">
          <strong class="text-nyves-blue-purple">{{ $t('Nostr') }}</strong>
          <strong class="text-nyves-blue-purple">{{ $t('relays') }}</strong>
          <strong class="text-nyves-blue-purple">{{ $t('cryptografisch gesigneerde content') }}</strong>
        </i18n-t>

        <p>
          {{ $t('nyves_is_not_a_platform')}}
        </p>
      </div>

      <!-- Call to Action buttons -->
      <div class="mt-8 flex flex-row justify-center gap-4">
        <NuxtLink 
          to="/zoek" 
          class="inline-flex items-center px-8 py-3 bg-nyves-orange text-white! font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {{ $t('zoek_profielen_btn') }}
        </NuxtLink>
        <NuxtLink to="/profiel/npub1qe3e5wrvnsgpggtkytxteaqfprz0rgxr8c3l34kk3a9t7e2l3acslezefe" class="text-base/10">
          {{ $t('of_bekijk_dit_voorbeeld') }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>