<script setup>
// SIDNfonds support component voor Nyves homepage
</script>

<template>
  <section class="mb-8">
    <div class="max-w-5xl mx-auto">
      <!-- Quote sectie -->
      <div>
        <blockquote class="text-xl text-gray-700 italic font-light max-w-3xl mx-auto">
          "Het project ‘Nyves’ heeft als doel om oude Hyves-profielen opnieuw tot leven te brengen met een moderne, open
          webapplicatie gebaseerd op het Nostr-protocol. Gebruikers kunnen hun opgeslagen Hyves-data eenvoudig heractiveren,
          delen en doorzoeken. Nyves behoudt digitaal erfgoed, versterkt data-autonomie en toont hoe open protocollen het sociale
          web toekomstbestendig maken. Het sluit hiermee aan bij doelstelling 1 van SIDN fonds: Sterk internet."
        </blockquote>
        <div class="max-w-3xl mx-auto my-4 text-gray-500 text-right">
          - SIDNfonds over Nyves
        </div>
      </div>

      <!-- Main Content -->
      <div class="border border-gray-200 bg-[#fcfcfc] rounded-sm overflow-hidden">
        <div class="h-[44px] nyves-bg-gray-header"></div>
        <div class="grid md:grid-cols-2 gap-8 items-center px-12 pb-[44px]">
          <!-- Logo Sectie -->
          <div class="text-center md:text-left">
            <img 
              src="/sidnfinds-logo.svg"
              alt="SIDNfonds Logo" 
              class="w-48 md:w-74 mx-auto md:mx-0 mb-6"
            />
            
            <!-- Badge -->
            <div class="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 text-lg font-medium rounded-full mb-4">
              <svg class="size-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              Pioniersproject
            </div>
          </div>

          <!-- Content Sectie -->
          <div>
            <div class="space-y-4 text-gray-600 leading-relaxed">
              <p>
                <strong class="text-gray-800">Nyves</strong> is in maart 2026 geselecteerd als pioniersproject door
                <strong class="text-gray-800">SIDNfonds</strong>, de Nederlandse organisatie die innovatieve 
                internetprojecten ondersteunt die bijdragen aan een sterker internet.
              </p>
            </div>

            <!-- Link naar SIDNfonds -->
            <div class="mt-8">
              <a href="#" target="_blank" class="inline-flex items-center">
                Projectpagina
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              |
              <a 
                href="https://www.sidnfonds.nl" 
                target="_blank" 
                rel="noopener noreferrer"
                class="inline-flex items-center font-medium"
              >
                Meer over SIDNfonds
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>


    </div>
  </section>
</template>

<style scoped>

</style>