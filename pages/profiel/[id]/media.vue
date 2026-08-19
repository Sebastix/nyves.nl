<script setup>
import { nip19 } from 'nostr-tools'

const route = useRoute()
const { fetchProfile } = useNostrProfile()
const { queryRelays } = useSharedRelayPool()
const { openModal } = useModal();

// Get npub/id from route params - in [id] folder structure, the param is named 'id'
const npub = route.params.id
const loading = ref(true)
const profile = ref(null)
const mediaData = ref([])

onMounted(async () => {
  try {
    // Decode npub to get hex pubkey
    const decoded = nip19.decode(npub)
    const pubkey = decoded.data
    const profileData = await fetchProfile(pubkey)

    if (profileData) {
      profile.value = {
        ...profileData,
        npub: npub,
        pubkey: pubkey
      }
    }
    // Load events of NIP-68 and NIP-71
    const relays = [
      'wss://nos.lol',
      'wss://relay.primal.net',
      'wss://relay.ditto.pub',
      'wss://relay.divine.video'
    ]
    const filter = {
      // Kind 20 = picture (NIP-68)
      // NIP-71 with kinds 21, 34235 and 34236
      kinds: [20, 21, 34235, 34236],
      authors: [pubkey],
      limit: 50
    }
    const events = await queryRelays(relays, filter)
    if (events.length > 0) {
      console.log(events)
      mediaData.value = events
      loading.value = false
    } else {
      loading.value = false
    }
  } catch (e) {
    console.error(e)
  }
})
</script>

<template>
  <div class="mt-3">
    <div class="mb-6" v-if="profile">
      <NuxtLink
          :to="`/profiel/${npub}`"
          class="hover:text-nyves-blue"
      >
        {{ profile.name || profile.display_name || '...' }}
      </NuxtLink>
      <h1 class="text-3xl font-bold text-gray-900 mb-2">
        Foto's en video's van {{ profile.name || profile.display_name || '...' }}
      </h1>

      <section class="grid grid-cols-2 md:grid-cols-5 gap-x-2 gap-y-6 p-2 text-xs text-black">
        <div v-if="loading" class="text-center">
          <div class="animate-spin rounded-full size-16 border-b-2 border-nyves-blue mx-auto my-16"></div>
        </div>
        <div v-else-if="mediaData.length === 0">
          Geen items gevonden
        </div>
        <div v-else v-for="item in mediaData" :key="item.id">
          <template v-if="item.tags[0][1] && item.tags[0][1].includes('jpg')">
            <NuxtLink @click="openModal('media', item.tags[0][1].split(' ')[1])">
              <img :src="`${item.tags[0][1].split(' ')[1]}`" class="bg-gray-200 border border-gray-300 hover:border-gray-600 transition-border duration-150 shadow-md/5" :alt="`${item.content}`" />
            </NuxtLink>
          </template>
          <template v-if="item.tags[0][1] && item.tags[0][1].includes('png')">
            <NuxtLink @click="openModal('media', item.tags[0][1].split(' ')[1])">
              <img :src="`${item.tags[0][1].split(' ')[1]}`" class="bg-gray-200 border border-gray-300 hover:border-gray-600 transition-border duration-150 shadow-md/5" :alt="`${item.content}`" />
            </NuxtLink>
          </template>
          <template v-if="item.tags[0][1] && item.tags[0][1].includes('webp')">
            <NuxtLink @click="openModal('media', item.tags[0][1].split(' ')[1])">
              <img :src="`${item.tags[0][1].split(' ')[1]}`" class="bg-gray-200 border border-gray-300 hover:border-gray-600 transition-border duration-150 shadow-md/5" :alt="`${item.content}`" />
            </NuxtLink>
          </template>
          <template v-if="item.tags[0][1] && item.tags[0][1].includes('mp4')">
            <video controls>
              <source :src="`${item.tags[0][1].split(' ')[1]}`" :type="`${item.tags[0][2].split(' ')[1]}`" />
            </video>
          </template>
          <!-- todo check if item.tags[0][1] value is a blossom hash of a file -->
          Kind: {{ item.kind }}
          Created: {{ item.created_at }}
          <br />
          <p class="truncate">
            {{ item.content }}
          </p>
        </div>
      </section>

      <section>
        <h2 class="text-2xl">TODO: categorize media with tabs</h2>
      </section>

      <section>
        <h3>Kind 20 images (NIP-68)</h3>
        <div>@todo</div>
      </section>

      <section>
        <h3>Kind 21 videos (NIP-71)</h3>
        <div>@todo</div>
      </section>

      <section>
        <h3>Kind 34235 videos (NIP-71)</h3>
        <div>@todo</div>
      </section>

      <section>
        <h3>Kind 34236 short videos (NIP-71)</h3>
        <div>@todo</div>
      </section>

      <section>
        <h3>Media fetched from event kind 1 notes</h3>
        <div>@todo</div>
      </section>
    </div>
  </div>
</template>

<style scoped>

</style>