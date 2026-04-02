<script setup>
// Set page meta
import MailingList from '../components/MailingList.vue';

useSeoMeta({
  title: 'Welkom bij Nyves - breng jouw Hyves profiel terug tot leven',
  description: ''
})
</script>

<template>
  <div class="relative min-h-screen">
    <!-- Hero Section -->
    <HomepageHero />
    
    <!-- SIDNfonds Support Section -->
    <HomepageSidnFondsSupport />
    
    <!-- Build in Public Section -->
    <HomepageBuildInPublic />

  </div>
</template>