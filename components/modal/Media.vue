<script setup>
const props = defineProps({
  media: {
    type: String,
    default: 'default media string'
  }
});
</script>

<template>
  <img :src="`${media}`" />
</template>

<style scoped>

</style>