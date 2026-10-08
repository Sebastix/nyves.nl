<script setup>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger)

const { t, tm, rt } = useI18n()

// Language independent metadata for every timeline event.
// The `id` links each entry to its translated content in the i18n locale files
// (see `tijdlijn.events.<id>` in i18n/locales/nl.json and en.json).
const timelineMeta = [
  {
    id: 'idea',
    type: 'idea',
    link: 'https://jumble.social/notes/nevent1qvzqqqqqqypzqpnrnguxe8qszsshvgkvhn6qjzxy7xsvx03rlrtddr62haj4lrm3qyt8wumn8ghj7un9d3shjtnyd968gmewwp6kytcpz9mhxue69uhkummnw3ezuamfdejj7qpqu9gtcehnm3wygz60d4um52vkslwqyg2tt2dmq63neyqqc5kf9mkq8c3xjp'
  },
  {
    id: 'domain-registration',
    type: 'milestone'
  },
  {
    id: 'first-pitch',
    type: 'development'
  },
  {
    id: 'sidnfonds-application',
    type: 'development'
  },
  {
    id: 'sidnfonds-pioneer-project',
    type: 'success',
    link: 'https://www.sidnfonds.nl/projecten/nyves',
    image: '/sidnfinds-logo.svg',
    imageAlt: 'SIDNfonds logo'
  },
  {
    id: 'development-start',
    type: 'development'
  },
  {
    id: 'first-test-migrations',
    type: 'development',
    link: 'https://relay.nyves.nl'
  },
  {
    id: 'first-media-attention',
    type: 'milestone',
    link: 'https://video.angrynerdspodcast.nl/w/cS5wxXgRKn4hQ3dRSZJrJD?start=57m55s'
  },
  {
    id: 'keypair-migration-start',
    type: 'development'
  },
  {
    id: 'custom-relay-live',
    type: 'development',
    link: 'https://rely.nyves.nl'
  },
  {
    id: 'keypair-migration-completed',
    type: 'development'
  },
  {
    id: 'usernames-migration-start',
    type: 'development'
  },
  {
    id: 'hyves-back-online',
    type: 'milestone'
  },
  {
    id: 'follow-the-money',
    type: 'success',
    link: 'https://www.ftm.nl/artikelen/hyves-draait-wel-op-amerikaanse-tech?share=ipZHnrJIjxaSnEEIeIsA9k%2BoqGSc6qziqkqbusVNoBnbHnbWal5bikgEZLHlQRI%3D'
  },
  {
    id: 'proprivacy-podcast',
    type: 'development',
    link: 'https://www.youtube.com/watch?v=3nMuQf8Hdto&t=1319s'
  },
  {
    id: 'aos-collective-donation',
    type: 'success',
    link: 'https://opencollective.com/aos-collective/expenses/348513'
  },
  {
    id: 'angry-nerds-podcast',
    type: 'development',
    link: 'https://video.angrynerdspodcast.nl/w/fVpKCdbBECum9TYGqKkSU8?start=1h30m'
  },
]

// Merge the localized date/title/description into the language independent metadata
const timelineEvents = computed(() =>
  timelineMeta.map((meta) => {
    const content = tm(`tijdlijn.events.${meta.id}`) || {}
    return {
      ...meta,
      date: rt(content.date ?? ''),
      title: rt(content.title ?? ''),
      description: rt(content.description ?? ''),
    }
  })
)

const parseDate = (dateString) => {
  if (!dateString) {
    return { day: '', month: '', year: '' }
  }

  // Month names for all supported locales (Dutch + English)
  const months = {
    januari: 0, februari: 1, maart: 2, april: 3, mei: 4, juni: 5,
    juli: 6, augustus: 7, september: 8, oktober: 9, november: 10, december: 11,
    january: 0, february: 1, march: 2, may: 4, june: 5, july: 6,
    august: 7, october: 9
  }

  // Handle "1 november 2024" format
  const dayMonthYearMatch = dateString.match(/(\d+)\s+(\w+)\s+(\d{4})/)
  if (dayMonthYearMatch) {
    const [, day, month, year] = dayMonthYearMatch
    const monthIndex = months[month.toLowerCase()]
    if (monthIndex !== undefined) {
      return { day: day.padStart(2, '0'), month: month.charAt(0).toUpperCase() + month.slice(1), year }
    }
  }

  // Handle "Februari 2025" format  
  const monthYearMatch = dateString.match(/(\w+)\s+(\d{4})/)
  if (monthYearMatch) {
    const [, month, year] = monthYearMatch
    return { day: '', month: month.charAt(0).toUpperCase() + month.slice(1), year }
  }

  return { day: '', month: dateString, year: '' }
}

const getEventColor = (type) => {
  const colors = {
    idea: 'bg-yellow-100',
    milestone: 'bg-blue-100',
    application: 'bg-gray-100',
    success: 'bg-green-100',
  }
  return colors[type] || 'bg-gray-100'
}

