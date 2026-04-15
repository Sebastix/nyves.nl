<template>
  <header>
    <!-- Header Navigation -->
    <div class="navigation rounded-sm my-1 px-2 py-1 flex gap-6 text-sm">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/zoek">Zoeken</NuxtLink>
    </div>

    <!-- Hyves Banner -->
    <div class="banner h-[44px] bg-linear-to-b from-[#fbb04f] to-[#f68829] border border-nyves-orange rounded-sm drop-shadow-xs/20">
      <div class="flex justify-between py-[6px] px-2">
        <div class="flex gap-x-3">
          <NuxtLink to="/" class="text-white! text-lg font-bold">Nyves</NuxtLink>
          <Search />
        </div>
        <NostrComponentsRelayPoolStatus />
      </div>
    </div>
  </header>
</template>
