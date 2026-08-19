<script setup>
</script>
<template>
  <section class="mb-8">
    <div class="border border-gray-200 bg-[#fcfcfc] rounded-sm overflow-hidden">
      <div class="h-[44px] nyves-bg-gray-header"></div>
      <div class="grid md:grid-cols-2 gap-8 items-center px-8 pb-[44px]">
        <div>
          <img src="~/assets/IAE_LOGO_FULL_BLACK.webp" class="max-w-xs" alt="Internet Archive Europe" />
          <img src="~/assets/Wayback_Machine_logo_2010.svg" class="max-w-xs" alt="Wayback Machine "/>
        </div>
        <div>
          <p class="text-gray-600 leading-relaxed">
            Op dit moment gebruiken we de publiek beschikbare data van Hyves profielen die door de Archive Team zijn verzameld.
            Deze data is de bron voor alle content die we overzetten naar zogenaamde nostr events. Deze events kunnen worden vervolgens worden opgehaald vanaf verschillende relays. Dit is wat de applicatie op Nyves.nl momenteel doet.
          </p>
          <a href="https://wiki.archiveteam.org/index.php/Hyves" target="_blank" class="inline-flex items-center mt-2">
            https://wiki.archiveteam.org/index.php/Hyves
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>