// Animation setup
onMounted(() => {
  nextTick(() => {
    // Animate timeline items on scroll - no initial hiding
    gsap.utils.toArray('.timeline-item').forEach((item, index) => {
      // Set initial state only for animation
      gsap.fromTo(item, 
        {
          opacity: 0,
          x: -50,
          scale: 0.95
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
            once: false
          }
        }
      )
    })
    
    // Animate final item
    const finalItem = document.querySelector('.timeline-final')
    if (finalItem) {
      gsap.fromTo(finalItem,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: finalItem,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }
  })
})
useSeoMeta({
  title: () => `${t('tijdlijn.title')} - Nyves`,
  description: () => t('tijdlijn.subtitle')
})
</script>

<template>
  <div class="min-h-screen py-12">
    <section class="leading-relaxed max-w-4xl mx-auto px-4">
      <h1 class="text-4xl text-nyves-blue mb-8 text-center font-bold">{{ $t('tijdlijn.title') }}</h1>
      <p class="text-center text-xl mb-12 text-gray-600">
        {{ $t('tijdlijn.subtitle') }}
      </p>
      
      <!-- Timeline -->
      <div class="relative">
        <!-- Vertical line -->
        <div class="absolute left-10 top-0 bottom-0 w-0.5 bg-nyves-blue/30"></div>
        
        <!-- Timeline items -->
        <div class="space-y-8">
          <div 
            v-for="(event, index) in timelineEvents" 
            :key="event.id"
            class="relative flex items-start group timeline-item"
          >
            <!-- Date calendar -->
            <div class="absolute left-0 w-20 h-24 bg-white rounded-sm shadow-lg transition-all duration-300 group-hover:shadow-xl z-10 overflow-hidden timeline-calendar">
              <!-- Calendar header -->
              <div class="bg-nyves-blue h-6 w-full flex items-center justify-center">
                <div class="text-sm font-semibold text-white uppercase">
                  {{ parseDate(event.date).year }}
                </div>
              </div>
              <!-- Calendar body -->
              <div class="flex flex-col items-center justify-center h-18 bg-white">
                <div v-if="parseDate(event.date).day" class="text-3xl font-bold text-gray-800 leading-none">
                  {{ parseDate(event.date).day }}
                </div>
                <div v-if="parseDate(event.date).month" class="text-sm lowercase font-bold text-gray-500 leading-none mt-1">
                  {{ parseDate(event.date).month }}
                </div>
              </div>
            </div>
            
            <!-- Content card -->
            <div class="ml-24 w-full timeline-content">
              <div :class="[
                'p-6 rounded-lg shadow-lg transition-all duration-300',
                'hover:shadow-xl',
                getEventColor(event.type)
              ]">
                <!-- Content layout: text and image side by side -->
                <div class="flex flex-col md:flex-row gap-4 items-start">
                  <!-- Text content -->
                  <div class="flex-1">
                    <!-- Date -->
                    <div class="text-sm mb-2">
                      {{ event.date }}
                    </div>
                    <!-- Title -->
                    <h3 class="text-xl font-bold text-gray-800 mb-3">
                      {{ event.title }}
                    </h3>
                    <!-- Description -->
                    <p class="text-gray-700 leading-relaxed">
                      {{ event.description }}
                    </p>
                    <!-- Link if available -->
                    <a
                        v-if="event.link"
                        :href="event.link"
                        target="_blank"
                        class="inline-flex items-center text-nyves-blue hover:text-nyves-blue-secundary transition-colors duration-200 font-medium"
                    >
                      <span class="mr-2">{{ $t('tijdlijn.view_details') }}</span>
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                    </a>
                  </div>
                  
                  <!-- Image if available -->
                  <div v-if="event.image" class="flex-shrink-0 w-full md:w-1/2 self-start">
                    <img 
                      :src="event.image" 
                      :alt="event.imageAlt || event.title"
                      class="w-full rounded-lg"
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Final dot -->
        <div class="relative flex items-start mt-8 timeline-final">
          <div class="absolute left-0 w-20 h-24 bg-white rounded-lg shadow-lg overflow-hidden">
            <!-- Calendar header -->
            <div class="bg-nyves-orange h-6 w-full flex items-center justify-center">
              <div class="text-xs font-semibold text-white uppercase">{{ $t('tijdlijn.now') }}</div>
            </div>
            <!-- Calendar body -->
            <div class="flex flex-col items-center justify-center h-18 bg-white">
              <div class="text-2xl">⭐</div>
            </div>
          </div>
          <div class="ml-24 w-full">
            <div class="p-6 rounded-lg bg-nyves-orange/10 shadow-md">
              <div class="text-sm font-semibold text-nyves-orange mb-2">
                {{ $t('tijdlijn.present') }}
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-3">
                {{ $t('tijdlijn.story_continues') }}
              </h3>
              <p class="text-gray-700 leading-relaxed">
                {{ $t('tijdlijn.story_continues_text') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>

</style>
