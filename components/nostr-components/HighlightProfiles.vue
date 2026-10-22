<script setup>
import { nip19 } from 'nostr-tools'

const { pool, queryRelays } = useSharedRelayPool()
const { designData, fetchCustomDesign } = useCustomDesign()

// Custom design reactive property
const custom_design = computed(() => designData.value.custom_design)

const loading = ref(true)
const profiles = ref([])

// Aborts the (sequential) custom design lookups below as soon as this component
// is unmounted, e.g. when a visitor navigates to a profile page. Without it the
// loop keeps opening relay subscriptions for every remaining author.
let designFetchController = null

/**
 * Apply the custom design that was fetched for a profile to the rendered tile
 * @param {string} npub - The npub of the rendered profile
 */
const applyCustomDesign = (npub) => {
  const themeSettings = designData.value.themeSettings

  if (!designData.value.custom_design || !themeSettings?.colors) {
    return
  }

  const targetElement = document.querySelector(`[data-npub="${npub}"]`)
  if (!targetElement) {
    return
  }

  targetElement.style.backgroundColor = themeSettings.colors.background
  targetElement.style.color = themeSettings.colors.text
  targetElement.style.fontFamily = themeSettings.font?.name

  const avatarLink = targetElement.querySelector('a.border-3')
  if (avatarLink) {
    avatarLink.style.borderColor = themeSettings.colors.primary
  }

  const nameLink = targetElement.querySelector('a.text-sm')
  if (nameLink) {
    nameLink.style.color = themeSettings.colors.primary
  }
}

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
  // One controller per mounted instance, so only this component's lookups are stopped
  designFetchController = new AbortController()
  const { signal } = designFetchController

  try {
    loading.value = false;
    if (props.filters.authors) {
      // Loop over each author in filters.authors
      for (const npub of props.filters.authors) {
        // Stop the loop as soon as the component is unmounted (navigating away)
        if (signal.aborted) break

        const pubkey = nip19.decode(npub).data
        // Fetch custom profile design per pubkey, cancellable through the signal
        await fetchCustomDesign(pubkey, undefined, { signal })

        // The lookup was cancelled (or the component is gone): stop right away
        if (signal.aborted) break

        // Apply styling to profile component and elements in the DOM.
        applyCustomDesign(npub)
      }
    }
  } catch (e) {
    console.log(e)
    loading.value = false
  }
})

onUnmounted(() => {
  // Stops the loop above and closes the relay subscription that is currently
  // running for the custom design of a profile.
  designFetchController?.abort()
  designFetchController = null
})
</script>

<template>
  <div v-if="loading">
    <LoadingSpinner class="mx-auto my-24" />
  </div>
  <div v-else class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 items-center">
    <div
        v-for="(npub) in filters.authors"
    >
      <div class="w-full aspect-square grid content-center" :data-npub="`${npub}`">
        <NuxtLink :to="`/profiel/${npub}`" class="border-3 rounded-sm mx-auto transform hover:-translate-y-0.5 transition-all duration-200">
          <NostrComponentsProfilePicture :pubkey="nip19.decode(npub).data" />
        </NuxtLink>
        <NuxtLink :to="`/profiel/${npub}`" class="text-sm mx-auto">
          <NostrComponentsPubkeyToName :pubkey="nip19.decode(npub).data" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>