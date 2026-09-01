<script setup>
useSeoMeta({
  title: `Over Nyves - Nyves`,
  description: ``
})
</script>

<template>
  <section>
    <h1 class="text-3xl text-nyves-blue my-3 text-center font-bold">Over Nyves</h1>
    <p class="text-xl text-center mb-8">
      Het verhaal achter Nyves
    </p>

    <section class="border border-gray-200 bg-[#fcfcfc] rounded-sm mb-8 pb-8">
      <div class="h-[44px] nyves-bg-gray-header"></div>
      <div class="grid md:grid-cols-2 gap-8 items-center px-8 pb-[44px]">
        <div>
          <h2 class="text-lg mb-2 font-bold">HVSbackup</h2>
          <p class="text-gray-600 leading-relaxed">
            In de periode 2010-2013 ontwikkelde Sebastian Hagens een applicatie genaamd HVSbackup<sup>
              <a href="https://hvsbackup.nl" target="_blank">
                <svg class="size-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </sup>
            waarmee je verschillende content van jouw Hyves profiel kon downloaden.
          </p>
          <NuxtLink to="/hvsbackup" class="text-sm my-4 inline-block">> Bekijk hier hoe de applicatie werkte</NuxtLink>
          <p class="text-gray-600 leading-relaxed">
            Een paar maanden voordat Hyves offline ging als sociaal netwerk, hebben duizenden mensen een backup gemaakt van hun Hyves profiel met de applicatie. Naast deze backups, is er ook een grote backup als publiek archief gemaakt door de Archive Team van The Internet Archive<sup>
              <a href="https://wiki.archiveteam.org/index.php/Hyves" target="_blank">
                <svg class="size-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </sup>.
            Deze bronnen kunnen gebruikt worden om Hyves terug te brengen. Echter niet als een centraal platform, maar puur als applicatie die alle content ophaalt van zogenaamde relays.
            <br />
            <br />
            Dat is wat Nyves aan het worden is.
          </p>
        </div>
        <div>
          <img src="/hvsbackup/samenvatting.png" class="rounded-sm" />
        </div>
      </div>
      <div class="grid md:grid-cols-2 gap-8 items-center px-8 pb-[44px]">
        <div>
          <img src="~/assets/nostrverse.png" class="rounded-sm shadow-md/25" alt="Nostr stand at FOSDEM 2025" />
        </div>
        <div>
          <h2 class="text-lg mb-2 font-bold">Let's fix the web - nostr by default</h2>
          <p class="text-gray-600 leading-relaxed mb-4">
            Since Sebastian has been online on the internet (1998), he is highly interested in online communities, social networking and new ways of digital interactions.
            The internet has changed radically in the last decade and that change is not serving our interests. It's fair to say the web is broken in many ways. With Nostr we can fix this.
          </p>
          <p class="text-gray-600 leading-relaxed">
            Sebastix is active in the nostr community since 2023. He believes any contribution to Nostr can have in potential an exponential benefit for all people and the web in general.
          </p>
          <NuxtLink to="https://nostrver.se" class="text-sm my-4 inline-block">> More contributions can be found here <svg class="size-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg></NuxtLink>
        </div>
      </div>
    </section>

    <!-- SIDNfonds Support Section -->
    <HomepageSidnFondsSupport />

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