<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNostrSearch } from '~/composables/useNostrSearch'
import LoadingSpinner from './LoadingSpinner.vue';
import MailingList from './MailingList.vue';

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

// Zoek functionaliteit met paginatie
const { 
  zoekData, 
  paginatieInfo,
  zoekProfielen, 
  laadMeerResultaten,
  gaNaarPagina,
  wisResultaten, 
  sluit 
} = useNostrSearch()

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
  }, 10000)
}

// Watch zoekterm voor real-time zoeken (alleen voor dropdown)
watch(zoekterm, (nieuweWaarde) => {
  if (nieuweWaarde.trim().length >= 2) {
    debouncedZoek(nieuweWaarde)
    //toonDropdown.value = true
  } else {
    //wisResultaten()
    //toonDropdown.value = false
  }
})

// Input handlers
const handleInput = (event) => {
  zoekterm.value = event.target.value
}

const handleFocus = () => {
  if (zoekterm.value.trim().length >= 2) {
    toonDropdown.value = false
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
  router.push(
      {
        path: '/profiel/' + profiel.name,
        hash: '#' + profiel.npub
      }
  )

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

// Paginatie helper functies
const gaNaarVorigePagina = () => {
  if (paginatieInfo.value.kanVorige) {
    gaNaarPagina(paginatieInfo.value.huidigePagina - 1)
  }
}

const gaNaarVolgendePagina = () => {
  if (paginatieInfo.value.kanVolgende && paginatieInfo.value.huidigePagina < paginatieInfo.value.gelaafdePaginas) {
    gaNaarPagina(paginatieInfo.value.huidigePagina + 1)
  }
}

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
      class="max-w-lg mx-auto bg-white/90 hover:bg-white transition-bg duration-150 border border-nyves-orange rounded-xs shadow-inner/5 focus:outline-none flex justify-between"
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
        :placeholder="$t('zoek_profielen')"
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
  <div v-if="toonResultatenLijst && showResultsList">

    <!-- Error state -->
    <div v-if="zoekData.fout" class="p-4 my-20 bg-red-50 border border-red-200 rounded-lg">
      <p class="text-sm text-red-600">{{ zoekData.fout }}</p>
    </div>

    <!-- Loading state -->
    <div v-else-if="zoekData.laden" class="flex items-center justify-center my-20">
      <LoadingSpinner class="size-6" />
    </div>

    <!-- Geen resultaten -->
    <div v-else-if="zoekData.heeftGezocht && zoekData.resultaten.length === 0" class="text-center mt-8">
      <p class="text-gray-500 mb-12 text-xl">Helaas, er zijn geen profielen gevonden met de zoekterm "{{ zoekData.laatsteQuery }}"</p>
      <MailingList heading='<strong class="block mb-4">Wil je een bericht ontvangen zodra alle profielen zijn beschikbaar zijn?</strong> Meld je dan aan voor de nieuwsbrief.' />
    </div>

    <!-- Resultatenlijst -->
    <div v-else class="space-y-2 my-8 max-w-2xl mx-auto">
      <!-- Resultaten header -->
      <div class="flex justify-between items-center mb-4">
        <p class="text-xl text-gray-600 font-bold">
          {{ paginatieInfo.totaalGeladen }} profielen gevonden voor "{{ zoekData.laatsteQuery }}"
          <span v-if="zoekData.heeftMeer">(meer beschikbaar)</span>
        </p>
        <div class="text-sm text-gray-500">
          Pagina {{ paginatieInfo.huidigePagina }} 
          ({{ paginatieInfo.startIndex }}-{{ paginatieInfo.endIndex }} profielen)
        </div>
      </div>

      <!-- Profile cards -->
      <div
        v-for="profiel in zoekData.resultaten"
        :key="profiel.pubkey"
        @click="selecteerProfiel(profiel)"
        :title="`${profiel.name ?? profiel.npub}`"
        class="p-2 bg-white border border-gray-200 rounded-sm hover:bg-gray-100 cursor-pointer transition-colors duration-150"
      >
        <div class="flex items-center space-x-2">
          <NostrComponentsProfilePicture :pubkey="profiel.pubkey" class="min-w-[120px] flex items-center" />
          <!-- Profiel info -->
          <div class="flex-1 break-all">
            <NuxtLink :to="`profiel/${profiel.name }#${profiel.npub}`" :title="`${profiel.name ?? profiel.npub}`" :alt="`${profiel.name ?? profiel.npub}`" class="text-xl font-bold">
              <template v-if="profiel.name">
                {{ profiel.name }}
              </template>
              <NostrComponentsPubkeyToName v-else :pubkey="profiel.pubkey" />
              <br />
              <code class="text-xs font-normal">{{ profiel.npub.substr(0, 8) }}...{{ profiel.npub.substr(profiel.npub.length - 6) }}</code>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Paginator controls -->
      <div class="flex justify-between items-center mt-8">
        <!-- Vorige pagina -->
        <button
          @click="gaNaarVorigePagina"
          :disabled="!paginatieInfo.kanVorige"
          class="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          <span>Vorige</span>
        </button>

        <!-- Pagina nummers (alleen voor geladen pagina's) -->
        <div class="flex space-x-1">
          <button
            v-for="pagina in Array.from({length: paginatieInfo.gelaafdePaginas}, (_, i) => i + 1)"
            :key="pagina"
            @click="gaNaarPagina(pagina)"
            :class="[
              'px-3 py-2 text-sm rounded-md',
              pagina === paginatieInfo.huidigePagina 
                ? 'bg-nyves-blue text-white' 
                : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
            ]"
          >
            {{ pagina }}
          </button>
          <span v-if="zoekData.heeftMeer" class="px-3 py-2 text-sm text-gray-400">...</span>
        </div>

        <!-- Volgende pagina / Meer laden -->
        <div class="flex space-x-2">
          <!-- Volgende pagina (binnen geladen resultaten) -->
          <button
            v-if="paginatieInfo.kanVolgende && paginatieInfo.huidigePagina < paginatieInfo.gelaafdePaginas"
            @click="gaNaarVolgendePagina"
            class="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <span>Volgende</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>

          <!-- Meer laden van relay -->
          <button
            v-if="zoekData.heeftMeer"
            @click="laadMeerResultaten"
            :disabled="zoekData.laadtMeer"
            class="flex items-center space-x-2 px-4 py-2 text-sm text-white bg-nyves-blue rounded-md hover:bg-nyves-blue/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg v-if="zoekData.laadtMeer" class="animate-spin w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            <span>{{ zoekData.laadtMeer ? 'Laden...' : 'Meer laden' }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>