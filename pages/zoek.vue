<script setup>
const { pool, queryRelays, closeRelays } = useSharedRelayPool()

const RELAY = 'wss://rely.nyves.nl'

import { onMounted, ref } from 'vue';

const loading = ref(true);
const count = ref({
  names: 0
})

onMounted(async () => {
  try {
    const filter = {
      "kinds": [0]
    }
    const ws = new WebSocket(RELAY)
    ws.onopen = () => {
      const countId = 'count_' + Math.random().toString(36).substr(2, 9)
      const countMessage = JSON.stringify([
        "COUNT",
        countId,
        filter
      ])

      ws.send(countMessage)

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          if (data[0] === 'COUNT' && data[1] === countId) {
            if (data[2]) {
              count.value.names = data[2].count.toLocaleString('nl-NL')
            }
          }
          loading.value = false
        } catch (e) {
          loading.value = false
          console.error(e)
        }
      }
      ws.onerror = () => {

      }
    }
  } catch (e) {
    loading.value = false
    console.error(e)
  }
})
// Set page meta
useSeoMeta({
  title: $t('zoeken') + ` - Nyves`,
  description: `Hier kun je jouw Hyves profiel opzoeken.`,
  ogDescription: `Hier kun je jouw Hyves profiel opzoeken.`,
})
</script>

<template>
  <section>
    <h1 class="text-3xl text-nyves-blue my-3 text-center font-bold">{{ $t('zoeken') }}</h1>

    <p class="leading-relaxed text-center text-xl mb-2">
      Vind jouw Hyves profiel in een lijst met <LoadingSpinner class="scale-25 align-middle mx-1 inline-block" v-if="loading && count.names === 0" /> <strong>{{ count.names }}</strong> namen.
    </p>

    <p class="bg-orange-100 border border-orange-300 max-w-2xl mx-auto text-xs text-center leading-relaxed mb-12 p-2">
      20-08-2026: Op dit moment zijn we bezig met de migratie naar een nieuwe relay op <a href="https://rely.nyves.nl" target="_blank">https://rely.nyves.nl</a> en het optimaliseren van deze zoek-functie.
    </p>

    <!-- Zoek Component -->
    <div class="max-w-md mx-auto text-2xl mb-12">
      <Search 
        :show-results-list="true" 
        :navigate-on-submit="false"
      />
    </div>

    <!-- Relay Health Check -->
    <div class="max-w-md mx-auto">
      <p class="bg-nyves-blue-purple/10 rounded-sm p-2 text-xs mb-2">
        Nyves maakt gebruik van <a href="https://nips.nostr.com/50" target="_blank">NIP-50 Search Capability</a> om informatie te doorzoeken op de relay <a href="https://rely.nyves.nl" target="_blank">https://rely.nyves.nl</a>.
      </p>
      <RelayHealthCheck relay-url="wss://rely.nyves.nl" />
    </div>

  </section>
</template>

<style scoped>

</style>