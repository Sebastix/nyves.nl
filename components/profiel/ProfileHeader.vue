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
        <NuxtLink :to="`/profiel/${profile.npub}/over`" class="mr-4 text-xs">Over</NuxtLink>
        <NuxtLink :to="`/profiel/${profile.npub}/vrienden`" class="mr-4 text-xs">Vrienden</NuxtLink>
        <NuxtLink :to="`/profiel/${profile.npub}/media`" class="mr-4 text-xs">Foto's</NuxtLink>
        <NuxtLink :to="`/profiel/${profile.npub}/meer`" class="text-xs">Meer</NuxtLink>
      </div>
    </div>
    <button
        @click="toggleCustomDesign"
        class="justify-self-end text-xs mb-1 cursor-pointer px-1 hidden"
        :class="[ custom_design ? 'bg-linear-to-b from-[#65d018] to-[#49a811] text-white rounded-sm font-bold border border-[#96e05e] hover:border-[#44a806] text-shadow-xs' : '' ]"
    >
      <span class="text-white font-sans" v-if="custom_design">🛟 Toon in standaard design</span>
      <span class="text-nyves-blue" v-else>🛟 Toon eigen design!</span>
    </button>
  </div>
</template>

<style scoped>

</style>