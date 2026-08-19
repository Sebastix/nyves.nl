<script setup>

</script>

<template>
  <div class="border border-gray-200 bg-[#fcfcfc] rounded-sm mb-8">
    <div class="h-[44px] nyves-bg-gray-header"></div>
    <div class="grid grid-cols-1 md:grid-cols-2 items-center gap-x-8 gap-y-4 px-8">
      <a href="https://soapbox.pub" target="_blank" class="text-center bg-blue-50 py-8 rounded-sm">
        <img src="~/assets/soapbox-logo-icon.svg" class="size-24 mx-auto mb-2" alt="Soapbox" />
        <div class="inline-flex items-center font-bold text-lg mt-2">
          Soapbox <br /> Taking back the internet.
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>
      </a>
      <i18n-t keypath="soapbox_collab" tag="p" class="text-gray-600 leading-relaxed">
        <strong>{{ $t('Soapbox') }}</strong>
      </i18n-t>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 items-center gap-x-8 gap-y-4 mt-8 px-8">
      <a href="https://ditto.pub" target="_blank" class="text-center bg-purple-50 py-8 rounded-sm">
        <img src="~/assets/ditto-logo.png" class="size-28 mx-auto" alt="Ditto" />
        <div class="inline-flex items-center font-bold text-lg mt-1">
          Ditto <br /> Your content. Your vibe. Your rules.
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>
      </a>
      <i18n-t keypath="ditto_collab" tag="p" class="text-gray-600 leading-relaxed">
        <strong>{{ $t('Ditto') }}</strong>
        <br />
        <br />
      </i18n-t>
    </div>
    <h2 class="text-2xl font-bold my-8 text-center">{{ $t('highlight_profiles_with_themes') }}</h2>
    <NostrComponentsHighlightProfiles :filters="[]" :limit="26" class="text-center" />
  </div>
</template>

<style scoped>

</style>