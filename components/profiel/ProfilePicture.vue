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
  console.log(props.profile)
})

onUnmounted(() => {

})
</script>

<template>
  <div class="bg-[#eff6fc] border border-[#dfdfdf] rounded-sm">
    <div class="p-2 text-center">
      <div class="min-h-24 md:size-33 aspect-square border border-[#dfdfdf] bg-white mx-auto mb-2">
        <img :src="profile.picture" v-if="profile.picture" />
      </div>
      <NuxtLink to="#" class="text-xs">Gespot! ({{ nyvesProfile.spots }})</NuxtLink>
    </div>
  </div>
</template>
