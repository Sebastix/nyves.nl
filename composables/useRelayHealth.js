import { ref, readonly, onUnmounted } from 'vue'

export const useRelayHealth = (relayUrl) => {
  const healthData = ref({
    isConnected: false,
    isConnecting: false,
    responseTime: null,
    lastChecked: null,
    error: null,
    status: 'disconnected', // 'disconnected', 'connecting', 'connected', 'error'
    // NIP-11 Relay Information
    relayInfo: null,
    relayInfoError: null,
    // NIP-45 Event Count
    eventCount: null,
    eventCountError: null,
    isLoadingExtra: false
  })

  let ws = null
  let healthCheckInterval = null

  /**
   * Test relay verbinding en meet response tijd
   * @returns {Promise<void>}
   */
  const checkHealth = async () => {
    const startTime = Date.now()
    
    try {
      healthData.value.isConnecting = true
      healthData.value.status = 'connecting'
      healthData.value.error = null

      // Sluit bestaande verbinding
      if (ws) {
        ws.close()
        ws = null
      }

      // Maak nieuwe WebSocket verbinding
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Verbinding timeout'))
        }, 10000)

        ws = new WebSocket(relayUrl)
        
        ws.onopen = () => {
          clearTimeout(timeout)
          console.log('WebSocket verbinding geopend')
          
          // Test met een simpele REQ message
          const reqId = 'health_check_' + Math.random().toString(36).substr(2, 9)
          const reqMessage = JSON.stringify([
            "REQ", 
            reqId,
            {
              kinds: [0],
              limit: 1
            }
          ])
          
          ws.send(reqMessage)
          
          // Wacht op EOSE (end of stored events) response
          const responseTimeout = setTimeout(() => {
            resolve() // Ook OK als er geen snelle response is
          }, 3000)
          
          const originalOnMessage = ws.onmessage
          ws.onmessage = (event) => {
            try {
              const data = JSON.parse(event.data)
              if (data[0] === 'EOSE' && data[1] === reqId) {
                clearTimeout(responseTimeout)
                // Sluit de subscription
                ws.send(JSON.stringify(["CLOSE", reqId]))
                resolve()
              }
            } catch (e) {
              // Negeer parse errors
            }
          }
        }
        
        ws.onerror = (error) => {
          clearTimeout(timeout)
          reject(new Error('WebSocket verbindingsfout'))
        }
        
        ws.onclose = () => {
          clearTimeout(timeout)
        }
      })

      const endTime = Date.now()
      const responseTime = endTime - startTime

      healthData.value.isConnected = true
      healthData.value.isConnecting = false
      healthData.value.responseTime = responseTime
      healthData.value.lastChecked = new Date()
      healthData.value.status = 'connected'
      healthData.value.error = null

      console.log(`Relay health check geslaagd: ${responseTime}ms`)

      // Sluit de test verbinding
      if (ws) {
        ws.close()
        ws = null
      }

      // Start extra info ophalen in achtergrond
      fetchExtraInfo()

    } catch (error) {
      console.error('Relay health check gefaald:', error)
      
      if (ws) {
        ws.close()
        ws = null
      }
      
      healthData.value.isConnected = false
      healthData.value.isConnecting = false
      healthData.value.responseTime = null
      healthData.value.lastChecked = new Date()
      healthData.value.status = 'error'
      healthData.value.error = error.message || 'Verbinding gefaald'
    }
  }

  /**
   * Haal NIP-11 relay informatie op via HTTP
   */
  const fetchRelayInfo = async () => {
    try {
      const httpUrl = relayUrl.replace('wss://', 'https://').replace('ws://', 'http://')
      
      const response = await fetch(httpUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/nostr+json'
        }
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const relayInfo = await response.json()
      healthData.value.relayInfo = relayInfo
      healthData.value.relayInfoError = null
      
      console.log('NIP-11 relay info opgehaald:', relayInfo)
      
    } catch (error) {
      console.error('Fout bij ophalen NIP-11 info:', error)
      healthData.value.relayInfoError = error.message
    }
  }

  /**
   * Haal event count op via NIP-45 COUNT
   */
  const fetchEventCount = async () => {
    try {
      await new Promise((resolve, reject) => {
        if (ws) {
          ws.close()
        }

        ws = new WebSocket(relayUrl)
        
        ws.onopen = () => {
          // COUNT request voor alle events
          const countId = 'count_' + Math.random().toString(36).substr(2, 9)
          const countMessage = JSON.stringify([
            "COUNT", 
            countId,
            {} // Lege filter = alle events
          ])
          
          ws.send(countMessage)
          
          const timeout = setTimeout(() => {
            reject(new Error('COUNT timeout'))
          }, 10000)
          
          ws.onmessage = (event) => {
            try {
              const data = JSON.parse(event.data)
              if (data[0] === 'COUNT' && data[1] === countId) {
                clearTimeout(timeout)
                const countData = data[2]
                healthData.value.eventCount = countData
                healthData.value.eventCountError = null
                console.log('NIP-45 event count:', countData)
                ws.close()
                ws = null
                resolve()
              } else if (data[0] === 'CLOSED' && data[1] === countId) {
                clearTimeout(timeout)
                throw new Error('COUNT niet ondersteund door relay')
              }
            } catch (parseError) {
              // Negeer parse errors
            }
          }
        }
        
        ws.onerror = () => {
          reject(new Error('WebSocket fout tijdens COUNT'))
        }
      })
      
    } catch (error) {
      console.error('Fout bij NIP-45 COUNT:', error)
      healthData.value.eventCountError = error.message
    }
  }

  /**
   * Haal extra informatie op (NIP-11 en NIP-45)
   */
  const fetchExtraInfo = async () => {
    healthData.value.isLoadingExtra = true
    
    // Parallel uitvoeren voor snelheid
    await Promise.allSettled([
      fetchRelayInfo(),
      fetchEventCount()
    ])
    
    healthData.value.isLoadingExtra = false
  }

  /**
   * Start periodieke health checks
   * @param {number} interval - Interval in milliseconden (default: 30s)
   */
  const startHealthCheck = (interval = 30000) => {
    // Doe eerste check direct
    checkHealth()
    
    // Start periodieke checks
    healthCheckInterval = setInterval(() => {
      checkHealth()
    }, interval)
  }

  /**
   * Stop health checks en sluit verbinding
   */
  const stopHealthCheck = () => {
    if (healthCheckInterval) {
      clearInterval(healthCheckInterval)
      healthCheckInterval = null
    }
    
    if (ws) {
      ws.close()
      ws = null
    }
    
    healthData.value.isConnected = false
    healthData.value.isConnecting = false
    healthData.value.status = 'disconnected'
  }

  /**
   * Handmatige health check
   */
  const refreshHealth = () => {
    checkHealth()
  }

  /**
   * Get status color voor UI
   */
  const getStatusColor = () => {
    switch (healthData.value.status) {
      case 'connected':
        return 'text-green-600'
      case 'connecting':
        return 'text-yellow-600'
      case 'error':
        return 'text-red-600'
      default:
        return 'text-gray-500'
    }
  }

  /**
   * Get status tekst
   */
  const getStatusText = () => {
    switch (healthData.value.status) {
      case 'connected':
        return 'Verbonden'
      case 'connecting':
        return 'Verbinding maken...'
      case 'error':
        return 'Verbinding gefaald'
      default:
        return 'Niet verbonden'
    }
  }

  /**
   * Get response time display
   */
  const getResponseTimeDisplay = () => {
    if (!healthData.value.responseTime) return null
    
    if (healthData.value.responseTime < 500) {
      return `${healthData.value.responseTime}ms (uitstekend)`
    } else if (healthData.value.responseTime < 1000) {
      return `${healthData.value.responseTime}ms (goed)`
    } else if (healthData.value.responseTime < 3000) {
      return `${healthData.value.responseTime}ms (redelijk)`
    } else {
      return `${healthData.value.responseTime}ms (traag)`
    }
  }

  /**
   * Format event count voor weergave
   */
  const getEventCountDisplay = () => {
    if (!healthData.value.eventCount) return null
    
    const count = healthData.value.eventCount.count
    if (!count && count !== 0) return null
    
    const isApproximate = healthData.value.eventCount.approximate
    const formatted = count.toLocaleString('nl-NL')
    
    return isApproximate ? `~${formatted} events` : `${formatted} events`
  }

  /**
   * Get ondersteunde NIPs als string
   */
  const getSupportedNipsDisplay = () => {
    if (!healthData.value.relayInfo?.supported_nips) return null
    
    const nips = healthData.value.relayInfo.supported_nips
    if (!Array.isArray(nips) || nips.length === 0) return null
    
    // Sorteer en format
    const sortedNips = [...nips].sort((a, b) => a - b)
    return `NIP-${sortedNips.join(', NIP-')}`
  }

  /**
   * Check of een specifieke NIP wordt ondersteund
   */
  const supportsNip = (nipNumber) => {
    if (!healthData.value.relayInfo?.supported_nips) return false
    return healthData.value.relayInfo.supported_nips.includes(nipNumber)
  }

  /**
   * Get relay software info
   */
  const getRelaySoftware = () => {
    const info = healthData.value.relayInfo
    if (!info) return null
    
    let software = info.software || 'Onbekend'
    if (info.version) {
      software += ` v${info.version}`
    }
    return software
  }

  // Cleanup bij unmount
  onUnmounted(() => {
    stopHealthCheck()
  })

  return {
    healthData: readonly(healthData),
    startHealthCheck,
    stopHealthCheck,
    refreshHealth,
    fetchExtraInfo,
    getStatusColor,
    getStatusText,
    getResponseTimeDisplay,
    getEventCountDisplay,
    getSupportedNipsDisplay,
    supportsNip,
    getRelaySoftware
  }
}