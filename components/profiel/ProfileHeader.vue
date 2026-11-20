<script setup>

const props = defineProps({
  profile: {
    type: Object,
    required: true
  },
})
</script>

<template>
  <div class="flex flex-row gap-x-2 profileHeader mb-2">
    <NuxtLink :to="`/profiel/${profile.npub}`">
      <NostrComponentsProfilePicture :pubkey="profile.pubkey" class="size-12" />
    </NuxtLink>
    <div class="grid grid-cols-2">
      <h1 class="col-span-2 text-3xl font-bold mb-1">
        <NuxtLink :to="`/profiel/${profile.npub}`">
          {{ profile.name }}
        </NuxtLink>
        <a :href="`${profile.urlWaybackMachine}/vrienden`" target="_blank" class="text-xs" v-if="profile.urlWaybackMachine">{{ profile.urlWaybackMachine }}</a>
      </h1>
      <div class="mb-2">
        <RouterLink :to="`/profiel/${profile.npub}/over`" class="mr-4 text-xs">{{ $t('profiel.nav.about') }}</RouterLink>
        <RouterLink :to="`/profiel/${profile.npub}/vrienden`" class="mr-4 text-xs">{{ $t('profiel.nav.friends') }}</RouterLink>
        <RouterLink :to="`/profiel/${profile.npub}/wiewatwaar`" class="mr-4 text-xs">{{ $t('profiel.nav.www') }}</RouterLink>
        <RouterLink :to="`/profiel/${profile.npub}/media`" class="mr-4 text-xs">{{ $t('profiel.nav.photos') }}</RouterLink>
        <RouterLink :to="`/profiel/${profile.npub}/blog`" class="mr-4 text-xs">{{ $t('profiel.nav.blog') }}</RouterLink>
        <RouterLink :to="`/profiel/${profile.npub}/meer`" class="text-xs">{{ $t('profiel.nav.more') }}</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>