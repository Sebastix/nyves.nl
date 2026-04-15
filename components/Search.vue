<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNostrSearch } from '~/composables/useNostrSearch'

const emit = defineEmits(['profielGeselecteerd'])
const route = useRoute()
const router = useRouter()

// Props om gedrag te bepalen
const props = defineProps({
  showResultsList: {
    type: Boolean,
    default: false // Standaard geen lijst tonen
  },
  navigateOnSubmit: {
    type: Boolean,
    default: true // Standaard navigeren naar /zoek bij submit
  }
})

// Zoek functionaliteit
const { zoekData, zoekProfielen, wisResultaten, sluit } = useNostrSearch()

// Local reactive state
const zoekterm = ref('')
const toonDropdown = ref(false)
const toonResultatenLijst = ref(false)
const zoekInput = ref(null)
const debounceTimer = ref(null)

// Debounced zoekfunctie
const debouncedZoek = (term) => {
  if (debounceTimer.value) {
    clearTimeout(debounceTimer.value)
  }
  
  debounceTimer.value = setTimeout(() => {
    zoekProfielen(term)
  }, 300)
}

// Watch zoekterm voor real-time zoeken (alleen voor dropdown)
watch(zoekterm, (nieuweWaarde) => {
  if (nieuweWaarde.trim().length >= 2) {
    debouncedZoek(nieuweWaarde)
    toonDropdown.value = true
  } else {
    wisResultaten()
    toonDropdown.value = false
  }
})

// Input handlers
const handleInput = (event) => {
  zoekterm.value = event.target.value
}

const handleFocus = () => {
  if (zoekterm.value.trim().length >= 2) {
    toonDropdown.value = true
  }
}

const handleBlur = () => {
  // Kleine vertraging zodat click events op resultaten nog werken
  setTimeout(() => {
    toonDropdown.value = false
  }, 150)
}

const handleSubmit = async (event) => {
  event.preventDefault()
  if (zoekterm.value.trim().length >= 2) {
    // Sluit dropdown
    toonDropdown.value = false
    
    // Check of we moeten navigeren naar /zoek pagina
    if (props.navigateOnSubmit && route.path !== '/zoek') {
      // Navigeer naar zoek pagina met query parameter
      await router.push({ path: '/zoek', query: { q: zoekterm.value } })
      return
    }
    
    // Anders toon resultatenlijst (alleen als showResultsList true is)
    if (props.showResultsList) {
      toonResultatenLijst.value = true
      
      // Clear debounce timer en zoek direct
      if (debounceTimer.value) {
        clearTimeout(debounceTimer.value)
      }
      
      await zoekProfielen(zoekterm.value)
    }
    
    zoekInput.value?.blur()
  }
}

// Profiel selectie
const selecteerProfiel = (profiel) => {
  // Hier kun je navigeren naar profiel pagina
  router.push({ path: '/profiel/'+profiel.name })
  
  // Reset zoekstatus
  zoekterm.value = ''
  toonDropdown.value = false
  toonResultatenLijst.value = false
  wisResultaten()
}

// Keyboard navigation
const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    toonDropdown.value = false
    toonResultatenLijst.value = false
    zoekInput.value?.blur()
  }
}

// URL Query parameter support voor /zoek pagina
const checkUrlQuery = () => {
  if (props.showResultsList && route.query.q) {
    zoekterm.value = route.query.q
    toonResultatenLijst.value = true
    zoekProfielen(route.query.q)
  }
}

// Check query parameter bij mount
onMounted(() => {
  checkUrlQuery()
})

// Cleanup
onUnmounted(() => {
  if (debounceTimer.value) {
    clearTimeout(debounceTimer.value)
  }
  sluit()
})
</script>

