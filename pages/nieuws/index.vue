<script setup>
import { nip19 } from 'nostr-tools'

const { queryRelays } = useSharedRelayPool()
const { formatDate, formatTime } = useDateHelpers()

const npub = ref('npub1nyves8d4m86ewyaaw9cxjgfvx2sek40j9q99recvf8zmw0drq6usjh9nc9')
const loading = ref(true)
const newsData = ref([])

const loadNews = async () => {
  try {
    // Decode npub to get hex pubkey
    const decoded = nip19.decode(npub.value)
    const pubkey = decoded.data
    const relays = [
      'wss://relay.nyves.nl',
      'wss://relay.ditto.pub'
    ]
    const filter = {
      kinds: [1],
      authors: [pubkey],
      limit: 25
    }
    const events = await queryRelays(relays, filter)
    newsData.value = events
    // Construct Nevents for encoding a nevent... identifier

    loading.value = false
  } catch (e) {
    console.error(e)
  }
}

onMounted(async () => {
  await loadNews()
})

definePageMeta({

})

useSeoMeta({
  title: $t('Nieuws') + ` - Nyves`,
  description: `De laatste updates rondom Nyves`
})
</script>

<template>
  <section>
    <h1 class="text-3xl text-nyves-blue my-3 text-center font-bold">{{ $t('Nieuws') }}</h1>
    <p class="text-xl text-center mb-4">
      Hier lees je de laatste updates rondom Nyves
    </p>

    <section class="border border-gray-200 bg-[#fcfcfc] rounded-sm mb-8 pb-8">
      <div class="h-[44px] nyves-bg-gray-header"></div>
      <div v-if="loading" class="text-center col-span-3 md:col-span-5">
        <LoadingSpinner class="mx-auto mb-10" />
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-2 px-2">
        <div v-for="item in newsData" :key="item.id" class="bg-white rounded-sm p-2 border border-nyves-blue/25">
          <p class="text-gray-500 font-light mb-2 text-sm">
            {{ formatDate(item.created_at) }}, {{ formatTime(item.created_at) }},
            <NuxtLink :to="`/profiel/${nip19.npubEncode(item.pubkey)}`" class="inline-block">
              <NostrComponentsPubkeyToName :pubkey="item.pubkey" class="font-bold text-xs" />
            </NuxtLink>
          </p>
          <NostrComponentsNoteContent :event="item" class="text-base/6! lg:text-sm/6! font-relaxed tracking-tight" />
          <NuxtLink :to="`https://nostrver.se/e/${nip19.neventEncode(item)}`" target="_blank" class="text-xs mt-2">
            {{ nip19.neventEncode(item).substring(0, 8) + '.....' + nip19.neventEncode(item).substring(nip19.neventEncode(item).length - 6) }}
            <svg class="size-3 inline align-text-top" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <MailingList />

  </section>
</template>

<style scoped>

</style>