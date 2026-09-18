<script setup>
import { onMounted, ref } from 'vue'
import { useRelayHealth } from '~/composables/useRelayHealth'

const props = defineProps({
  relayUrl: {
    type: String,
    required: true
  },
  autoStart: {
    type: Boolean,
    default: true
  },
  checkInterval: {
    type: Number,
    default: 30000 // 30 seconden
  }
})

const {
  healthData,
  startHealthCheck,
  stopHealthCheck,
  refreshHealth,
  fetchExtraInfo,
  getStatusColor,
  getStatusText,
  getResponseTimeDisplay,
  getEventCountDisplay,
  getSupportedNipsDisplay,
  supportsNip,
  getRelaySoftware
} = useRelayHealth(props.relayUrl)

// UI state
const showDetails = ref(false)

// Auto-start health checking
onMounted(() => {
  if (props.autoStart) {
    startHealthCheck(props.checkInterval)
  }
})

// Format laatste check tijd
const formatLastChecked = (date) => {
  if (!date) return ''
  return date.toLocaleTimeString('nl-NL', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  })
}

// Get relay display naam (zonder wss://)
const getRelayDisplayName = (url) => {
  return url.replace('wss://', '').replace('ws://', '')
}

// Toggle details
const toggleDetails = () => {
  showDetails.value = !showDetails.value
}

// Refresh all data
const refreshAll = () => {
  refreshHealth()
}

// Get limitation display
const getLimitations = () => {
  const limitations = healthData.value.relayInfo?.limitation
  if (!limitations) return []
  
  const items = []
  
  if (limitations.max_message_length) {
    items.push(`Max bericht: ${(limitations.max_message_length / 1024).toFixed(1)}KB`)
  }
  if (limitations.max_subscriptions) {
    items.push(`Max subscriptions: ${limitations.max_subscriptions}`)
  }
  if (limitations.max_limit) {
    items.push(`Max limit: ${limitations.max_limit}`)
  }
  if (limitations.auth_required) {
    items.push('Auth vereist')
  }
  if (limitations.payment_required) {
    items.push('Betaling vereist')
  }
  if (limitations.min_pow_difficulty) {
    items.push(`Min PoW: ${limitations.min_pow_difficulty}`)
  }
  
  return items
}
</script>

