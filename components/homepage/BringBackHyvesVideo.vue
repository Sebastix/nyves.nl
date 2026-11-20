<script setup>
import { ref, onMounted, computed } from 'vue'

const { tm, rt } = useI18n()

const videoRef = ref(null)
const currentSegment = ref(0)
const isPlaying = ref(false)

// Parse timestamp to seconds
const parseTimestamp = (timestamp) => {
  const [hours, minutes, seconds] = timestamp.split(':')
  const [secs, ms] = seconds.split(',')
  return parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(secs) + parseInt(ms) / 1000
}

// Transcript segments (start/end times live in the locale files, the text is translated)
// The narration itself is English, so the nl transcript is a translation of it.
//
// `tm()` only gives the *structure* (the array of segments). @nuxtjs/i18n
// precompiles locale messages at build time, so each `text` is a message AST
// object, not a string — it has to be resolved with `rt()` before rendering,
// otherwise the template would dump the AST as JSON. Same approach as
// pages/tijdlijn/index.vue.
const segments = computed(() =>
  (tm('home.video.transcript') || []).map((segment) => ({
    ...segment,
    text: rt(segment.text),
  }))
)

const updateActiveSegment = () => {
  if (!videoRef.value) return
  
  const currentTime = videoRef.value.currentTime
  const activeIndex = segments.value.findIndex((segment, index) => {
    const nextSegment = segments.value[index + 1]
    return currentTime >= segment.start && (nextSegment ? currentTime < nextSegment.start : true)
  })
  
  if (activeIndex !== -1) {
    currentSegment.value = activeIndex
  }
}

const togglePlayPause = () => {
  if (!videoRef.value) return
  
  if (isPlaying.value) {
    videoRef.value.pause()
  } else {
    videoRef.value.play()
  }
}

onMounted(() => {
  if (videoRef.value) {
    videoRef.value.addEventListener('timeupdate', updateActiveSegment)
    videoRef.value.addEventListener('play', () => {
      isPlaying.value = true
    })
    videoRef.value.addEventListener('pause', () => {
      isPlaying.value = false
    })
    videoRef.value.addEventListener('ended', () => {
      isPlaying.value = false
    })
  }
})
</script>
<template>
  <section class="mb-8">
    <div class="flex flex-row gap-4">
      <div class="w-1/2">
        <!-- Play/Pause Button -->
        <div class="mb-4">
          <button 
            @click="togglePlayPause"
            class="flex items-center mx-auto gap-2 pl-3 pr-5 py-2 cursor-pointer font-bold bg-nyves-blue/90 text-white rounded-lg hover:bg-nyves-blue transition-colors duration-200"
          >
            <!-- Play Icon -->
            <svg v-if="!isPlaying" class="size-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 5v10l8-5-8-5z"/>
            </svg>
            <!-- Pause Icon -->
            <svg v-else class="size-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6 4h2v12H6V4zm6 0h2v12h-2V4z"/>
            </svg>
            <span>{{ isPlaying ? $t('home.video.pause') : $t('home.video.play') }}</span>
          </button>
        </div>
        
        <p class="lg:leading-relaxed transcript text-sm lg:text-lg italic">
          "
          <span
            v-for="(segment, index) in segments" 
            :key="index"
            :class="{ 
              'bg-nyves-orange/35 text-orange-800 p-1 font-bold rounded': currentSegment === index,
              'transition-colors duration-200': true
            }"
            class="transcript-line"
          >
            {{ segment.text }}
          </span>
          "
        </p>
        <div class="text-right my-4">
        - Sebastian Hagens
        </div>
      </div>
      <div class="w-1/2">
        <video ref="videoRef" class="rounded-sm" controls>
          <source src="https://relay.nyves.nl/1de1afa23938343cc8dd20907151c2ca997080b28e014b58d28e4bc7f54e6c39.mp4"></source>
        </video>
      </div>
    </div>
  </section>
</template>

<style scoped>
.transcript-line {
  display: inline;
  margin-right: 0.25rem;
}

.transcript-line:not(:last-child)::after {
  content: ' ';
}
</style>