<script setup>

</script>

<template>
  <section class="mb-8">
    <div class="border border-gray-200 bg-[#fcfcfc] rounded-sm overflow-hidden">
      <div class="h-[44px] nyves-bg-gray-header"></div>
      <div class="px-8 pb-8 grid md:grid-cols-2 gap-8">
        <div>
          <h3 class="text-2xl font-bold text-emerald-700 underline underline-offset-5">{{ $t('home.protocols.platforms_heading') }}</h3>
          <p class="font-bold mt-2">
            {{ $t('home.protocols.platforms_subtitle') }}
          </p>
          <p class="text-gray-600 leading-relaxed mt-2">
            {{ $t('home.protocols.platforms_body') }}
          </p>
          <a href="https://knightcolumbia.org/content/protocols-not-platforms-a-technological-approach-to-free-speech" target="_blank" class="inline-flex items-center mt-2">
            {{ $t('home.protocols.platforms_heading') }}
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
        <div>
          <h3 class="text-2xl font-bold text-nyves-blue-purple underline underline-offset-5">{{ $t('home.protocols.nostr_heading') }}</h3>
          <p class="font-bold mt-2">
            {{ $t('home.protocols.nostr_subtitle') }}
          </p>
          <p class="text-gray-600 leading-relaxed mt-2">
            {{ $t('home.protocols.nostr_body') }}
          </p>
          <a href="https://nostr.org" target="_blank" class="inline-flex items-center mt-2">
            https://nostr.org
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>