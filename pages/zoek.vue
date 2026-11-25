<script setup>
const { pool, queryRelays, closeRelays } = useSharedRelayPool()

const localePath = useLocalePath()
const { locale, t } = useI18n()

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
              count.value.names = data[2].count.toLocaleString(locale.value)
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
  title: () => `${t('zoeken')} - Nyves`,
  description: () => t('zoeken_seo'),
  ogDescription: () => t('zoeken_seo'),
})
</script>

<template>
  <section>
    <h1 class="text-3xl text-nyves-blue my-3 text-center font-bold">{{ $t('zoeken') }}</h1>

    <p class="leading-relaxed text-center text-xl mb-2">
      <i18n-t keypath="zoeken_pagina.intro" tag="span" scope="global">
        <template #count>
          <LoadingSpinner class="scale-25 align-middle mx-1 inline-block" v-if="loading && count.names === 0" />
          <strong>{{ count.names }}</strong>
        </template>
      </i18n-t>
    </p>

    <p class="bg-orange-100/50 border border-orange-100 max-w-2xl mx-auto text-xs leading-relaxed mb-12 p-2 flex flex-col md:flex-row">
      <span class="w-1/4 font-bold">{{ $t('zoeken_pagina.update_date') }}</span>
      <span>
        {{ $t('zoeken_pagina.update_body') }}
        <br />
        <i18n-t keypath="zoeken_pagina.update_news" tag="span" scope="global">
          <template #link>
            <NuxtLink :to="localePath('nieuws')">{{ $t('zoeken_pagina.update_news_link') }}</NuxtLink>
          </template>
        </i18n-t>
      </span>
    </p>

    <div class="max-w-lg mx-auto text-sm text-gray-500 mb-1">
      {{ $t('zoeken_pagina.hint') }}
    </div>
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