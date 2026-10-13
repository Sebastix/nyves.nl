<script setup>
import { ref, onMounted, nextTick } from 'vue'

const { t } = useI18n()

const props = defineProps({
  // Optional raw HTML heading override. When empty, a localized heading
  // is rendered based on `variant` (the i18n plugin forbids HTML in messages).
  heading: {
    type: String,
    default: ''
  },
  // 'default' | 'search' — selects which localized heading to show.
  variant: {
    type: String,
    default: 'default'
  }
})

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
    submitMessage.value = t('MailingList.captcha_required')
    return
  }
  
  isSubmitting.value = true
  submitMessage.value = ''
  
  try {
    const formData = new FormData(event.target)
    formData.append('h-captcha-response', CaptchaResponse.value)
    
    const response = await fetch('https://mail.nyves.nl/subscription/form', {
      method: 'POST',
      body: formData
    })
    
    if (response.ok) {
      submitMessage.value = t('MailingList.success')
      event.target.reset()
      // Reset hCaptcha
      if (window.hcaptcha) {
        window.hcaptcha.reset()
      }
      CaptchaResponse.value = ''
    } else {
      submitMessage.value = t('MailingList.error')
    }
  } catch (error) {
    console.error('Submit error:', error)
    submitMessage.value = t('MailingList.error')
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
    script.src = 'https://mail.nyves.nl/public/static/altcha.umd.js'
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
    <form method="post" action="https://mail.nyves.nl/subscription/form" class="listmonk-form">
      <div>
        <h3 class="text-xl font-medium mb-2">
          <span v-if="heading" v-html="heading"></span>
          <template v-else-if="variant === 'search'">
            <strong class="block mb-4">{{ $t('MailingList.heading_search_lead') }}</strong>
            {{ $t('MailingList.heading_search_rest') }}
          </template>
          <template v-else>
            <span class="text-nyves-blue font-bold">{{ $t('MailingList.heading_lead') }}</span>
            {{ $t('MailingList.heading_rest') }}
          </template>
        </h3>
        <input type="hidden" name="nonce" />
        <p>
          <input type="email" name="email" autocomplete="on" required :placeholder="$t('MailingList.email_placeholder')" class="p-2 bg-white border border-nyves-blue focus:outline-nyves-orange rounded-sm text-base min-w-[360px]" />
        </p>
        <p>
          <input id="e1cfa" type="checkbox" name="l" checked value="e1cfa5a7-26e8-428b-92ef-d4337c2843a0" class="hidden" />
        </p>
        <div class="inline-block mx-auto mt-3">
          <altcha-widget challengeurl="https://mail.nyves.nl/api/public/captcha/altcha"></altcha-widget>
        </div>
        <input type="submit" :value="$t('MailingList.Aanmelden')" class="mx-auto block mt-2 px-6 py-3 bg-nyves-blue cursor-pointer text-white! font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200" />
      </div>
    </form>
    <div class="mt-8">
      {{ $t('MailingList.Signal') }}
      <br />
      <a href="https://signal.group/#CjQKIIGUFWYny2Io9ZV9nJZh-pphkNNQoS_ZoOKL38BueZz-EhBy14nSfdoW8If9NsJK6Er9" target="_blank" rel="nofollow" class="mt-2 inline-flex items-center break-all font-bold">
        <img src="~/assets/signal-logo.svg" class="size-8 rounded-sm mx-auto mr-2">
        https://signal.group/#CjQ...6Er9
        <svg class="size-5 inline align-text-top ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  </div>
</template>

<style scoped>

</style>