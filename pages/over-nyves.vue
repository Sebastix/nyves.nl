<script setup>
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => `${t('Over_Nyves')} - Nyves`,
  description: () => t('over_nyves.seo_description')
})
</script>

<template>
  <section>
    <h1 class="text-3xl text-nyves-blue my-3 text-center font-bold">{{ $t('Over_Nyves') }}</h1>
    <p class="text-xl text-center mb-8">
      {{ $t('over_nyves.subtitle') }}
    </p>

    <section class="border border-gray-200 bg-[#fcfcfc] rounded-sm mb-8 pb-8">
      <div class="h-[44px] nyves-bg-gray-header"></div>
      <div class="grid md:grid-cols-2 gap-8 items-center px-8 pb-[44px]">
        <div>
          <h2 class="text-lg mb-2 font-bold">{{ $t('over_nyves.hvsbackup_title') }}</h2>
          <p class="text-gray-600 leading-relaxed">
            <i18n-t keypath="over_nyves.hvsbackup_body" tag="span" scope="global">
              <template #link>
                <sup>
                  <a href="https://hvsbackup.nl" target="_blank">
                    <svg class="size-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </sup>
              </template>
            </i18n-t>
          </p>
          <NuxtLink :to="localePath('hvsbackup')" class="text-sm my-4 inline-block">> {{ $t('over_nyves.hvsbackup_link') }}</NuxtLink>
          <p class="text-gray-600 leading-relaxed">
            <i18n-t keypath="over_nyves.archive_body" tag="span" scope="global">
              <template #link>
                <sup>
                  <a href="https://wiki.archiveteam.org/index.php/Hyves" target="_blank">
                    <svg class="size-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </sup>
              </template>
            </i18n-t>
            <br />
            <br />
            {{ $t('over_nyves.becoming') }}
            <br />
            <NuxtLink :to="localePath('tijdlijn')" class="text-sm my-4 inline-block">> {{ $t('over_nyves.timeline_link') }}</NuxtLink>
          </p>
          <h2 class="text-lg mt-4 mb-2 font-bold">{{ $t('over_nyves.why_title') }}</h2>
          <p class="text-gray-600 leading-relaxed">
            {{ $t('over_nyves.why_body') }}
          </p>
        </div>
        <div>
          <img src="/hvsbackup/samenvatting.png" class="rounded-sm" />
        </div>
      </div>
      <div class="grid md:grid-cols-2 gap-8 items-center px-8 pb-[44px]">
        <div>
          <img src="~/assets/nostrverse.png" class="rounded-sm shadow-md/25" :alt="$t('over_nyves.fosdem_alt')" />
        </div>
        <div>
          <h2 class="text-lg mb-2 font-bold">{{ $t('over_nyves.nostr_title') }}</h2>
          <p class="text-gray-600 leading-relaxed mb-4">
            {{ $t('over_nyves.nostr_body1') }}
          </p>
          <p class="text-gray-600 leading-relaxed">
            {{ $t('over_nyves.nostr_body2') }}
            <br />
            <i18n-t keypath="over_nyves.nostr_body3" tag="span" scope="global">
              <template #nostr>
                <NuxtLink :to="localePath('nostr')" class="font-bold">Nostr</NuxtLink>
              </template>
              <template #potential><strong>{{ $t('over_nyves.nostr_potential') }}</strong></template>
              <template #exponential><strong>{{ $t('over_nyves.nostr_exponential') }}</strong></template>
              <template #web><strong>{{ $t('over_nyves.nostr_web') }}</strong></template>
            </i18n-t>
          </p>
          <NuxtLink to="https://nostrver.se" class="text-sm my-4 inline-block">> {{ $t('over_nyves.nostr_link') }} <svg class="size-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg></NuxtLink>
        </div>
      </div>
    </section>

    <HomepageBringBackHyvesVideo />

    <HomepageSidnFondsSupport />

    <HomepageAOSCollectiveSupport />

    <HomepageProtocolsNotPlatforms />

    <HomepageInternetArchiveEurope />

    <HomepageSoapboxCollab />

    <HomepageStatistics />

    <!-- Build in Public Section -->
    <HomepageBuildInPublic />
  </section>
</template>

<style scoped>

</style>
