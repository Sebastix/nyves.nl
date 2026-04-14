<script setup>
import { ref, onMounted, nextTick } from 'vue'

// State voor hCaptcha
const hcaptchaResponse = ref('')
const isSubmitting = ref(false)
const submitMessage = ref('')

// hCaptcha callback functies
const onHcaptchaSuccess = (token) => {
  console.log('hCaptcha success:', token)
  hcaptchaResponse.value = token
}

const onHcaptchaError = (error) => {
  console.error('hCaptcha error:', error)
  hcaptchaResponse.value = ''
}

const onHcaptchaExpired = () => {
  console.log('hCaptcha expired')
  hcaptchaResponse.value = ''
}

// Form submit handler
const handleSubmit = async (event) => {
  event.preventDefault()
  
  if (!hcaptchaResponse.value) {
    submitMessage.value = 'Voltooi eerst de CAPTCHA verificatie.'
    return
  }
  
  isSubmitting.value = true
  submitMessage.value = ''
  
  try {
    const formData = new FormData(event.target)
    formData.append('h-captcha-response', hcaptchaResponse.value)
    
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
      hcaptchaResponse.value = ''
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
    script.src = 'https://js.hcaptcha.com/1/api.js'
    script.async = true
    script.defer = true
    document.head.appendChild(script)
    
    script.onload = () => {
      setupHcaptcha()
    }
  } else {
    // Script already loaded
    setupHcaptcha()
  }
})

const setupHcaptcha = () => {
  // Make callback functions globally available
  window.onHcaptchaSuccess = onHcaptchaSuccess
  window.onHcaptchaError = onHcaptchaError  
  window.onHcaptchaExpired = onHcaptchaExpired
}
</script>
<template>
  <div class="border border-gray-200 bg-[#fcfcfc] rounded-sm text-center pb-12 mb-8">
    <div class="h-[44px] nyves-bg-gray-header"></div>
    <form method="post" action="https://mailings.sebastix.dev/subscription/form" class="listmonk-form">
      <div>
        <h3 class="text-xl font-bold mb-2">
          Blijf op de hoogte
        </h3>
        <input type="hidden" name="nonce" />
        <p>
          <input type="email" name="email" required placeholder="E-mail" class="p-2 bg-white border border-nyves-orange rounded-sm" />
        </p>
        <p>
          <input id="6ef0a" type="checkbox" name="l" checked value="6ef0a7dc-b3b2-4f8e-bb8f-c6f03b327e4c" class="hidden" />
        </p>
        <div class="h-captcha inline-block mx-auto mt-3" data-sitekey="93256e36-e8e2-4268-92d6-08e8376e03a3"></div>
        <input type="submit" value="Aanmelden" class="bg-nyves-orange text-white! font-bold py-2 px-6 mt-2 rounded-lg block mx-auto" />
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>