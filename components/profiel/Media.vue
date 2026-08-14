<script setup>
const props = defineProps({
  profile: {
    type: Object,
    required: true
  },
  nyvesProfile: {
    type: Object,
    required: true
  },
  media: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <!-- Foto's & Video's Section -->
  <div class="border border-gray-200 bg-[#fcfcfc] rounded-sm mb-3">
    <h3 class="nyves-bg-gray-header p-2 text-nyves-blue font-bold flex justify-between">
      <span>Foto's & video's</span>
      <NuxtLink to="#gespot" class="text-xs/5 font-normal">Gespot! ({{ nyvesProfile.spots }})</NuxtLink>
    </h3>
    <div class="grid grid-cols-4 lg:grid-cols-5 gap-2 p-2">
      <div v-for="item in media.photoCount" :key="item.id" class="min-h-[80px] aspect-square bg-gray-200 border border-gray-300 hover:border-gray-600 transition-border duration-150 shadow-md/5">

      </div>
    </div>
    <div class="my-1">
      <NuxtLink to="#" class="text-xs mx-2">› Bekijk alle foto's ({{ media.albumCount }} albums, {{ media.photoCount }} foto's)</NuxtLink>
    </div>
  </div>
</template>

<style scoped>

</style>