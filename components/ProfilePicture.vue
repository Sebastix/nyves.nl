<template>
  <div class="bg-[#eff6fc] border border-[#dfdfdf] rounded-sm">
    <div class="p-2 text-center">
      <div class="min-h-24 md:size-33 aspect-square border border-[#dfdfdf] bg-white mx-auto mb-2"></div>
      <NuxtLink to="#" class="text-xs">Gespot! ({{ profile.spots }})</NuxtLink>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  profile: {
    type: Object,
    required: true
  }
})
</script>
