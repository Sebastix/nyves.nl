<script setup>
import { ref, onMounted } from 'vue'

const videoRef = ref(null)
const currentSegment = ref(0)
const isPlaying = ref(false)

// Parse timestamp to seconds
const parseTimestamp = (timestamp) => {
  const [hours, minutes, seconds] = timestamp.split(':')
  const [secs, ms] = seconds.split(',')
  return parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(secs) + parseInt(ms) / 1000
}

// Transcript segments with start/end times
const segments = [
  { start: 0, end: 3.2, text: "Let's bring Hyves back." },
  { start: 3.2, end: 10.8, text: "Profile by profile, note by note, picture by picture." },
  { start: 10.8, end: 18, text: "Before Hyves went dark, thousands of people backed up their profile with Hyves Backup." },
  { start: 18, end: 26, text: "That was a desktop app I built that stored all your Hyves content locally on your own computer." },
  { start: 26, end: 32.5, text: "Valuable content, valuable memories that form a digital memory and should be preserved." },
  { start: 32.5, end: 40, text: "My idea is to invite everyone who made a backup" },
  { start: 40, end: 47, text: "to turn that backup back into a Hyves profile, through the app Nyves." },
  { start: 47, end: 56, text: "Just like Hyves Backup, this is a web app that runs locally in your browser," },
  { start: 56, end: 60, text: "with no server and no platform." },
  { start: 60, end: 64.5, text: "Because data is exchanged through what are called relays." },
  { start: 64.5, end: 73, text: "On Nyves you can also browse profiles and leave notes, just like before." },
  { start: 73, end: 80, text: "This is all made possible by a new social networking protocol called Nostr." },
  { start: 80, end: 87, text: "So yes, once again: Nyves is an app, and therefore not a platform." },
  { start: 87, end: 94.5, text: "With Nyves we can bring back the authentic feeling of social media." },
  { start: 94.5, end: 102, text: "Social media where connection comes first, where your friends and their content come first." },
  { start: 102, end: 108.4, text: "Social media without third parties, the platforms, doing all they can to grab as much attention as possible," },
  { start: 108.4, end: 111, text: "for commercial interests." },
  { start: 111, end: 113.5, text: "Nyves, with an N." },
  { start: 113.5, end: 116.5, text: "This is the idea I'd love to turn into a proof of concept." },
  { start: 116.5, end: 119, text: "Thank you." }
]

const updateActiveSegment = () => {
  if (!videoRef.value) return
  
  const currentTime = videoRef.value.currentTime
  const activeIndex = segments.findIndex((segment, index) => {
    const nextSegment = segments[index + 1]
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
            <span>{{ isPlaying ? 'Pause' : 'Play video' }}</span>
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