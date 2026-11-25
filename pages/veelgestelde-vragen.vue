<script setup>
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => `${t('Veelgestelde_vragen')} - Nyves`,
  description: () => t('veelgestelde_vragen.seo_description')
})

const YME_BOSMA_NPUB = 'npub1tef4nks9rrfcvkxlwts9eu4zluhfs025nrr3ldkm8ssuqv7m46ksf7nskn'
</script>

<template>
  <section class="leading-relaxed mb-8">
    <h1 class="text-3xl text-nyves-blue my-3 text-center font-bold">{{ $t('Veelgestelde_vragen') }}</h1>
    <p class="text-xl text-center">
      {{ $t('veelgestelde_vragen.subtitle') }}
    </p>
  </section>
  <section class="categorie">
    <h2>{{ $t('veelgestelde_vragen.sections.getting_started') }}</h2>
    <details>
      <summary>{{ $t('veelgestelde_vragen.q.what_is_nyves') }}</summary>
      {{ $t('veelgestelde_vragen.a.what_is_nyves') }}
    </details>
    <details>
      <summary>{{ $t('veelgestelde_vragen.q.create_profile') }}</summary>
      <p>
        {{ $t('veelgestelde_vragen.a.create_profile_1') }}
      </p>
      <p>
        <i18n-t keypath="veelgestelde_vragen.a.create_profile_2" tag="span" scope="global">
          <template #link>
            <a href="https://ditto.pub" target="_blank" rel="noopener noreferrer" class="inline-flex items-center align-top">
              Ditto
              <svg class="size-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </template>
        </i18n-t>
      </p>
    </details>
    <details>
      <summary>{{ $t('veelgestelde_vragen.q.custom_design') }}</summary>
      <p>
        <i18n-t keypath="veelgestelde_vragen.a.custom_design_1" tag="span" scope="global">
          <template #link>
            <a href="https://ditto.pub" target="_blank" rel="noopener noreferrer" class="inline-flex items-center align-top">
              Ditto
              <svg class="size-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </template>
        </i18n-t>
      </p>
      <p>
        <i18n-t keypath="veelgestelde_vragen.a.custom_design_2" tag="span" scope="global">
          <template #link>
            <NuxtLink :to="localePath('profielen-uit-de-nostrverse-en-fediverse')">{{ $t('veelgestelde_vragen.link_profiles_with_design') }}</NuxtLink>
          </template>
        </i18n-t>
      </p>
    </details>
    <details>
      <summary>{{ $t('veelgestelde_vragen.q.opensource') }}</summary>
      <i18n-t keypath="veelgestelde_vragen.a.opensource" tag="span" scope="global">
        <template #link1>
          <a
              href="https://gitlab.com/sebastix-group/nyves"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center align-top"
          >
            https://gitlab.com/sebastix-group/nyves
            <svg class="size-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </template>
        <template #link2>
          <a
              href="https://gitworkshop.dev/relay.nyves.nl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center align-top"
          >
            https://gitworkshop.dev/relay.nyves.nl
            <svg class="size-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </template>
      </i18n-t>
    </details>
    <details>
      <summary>{{ $t('veelgestelde_vragen.q.what_is_relay') }}</summary>
      {{ $t('veelgestelde_vragen.a.what_is_relay') }}
    </details>
    <details>
      <summary>
        <i18n-t keypath="veelgestelde_vragen.q.npub" tag="span" scope="global">
          <template #code><code class="text-sm bg-gray-200 p-1">npub1...</code></template>
        </i18n-t>
      </summary>
      {{ $t('veelgestelde_vragen.a.npub') }}
    </details>
    <details>
      <summary>{{ $t('veelgestelde_vragen.q.delete_profile') }}</summary>
      {{ $t('veelgestelde_vragen.a.delete_profile') }}
    </details>
    <details>
      <summary>{{ $t('veelgestelde_vragen.q.hyves_founders') }}</summary>
      <i18n-t keypath="veelgestelde_vragen.a.hyves_founders" tag="span" scope="global">
        <template #link>
          <NuxtLink :to="localePath({ name: 'profiel-id', params: { id: YME_BOSMA_NPUB } })">Yme Bosma</NuxtLink>
        </template>
      </i18n-t>
    </details>
    <details>
      <summary>{{ $t('veelgestelde_vragen.q.children') }}</summary>
      {{ $t('veelgestelde_vragen.a.children') }}
    </details>
    <details>
      <summary>{{ $t('veelgestelde_vragen.q.responsible_content') }}</summary>
      {{ $t('veelgestelde_vragen.a.responsible_content') }}
    </details>
    <details>
      <summary>{{ $t('veelgestelde_vragen.q.content_origin') }}</summary>
      {{ $t('veelgestelde_vragen.a.content_origin') }}
    </details>
    <details>
      <summary>{{ $t('veelgestelde_vragen.q.add_friend') }}</summary>
    </details>
    <details>
      <summary>{{ $t('veelgestelde_vragen.q.what_is_hyves') }}</summary>
      {{ $t('veelgestelde_vragen.a.what_is_hyves') }}
      <ul class="list-disc pl-8">
        <li>{{ $t('veelgestelde_vragen.a.hyves_fact_krabbels') }}</li>
        <li>{{ $t('veelgestelde_vragen.a.hyves_fact_time') }}</li>
        <li>{{ $t('veelgestelde_vragen.a.hyves_fact_band') }}</li>
        <li>{{ $t('veelgestelde_vragen.a.hyves_fact_friends') }}</li>
        <li>{{ $t('veelgestelde_vragen.a.hyves_fact_data') }}</li>
        <li>{{ $t('veelgestelde_vragen.a.hyves_fact_photos') }}</li>
      </ul>
    </details>
    <details>
      <summary>{{ $t('veelgestelde_vragen.q.hyves_data') }}</summary>
      {{ $t('veelgestelde_vragen.a.hyves_data') }}
      <br />
      <a
          href="https://www.vpngids.nl/nieuws/hyves-waar-zijn-onze-gegevens-gebleven/"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center align-top"
      >
        https://www.vpngids.nl/nieuws/hyves-waar-zijn-onze-gegevens-gebleven/
        <svg class="size-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </details>
    <details>
      <summary>{{ $t('veelgestelde_vragen.q.hyves_owner') }}</summary>
      <p>
        {{ $t('veelgestelde_vragen.a.hyves_owner') }}
      </p>
    </details>
    <details>
      <summary>{{ $t('veelgestelde_vragen.q.mediahuis_data') }}</summary>
      <p>
        <i18n-t keypath="veelgestelde_vragen.a.mediahuis_data" tag="span" scope="global">
          <template #link>
            <a
                href="https://www.nu.nl/tech/5994609/ruim-negen-miljoen-gearchiveerde-hyves-profielen-online-te-vinden.html"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center align-top"
            >
              {{ $t('veelgestelde_vragen.source_this_source') }}
              <svg class="size-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </template>
        </i18n-t>
      </p>
    </details>
    <details>
      <summary>{{ $t('veelgestelde_vragen.q.difference') }}</summary>
      <i18n-t keypath="veelgestelde_vragen.a.difference" tag="span" scope="global">
        <template #link>
          <NuxtLink :to="localePath('blog-verschil-tussen-nyves-en-hyves')">{{ $t('veelgestelde_vragen.link_this_page') }}</NuxtLink>
        </template>
      </i18n-t>
    </details>
    <details>
      <summary>{{ $t('veelgestelde_vragen.q.nostrverse') }}</summary>
      <p>
        {{ $t('veelgestelde_vragen.a.nostrverse_1') }}
      </p>
      <p>
        {{ $t('veelgestelde_vragen.a.nostrverse_2') }}
      </p>
    </details>
    <details>
      <summary>{{ $t('veelgestelde_vragen.q.fediverse') }}</summary>
      <p>
        {{ $t('veelgestelde_vragen.a.fediverse_1') }}
      </p>
      <p>
        <i18n-t keypath="veelgestelde_vragen.a.fediverse_2" tag="span" scope="global">
          <template #link>
            <NuxtLink :to="localePath('profielen-uit-de-nostrverse-en-fediverse')">{{ $t('veelgestelde_vragen.link_discover_profiles') }}</NuxtLink>
          </template>
        </i18n-t>
      </p>
    </details>
    <h2 class="text-xl">{{ $t('veelgestelde_vragen.sections.content') }}</h2>
    <details>
      <summary>{{ $t('veelgestelde_vragen.q.delete_content') }}</summary>
    </details>
    <details>
      <summary>{{ $t('veelgestelde_vragen.q.post_krabbel') }}</summary>
    </details>
    <details>
      <summary>{{ $t('veelgestelde_vragen.q.post_photo') }}</summary>
    </details>
    <details>
      <summary>{{ $t('veelgestelde_vragen.q.change_avatar') }}</summary>
    </details>
    <h2 class="text-xl">{{ $t('veelgestelde_vragen.sections.privacy') }}</h2>
    <details>
      <summary>{{ $t('veelgestelde_vragen.q.content_visible') }}</summary>
    </details>
    <details>
      <summary>{{ $t('veelgestelde_vragen.q.content_friends_only') }}</summary>
    </details>
    <div class="hidden">
      <h2 class="text-xl">{{ $t('veelgestelde_vragen.sections.moderation') }}</h2>
      <details>
        <summary>{{ $t('veelgestelde_vragen.q.unwanted_content') }}</summary>
      </details>
      <details>
        <summary>{{ $t('veelgestelde_vragen.q.report_content') }}</summary>
      </details>
      <details>
        <summary>{{ $t('veelgestelde_vragen.q.remove_content') }}</summary>
      </details>
      <details>
        <summary>{{ $t('veelgestelde_vragen.q.block_person') }}</summary>
      </details>
    </div>
    <h2 class="text-xl">{{ $t('veelgestelde_vragen.sections.technical') }}</h2>
    <details>
      <summary>{{ $t('veelgestelde_vragen.q.technology') }}</summary>
      <i18n-t keypath="veelgestelde_vragen.a.technology" tag="span" scope="global">
        <template #link>
          <NuxtLink :to="localePath('nostr')">nostr</NuxtLink>
        </template>
      </i18n-t>
    </details>
    <details>
      <summary>{{ $t('veelgestelde_vragen.q.see_code') }}</summary>
      {{ $t('veelgestelde_vragen.a.see_code') }}
    </details>
    <details>
      <summary>{{ $t('veelgestelde_vragen.q.keypairs') }}</summary>
      {{ $t('veelgestelde_vragen.a.keypairs') }}
    </details>
    <h2 class="text-xl">{{ $t('veelgestelde_vragen.sections.support') }}</h2>
    <details>
      <summary>{{ $t('veelgestelde_vragen.q.contact') }}</summary>
      {{ $t('veelgestelde_vragen.a.contact') }}
    </details>
  </section>
</template>

<style scoped>

</style>
