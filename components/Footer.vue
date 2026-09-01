<script setup>
import LanguageSelect from './LanguageSelect.vue';

const localePath = useLocalePath()

const props = defineProps({
  currentUser: {
    type: String,
    default: 'Gast'
  }
})

const changeLanguage = (event) => {
  // Handle language change
  console.log('Language changed to:', event.target.value)
}
</script>
<template>
  <footer class="my-3">
    <div class="nyves-bg-gray-header border border-[#ebebeb] py-3 rounded-sm">
      <div class="mx-auto px-2 flex justify-between items-center text-xs text-gray-600">
        <div class="flex items-center">
          <span class="font-bold text-gray-800 mr-2">N</span>
<!--          <span class="mr-2">Hyver</span>-->
<!--          <span class="mr-5">{{ currentUser }}</span>-->
        </div>
        <LanguageSelect />
      </div>
    </div>
    <div class="sub flex justify-between px-2 py-3 text-xs">
      <div>
        {{ $t('footer.initiatief') }} <a href="https://sebastix.nl" target="_blank">Sebastian Hagens</a>
        |
        <NuxtLink :to="localePath('nieuws')">{{ $t('Nieuws') }}</NuxtLink>
        |
        <NuxtLink :to="localePath('over-nyves')">{{ $t('Over_Nyves') }}</NuxtLink>
        |
        <NuxtLink to="/blog">{{ $t('Blog') }}</NuxtLink>
        |
        <NuxtLink to="/hvsbackup">HVSbackup</NuxtLink>
      </div>
      <div class="text-right">
        <NuxtLink :to="localePath('veelgestelde-vragen')">{{ $t('Veelgestelde_vragen') }}</NuxtLink>
        |
        <NuxtLink :to="localePath('voorwaarden')">{{ $t('Voorwaarden') }}</NuxtLink>
        |
        <NuxtLink to="/privacy">{{ $t('Privacy') }}</NuxtLink>
        |
        <a href="https://gitlab.com/sebastix-group/nyves" target="_blank">
          Code<svg class="size-3 inline align-text-top" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  </footer>
</template>