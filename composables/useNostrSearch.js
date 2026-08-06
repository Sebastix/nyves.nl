import { ref, readonly, computed } from 'vue'
import * as nip19 from 'nostr-tools/nip19'

// Nyves relay voor zoeken
const SEARCH_RELAY = 'wss://relay.nyves.nl'

export const useNostrSearch = () => {
  const { pool, queryRelays, closeRelays } = useSharedRelayPool()

  // Reactieve state
  const zoekData = ref({
    resultaten: [],        // Array van profielobjecten
    laden: false,          // Boolean laadstatus
    fout: null,            // Foutmelding of null
    laatsteQuery: '',      // Laatst gezochte term
    heeftGezocht: false,   // Of er überhaupt is gezocht
    // Paginatie state
    huidigePagina: 1,      // Huidige pagina nummer
    perPagina: 20,         // Resultaten per pagina
    totaalGevonden: 0,     // Totaal aantal gevonden (estimate)
    heeftMeer: false,      // Of er meer resultaten beschikbaar zijn
    alleResultaten: [],    // Alle geladen resultaten
    laadtMeer: false       // Loading state voor meer laden
  })

  /**
   * Zoek profielen op basis van naam met NIP-50
   * @param {string} zoekterm - De zoekterm voor gebruikersnamen
   * @param {Object} options - Zoek opties
   * @param {boolean} options.resetPagina - Reset naar eerste pagina
   * @param {number} options.until - Timestamp voor paginatie (ouder dan)
   * @param {number} options.since - Timestamp voor paginatie (nieuwer dan)
   * @returns {Promise<void>}
   */
  const zoekProfielen = async (zoekterm, options = {}) => {
    const { resetPagina = true, until, since } = options
    // Lege of te korte zoekterm
    if (!zoekterm || zoekterm.trim().length < 2) {
      resetZoekState()
      return
    }

    const schoneZoekterm = zoekterm.trim()
    
    // Reset paginatie als nieuwe zoekterm
    if (schoneZoekterm !== zoekData.value.laatsteQuery && resetPagina) {
      resetZoekState()
      zoekData.value.laatsteQuery = schoneZoekterm
    }
    
    // Voorkom dubbele zoekopdrachten
    if (schoneZoekterm === zoekData.value.laatsteQuery && zoekData.value.laden) {
      return
    }

    try {
      // Set loading state (different voor meer laden vs nieuwe zoekopdracht)
      if (resetPagina) {
        zoekData.value.laden = true
      } else {
        zoekData.value.laadtMeer = true
      }
      
      zoekData.value.fout = null
      zoekData.value.heeftGezocht = true

      // NIP-50 filter voor zoeken naar profielen met paginatie
      const filter = {
        kinds: [0],                      // Kind 0 = gebruikersmetadata
        search: schoneZoekterm,          // NIP-50 zoekveld
        limit: zoekData.value.perPagina  // Configureerbaar aantal resultaten
      }
      
      // Voeg paginatie parameters toe als beschikbaar
      if (until) filter.until = until
      if (since) filter.since = since

      console.log('Zoeken naar profielen:', { 
        zoekterm: schoneZoekterm, 
        relay: SEARCH_RELAY,
        pagina: zoekData.value.huidigePagina,
        filter 
      })

      // Zoek events op de relay
      const events = await queryRelays([SEARCH_RELAY], filter)

      console.log('Gevonden events:', events.length)

      // Verwerk gevonden events naar bruikbare profieldata
      const profielen = []
      
      for (const event of events) {
        try {
          // Parse de content (JSON metadata)
          const metadata = JSON.parse(event.content)
          // Tags
          const tags = event.tags
          
          // We zijn alleen geïnteresseerd in profielen met een naam
          if (metadata.name) {
            // Converteer pubkey naar npub voor gebruik in de app
            const npub = nip19.npubEncode(event.pubkey)
            
            profielen.push({
              pubkey: event.pubkey,
              npub: npub,
              name: metadata.name,
              display_name: metadata.display_name || metadata.name,
              created_at: event.created_at,
              tags: tags
            })
          }
        } catch (parseError) {
          // Skip events die geen geldige JSON metadata hebben
          console.warn('Kon event metadata niet parsen:', parseError)
        }
      }

      // Sorteer op relevantie (events zijn al gesorteerd door de relay op matching score)
      // Maar we kunnen extra sorteren op recentheid als backup
      profielen.sort((a, b) => {
        // Eerst: exacte match van naam
        const aExact = a.name.toLowerCase() === schoneZoekterm.toLowerCase()
        const bExact = b.name.toLowerCase() === schoneZoekterm.toLowerCase()
        if (aExact && !bExact) return -1
        if (!aExact && bExact) return 1
        
        // Daarna: naam begint met zoekterm
        const aStarts = a.name.toLowerCase().startsWith(schoneZoekterm.toLowerCase())
        const bStarts = b.name.toLowerCase().startsWith(schoneZoekterm.toLowerCase())
        if (aStarts && !bStarts) return -1
        if (!aStarts && bStarts) return 1
        
        // Als laatste: meest recent
        return b.created_at - a.created_at
      })

      // Paginatie logica
      if (resetPagina) {
        // Nieuwe zoekopdracht - vervang alle resultaten
        zoekData.value.alleResultaten = profielen
        zoekData.value.resultaten = profielen
        zoekData.value.huidigePagina = 1
      } else {
        // Meer laden - voeg toe aan bestaande resultaten
        const nieuweResultaten = profielen.filter(nieuw => 
          !zoekData.value.alleResultaten.some(bestaand => bestaand.pubkey === nieuw.pubkey)
        )
        zoekData.value.alleResultaten = [...zoekData.value.alleResultaten, ...nieuweResultaten]
        zoekData.value.resultaten = [...zoekData.value.resultaten, ...nieuweResultaten]
        zoekData.value.huidigePagina++
      }
      
      // Bepaal of er meer resultaten beschikbaar zijn
      zoekData.value.heeftMeer = profielen.length === zoekData.value.perPagina
      zoekData.value.totaalGevonden = zoekData.value.alleResultaten.length
      
      console.log('Verwerkte profielen:', {
        nieuw: profielen.length,
        totaal: zoekData.value.totaalGevonden,
        pagina: zoekData.value.huidigePagina,
        heeftMeer: zoekData.value.heeftMeer
      })

    } catch (error) {
      console.error('Fout bij zoeken naar profielen:', error)
      zoekData.value.fout = 'Er ging iets mis bij het zoeken. Probeer het opnieuw.'
      zoekData.value.resultaten = []
    } finally {
      zoekData.value.laden = false
      zoekData.value.laadtMeer = false
    }
  }

  /**
   * Reset alle zoekstate
   */
  const resetZoekState = () => {
    zoekData.value.resultaten = []
    zoekData.value.alleResultaten = []
    zoekData.value.fout = null
    zoekData.value.laatsteQuery = ''
    zoekData.value.heeftGezocht = false
    zoekData.value.huidigePagina = 1
    zoekData.value.totaalGevonden = 0
    zoekData.value.heeftMeer = false
  }

  /**
   * Wis huidige zoekresultaten (legacy functie)
   */
  const wisResultaten = resetZoekState

  /**
   * Laad meer resultaten (volgende pagina)
   */
  const laadMeerResultaten = async () => {
    if (!zoekData.value.heeftMeer || zoekData.value.laadtMeer || !zoekData.value.laatsteQuery) {
      return
    }

    // Gebruik created_at van laatste resultaat voor paginatie
    const laatsteResultaat = zoekData.value.alleResultaten[zoekData.value.alleResultaten.length - 1]
    const until = laatsteResultaat ? laatsteResultaat.created_at : undefined

    await zoekProfielen(zoekData.value.laatsteQuery, { 
      resetPagina: false, 
      until 
    })
  }

  /**
   * Ga naar specifieke pagina (gebaseerd op geladen resultaten)
   */
  const gaNaarPagina = (paginaNummer) => {
    const startIndex = (paginaNummer - 1) * zoekData.value.perPagina
    const endIndex = startIndex + zoekData.value.perPagina
    
    zoekData.value.resultaten = zoekData.value.alleResultaten.slice(startIndex, endIndex)
    zoekData.value.huidigePagina = paginaNummer
  }

  /**
   * Bereken paginatie informatie
   */
  const paginatieInfo = computed(() => {
    const totalLoaded = zoekData.value.alleResultaten.length
    const perPagina = zoekData.value.perPagina
    const huidigePagina = zoekData.value.huidigePagina
    
    // Aantal geladen pagina's
    const gelaafdePaginas = Math.ceil(totalLoaded / perPagina)
    
    return {
      huidigePagina,
      gelaafdePaginas,
      totaalGeladen: totalLoaded,
      perPagina,
      heeftMeer: zoekData.value.heeftMeer,
      kanVorige: huidigePagina > 1,
      kanVolgende: huidigePagina < gelaafdePaginas || zoekData.value.heeftMeer,
      startIndex: (huidigePagina - 1) * perPagina + 1,
      endIndex: Math.min(huidigePagina * perPagina, totalLoaded)
    }
  })

  /**
   * Sluit relay verbindingen
   */
  const sluit = () => {
    pool.close([SEARCH_RELAY])
  }

  return {
    // State
    zoekData: readonly(zoekData),
    paginatieInfo,
    
    // Core functies
    zoekProfielen,
    laadMeerResultaten,
    gaNaarPagina,
    
    // Reset functies  
    wisResultaten,
    resetZoekState,
    
    // Cleanup
    sluit
  }
}