<script setup>
// SEO Meta tags
useSeoMeta({
  title: 'HVSbackup',
  description: ''
})

// Ruffle state management
const ruffleLoaded = ref(false)
const ruffleError = ref(null)
const isLoading = ref(true)
const swfPath = '/2011-01-09_1445.swf'

/**
 * Load Ruffle WebAssembly Flash emulator
 */
const loadRuffle = async () => {
  try {
    isLoading.value = true
    ruffleError.value = null

    // Check if Ruffle is already loaded
    if (window.RufflePlayer) {
      console.log('✅ Ruffle already loaded')
      ruffleLoaded.value = true
      isLoading.value = false
      return
    }

    // Load Ruffle from CDN
    console.log('📦 Loading Ruffle from CDN...')
    
    // Create script element
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/@ruffle-rs/ruffle'
    script.async = true
    
    // Handle successful load
    script.onload = () => {
      console.log('✅ Ruffle script loaded successfully')
      
      // Wait for Ruffle to initialize
      if (window.RufflePlayer) {
        ruffleLoaded.value = true
        isLoading.value = false
        console.log('🎮 Ruffle player ready!')
      } else {
        // Fallback: wait a bit more for initialization
        setTimeout(() => {
          if (window.RufflePlayer) {
            ruffleLoaded.value = true
            isLoading.value = false
            console.log('🎮 Ruffle player ready (delayed)!')
          } else {
            throw new Error('Ruffle failed to initialize after loading')
          }
        }, 1000)
      }
    }
    
    // Handle load error
    script.onerror = (error) => {
      console.error('❌ Failed to load Ruffle script:', error)
      ruffleError.value = 'Failed to load Ruffle Flash emulator from CDN'
      isLoading.value = false
    }
    
    // Append script to head
    document.head.appendChild(script)
    
  } catch (error) {
    console.error('❌ Error loading Ruffle:', error)
    ruffleError.value = error.message || 'Unknown error loading Ruffle'
    isLoading.value = false
  }
}

/**
 * Initialize SWF player after Ruffle is loaded
 */
const initSwfPlayer = async () => {
  try {
    if (!window.RufflePlayer) {
      throw new Error('Ruffle not available')
    }

    const container = document.getElementById('swf-container')
    if (!container) {
      throw new Error('SWF container not found')
    }

    console.log('🎬 Initializing SWF player...')
    
    // Create Ruffle player
    const player = window.RufflePlayer.newest()
    const ruffleObject = player.createPlayer()
    
    // Configure player
    ruffleObject.style.width = '100%'
    ruffleObject.style.height = '600px'
    
    // Clear container and add player
    container.innerHTML = ''
    container.appendChild(ruffleObject)
    
    // Load SWF file
    await ruffleObject.load(swfPath)
    console.log('✅ SWF loaded successfully!')
    
  } catch (error) {
    console.error('❌ Error initializing SWF player:', error)
    ruffleError.value = error.message || 'Failed to initialize SWF player'
  }
}

/**
 * Retry loading Ruffle
 */
const retryLoad = () => {
  ruffleError.value = null
  loadRuffle()
}

// Watch for Ruffle load completion to initialize SWF
watch(ruffleLoaded, (loaded) => {
  if (loaded) {
    nextTick(initSwfPlayer)
  }
})

// Load Ruffle on component mount
onMounted(() => {
  loadRuffle()
})

// File size formatting helper
const formatFileSize = (bytes) => {
  const mb = bytes / (1024 * 1024)
  return `${mb.toFixed(1)} MB`
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-nyves-blue mb-4">
        HVSbackup
      </h1>
      <p class="text-gray-600 text-lg">
        HVSbackup video opname (Flash video) uit 2011, afgespeeld met de Ruffle emulator.
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="rounded-sm text-center">
      <div class="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent text-blue-600 rounded-full mb-4"></div>
      <p class="text-gray-600">Ruffle Flash emulator laden...</p>
      <p class="text-sm text-gray-500 mt-2">Dit kan een moment duren bij de eerste keer</p>
    </div>

    <!-- Error State -->
    <div v-else-if="ruffleError" class="bg-red-50 border border-red-200 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-red-800 mb-2">❌ Fout bij laden</h3>
      <p class="text-red-700 mb-4">{{ ruffleError }}</p>
      <button 
        @click="retryLoad"
        class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
      >
        🔄 Opnieuw proberen
      </button>
    </div>

    <!-- SWF Player Container -->
    <div v-else-if="ruffleLoaded">
      
      <!-- SWF Container -->
      <div 
        id="swf-container" 
        class="bg-white rounded-sm min-h-[600px] flex items-center justify-center"
      >
        <div class="text-gray-500">
          <div class="animate-pulse">🎮 SWF wordt geladen...</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Additional styles for Flash player container */
#swf-container ruffle-player {
  display: block;
  width: 100% !important;
  height: 600px !important;
}

/* Ensure proper responsive behavior */
@media (max-width: 768px) {
  #swf-container {
    min-height: 400px;
  }
  
  #swf-container ruffle-player {
    height: 400px !important;
  }
}
</style>