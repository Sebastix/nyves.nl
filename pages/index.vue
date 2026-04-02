<script setup>
// Set page meta
useSeoMeta({
  title: 'Welkom bij Nyves - Jouw toegang tot het Nostr netwerk',
  description: 'Ontdek Nyves, jouw toegangspoort tot het gedecentraliseerde Nostr netwerk. Volledige controle over je digitale identiteit, censuurbestendigheid en privacy zonder algoritmes.'
})
</script>

<template>
  <div class="relative min-h-screen">
    <!-- Hero Section -->
    <HomepageHero />
    
    <!-- Tijdelijke link naar Sebastian profiel -->
    <div class="text-center py-6">
      <NuxtLink 
        to="profile/sebastian"
        class="text-nyves-blue hover:text-nyves-blue/80 underline"
      >
        Sebastian's Profiel (development link)
      </NuxtLink>
    </div>
  </div>
</template>