<template>
  <div class="relative">
    <form
      @submit="handleSubmit"
      id="search"
      class="bg-white/80 hover:bg-white/95 transition-bg duration-150 border border-nyves-orange rounded-xs shadow-inner/5 focus:outline-none flex justify-between"
    >
      <input
        ref="zoekInput"
        type="text"
        :value="zoekterm"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
        class="px-2 text-sm/7 focus:outline-none flex-1"
        placeholder="Zoek profielen..."
      />
      <button type="submit" class="px-1 border-l border-l-gray-300">
        <!-- Loading spinner -->
        <svg
          v-if="zoekData.laden"
          class="animate-spin size-5 text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>

        <!-- Zoek icoon -->
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="size-5"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </button>
    </form>

    <!-- Dropdown resultaten (alleen tijdens typen) -->
    <div
      v-if="toonDropdown && (zoekData.resultaten.length > 0 || zoekData.fout || (zoekData.heeftGezocht && !zoekData.laden))"
      class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-100 max-h-60 overflow-y-auto"
    >
      <!-- Error state -->
      <div v-if="zoekData.fout" class="px-4 py-3 text-sm text-red-600">
        {{ zoekData.fout }}
      </div>

      <!-- Geen resultaten -->
      <div v-else-if="zoekData.heeftGezocht && !zoekData.laden && zoekData.resultaten.length === 0" class="px-4 py-3 text-sm text-gray-500">
        Geen profielen gevonden voor "{{ zoekData.laatsteQuery }}"
      </div>

      <!-- Resultaten lijst in dropdown -->
      <div v-else>
        <NostrComponentsProfielZoekResultaat
          v-for="profiel in zoekData.resultaten"
          :key="profiel.pubkey"
          :profiel="profiel"
          @selecteer="selecteerProfiel"
        />
      </div>
    </div>
  </div>

  <!-- Resultatenlijst onder formulier (na submit) - alleen op zoek pagina -->
  <div v-if="toonResultatenLijst && showResultsList" class="mt-4">
    <h3 v-if="zoekData.laatsteQuery" class="text-lg font-medium text-gray-900 mb-3">
      Zoekresultaten voor "{{ zoekData.laatsteQuery }}"
    </h3>

    <!-- Error state -->
    <div v-if="zoekData.fout" class="p-4 bg-red-50 border border-red-200 rounded-lg">
      <p class="text-sm text-red-600">{{ zoekData.fout }}</p>
    </div>

    <!-- Loading state -->
    <div v-else-if="zoekData.laden" class="flex items-center justify-center py-8">
      <svg class="animate-spin size-6 text-nyves-blue mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span class="text-gray-600">Zoeken naar profielen...</span>
    </div>

    <!-- Geen resultaten -->
    <div v-else-if="zoekData.heeftGezocht && zoekData.resultaten.length === 0" class="text-center py-8">
      <div class="text-gray-500">
        <svg class="mx-auto size-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-1">Geen profielen gevonden</h3>
        <p class="text-gray-500">Er zijn geen profielen gevonden voor "{{ zoekData.laatsteQuery }}"</p>
      </div>
    </div>

    <!-- Resultatenlijst -->
    <div v-else class="space-y-2">
      <div
        v-for="profiel in zoekData.resultaten"
        :key="profiel.pubkey"
        @click="selecteerProfiel(profiel)"
        class="p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-150"
      >
        <div class="flex items-center space-x-3">
          <!-- Avatar placeholder -->
          <div class="w-10 h-10 bg-nyves-blue text-white rounded-full flex items-center justify-center text-lg font-medium">
            {{ profiel.name.charAt(0).toUpperCase() }}
          </div>

          <!-- Profiel info -->
          <div class="flex-1">
            <h4 class="text-base font-medium text-gray-900">
              {{ profiel.display_name }}
            </h4>
            <p v-if="profiel.display_name !== profiel.name" class="text-sm text-gray-500">
              @{{ profiel.name }}
            </p>
          </div>
        </div>
      </div>

      <!-- Resultaten teller -->
      <div class="mt-4 pt-3 border-t border-gray-200">
        <p class="text-sm text-gray-500 text-center">
          {{ zoekData.resultaten.length }} profiel{{ zoekData.resultaten.length !== 1 ? 'en' : '' }} gevonden
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>