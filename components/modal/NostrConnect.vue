<script setup>
import { ref, onMounted, computed } from 'vue'

// Props and emits for modal interaction
const emit = defineEmits(['close'])

// Pinia store for Nostr connection state
const nostrStore = useNostrStore()

// Local state for extension detection
const isCheckingExtension = ref(true)
const extensionError = ref(null)

// Detect NIP-07 compatible browser extension (without triggering permission)
const detectNostrExtension = async () => {
  try {
    isCheckingExtension.value = true
    extensionError.value = null
    
    // Check if window.nostr exists (NIP-07 standard) without calling any methods
    if (typeof window !== 'undefined' && window.nostr) {
      // Just check if the nostr object has the required methods
      const hasRequiredMethods = 
        typeof window.nostr.getPublicKey === 'function' &&
        typeof window.nostr.signEvent === 'function'
      
      if (hasRequiredMethods) {
        nostrStore.setExtensionAvailable(true)
        console.log('✅ Nostr extension detected (methods available)')
      } else {
        nostrStore.setExtensionAvailable(false)
        console.log('❌ Nostr object found but missing required methods')
      }
    } else {
      nostrStore.setExtensionAvailable(false)
      console.log('❌ No Nostr extension detected')
    }
  } catch (error) {
    console.error('Extension detection error:', error)
    extensionError.value = error.message
    isExtensionAvailable.value = false
  } finally {
    isCheckingExtension.value = false
  }
}

// Connect with browser extension
const connectWithExtension = async () => {
  if (!nostrStore.extensionAvailable) {
    alert('No Nostr extension available')
    return
  }
  
  try {
    // Use the store's connect method
    const success = await nostrStore.connectWithExtension()
    
    if (success) {
      // Close the modal after successful connection
      emit('close')
    }
    
  } catch (error) {
    console.error('❌ Connection failed:', error)
    alert(`Connection failed: ${error.message}`)
  }
}

// Retry extension detection
const retryDetection = () => {
  detectNostrExtension()
}

// Computed properties for better reactivity
const showConnectionStatus = computed(() => {
  return nostrStore.isConnected
})

const connectionStatusText = computed(() => {
  if (nostrStore.isConnected) {
    return `Connected as ${nostrStore.userDisplayName}`
  }
  return null
})

// Disconnect function
const disconnect = () => {
  nostrStore.disconnect()
  // Modal can stay open to allow reconnection
  console.log('🔌 User disconnected from Nostr')
}

// Detect extension on component mount
onMounted(() => {
  // Small delay to ensure window.nostr is loaded
  setTimeout(detectNostrExtension, 100)
})
</script>

<template>
  <div class="text-white">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold">Inloggen</h2>
    </div>

    <div class="space-y-4">
      <!-- Connection Status Display -->
      <div v-if="showConnectionStatus" class="bg-green-900/20 border border-green-700 rounded-sm p-3 mb-4">
        <div class="flex items-center gap-3">
          <svg class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <div>
            <p class="text-green-400 font-medium">Already Connected!</p>
            <p class="text-green-300 text-sm">{{ connectionStatusText }}</p>
            <p class="text-green-200 text-xs">Last connected: {{ new Date(nostrStore.lastConnected).toLocaleString() }}</p>
          </div>
        </div>
        
        <!-- Disconnect Option -->
        <div class="mt-3">
          <button @click="disconnect" 
                  class="text-sm bg-yellow-800 hover:bg-yellow-900 text-white px-3 py-1 w-full rounded transition-colors">
            Disconnect
          </button>
        </div>
      </div>
      
      <!-- Connection Instructions (only shown when not connected) -->
      <p v-else class="text-gray-300 text-sm">
        Connect your Nostr identity.
      </p>
      
      <!-- Extension Status Indicator -->
      <div v-if="!nostrStore.isConnected" class="bg-gray-800 border border-gray-700 rounded-sm p-3">
        <!-- Extension Detection Status (only shown when not connected) -->
        <div class="flex items-center gap-3">
          <!-- Loading State -->
          <div v-if="isCheckingExtension" class="flex items-center gap-2 text-blue-400">
            <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="text-sm">Checking for browser extension...</span>
          </div>
          
          <!-- Extension Available -->
          <div v-else-if="nostrStore.extensionAvailable" class="flex items-center gap-2 text-green-400">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span class="text-sm font-medium">Browser extension detected</span>
          </div>
          
          <!-- Extension Not Available -->
          <div v-else class="flex items-center gap-2 text-red-400">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
            <span class="text-sm">No browser extension found</span>
          </div>
        </div>
        
        <!-- Extension Error (only shown when not connected) -->
        <div v-if="!nostrStore.isConnected && extensionError" class="mt-2 text-xs text-red-300 bg-red-900/20 border border-red-800 rounded p-2">
          {{ extensionError }}
        </div>
        
        <!-- Extension Not Found Help -->
        <div v-if="!isCheckingExtension && !nostrStore.extensionAvailable" class="mt-2 text-xs text-gray-400">
          <p>Install a Nostr browser extension like:</p>
          <ul class="mt-1 space-y-1">
            <li>• Alby</li>
            <li>• nos2x</li>
            <li>• Flamingo</li>
          </ul>
        </div>
      </div>
      
      <!-- Connect options (only shown when not connected) -->
      <div v-if="!nostrStore.isConnected" class="space-y-3">
        <!-- Browser Extension Button -->
        <button 
          @click="connectWithExtension"
          :disabled="!nostrStore.extensionAvailable || isCheckingExtension || nostrStore.isConnecting"
          :class="[
            'w-full flex items-center justify-center gap-3 px-4 py-3 rounded-sm transition-colors font-medium',
            nostrStore.extensionAvailable && !isCheckingExtension && !nostrStore.isConnecting
              ? 'bg-purple-600 hover:bg-purple-700 text-white cursor-pointer'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          ]"
        >
          <span v-if="isCheckingExtension">Detecting Extension...</span>
          <span v-else-if="nostrStore.isConnecting">Connecting...</span>
          <span v-else-if="nostrStore.extensionAvailable">Connect with Browser Extension</span>
          <span v-else>Browser Extension Required</span>
        </button>
        
        <!-- Retry Button (only shown when extension not found) -->
        <button 
          v-if="!isCheckingExtension && !nostrStore.extensionAvailable"
          @click="retryDetection"
          class="w-full flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-sm transition-colors text-sm"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
          </svg>
          Check Again
        </button>

      </div>
    </div>
  </div>
</template>

<style scoped>

</style>