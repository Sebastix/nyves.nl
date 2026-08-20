<script setup>

import { ref, readonly, onUnmounted, onMounted } from 'vue';

const { pool, queryRelays, closeRelays } = useSharedRelayPool()

const STATS_RELAY = 'wss://rely.nyves.nl'

const count = ref({
  usernames: 0
})

onMounted(async () => {
  try {
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
              count.value.usernames = data[2].count.toLocaleString('nl-NL')
            }
          }
        } catch (e) {

        }
      }
      ws.onerror = () => {

      }
    }
  } catch (error) {
    console.error('Fout bij NIP-45 COUNT:', error)
  }
})
</script>

<template>
  <div class="border border-gray-200 bg-[#fcfcfc] rounded-sm text-center pb-8 mb-8">
    <div class="h-[44px] nyves-bg-gray-header"></div>
    <h2 class="text-center text-4xl font-bold mb-4">Statistieken</h2>
    <p class="mb-8 text-2xl">
      Hoeveel content hebben al terug kunnen zetten?
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xl">
      <div>
        <span class="usernames font-bold">{{ count.usernames }}</span> gebruikersnamen
      </div>
      <div>
        <span class="usernames font-bold">0</span> profielfoto's
      </div>
      <div>
        <span class="usernames font-bold">0</span> albums met <span class="usernames font-bold">0</span> foto's
      </div>
      <div>
        <span class="usernames font-bold">0</span> krabbels
      </div>
      <div>
        <span class="usernames font-bold">0</span> wiewatwaar's
      </div>
      <div>
        <span class="usernames font-bold">0</span> blogs
      </div>
    </div>
    <p class="my-8 text-2xl">
      Hoeveel profielen zijn er actief?
    </p>
    <div class="grid grid-cols-1 gap-4 text-xl">
      <div>
        <span class="font-bold">{{ count.usernames }}</span> profielen uit het archief
      </div>
      <div>
        <span class="font-bold">0</span> profielen vanuit de nostrverse
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>