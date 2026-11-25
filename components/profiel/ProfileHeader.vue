<script setup>
const localePath = useLocalePath()

const props = defineProps({
  profile: {
    type: Object,
    required: true
  },
})
</script>

<template>
  <div class="flex flex-row gap-x-2 profileHeader mb-2">
    <NuxtLink :to="localePath('profiel-id', { id: profile.npub })">
      <NostrComponentsProfilePicture :pubkey="profile.pubkey" class="size-12" />
    </NuxtLink>
    <div class="grid grid-cols-2">
      <h1 class="col-span-2 text-3xl font-bold mb-1">
        <NuxtLink :to="localePath('profiel-id', { id: profile.npub })">
          {{ profile.name }}
        </NuxtLink>
        <a :href="`${profile.urlWaybackMachine}/vrienden`" target="_blank" class="text-xs" v-if="profile.urlWaybackMachine">{{ profile.urlWaybackMachine }}</a>
      </h1>
      <div class="mb-2">
        <RouterLink :to="localePath('profiel-id-over', { id: profile.npub })" class="mr-4 text-xs">{{ $t('profiel.nav.about') }}</RouterLink>
        <RouterLink :to="localePath('profiel-id-vrienden', { id: profile.npub })" class="mr-4 text-xs">{{ $t('profiel.nav.friends') }}</RouterLink>
        <RouterLink :to="localePath('profiel-id-wiewatwaar', { id: profile.npub })" class="mr-4 text-xs">{{ $t('profiel.nav.www') }}</RouterLink>
        <RouterLink :to="localePath('profiel-id-media', { id: profile.npub })" class="mr-4 text-xs">{{ $t('profiel.nav.photos') }}</RouterLink>
        <RouterLink :to="localePath('profiel-id-blog', { id: profile.npub })" class="mr-4 text-xs">{{ $t('profiel.nav.blog') }}</RouterLink>
        <RouterLink :to="localePath('profiel-id-meer', { id: profile.npub })" class="text-xs">{{ $t('profiel.nav.more') }}</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>