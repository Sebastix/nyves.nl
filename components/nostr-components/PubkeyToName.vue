<script setup>
import { nip19 } from 'nostr-tools'
const { fetchProfileByPubkey } = useNostrProfile()

const loading = ref(true)
const name = ref('')

const props = defineProps({
  pubkey: {
    // Hex formatted public key
    type: String,
    required: true
  }
})

onMounted(async() => {
  try {
    // Pubkey hex value
    name.value = props.pubkey
    // Format hex to npub1
    name.value = nip19.npubEncode(props.pubkey)
    // Fetch name for this pubkey
    const profile = await fetchProfileByPubkey(props.pubkey)
    name.value = profile?.name || profile?.display_name || profile?.displayName
    loading.value = false
  } catch (e) {
    loading.value = false
    console.log(e)
  }
})
</script>

<template>
  <div v-if="loading">
    <span class="font-mono">{{ name.substring(0, 8)+`...` }}</span><div class="animate-spin rounded-full size-2 border-b-2 border-nyves-blue inline-block"></div>
  </div>
  <div v-else>
    {{ name }}
  </div>
</template>

<style scoped>

</style>