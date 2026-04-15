import { ref, readonly } from 'vue'

export const useCustomDesign = () => {
  // Use shared relay pool instead of creating new instance
  const { pool, queryRelays, closeRelays } = useSharedRelayPool()

  // Reactive state
  const designData = ref({
    custom_design: false,
    loading: false,
    error: null,
    backgroundImage: null,
    themeSettings: {}
  })

  /**
   * Fetch custom design event (kind 36767) for a specific pubkey
   * @param {string} pubkey - The hex pubkey to fetch design for
   * @param {string} relay - The relay URL to fetch from
   * @returns {Promise<void>}
   */
  const fetchCustomDesign = async (pubkey, relay = 'wss://relay.ditto.pub') => {
    try {
      designData.value.loading = true
      designData.value.error = null

      console.log(`Fetching custom design for pubkey: ${pubkey} from ${relay}`)

      // Create filter for custom design event (kind 36767)
      const filter = {
        kinds: [36767],
        authors: [pubkey],
        limit: 1
      }

      // Fetch the event from the specified relay using tracked query method
      const events = await queryRelays([relay], filter)

      if (events.length > 0) {
        const designEvent = events[0]
        console.log('Custom design event found:', designEvent)

        // Parse the design settings from the event
        const themeSettings = parseDesignEvent(designEvent)
        
        designData.value.custom_design = true
        designData.value.themeSettings = themeSettings
        
        // Extract background image if bg tag exists
        if (themeSettings.bg) {
          designData.value.backgroundImage = themeSettings.bg
          console.log('Background image found:', themeSettings.bg)
        }

      } else {
        console.log('No custom design event found')
        designData.value.custom_design = false
      }

    } catch (error) {
      console.error('Failed to fetch custom design:', error)
      designData.value.error = error.message
      designData.value.custom_design = false
    } finally {
      designData.value.loading = false
    }
  }

  /**
   * Parse bg tag value to extract URL
   * @param {string} bgValue - The bg tag value (e.g., "url https://blossom.primal.net/...")
   * @returns {string|null} The extracted URL or null if not found
   */
  const parseBgTagValue = (bgValue) => {
    try {
      if (!bgValue || typeof bgValue !== 'string') {
        return null
      }

      // Format: "url https://blossom.primal.net/1476128d131aa68697b0d625fc697bcc287cd2e31bb506e2618d5ea137b0bdd2.png"
      const trimmed = bgValue.trim()
      
      // Check if it starts with "url "
      if (trimmed.startsWith('url ')) {
        const url = trimmed.substring(4).trim() // Remove "url " prefix
        
        // Basic URL validation
        if (url.startsWith('http://') || url.startsWith('https://')) {
          console.log('Extracted background URL:', url)
          return url
        }
      }

      // If no "url " prefix, check if it's directly a URL
      if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
        console.log('Direct background URL:', trimmed)
        return trimmed
      }

      console.warn('Invalid bg tag format:', bgValue)
      return null

    } catch (error) {
      console.error('Failed to parse bg tag value:', error)
      return null
    }
  }

  /**
   * Parse custom design event and extract theme settings from tags
   * @param {Object} event - The Nostr event
   * @returns {Object} Parsed theme settings
   */
  const parseDesignEvent = (event) => {
    try {
      const tags = event.tags || []
      const themeSettings = {
        font: {},
        colors: {}
      }

      // Extract all relevant tags for theming
      tags.forEach(tag => {
        if (tag.length >= 2) {
          const [tagName, tagValue1, tagValue2, tagValue3] = tag
          
          // Store tag values as theme settings
          switch (tagName) {
            case 'bg': // background
              // Parse bg tag format: "url https://blossom.primal.net/..."
              themeSettings.bg = parseBgTagValue(tagValue1)
              break
            case 'c': // colors
              themeSettings.colors[tagValue2] = tagValue1
              break
            case 'f': // font
              themeSettings.font['name'] = tagValue1
              themeSettings.font['url'] = tagValue2
              break
            default:
              // Store any other custom tags
              themeSettings[tagName] = tagValue1
          }
        }
      })

      // Also store the event content if it contains additional styling info
      if (event.content) {
        try {
          const contentData = JSON.parse(event.content)
          themeSettings.content = contentData
        } catch {
          // If content is not JSON, store as plain text
          themeSettings.content = event.content
        }
      }

      console.log('Parsed theme settings:', themeSettings)
      return themeSettings

    } catch (error) {
      console.error('Failed to parse design event:', error)
      return {}
    }
  }

  /**
   * Apply background to page
   * @param {string} imageUrl - URL of the background image
   * @param {HTMLElement} element - Element to apply background to (defaults to body)
   */
  const applyBackground = (imageUrl, element = null) => {
    try {
      const targetElement = element || document.body
      
      if (imageUrl) {
        console.log('Applying background image:', imageUrl)
        targetElement.style.backgroundImage = `url(${imageUrl})`
        targetElement.style.backgroundSize = 'cover'
        targetElement.style.backgroundPosition = 'center'
        targetElement.style.backgroundRepeat = 'no-repeat'
        targetElement.style.backgroundAttachment = 'fixed'
      }
      document.body.style.backgroundColor = designData.value.themeSettings.colors.background;
    } catch (error) {
      console.error('Failed to apply background image:', error)
    }
  }

  /**
   * Remove background image from page
   * @param {HTMLElement} element - Element to remove background from (defaults to body)
   */
  const removeBackground = (element = null) => {
    try {
      const targetElement = element || document.body
      targetElement.style.backgroundImage = ''
      targetElement.style.backgroundSize = ''
      targetElement.style.backgroundPosition = ''
      targetElement.style.backgroundRepeat = ''
      targetElement.style.backgroundAttachment = ''
      targetElement.style.backgroundColor = ''
    } catch (error) {
      console.error('Failed to remove background image:', error)
    }
  }

  // Fonts
  const toggleFonts = () => {
    if (designData.value.custom_design) {
      // Load and apply font
      const fontFile = new FontFace(
        designData.value.themeSettings.font.name,
        'url("'+designData.value.themeSettings.font.url+'")'
      )
      document.fonts.add(fontFile)
      document.body.style.fontFamily = designData.value.themeSettings.font.name
    } else {
      document.body.style.fontFamily = ''
    }
  }
  // Header
  const toggleHeader = () => {
    const header = document.querySelector('header')
    const navigation = header.querySelector('div.navigation')
    const banner = header.querySelector('div.banner')
    if (designData.value.custom_design) {
      navigation.style.backgroundColor = designData.value.themeSettings.colors.text
      navigation.querySelectorAll('a').forEach((link) => {
        link.style.color = designData.value.themeSettings.colors.background
      })
      banner.style.backgroundColor = designData.value.themeSettings.colors.background
      banner.style.borderColor = designData.value.themeSettings.colors.background
      banner.classList.remove('bg-linear-to-b')
      banner.querySelector('form').style.borderColor = designData.value.themeSettings.colors.background
    } else {
      navigation.style.backgroundColor = ''
      navigation.querySelectorAll('a').forEach((link) => {
        link.style.color = ''
      })
      banner.style.backgroundColor = ''
      banner.style.borderColor = ''
      banner.classList.add('bg-linear-to-b')
      banner.querySelector('form').style.borderColor = ''
    }
  }
  // Heading
  const toggleHeading = () => {
    document.querySelector('h1').style.color =
      designData.value.custom_design ? designData.value.themeSettings.colors.primary : ''
  }
  // profileHeader
  const toggleProfileHeader = () => {
    const profileHeader = document.querySelector('div.profileHeader')
    if (designData.value.custom_design) {
      profileHeader.style.backgroundColor = designData.value.themeSettings.colors.background
      profileHeader.querySelectorAll('a').forEach((link) => {
        link.style.color = designData.value.themeSettings.colors.primary
      })
    } else {
      profileHeader.style.backgroundColor = ''
      profileHeader.querySelectorAll('a').forEach((link) => {
        link.style.color = ''
      })
    }
  }
  // Content blocks
  const toggleContentBlocks = () => {
    document.querySelectorAll("div.rounded-sm").forEach((el) => {
      if (el.classList.contains('bg-[#fcfcfc]')) {
        const heading3 = el.querySelector('h3');
        if (!heading3) {
          return
        }
        if (heading3 && designData.value.custom_design) {
          el.querySelector('h3').style.backgroundColor = designData.value.themeSettings.colors.background
          el.querySelector('h3').style.color = designData.value.themeSettings.colors.primary;
          el.querySelector('h3').style.removeProperty('background-image')
          el.querySelector('h3').style.backgroundImage = 'unset'
        } else {
          el.querySelector('h3').style.backgroundColor = ''
          el.querySelector('h3').style.color = '';
        }
        const hyperlink = el.querySelectorAll('a')
        if (!hyperlink) {
          return
        }
        if (hyperlink && designData.value.custom_design) {
          hyperlink.forEach((link) => {
            link.style.color = designData.value.themeSettings.colors.primary
          })
        } else {
          hyperlink.forEach((link) => {
            link.style.color = ''
          })
        }
        if (designData.value.custom_design) {
          el.style.color = designData.value.themeSettings.colors.text
          el.style.backgroundColor = designData.value.themeSettings.colors.background
          el.style.borderColor = designData.value.themeSettings.colors.text
        } else {
          el.style.color = ''
          el.style.backgroundColor = ''
          el.style.borderColor = ''
        }
      }
      if (el.classList.contains('bg-[#eff6fc]')) {
        const hyperlink = el.querySelectorAll('a')
        if (hyperlink && designData.value.custom_design) {
          hyperlink.forEach((link) => {
            link.style.color = designData.value.themeSettings.colors.background
          })
        } else {
          hyperlink.forEach((link) => {
            link.style.color = ''
          })
        }
        el.style.backgroundColor = designData.value.custom_design ? designData.value.themeSettings.colors.text : ''
        el.style.borderColor = designData.value.custom_design ? designData.value.themeSettings.colors.background : ''
      }
    })
  }
  // Footer
  const toggleFooter = () => {
    const footer = document.querySelector('footer')
    if (designData.value.custom_design) {
      footer.style.backgroundColor = designData.value.themeSettings.colors.background
      footer.querySelector('div.sub').style.color = designData.value.themeSettings.colors.text
      footer.querySelector('div.sub').querySelectorAll('a').forEach((link) => {
        link.style.color = designData.value.themeSettings.colors.primary
      })
    } else {
      footer.style.backgroundColor = ''
      footer.querySelector('div.sub').style.color = ''
      footer.querySelector('div.sub').querySelectorAll('a').forEach((link) => {
        link.style.color = ''
      })
    }
  }

  /**
   * Toggle custom design on/off
   */
  const toggleCustomDesign = () => {
    try {
      if (designData.value.custom_design) {
        // Disable custom design
        designData.value.custom_design = false
        removeBackground(document.body)
        console.log('Custom design disabled')
      } else {
        // Re-enable custom design if we have design data
        if (designData.value.themeSettings && Object.keys(designData.value.themeSettings).length > 0) {
          designData.value.custom_design = true
          if (designData.value.backgroundImage) {
            applyBackground(designData.value.backgroundImage, document.body)
          }
          console.log('Custom design enabled')
        } else {
          console.log('No custom design data available to enable')
        }
      }
      toggleFonts()
      toggleHeader()
      toggleHeading()
      toggleProfileHeader()
      toggleContentBlocks()
      toggleFooter()
    } catch (error) {
      console.error('Failed to toggle custom design:', error)
    }
  }

  /*
   * Set Custom Design boolean
   */
  const setCustomDesign = (bool) => {
    designData.value.custom_design = bool
  }

  /**
   * Close relay connection
   */
  const close = () => {
    pool.close(['wss://relay.ditto.pub'])
  }

  return {
    // State
    designData: readonly(designData),

    // Methods
    fetchCustomDesign,
    applyBackground,
    removeBackground,
    setCustomDesign,
    toggleCustomDesign,
    toggleFonts,
    toggleHeader,
    toggleHeading,
    toggleFooter,
    close
  }
}