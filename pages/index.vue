<script setup>
// Set page meta

</script>

<template>
  <div class="relative min-h-screen">
    <!-- Hero Section -->
    <HomepageHero />
    
    <!-- SIDNfonds Support Section -->
    <HomepageSidnFondsSupport />

    <HomepageProtocolsNotPlatforms />

    <HomepageInternetArchiveEurope />

    <!-- Build in Public Section -->
    <HomepageBuildInPublic />

    <HomepageStatistics />

    <div class="border border-gray-200 bg-[#fcfcfc] rounded-sm text-center mb-8">
      <div class="h-[44px] nyves-bg-gray-header"></div>
      <h2 class="text-2xl font-bold mb-8">Uitgelichte profielen met een eigen design</h2>
      <NostrComponentsHighlightProfiles :filters="[]" :limit="27" />
    </div>

    <MailingList />

  </div>
</template>

<style scoped>

</style>