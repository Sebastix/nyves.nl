import { ref, readonly } from 'vue'
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
    heeftGezocht: false    // Of er überhaupt is gezocht
  })

  /**
   * Zoek profielen op basis van naam met NIP-50
   * @param {string} zoekterm - De zoekterm voor gebruikersnamen
   * @returns {Promise<void>}
   */
  const zoekProfielen = async (zoekterm) => {
    // Lege of te korte zoekterm
    if (!zoekterm || zoekterm.trim().length < 2) {
      zoekData.value.resultaten = []
      zoekData.value.heeftGezocht = false
      return
    }

    const schoneZoekterm = zoekterm.trim()
    
    // Voorkom dubbele zoekopdrachten
    if (schoneZoekterm === zoekData.value.laatsteQuery && zoekData.value.laden) {
      return
    }

    try {
      zoekData.value.laden = true
      zoekData.value.fout = null
      zoekData.value.laatsteQuery = schoneZoekterm
      zoekData.value.heeftGezocht = true

      // NIP-50 filter voor zoeken naar profielen
      const filter = {
        kinds: [0],              // Kind 0 = gebruikersmetadata
        search: schoneZoekterm,  // NIP-50 zoekveld
        limit: 20                // Redelijke limiet voor UI
      }

      console.log('Zoeken naar profielen:', { zoekterm: schoneZoekterm, relay: SEARCH_RELAY })

      // Zoek events op de relay
      const events = await queryRelays([SEARCH_RELAY], filter)

      console.log('Gevonden events:', events.length)

      // Verwerk gevonden events naar bruikbare profieldata
      const profielen = []
      
      for (const event of events) {
        try {
          // Parse de content (JSON metadata)
          const metadata = JSON.parse(event.content)
          
          // We zijn alleen geïnteresseerd in profielen met een naam
          if (metadata.name) {
            // Converteer pubkey naar npub voor gebruik in de app
            const npub = nip19.npubEncode(event.pubkey)
            
            profielen.push({
              pubkey: event.pubkey,
              npub: npub,
              name: metadata.name,
              display_name: metadata.display_name || metadata.name,
              created_at: event.created_at
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

      zoekData.value.resultaten = profielen
      
      console.log('Verwerkte profielen:', profielen.length)

    } catch (error) {
      console.error('Fout bij zoeken naar profielen:', error)
      zoekData.value.fout = 'Er ging iets mis bij het zoeken. Probeer het opnieuw.'
      zoekData.value.resultaten = []
    } finally {
      zoekData.value.laden = false
    }
  }

  /**
   * Wis huidige zoekresultaten
   */
  const wisResultaten = () => {
    zoekData.value.resultaten = []
    zoekData.value.fout = null
    zoekData.value.laatsteQuery = ''
    zoekData.value.heeftGezocht = false
  }

  /**
   * Sluit relay verbindingen
   */
  const sluit = () => {
    pool.close([SEARCH_RELAY])
  }

  return {
    zoekData: readonly(zoekData),
    zoekProfielen,
    wisResultaten,
    sluit
  }
}