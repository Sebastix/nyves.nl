<script setup>
import { ref, onMounted, nextTick } from 'vue'

// State voor Altcha Captcha
const CaptchaResponse = ref('')
const isSubmitting = ref(false)
const submitMessage = ref('')

// hCaptcha callback functies
const onAltchaSuccess = (token) => {
  console.log('Altcha success:', token)
  CaptchaResponse.value = token
}

const onAltchaError = (error) => {
  console.error('Altcha error:', error)
  CaptchaResponse.value = ''
}

const onAltchaExpired = () => {
  console.log('Altcha expired')
  CaptchaResponse.value = ''
}

// Form submit handler
const handleSubmit = async (event) => {
  event.preventDefault()
  
  if (!CaptchaResponse.value) {
    submitMessage.value = 'Voltooi eerst de CAPTCHA verificatie.'
    return
  }
  
  isSubmitting.value = true
  submitMessage.value = ''
  
  try {
    const formData = new FormData(event.target)
    formData.append('h-captcha-response', CaptchaResponse.value)
    
    const response = await fetch('https://mailings.sebastix.dev/subscription/form', {
      method: 'POST',
      body: formData
    })
    
    if (response.ok) {
      submitMessage.value = 'Bedankt voor je aanmelding! Check je e-mail voor bevestiging.'
      event.target.reset()
      // Reset hCaptcha
      if (window.hcaptcha) {
        window.hcaptcha.reset()
      }
      CaptchaResponse.value = ''
    } else {
      submitMessage.value = 'Er ging iets mis. Probeer het opnieuw.'
    }
  } catch (error) {
    console.error('Submit error:', error)
    submitMessage.value = 'Er ging iets mis. Probeer het opnieuw.'
  } finally {
    isSubmitting.value = false
  }
}

// Load hCaptcha script en setup
onMounted(async () => {
  // Wacht tot DOM ready is
  await nextTick()
  
  // Check if hCaptcha script already loaded
  if (!document.querySelector('script[src*="hcaptcha.com"]')) {
    const script = document.createElement('script')
    script.src = 'https://mailings.sebastix.dev/public/static/altcha.umd.js'
    script.async = true
    script.defer = true
    document.head.appendChild(script)
    
    script.onload = () => {
      setupAltcha()
    }
  } else {
    // Script already loaded
    setupAltcha()
  }
})

const setupAltcha = () => {
  // Make callback functions globally available
  window.onAltchaSuccess = onAltchaSuccess
  window.onAltchaError = onAltchaError
  window.onAltchaExpired = onAltchaExpired
}
</script>
<template>
  <div class="border border-gray-200 bg-[#fcfcfc] rounded-sm text-center pb-8 mb-8">
    <div class="h-[44px] nyves-bg-gray-header"></div>
    <form method="post" action="https://mailings.sebastix.dev/subscription/form" class="listmonk-form">
      <div>
        <h3 class="text-xl font-bold mb-2">
          Meld je aan voor de nieuwsbrief
        </h3>
        <input type="hidden" name="nonce" />
        <p>
          <input type="email" name="email" autocomplete="on" required placeholder="Type hier jouw e-mailadres" class="p-2 bg-white border border-nyves-orange rounded-sm text-base min-w-[360px]" />
        </p>
        <p>
          <input id="6ef0a" type="checkbox" name="l" checked value="6ef0a7dc-b3b2-4f8e-bb8f-c6f03b327e4c" class="hidden" />
        </p>
        <div class="inline-block mx-auto mt-3">
          <altcha-widget challengeurl="https://mailings.sebastix.dev/api/public/captcha/altcha"></altcha-widget>
        </div>
        <input type="submit" value="Aanmelden" class="mx-auto block mt-2 px-6 py-2 bg-nyves-orange cursor-pointer text-white! font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200" />
      </div>
    </form>
    <div class="mt-8">
      Of word lid van de Nyves chat groep op Signal:
      <br />
      <a href="https://signal.group/#CjQKIIGUFWYny2Io9ZV9nJZh-pphkNNQoS_ZoOKL38BueZz-EhBy14nSfdoW8If9NsJK6Er9" target="_blank" rel="nofollow" class="mt-2 inline-flex items-center break-all font-bold">
        <img src="~/assets/signal-logo.svg" class="size-8 rounded-sm mx-auto mr-2">
        https://signal.group/#CjQ...6Er9
      </a>
    </div>
  </div>
</template>

<style scoped>

</style>