<template>
  <div class="bg-white border border-gray-200 rounded-sm overflow-hidden">
    <!-- Compact Header -->
    <div class="px-3 py-2">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <div class="absolute w-3 h-3 rounded-full animate-ping" :class="{
            'bg-green-500': healthData.status === 'connected',
            'bg-yellow-500': healthData.status === 'connecting',
            'bg-red-500': healthData.status === 'error',
            'bg-gray-400': healthData.status === 'disconnected'
          }"></div>
          <div class="w-3 h-3 rounded-full animate-pulse" :class="{
            'bg-green-500': healthData.status === 'connected',
            'bg-yellow-500': healthData.status === 'connecting',
            'bg-red-500': healthData.status === 'error',
            'bg-gray-400': healthData.status === 'disconnected'
          }"></div>
          <h3 class="text-sm font-medium text-gray-900">
            {{ healthData.relayInfo?.name || 'Relay Status' }}
          </h3>
          <span class="text-sm font-medium" :class="getStatusColor()">
            {{ getStatusText() }} <span class="text-black text-xs">{{ getResponseTimeDisplay() }}</span>
          </span>
        </div>
        
        <div class="flex items-center space-x-1">
          <!-- Refresh knop -->
          <button 
            @click="refreshAll"
            :disabled="healthData.isConnecting || healthData.isLoadingExtra"
            class="p-1.5 disabled:opacity-50 transition-colors cursor-pointer"
            title="Vernieuw status"
          >
            <svg 
              :class="{ 'animate-spin': healthData.isConnecting || healthData.isLoadingExtra }"
              class="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>

          <!-- Details toggle -->
          <button
              @click="toggleDetails"
              class="p-1.5 transition-colors cursor-pointer"
              :title="showDetails ? 'Verberg details' : 'Toon details'"
          >
            <svg
                class="w-4 h-4 transition-transform"
                :class="{ 'rotate-180': showDetails }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Main Error (alleen critieke fouten) -->
      <div v-if="healthData.error" class="mt-3 p-2 bg-red-50 border border-red-200 rounded">
        <p class="text-xs text-red-600">
          <strong>Verbindingsfout:</strong> {{ healthData.error }}
        </p>
      </div>

      <!-- Loading indicator -->
      <div v-if="healthData.isConnecting" class="mt-3 flex items-center space-x-2 text-sm text-gray-500">
        <svg class="animate-spin w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Relay verbinding testen...</span>
      </div>
    </div>

    <!-- Detailed Info (uitklapbaar) -->
    <div v-if="showDetails" class="border-t border-gray-100 p-4 bg-gray-50">

      <p class="text-xs mb-4">
        Nyves maakt gebruik van <a href="https://nips.nostr.com/50" target="_blank">NIP-50 Search Capability</a> om informatie te doorzoeken op de relay <a href="https://rely.nyves.nl" target="_blank">https://rely.nyves.nl</a>.
      </p>
      
      <!-- Basic Connection Info -->
      <div class="mb-6">
        <h4 class="text-md font-medium text-gray-900 mb-3 flex items-center">
          <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          Verbinding Details
        </h4>
        
        <div class="bg-white rounded border p-3 space-y-2 text-sm">
          <!-- Relay URL -->
          <div class="flex justify-between">
            <span class="font-medium text-gray-600">Relay:</span>
            <span class="text-gray-900 font-mono">{{ getRelayDisplayName(relayUrl) }}</span>
          </div>

          <!-- Verbinding Status -->
          <div class="flex justify-between">
            <span class="font-medium text-gray-600">Status:</span>
            <span class="font-medium" :class="getStatusColor()">
              {{ getStatusText() }}
            </span>
          </div>

          <!-- Response Time -->
          <div v-if="healthData.responseTime !== null" class="flex justify-between">
            <span class="font-medium text-gray-600">Response tijd:</span>
            <span class="text-gray-900">{{ getResponseTimeDisplay() }}</span>
          </div>

          <!-- Event Count -->
          <div v-if="getEventCountDisplay()" class="flex justify-between">
            <span class="font-medium text-gray-600">Aantal events:</span>
            <span class="text-gray-900">{{ getEventCountDisplay() }}</span>
          </div>

          <!-- Laatste Check -->
          <div v-if="healthData.lastChecked" class="flex justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
            <span>Laatst gecontroleerd:</span>
            <span>{{ formatLastChecked(healthData.lastChecked) }}</span>
          </div>
        </div>
      </div>

      <!-- NIP-11 Relay Information -->
      <div v-if="healthData.relayInfo" class="mb-6">
        <h4 class="text-md font-medium text-gray-900 mb-3 flex items-center">
          <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
          Relay Informatie (NIP-11)
        </h4>
        
        <div class="bg-white rounded border p-3 space-y-2 text-sm">
          <!-- Beschrijving -->
          <div v-if="healthData.relayInfo.description">
            <div class="font-medium text-gray-600">Beschrijving:</div>
            <div class="text-gray-900 text-xs leading-relaxed whitespace-pre-line">{{ healthData.relayInfo.description }}</div>
          </div>

          <!-- Software -->
          <div v-if="getRelaySoftware()">
            <div class="font-medium text-gray-600">Software:</div>
            <div class="text-gray-900">{{ getRelaySoftware() }}</div>
          </div>

          <!-- Contact Info -->
          <div v-if="healthData.relayInfo.contact">
            <div class="font-medium text-gray-600">Contact:</div>
            <div class="text-gray-900 font-mono text-xs">{{ healthData.relayInfo.contact }}</div>
          </div>

          <!-- Admin Pubkey -->
          <div v-if="healthData.relayInfo.pubkey">
            <div class="font-medium text-gray-600">Admin Pubkey:</div>
            <div class="text-gray-900 font-mono text-xs break-all">{{ healthData.relayInfo.pubkey }}</div>
          </div>

          <!-- Ondersteunde NIPs -->
          <div v-if="getSupportedNipsDisplay()">
            <div class="font-medium text-gray-600">Ondersteunde NIPs:</div>
            <div class="text-gray-900 text-xs">{{ getSupportedNipsDisplay() }}</div>
          </div>

          <!-- Payment info -->
          <div v-if="healthData.relayInfo.fees">
            <div class="font-medium text-gray-600">Tarieven:</div>
            <div class="text-gray-900 text-xs">Betaling vereist (zie relay voor details)</div>
          </div>
        </div>

        <!-- NIP-11 Error -->
        <div v-if="healthData.relayInfoError" class="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
          <p class="text-yellow-700">
            <strong>NIP-11 fout:</strong> {{ healthData.relayInfoError }}
          </p>
        </div>
      </div>

      <!-- Server Limitations -->
      <div v-if="healthData.relayInfo?.limitation" class="mb-6">
        <h4 class="text-md font-medium text-gray-900 mb-3 flex items-center">
          <span class="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
          Server Beperkingen
        </h4>
        
        <div class="bg-white rounded border p-3">
          <div class="grid grid-cols-1 gap-1 text-xs">
            <div v-for="limitation in getLimitations()" :key="limitation" class="text-gray-700">
              • {{ limitation }}
            </div>
            <div v-if="getLimitations().length === 0" class="text-gray-500 italic">
              Geen specifieke beperkingen gevonden
            </div>
          </div>
        </div>
      </div>

      <!-- Event Count Details -->
      <div v-if="healthData.eventCount || healthData.eventCountError" class="mb-6">
        <h4 class="text-md font-medium text-gray-900 mb-3 flex items-center">
          <span class="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
          Event Statistieken (NIP-45)
        </h4>
        
        <div class="bg-white rounded border p-3 text-sm">
          <div v-if="healthData.eventCount">
            <div class="font-medium text-gray-600">Totaal aantal events:</div>
            <div class="text-gray-900 text-lg font-bold">{{ getEventCountDisplay() }}</div>
            <div v-if="healthData.eventCount.approximate" class="text-xs text-gray-500 mt-1">
              * Geschatte telling (HyperLogLog)
            </div>
          </div>
          
          <div v-if="healthData.eventCountError" class="text-red-600 text-xs">
            COUNT niet ondersteund of gefaald: {{ healthData.eventCountError }}
          </div>
        </div>
      </div>

      <!-- Belangrijke NIPs -->
      <div class="mb-4">
        <h4 class="text-md font-medium text-gray-900 mb-3 flex items-center">
          <span class="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>
          Functionaliteit Support
        </h4>
        
        <div class="bg-white rounded border p-3">
          <div class="text-xs space-y-1">
            <div class="flex justify-between">
              <span>NIP-11 (Relay Info):</span>
              <span :class="healthData.relayInfo ? 'text-green-600' : 'text-red-600'">
                {{ healthData.relayInfo ? '✓' : '✗' }}
              </span>
            </div>
            <div class="flex justify-between">
              <span>NIP-45 (Event Count):</span>
              <span :class="healthData.eventCount ? 'text-green-600' : 'text-red-600'">
                {{ healthData.eventCount ? '✓' : '✗' }}
              </span>
            </div>
            <div class="flex justify-between">
              <span>NIP-50 (Search):</span>
              <span :class="supportsNip(50) ? 'text-green-600' : 'text-gray-400'">
                {{ supportsNip(50) ? '✓' : '?' }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Info tekst -->
      <div class="text-xs text-gray-400 text-center pt-2 border-t border-gray-200">
        <p>Automatische controle elke {{ Math.floor(checkInterval / 1000) }} seconden</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>