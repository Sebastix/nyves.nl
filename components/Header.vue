<template>
  <header>
    <!-- Header Navigation -->
    <div class="mx-3 py-2 flex gap-3 text-sm">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/zoek">Zoeken</NuxtLink>
    </div>

    <!-- Hyves Banner -->
    <div class="h-[44px] bg-linear-to-b from-[#fbb04f] to-[#f68829] border border-nyves-orange rounded-sm drop-shadow-xs/20">
      <div class="w-full mx-auto py-[6px] px-3 flex gap-x-3">
        <NuxtLink to="/" class="text-white! text-lg font-bold">Nyves</NuxtLink>
        <Search />
      </div>
    </div>
  </header>
</template>
