<script setup>
import { ref } from 'vue'
import { useModalStore } from '~/stores/modal'

const modalStore = useModalStore()

// Get the event data from the modal store
const eventData = computed(() => modalStore.eventJsonData)

// Format JSON with proper indentation
const formattedJson = computed(() => {
  if (!eventData.value) return ''
  return JSON.stringify(eventData.value, null, 2)
})

// Copy JSON to clipboard
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(formattedJson.value)
    // You could add a temporary success message here
    console.log('Event JSON copied to clipboard')
  } catch (err) {
    console.error('Failed to copy JSON:', err)
  }
}

// Close modal
const closeModal = () => {
  const { closeModal } = useModal()
  closeModal()
}
</script>

<template>
  <div v-if="eventData" class="max-w-4xl mx-auto p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-white">
        Nostr event (Kind {{ eventData.kind }})
      </h2>
    </div>

    <!-- Raw JSON Display -->
    <div class="bg-gray-900 rounded-lg p-4 relative">
      <!-- Copy Button -->
      <button
        @click="copyToClipboard"
        class="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white text-xs px-3 py-1 rounded transition-colors"
      >
        Copy JSON
      </button>
      <!-- JSON Content -->
      <pre class="text-green-400 text-xs overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed py-1">{{ formattedJson }}</pre>
    </div>

    <!-- Actions -->
    <div class="flex gap-3 mt-6">
      <a
        :href="'https://njump.me/' + eventData.id"
        target="_blank"
        class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition-colors inline-block"
      >
        View on njump ↗
      </a>
    </div>

  </div>
</template>

<style scoped>
/* Ensure proper scrolling for long JSON */
pre {
  max-height: 400px;
  overflow-y: auto;
}
</style>