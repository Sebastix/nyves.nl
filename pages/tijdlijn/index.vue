<script setup>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger)

const timelineEvents = [
  {
    date: '1 november 2024',
    title: 'Alles begint met een idee',
    description: 'Dit zijn de eerste sporen in een gesprek tussen Yme Bosma en Sebastian Hagens.',
    link: 'https://jumble.social/notes/nevent1qvzqqqqqqypzqpnrnguxe8qszsshvgkvhn6qjzxy7xsvx03rlrtddr62haj4lrm3qyt8wumn8ghj7un9d3shjtnyd968gmewwp6kytcpz9mhxue69uhkummnw3ezuamfdejj7qpqu9gtcehnm3wygz60d4um52vkslwqyg2tt2dmq63neyqqc5kf9mkq8c3xjp',
    type: 'idea'
  },
  {
    date: '5 februari 2025',
    title: 'Domeinregistratie',
    description: 'Het nyves.nl domein is geregistreerd.',
    type: 'milestone'
  },
  {
    date: '14 december 2025',
    title: 'Eerste pitch ter kennismaking',
    description: 'Sebastian Hagens pitcht het idee bij het SIDNfonds.',
    type: 'development'
  },
  {
    date: 'Februari 2026',
    title: 'Officiële aanvraag',
    description: 'Aanvraag ingediend bij SIDNfonds voor Nyves als pioniersproject',
    type: 'develoment'
  },
  {
    date: 'Maart 2026',
    title: 'Selectie als pioniersproject',
    description: 'Nyves wordt geselecteerd als pioniersproject bij SIDNfonds',
    link: 'https://www.sidnfonds.nl/projecten/nyves',
    type: 'success',
    image: '/sidnfinds-logo.svg',
    imageAlt: 'SIDNfonds logo'
  },
  {
    date: '1 april 2026',
    title: 'Start ontwikkeling',
    description: 'Start van de bouw van de Nyves applicatie door Sebastian Hagens',
    type: 'development'
  },
  {
    date: '8 mei 2026',
    title: 'Eerste test migraties',
    description: 'De eerste migraties worden uitgevoerd voor Nyves in combinatie met een relay op https://relay.nyves.nl.',
    link: 'https://relay.nyves.nl',
    type: 'development'
  },
  {
    date: '4 juni 2026',
    title: 'Eerste media aandacht',
    description: 'Nyves wordt genoemd in de AngryNerds podcast',
    link: 'https://video.angrynerdspodcast.nl/w/cS5wxXgRKn4hQ3dRSZJrJD?start=57m55s',
    type: 'milestone'
  },
  {
    date: '7 augustus 2026',
    title: 'Start migratie aanmaken keypairs per gebruikersnaam',
    description: 'De eerste migratie is gestart voor Nyves waar voor elke gebruikersnaam een nostr keypair wordt aangemaakt.',
    type: 'development'
  },
  {
    date: '20 augustus 2026',
    title: 'Custom relay live',
    description: 'Op https://rely.nyves.nl staat de nieuwe op maat gemaakte relay voor Nyves.',
    link: 'https://rely.nyves.nl',
    type: 'development'
  },
  {
    date: '8 september 2026',
    title: 'Migratie voor de 9+ miljoen keypairs voltooid',
    description: 'De eerste migratie is voltooid voor Nyves (9+ miljoen keypairs aangemaakt)',
    type: 'development'
  },
  {
    date: '9 september 2026',
    title: 'Start migratie van alle gebruikersnamen',
    description: 'Per keypair wordt nu een set van zogenaamde nostr events aangemaakt, zodat een profiel kan worden opgebouwd die doorzoekbaar is via Nyves.',
    type: 'development'
  },
  {
    date: '22 september 2026',
    title: 'Hyves terug als sociaal platform, duizenden bezoekers voor Nyves',
    description: 'Op dinsdag 22 september is Hyves terug online gebracht als sociaal platform door Mediahuis. Mensen zoeken nu massaal naar Hyves en wordt Nyves door duizenden mensen gevonden.',
    type: 'milestone'
  },
  {
    date: '24 september 2026',
    title: 'Nyves genoemd door Follow The Money',
    description: 'Op donderdag 24 september publiceert Follow The Money een artikel "Hyves draait wél op Amerikaanse tech, in tegenstelling tot wat eigenaar De Telegraaf beweert".',
    link: 'https://www.ftm.nl/artikelen/hyves-draait-wel-op-amerikaanse-tech?share=ipZHnrJIjxaSnEEIeIsA9k%2BoqGSc6qziqkqbusVNoBnbHnbWal5bikgEZLHlQRI%3D',
    type: 'success'
  }
]

const parseDate = (dateString) => {
  // Parse different date formats
  const months = {
    'januari': 0, 'februari': 1, 'maart': 2, 'april': 3, 'mei': 4, 'juni': 5,
    'juli': 6, 'augustus': 7, 'september': 8, 'oktober': 9, 'november': 10, 'december': 11
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
</script>

<template>
  <div class="min-h-screen py-12">
    <section class="leading-relaxed max-w-4xl mx-auto px-4">
      <h1 class="text-4xl text-nyves-blue mb-8 text-center font-bold">Tijdlijn</h1>
      <p class="text-center text-xl mb-12 text-gray-600">
        Hoe Nyves tot stand is gekomen
      </p>
      
      <!-- Timeline -->
      <div class="relative">
        <!-- Vertical line -->
        <div class="absolute left-10 top-0 bottom-0 w-0.5 bg-nyves-blue/30"></div>
        
        <!-- Timeline items -->
        <div class="space-y-8">
          <div 
            v-for="(event, index) in timelineEvents" 
            :key="index"
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
                      <span class="mr-2">Bekijk details</span>
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
              <div class="text-xs font-semibold text-white uppercase">Nu</div>
            </div>
            <!-- Calendar body -->
            <div class="flex flex-col items-center justify-center h-18 bg-white">
              <div class="text-2xl">⭐</div>
            </div>
          </div>
          <div class="ml-24 w-full">
            <div class="p-6 rounded-lg bg-nyves-orange/10 shadow-md">
              <div class="text-sm font-semibold text-nyves-orange mb-2">
                Heden
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-3">
                Het verhaal gaat verder...
              </h3>
              <p class="text-gray-700 leading-relaxed">
                Nyves groeit elke dag en helpt mensen hun Hyves profiel terug te vinden.
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