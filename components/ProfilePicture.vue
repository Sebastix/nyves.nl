<template>
  <div class="bg-[#eff6fc] border border-[#dfdfdf] rounded-sm">
    <div class="p-2 text-center">
      <div class="size-33 border border-[#dfdfdf] bg-white float-left mr-2 mb-2"></div>
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
