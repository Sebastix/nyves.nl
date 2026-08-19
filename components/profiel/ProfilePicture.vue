<script setup>
const picture = ref('')

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
  picture.value = props.profile?.picture ? props.profile.picture : '/jan-paparazzi.webp'
})

onUnmounted(() => {

})
</script>

<template>
  <div class="bg-[#eff6fc] border border-[#dfdfdf] rounded-sm">
    <div class="p-2 text-center">
      <div class="min-h-24 md:size-33 bg-white mx-auto">
        <img :src="picture" class="max-h-33 mx-auto" />
      </div>
      <template v-if="nyvesProfile.username">
        <NuxtLink to="#" class="text-xs mt-2">Gespot! ({{ nyvesProfile.spots }})</NuxtLink>
      </template>
    </div>
  </div>
</template>
