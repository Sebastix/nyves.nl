<script setup>
import { onMounted, ref } from 'vue'
import { useRelayHealth } from '~/composables/useRelayHealth'

const { t, locale } = useI18n()

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
  return date.toLocaleTimeString(locale.value, { 
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
    items.push(t('relayHealth.limitation_message_length', [(limitations.max_message_length / 1024).toFixed(1)]))
  }
  if (limitations.max_subscriptions) {
    items.push(t('relayHealth.limitation_subscriptions', [limitations.max_subscriptions]))
  }
  if (limitations.max_limit) {
    items.push(t('relayHealth.limitation_limit', [limitations.max_limit]))
  }
  if (limitations.auth_required) {
    items.push(t('relayHealth.limitation_auth'))
  }
  if (limitations.payment_required) {
    items.push(t('relayHealth.limitation_payment'))
  }
  if (limitations.min_pow_difficulty) {
    items.push(t('relayHealth.limitation_pow', [limitations.min_pow_difficulty]))
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
            {{ healthData.relayInfo?.name || $t('relayHealth.relay_status') }}
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
            :title="$t('relayHealth.refreshed')"
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
              :title="showDetails ? $t('relayHealth.hide_details') : $t('relayHealth.show_details')"
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
          <strong>{{ $t('relayHealth.connection_error') }}</strong> {{ healthData.error }}
        </p>
      </div>

      <!-- Loading indicator -->
      <div v-if="healthData.isConnecting" class="mt-3 flex items-center space-x-2 text-sm text-gray-500">
        <svg class="animate-spin w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>{{ $t('relayHealth.testing') }}</span>
      </div>
    </div>

    <!-- Detailed Info (uitklapbaar) -->
    <div v-if="showDetails" class="border-t border-gray-100 p-4 bg-gray-50">

      <p class="text-xs mb-4">
        <i18n-t keypath="relayHealth.about_nip50" tag="span">
          <a href="https://nips.nostr.com/50" target="_blank">NIP-50 Search Capability</a>
          <a href="https://rely.nyves.nl" target="_blank">https://rely.nyves.nl</a>
        </i18n-t>
      </p>
      
      <!-- Basic Connection Info -->
      <div class="mb-6">
        <h4 class="text-md font-medium text-gray-900 mb-3 flex items-center">
          <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          {{ $t('relayHealth.connection_details') }}
        </h4>
        
        <div class="bg-white rounded border p-3 space-y-2 text-sm">
          <!-- Relay URL -->
          <div class="flex justify-between">
            <span class="font-medium text-gray-600">{{ $t('relayHealth.relay') }}</span>
            <span class="text-gray-900 font-mono">{{ getRelayDisplayName(relayUrl) }}</span>
          </div>

          <!-- Verbinding Status -->
          <div class="flex justify-between">
            <span class="font-medium text-gray-600">{{ $t('relayHealth.status') }}</span>
            <span class="font-medium" :class="getStatusColor()">
              {{ getStatusText() }}
            </span>
          </div>

          <!-- Response Time -->
          <div v-if="healthData.responseTime !== null" class="flex justify-between">
            <span class="font-medium text-gray-600">{{ $t('relayHealth.response_time') }}</span>
            <span class="text-gray-900">{{ getResponseTimeDisplay() }}</span>
          </div>

          <!-- Event Count -->
          <div v-if="getEventCountDisplay()" class="flex justify-between">
            <span class="font-medium text-gray-600">{{ $t('relayHealth.event_count') }}</span>
            <span class="text-gray-900">{{ getEventCountDisplay() }}</span>
          </div>

          <!-- Laatste Check -->
          <div v-if="healthData.lastChecked" class="flex justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
            <span>{{ $t('relayHealth.last_checked') }}</span>
            <span>{{ formatLastChecked(healthData.lastChecked) }}</span>
          </div>
        </div>
      </div>

      <!-- NIP-11 Relay Information -->
      <div v-if="healthData.relayInfo" class="mb-6">
        <h4 class="text-md font-medium text-gray-900 mb-3 flex items-center">
          <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
          {{ $t('relayHealth.relay_info') }}
        </h4>
        
        <div class="bg-white rounded border p-3 space-y-2 text-sm">
          <!-- Beschrijving -->
          <div v-if="healthData.relayInfo.description">
            <div class="font-medium text-gray-600">{{ $t('relayHealth.description') }}</div>
            <div class="text-gray-900 text-xs leading-relaxed whitespace-pre-line">{{ healthData.relayInfo.description }}</div>
          </div>

          <!-- Software -->
          <div v-if="getRelaySoftware()">
            <div class="font-medium text-gray-600">{{ $t('relayHealth.software') }}</div>
            <div class="text-gray-900">{{ getRelaySoftware() }}</div>
          </div>

          <!-- Contact Info -->
          <div v-if="healthData.relayInfo.contact">
            <div class="font-medium text-gray-600">{{ $t('relayHealth.contact') }}</div>
            <div class="text-gray-900 font-mono text-xs">{{ healthData.relayInfo.contact }}</div>
          </div>

          <!-- Admin Pubkey -->
          <div v-if="healthData.relayInfo.pubkey">
            <div class="font-medium text-gray-600">{{ $t('relayHealth.admin_pubkey') }}</div>
            <div class="text-gray-900 font-mono text-xs break-all">{{ healthData.relayInfo.pubkey }}</div>
          </div>

          <!-- Ondersteunde NIPs -->
          <div v-if="getSupportedNipsDisplay()">
            <div class="font-medium text-gray-600">{{ $t('relayHealth.supported_nips') }}</div>
            <div class="text-gray-900 text-xs">{{ getSupportedNipsDisplay() }}</div>
          </div>

          <!-- Payment info -->
          <div v-if="healthData.relayInfo.fees">
            <div class="font-medium text-gray-600">{{ $t('relayHealth.fees') }}</div>
            <div class="text-gray-900 text-xs">{{ $t('relayHealth.payment_required_details') }}</div>
          </div>
        </div>

        <!-- NIP-11 Error -->
        <div v-if="healthData.relayInfoError" class="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
          <p class="text-yellow-700">
            <strong>{{ $t('relayHealth.nip11_error') }}</strong> {{ healthData.relayInfoError }}
          </p>
        </div>
      </div>

      <!-- Server Limitations -->
      <div v-if="healthData.relayInfo?.limitation" class="mb-6">
        <h4 class="text-md font-medium text-gray-900 mb-3 flex items-center">
          <span class="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
          {{ $t('relayHealth.limitations') }}
        </h4>
        
        <div class="bg-white rounded border p-3">
          <div class="grid grid-cols-1 gap-1 text-xs">
            <div v-for="limitation in getLimitations()" :key="limitation" class="text-gray-700">
              • {{ limitation }}
            </div>
            <div v-if="getLimitations().length === 0" class="text-gray-500 italic">
              {{ $t('relayHealth.no_limitations') }}
            </div>
          </div>
        </div>
      </div>

      <!-- Event Count Details -->
      <div v-if="healthData.eventCount || healthData.eventCountError" class="mb-6">
        <h4 class="text-md font-medium text-gray-900 mb-3 flex items-center">
          <span class="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
          {{ $t('relayHealth.event_stats') }}
        </h4>
        
        <div class="bg-white rounded border p-3 text-sm">
          <div v-if="healthData.eventCount">
            <div class="font-medium text-gray-600">{{ $t('relayHealth.total_events') }}</div>
            <div class="text-gray-900 text-lg font-bold">{{ getEventCountDisplay() }}</div>
            <div v-if="healthData.eventCount.approximate" class="text-xs text-gray-500 mt-1">
              {{ $t('relayHealth.approximate') }}
            </div>
          </div>
          
          <div v-if="healthData.eventCountError" class="text-red-600 text-xs">
            {{ $t('relayHealth.count_failed', [healthData.eventCountError]) }}
          </div>
        </div>
      </div>

      <!-- Belangrijke NIPs -->
      <div class="mb-4">
        <h4 class="text-md font-medium text-gray-900 mb-3 flex items-center">
          <span class="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>
          {{ $t('relayHealth.feature_support') }}
        </h4>
        
        <div class="bg-white rounded border p-3">
          <div class="text-xs space-y-1">
            <div class="flex justify-between">
              <span>{{ $t('relayHealth.nip11_label') }}</span>
              <span :class="healthData.relayInfo ? 'text-green-600' : 'text-red-600'">
                {{ healthData.relayInfo ? '✓' : '✗' }}
              </span>
            </div>
            <div class="flex justify-between">
              <span>{{ $t('relayHealth.nip45_label') }}</span>
              <span :class="healthData.eventCount ? 'text-green-600' : 'text-red-600'">
                {{ healthData.eventCount ? '✓' : '✗' }}
              </span>
            </div>
            <div class="flex justify-between">
              <span>{{ $t('relayHealth.nip50_label') }}</span>
              <span :class="supportsNip(50) ? 'text-green-600' : 'text-gray-400'">
                {{ supportsNip(50) ? '✓' : '?' }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Info tekst -->
      <div class="text-xs text-gray-400 text-center pt-2 border-t border-gray-200">
        <p>{{ $t('relayHealth.auto_check', [Math.floor(checkInterval / 1000)]) }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>