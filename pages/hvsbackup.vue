<script setup>
const { t } = useI18n()

// SEO Meta tags
useSeoMeta({
  title: () => `${t('HVSbackup')} - Nyves`,
  description: () => t('hvsbackup.seo_description')
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
      ruffleError.value = 'hvsbackup.error_cdn'
      isLoading.value = false
    }
    
    // Append script to head
    document.head.appendChild(script)
    
  } catch (error) {
    console.error('❌ Error loading Ruffle:', error)
    // keep the technical detail in the console, show a translated message
    ruffleError.value = 'hvsbackup.error_unknown'
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
    ruffleError.value = 'hvsbackup.error_player'
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
  <section>

    <h1 class="my-3 text-3xl font-bold text-center text-nyves-blue mb-4">
      {{ $t('HVSbackup') }}
    </h1>

    <div class="my-4 lg:max-w-2/3 lg:mx-auto">
      <p class="text-gray-600 text-lg lg:text-xl leading-6">
        {{ $t('hvsbackup.intro_1') }}
        <br />
        <br />
        {{ $t('hvsbackup.intro_2') }}
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="rounded-sm text-center">
      <div class="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent text-blue-600 rounded-full mb-4"></div>
      <p class="text-gray-600">{{ $t('hvsbackup.loading_title') }}</p>
      <p class="text-sm text-gray-500 mt-2">{{ $t('hvsbackup.loading_hint') }}</p>
    </div>

    <!-- Error State -->
    <div v-else-if="ruffleError" class="bg-red-50 border border-red-200 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-red-800 mb-2">❌ {{ $t('hvsbackup.error_title') }}</h3>
      <p class="text-red-700 mb-4">{{ $t(ruffleError) }}</p>
      <button 
        @click="retryLoad"
        class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
      >
        🔄 {{ $t('hvsbackup.retry') }}
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
          <div class="animate-pulse">🎮 {{ $t('hvsbackup.swf_loading') }}</div>
        </div>
      </div>
    </div>
    <div class="my-8 flex flex-col lg:flex-row gap-x-2">
      <div class="grow lg:max-w-1/2 testimonials">
        <h2 class="text-2xl font-bold mb-2">{{ $t('hvsbackup.testimonials_title') }}</h2>
        <blockquote>{{ $t('hvsbackup.testimonial_1') }}
          <small>Ron Evers, <a href="https://web.archive.org/web/20131119232322/https://www.facebook.com/hvsbackup/posts/603935849652915?comment_id=5986671&amp;offset=0&amp;total_comments=1¬if_t=share_comment">Facebook</a></small>
        </blockquote>
        <blockquote>{{ $t('hvsbackup.testimonial_2') }}
          <small>@Marketim, <a href="https://web.archive.org/web/20131119232322/http://twitter.com/Marketim/statuses/162241837178945536" target="_blank">Twitter</a></small>
        </blockquote>
        <blockquote>{{ $t('hvsbackup.testimonial_3') }}
          <small>@XonaTanoX, <a href="https://web.archive.org/web/20131119232322/http://twitter.com/XonaTanoX/statuses/120962322893242368" target="_blank">Twitter</a></small>
        </blockquote>
        <blockquote>{{ $t('hvsbackup.testimonial_4') }}
          <small>Martin Gijzemijter, <a href="https://web.archive.org/web/20131119232322/http://computertotaal.nl/" target="_blank">ComputerTotaal!</a></small>
        </blockquote>
        <blockquote>{{ $t('hvsbackup.testimonial_5') }}
          <small>Marloes Hentzen</small>
        </blockquote>
        <blockquote>{{ $t('hvsbackup.testimonial_6') }}
          <small>Leon Krijnen, <a href="https://web.archive.org/web/20131119232322/http://www.dutchcowboys.nl/" target="_blank">Dutchcowboys</a></small>
        </blockquote>
        <blockquote>{{ $t('hvsbackup.testimonial_7') }}
          <small>Sebastiaan Jacobs</small>
        </blockquote>
        <blockquote>{{ $t('hvsbackup.testimonial_8') }}
          <small>Chantal Pruim, <a href="https://web.archive.org/web/20131119232322/http://www.facebook.com/permalink.php?story_fbid=266069983439505&amp;id=150183405028164" target="_blank">{{ $t('hvsbackup.source_facebook_wall') }}</a></small>
        </blockquote>
        <a href="https://web.archive.org/web/20131119232322/http://hvsbackup.nl/" class="block text-sm my-4">{{ $t('hvsbackup.wayback_link') }}</a>
      </div>
      <div class="grow lg:max-w-1/2">
        <img src="/2012-hvsbackup_bndestem.jpg" class="rounded-sm" />
      </div>
    </div>
  </section>
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