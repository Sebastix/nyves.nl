<script setup>

import { ref, readonly, onUnmounted, onMounted } from 'vue';

const { pool, queryRelays, closeRelays } = useSharedRelayPool()
const { locale } = useI18n()

const STATS_RELAY = 'wss://rely.nyves.nl'

const count = ref({
  usernames: 0,
  profiles: 0,
  nostrverse: 0
})

const nyvesUsernameCounts = async () => {
  const filter = {
    "kinds": [8000]
  }

  const ws = new WebSocket(STATS_RELAY)
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
            count.value.usernames = data[2].count.toLocaleString(locale.value)
          }
        }
      } catch (e) {

      }
    }
    ws.onerror = () => {

    }
  }
}

const nyvesProfileCounts = async () => {
  const filter = {
    "kinds": [0]
  }

  const ws = new WebSocket(STATS_RELAY)
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
            count.value.profiles = data[2].count.toLocaleString(locale.value)
          }
        }
      } catch (e) {

      }
    }
    ws.onerror = () => {

    }
  }
}

const nostrverseCounts = async () => {
  // Use NIP-45 count with distinct:author to get YAU numbers from 1 relay with a kind 0 (profile metadata)
  const relays = ['wss://relay.ditto.pub']
  // Source for inspiration: https://gitlab.com/soapbox-pub/ditto-metrics/-/blob/main/src/hooks/useCount.ts
  // const dau = useCount([{ kinds: [1], since: now24h, search: DISTINCT }]);
  const filter = {
    "kinds": [0],
    "since": Math.floor(Date.now() / 1000) - (86400 * 365), // 1 year
    "search": "distinct:author"
  }
  const ws = new WebSocket(relays[0])
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
            count.value.nostrverse = data[2].count.toLocaleString(locale.value)
          }
        }
      } catch (e) {

      }
    }
    ws.onerror = () => {

    }
  }
  // @todo how do we get this number using multiple relays as a source?
  // @todo get total active unique authors from last year
}

onMounted(async () => {
  try {
    await nyvesUsernameCounts()
    await nyvesProfileCounts()
    await nostrverseCounts()
  } catch (error) {
    console.error('Fout bij NIP-45 COUNT:', error)
  }
})
</script>

<template>
  <div class="border border-gray-200 bg-[#fcfcfc] rounded-sm text-center pb-8 mb-8">
    <div class="h-[44px] nyves-bg-gray-header"></div>
    <h2 class="text-center text-4xl font-bold mb-4">{{ $t('home.statistics.heading') }}</h2>
    <p class="mb-8 text-2xl">
      {{ $t('home.statistics.content_question') }}
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xl">
      <div>
        <span class="usernames font-bold">{{ count.usernames }}</span> {{ $t('home.statistics.usernames') }}
      </div>
      <div>
        <span class="font-bold">0</span> {{ $t('home.statistics.profile_pictures') }}
      </div>
      <div>
        <span class="font-bold">0</span> {{ $t('home.statistics.friendships') }}
      </div>
      <div>
        <span class="font-bold">0</span> {{ $t('home.statistics.designs') }}
      </div>
      <div>
        <span class="font-bold">0</span> {{ $t('home.statistics.albums', ['0']) }}
      </div>
      <div>
        <span class="font-bold">0</span> {{ $t('home.statistics.krabbels') }}
      </div>
      <div>
        <span class="font-bold">0</span> {{ $t('home.statistics.www') }}
      </div>
      <div>
        <span class="font-bold">0</span> {{ $t('home.statistics.blogs') }}
      </div>
      <div>
        <span class="font-bold">0</span> {{ $t('home.statistics.gadgets') }}
      </div>
    </div>
    <p class="my-8 text-2xl">
      {{ $t('home.statistics.profiles_question') }}
    </p>
    <div class="grid grid-cols-1 gap-4 text-xl">
      <div>
        {{ $t('home.statistics.archived_profiles', [count.profiles]) }}
      </div>
      <div>
        {{ $t('home.statistics.nostrverse_profiles', [count.nostrverse]) }}
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>