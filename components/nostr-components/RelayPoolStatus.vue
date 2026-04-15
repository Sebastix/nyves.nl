<script setup>
import { getSharedPoolStats } from '~/composables/useSharedRelayPool'

const poolStats = reactive({
  connections: 0,
  poolExists: false,
  relayUrls: []
})

let updateInterval = null

const updateStats = () => {
  const stats = getSharedPoolStats()
  poolStats.connections = stats.connections
  poolStats.poolExists = stats.poolExists
  poolStats.relayUrls = stats.relayUrls
}

onMounted(() => {
  updateStats()
  // Update stats every 2 seconds
  updateInterval = setInterval(updateStats, 2000)
})

onUnmounted(() => {
  if (updateInterval) {
    clearInterval(updateInterval)
  }
})

</script>

<template>
  <div class="rounded-sm bg-white/20 text-black/80 px-2 text-xs text-center relative">
    <span class="absolute top-0 left-0 size-2 inline-flex animate-ping rounded-full bg-green-400 opacity-75"></span>
    <span class="absolute top-0 left-0 size-2 inline-flex rounded-full bg-green-700 opacity-90"></span>
    ⇄
    <span class="text-xs">{{ poolStats.relayUrls.length }}</span>
    <br />
    <span class="text-xs">relays</span>
  </div>
</template>

<style scoped>

</style>