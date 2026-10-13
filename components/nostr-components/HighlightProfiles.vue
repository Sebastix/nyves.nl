<script setup>
import { nip19 } from 'nostr-tools'

const { pool, queryRelays } = useSharedRelayPool()
const { designData, fetchCustomDesign } = useCustomDesign()

// Custom design reactive property
const custom_design = computed(() => designData.value.custom_design)

const loading = ref(true)
const profiles = ref([])

const props = defineProps({
  filters: {
    type: Object,
    required: true
  },
  limit: {
    type: Number,
    required: true
  }
})

onMounted(async () => {
  try {
    loading.value = false;
    if (props.filters.authors) {
      const relays = ['wss://relay.ditto.pub', 'wss://rely.nyves.nl']
      const filter = {
        authors: [],
      };
      // Loop over each author in filters.authors
      for (const npub of props.filters.authors) {
        const pubkey = nip19.decode(npub).data
        // Fetch custom profile design per pubkey
        await fetchCustomDesign(pubkey);
        if (designData.value.custom_design) {
          console.log(designData.value.themeSettings)
          // Apply styling to profile component and elements in the DOM.
          const targetElement = document.querySelectorAll('[data-npub=' + npub + ']')[0]
          targetElement.style.backgroundColor = designData.value.themeSettings.colors.background
          targetElement.style.color = designData.value.themeSettings.colors.text
          targetElement.style.fontFamily = designData.value.themeSettings.font.name
          targetElement.querySelector('a.border-3').style.borderColor = designData.value.themeSettings.colors.primary
          targetElement.querySelector('a.text-sm').style.color = designData.value.themeSettings.colors.primary
        }
      }
    }
  } catch (e) {
    console.log(e)
    loading.value = false
  }
})

onUnmounted(() => {

})
</script>

<template>
  <div v-if="loading">
    <LoadingSpinner class="mx-auto my-24" />
  </div>
  <div v-else class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 items-center">
    <div
        v-for="(npub, index) in filters.authors"
    >
      <div class="w-full aspect-square grid content-center" :data-npub="`${npub}`">
        <NuxtLink :to="`/profiel/${nip19.decode(npub).data}`" class="border-3 rounded-sm mx-auto transform hover:-translate-y-0.5 transition-all duration-200">
          <NostrComponentsProfilePicture :pubkey="nip19.decode(npub).data" />
        </NuxtLink>
        <NuxtLink :to="`/profiel/${nip19.decode(npub).data}`" class="text-sm mx-auto">
          <NostrComponentsPubkeyToName :pubkey="nip19.decode(npub).data" />
        </NuxtLink>
      </div>
    </div>
<!--    <div-->
<!--        v-for="(profile, index) in profiles" class="hidden"-->
<!--    >-->
<!--      <div-->
<!--          :style="`background-color: ${profile.background}; color: ${profile.text}`"-->
<!--          class="w-full aspect-square grid content-center">-->
<!--        <NuxtLink :to="`/profiel/${profile.npub}`" class="border-3 rounded-sm mx-auto transform hover:-translate-y-0.5 transition-all duration-200" :style="`color: ${profile.primary} !important`">-->
<!--          <NostrComponentsProfilePicture :pubkey="profile.pubkey" />-->
<!--        </NuxtLink>-->
<!--        <NuxtLink :to="`/profiel/${profile.npub}`" class="text-sm mx-auto" :style="`color: ${profile.primary} !important`">-->
<!--          <NostrComponentsPubkeyToName :pubkey="profile.pubkey" />-->
<!--        </NuxtLink>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<style scoped>

</style>