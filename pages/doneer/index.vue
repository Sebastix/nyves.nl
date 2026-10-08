<script setup>
import { generateInvoice } from 'lightning-invoice-generator';

const { openModal } = useModal();
const { t } = useI18n()

const copyToClipBoard = (event, text = '') => {
  if (text === '') {
     // Get target text to be copied.
     text = event.target.textContent;
  }
  navigator.clipboard.writeText(text);
  // Replace text content for just 1 second
  event.target.textContent = t('doneer.copied')
  setTimeout(() => {
    event.target.textContent = text
  }, 1000)
}

const generateLightningInvoice = async () => {
  const invoice = await generateInvoice(
      'sebastian@lnd.sebastix.com',
      2100
  );
  // Show the modal now with the invoice string
  openModal('Invoice', invoice);
}
useSeoMeta({
  title: () => `${t('doneer.title')} - Nyves`,
  description: () => t('doneer.subtitle')
})
</script>

<template>
  <section>
    <h1 class="text-3xl text-nyves-blue my-3 text-center font-bold">{{ $t('doneer.title') }}</h1>
    <p class="text-xl text-center mb-8">
      {{ $t('doneer.subtitle') }}
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div class="border border-gray-200 bg-[#fcfcfc] rounded-sm pb-8">
        <div class="h-[44px] nyves-bg-gray-header"></div>
        <div class="px-8">
          <h2 class="text-2xl mb-4">{{ $t('doneer.opencollective.heading') }}</h2>
          <p>
            {{ $t('doneer.opencollective.text') }}
            <br />
            <br />
            <a href="https://opencollective.com/sebastix/projects/nyves" target="_blank" class="font-bold">
              https://opencollective.com/sebastix/projects/nyves
              <svg class="size-4 inline align-text-top" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </p>
        </div>
      </div>
      <div class="border border-gray-200 bg-[#fcfcfc] rounded-sm pb-8">
        <div class="h-[44px] nyves-bg-gray-header"></div>
        <div class="px-8">
          <h2 class="text-2xl mb-4">{{ $t('doneer.bank.heading') }}</h2>
          <p class="mb-4">
            {{ $t('doneer.bank.recipient') }}
            <code class="break-all bg-white block text-sm cursor-pointer relative">
              <svg class="size-3 absolute right-3 top-1/3 align-text-top inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-200.6c0-17.4-7.1-34.1-19.7-46.2L370.6 17.8C358.7 6.4 342.8 0 326.3 0L192 0zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-16-64 0 0 16-192 0 0-256 16 0 0-64-16 0z"/></svg>
              <span class="block p-4 hover:bg-nyves-blue/10" @click="copyToClipBoard($event)">Sebastix</span>
            </code>
          </p>
          <p class="mb-4">
            {{ $t('doneer.bank.iban') }}
            <code class="break-all bg-white block text-sm cursor-pointer relative">
              <svg class="size-3 absolute right-3 top-1/3 align-text-top inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-200.6c0-17.4-7.1-34.1-19.7-46.2L370.6 17.8C358.7 6.4 342.8 0 326.3 0L192 0zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-16-64 0 0 16-192 0 0-256 16 0 0-64-16 0z"/></svg>
              <span class="block p-4 hover:bg-nyves-blue/10" @click="copyToClipBoard($event)">NL83BUNQ2213235155</span>
            </code>
          </p>
          <p class="mb-4">
            {{ $t('doneer.bank.bic') }}
            <code class="break-all bg-white block text-sm cursor-pointer relative">
              <svg class="size-3 absolute right-3 top-1/3 align-text-top inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-200.6c0-17.4-7.1-34.1-19.7-46.2L370.6 17.8C358.7 6.4 342.8 0 326.3 0L192 0zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-16-64 0 0 16-192 0 0-256 16 0 0-64-16 0z"/></svg>
              <span class="block p-4 hover:bg-nyves-blue/10" @click="copyToClipBoard($event)">BUNQNL2A</span>
            </code>
          </p>
          <p class="font-bold text-lg">
            {{ $t('doneer.bank.link_label') }}
            <a href="https://bunq.me/nyves" target="_blank">
              https://bunq.me/nyves
              <svg class="size-4 inline align-text-top" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </p>
        </div>
      </div>
      <div class="border border-gray-200 bg-[#fcfcfc] rounded-sm pb-8 md:col-span-2">
        <div class="h-[44px] nyves-bg-gray-header"></div>
        <div class="px-8">
          <h2 class="text-2xl mb-4">{{ $t('doneer.bitcoin.heading') }}</h2>
          <p class="mb-4">
            {{ $t('doneer.bitcoin.address') }}
            <code class="break-all bg-white block text-sm cursor-pointer relative">
              <span class="block p-4 hover:bg-nyves-blue/10" @click="copyToClipBoard($event)">bc1qe8heqn308gqwnxkezxgtxrmut8p8m0r2lrfnjr</span>
              <svg class="size-3 align-text-top absolute right-3 top-1/3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-200.6c0-17.4-7.1-34.1-19.7-46.2L370.6 17.8C358.7 6.4 342.8 0 326.3 0L192 0zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-16-64 0 0 16-192 0 0-256 16 0 0-64-16 0z"/></svg>
            </code>
          </p>
          <p class="mb-4">
            {{ $t('doneer.bitcoin.silent_payment') }}
            <code class="break-all bg-white block text-sm cursor-pointer relative">
              <span class="block p-4 hover:bg-nyves-blue/10" @click="copyToClipBoard($event)">sp1qqvyxr3sl0j0p35fjacgjenyg6rj27xmdhcwqzjfl5lfja85flwkduq4j9j6aufalqxn70th938hv0zk5gr9rh9ttu8hzqtg9ml9d2k86s59zu2wa</span>
              <svg class="size-3 align-text-top absolute right-3 top-1/3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-200.6c0-17.4-7.1-34.1-19.7-46.2L370.6 17.8C358.7 6.4 342.8 0 326.3 0L192 0zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-16-64 0 0 16-192 0 0-256 16 0 0-64-16 0z"/></svg>
            </code>
          </p>
          <p class="mb-4">
            {{ $t('doneer.bitcoin.lightning') }}
            <code class="break-all bg-white block text-sm cursor-pointer relative">
              <span class="block p-4 hover:bg-nyves-blue/10" @click="copyToClipBoard($event)">sebastian@lnd.sebastix.com</span>
              <svg class="size-3 align-text-top absolute right-3 top-1/3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-200.6c0-17.4-7.1-34.1-19.7-46.2L370.6 17.8C358.7 6.4 342.8 0 326.3 0L192 0zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-16-64 0 0 16-192 0 0-256 16 0 0-64-16 0z"/></svg>
            </code>
          </p>
          <!-- @todo -->
          <p class="font-bold text-lg">
            {{ $t('doneer.bitcoin.invoice_before') }}<a href="#" @click="generateLightningInvoice">{{ $t('doneer.bitcoin.invoice_link') }}<svg class="size-4 inline align-text-top" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg></a>{{ $t('doneer.bitcoin.invoice_after') }}
          </p>
        </div>
      </div>
    </div>
  </section>

</template>

<style scoped>

</style>