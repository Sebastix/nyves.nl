<template>
  <footer class="my-3">
    <div class="nyves-bg-gray-header border border-[#ebebeb] py-3 rounded-sm">
      <div class="mx-auto px-2 flex justify-between items-center text-xs text-gray-600">
        <div class="flex items-center">
          <span class="font-bold text-gray-800 mr-2">N</span>
<!--          <span class="mr-2">Hyver</span>-->
<!--          <span class="mr-5">{{ currentUser }}</span>-->
  <!--        <NuxtLink to="/over" class="text-blue-600 hover:underline mr-2">Over Hyves</NuxtLink>-->
  <!--        <NuxtLink to="/diensten" class="text-blue-600 hover:underline mr-2">Diensten</NuxtLink>-->
  <!--        <NuxtLink to="/vacatures" class="text-blue-600 hover:underline mr-2">Vacatures</NuxtLink>-->
  <!--        <NuxtLink to="/adverteerders" class="text-blue-600 hover:underline mr-2">Adverteerders</NuxtLink>-->
  <!--        <NuxtLink to="/ontwikkelaars" class="text-blue-600 hover:underline mr-2">Ontwikkelaars</NuxtLink>-->
  <!--        <NuxtLink to="/ouders-onderwijs" class="text-blue-600 hover:underline mr-2">Ouders & Onderwijs</NuxtLink>-->
  <!--        <NuxtLink to="/pers" class="text-blue-600 hover:underline">Pers</NuxtLink>-->
        </div>
        <LanguageSelect />
      </div>
    </div>
    <div class="sub flex justify-between px-2 py-3 text-xs">
      <div>
        Een initiatief van <a href="https://sebastix.nl" target="_blank">Sebastian Hagens</a>
        |
        <NuxtLink to="/blog">Blog</NuxtLink>
        |
        <NuxtLink to="/hvsbackup">HVSbackup</NuxtLink>
      </div>
      <div>
        Voorwaarden
        |
        Privacy
        |
        <a href="https://gitlab.com/sebastix-group/nyves" target="_blank">Code</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import LanguageSelect from './LanguageSelect.vue';

const props = defineProps({
  currentUser: {
    type: String,
    default: 'Gast'
  }
})

const changeLanguage = (event) => {
  // Handle language change
  console.log('Language changed to:', event.target.value)
  // In a real app, you'd implement internationalization here
}
</script>
