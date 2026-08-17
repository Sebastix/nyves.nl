<script setup>
import { nip19 } from 'nostr-tools'
const { fetchProfileByPubkey } = useNostrProfile()

const loading = ref(true)
const name = ref('')
const picture = ref('')

const props = defineProps({
  pubkey: {
    // Hex formatted public key
    type: String,
    required: true
  }
})

onMounted(async() => {
  try {
    const profile = await fetchProfileByPubkey(props.pubkey)
    picture.value = profile?.picture || ''
    name.value = profile?.name || profile?.display_name || profile?.displayName || props.pubkey
    loading.value = false
  } catch (e) {
    loading.value = false
  }
})
</script>

<template>
  <div v-if="loading">
    <div class="size-25 bg-gray-200 border border-gray-300 hover:border-gray-600 transition-border duration-150 shadow-md/5 mx-auto mb-1">
      <div class="animate-spin rounded-full size-8 border-b-2 border-nyves-blue mx-auto mt-8"></div>
    </div>
  </div>
  <div v-else>
    <img
        :src="picture"
        :alt="name"
        class="max-h-25 bg-gray-200 border border-gray-300 hover:border-gray-600 transition-border duration-150 shadow-md/5 mx-auto mb-1"
    />
  </div>
</template>

<style scoped>

</style>