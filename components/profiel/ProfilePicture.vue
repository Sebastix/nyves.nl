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
})

onMounted(() => {

})

onUnmounted(() => {

})
</script>

<template>
  <div class="bg-[#eff6fc] border border-[#dfdfdf] rounded-sm">
    <div class="p-2 text-center">
      <div class="min-h-24 size-33 border border-[#dfdfdf] bg-white mx-auto">
        <img :src="profile.picture" v-if="profile.picture" class="max-h-33 mx-auto" />
      </div>
      <template v-if="nyvesProfile.username">
        <NuxtLink to="#" class="text-xs mt-2">Gespot! ({{ nyvesProfile.spots }})</NuxtLink>
      </template>
    </div>
  </div>
</template>
