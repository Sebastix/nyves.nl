<script setup>
// Set page meta
useSeoMeta({
  title: `Zoeken - Nyves`,
  description: `Hier kun je jouw Hyves profiel opzoeken.`
})
</script>

<template>
  <section>
    <h1 class="text-2xl my-3 text-center">Zoeken</h1>

    <!-- Zoek Component -->
    <div class="max-w-md mx-auto text-2xl mb-6">
      <Search />
    </div>

    <!-- Relay Health Check -->
    <div class="max-w-md mx-auto">
      <p class="bg-nyves-blue-purple/10 rounded-sm p-2 text-sm mb-2">
        Nyves maakt gebruik van <a href="https://nips.nostr.com/50" target="_blank">NIP-50 Search Capability</a> om informatie te doorzoeken op de relay <a href="https://relay.nyves.nl" target="_blank">https://relay.nyves.nl</a>.
      </p>
      <RelayHealthCheck relay-url="wss://relay.nyves.nl" />
    </div>

  </section>
</template>

<style scoped>

</style>