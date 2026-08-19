<script setup>
import { getSharedPoolStats } from '@/composables/useSharedRelayPool'

</script>

<template>
  <div class="text-white text-sm">
    <p class="mb-2">
      {{ getSharedPoolStats().relayUrls.length }} verbonden relays
    </p>
    <ul class="pl-4">
      <li v-for="relay in getSharedPoolStats().relayUrls">{{ relay }}</li>
    </ul>
  </div>
</template>

<style scoped>

</style>