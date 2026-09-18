<script setup>
const { pool, queryRelays, closeRelays } = useSharedRelayPool()

const localePath = useLocalePath()

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

    <p class="bg-orange-100/50 border border-orange-100 max-w-2xl mx-auto text-xs leading-relaxed mb-12 p-2 flex flex-col md:flex-row">
      <span class="w-1/4 font-bold">08-09-2026</span>
      <span>
        Fase 2 van de migratie wordt nu uitgevoerd waar voor elke keypair een profiel (9+ miljoen stuks) wordt aangemaakt.
        <br />
        Lees de laatste updates op de <NuxtLink :to="localePath('nieuws')">nieuwspagina</NuxtLink>.
      </span>
    </p>

    <!-- Zoek Component -->
    <Search
      :show-results-list="true"
      :navigate-on-submit="false"
    />

    <!-- Relay Health Check -->
    <div class="max-w-lg mx-auto mt-8">
      <RelayHealthCheck relay-url="wss://rely.nyves.nl" />
    </div>

  </section>
</template>

<style scoped>

</style>