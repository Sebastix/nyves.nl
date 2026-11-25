<script setup>
const { t } = useI18n()

useSeoMeta({
  title: () => `${t('connect.title')} - Nyves`,
  description: () => t('connect.seo_description')
})
</script>

<template>
  <section>
    <h1 class="text-3xl text-nyves-blue my-3 text-center font-bold">{{ $t('connect.title') }}</h1>
    <p class="text-center text-xl mb-8">
      {{ $t('connect.subtitle') }}
    </p>
    <section class="px-2 max-w-2xl mx-auto">
      <p class="bg-orange-100/50 border border-orange-100 text-xl p-4 mb-4">
        <strong>
          {{ $t('connect.notice_title') }}
        </strong>
        <br />
        <i18n-t keypath="connect.notice_body" tag="span" scope="global">
          <template #link>
            <a href="https://ditto.pub?ref=nyves" target="_blank" class="inline-flex align-top">
              https://ditto.pub
              <svg class="size-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </template>
        </i18n-t>
      </p>
      <div class="connect-options mb-12">
        <details>
          <summary>{{ $t('connect.opt1_summary') }}</summary>
          <p>
            {{ $t('connect.opt1_body') }}
          </p>
          <a href="#" class="cursor-not-allowed">{{ $t('connect.opt1_action') }}</a>
        </details>
        <details>
          <summary>{{ $t('connect.opt2_summary') }}</summary>
          <p>
            {{ $t('connect.opt2_body') }}
          </p>
          <p>
            {{ $t('connect.opt2_how_title') }}
            <br />
            <i18n-t keypath="connect.opt2_how_body" tag="span" scope="global">
              <template #link>
                <a href="https://viewsource.win/fiatjaf.com/pomegranate/_/master" target="_blank">pomegranate</a>
              </template>
            </i18n-t>
          </p>
          <a href="#" class="cursor-not-allowed">{{ $t('connect.opt2_action') }}</a>
        </details>
        <details>
          <summary>
            {{ $t('connect.opt3_summary') }}
            <sup class="bg-amber-300 text-xs p-1 rounded-sm">{{ $t('connect.opt3_advanced') }}</sup>
          </summary>
          <p>
            <i18n-t keypath="connect.opt3_body" tag="span" scope="global">
              <template #code><code>nostrconnect://</code></template>
            </i18n-t>
          </p>
        </details>
        <details>
          <summary>
            {{ $t('connect.opt4_summary') }}
            <sup class="bg-red-300 text-xs p-1 rounded-sm">{{ $t('connect.opt4_unrecommended') }}</sup>
          </summary>
          <p>
            <i18n-t keypath="connect.opt4_body" tag="span" scope="global">
              <template #code><code>ncrypt1</code></template>
            </i18n-t>
          </p>
        </details>
      </div>
    </section>
  </section>
</template>

<style scoped>

</style>
