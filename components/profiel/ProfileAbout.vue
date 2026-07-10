<script setup>
const props = defineProps({
  profile: {
    type: Object,
    required: true
  }
})
</script>
<template>
  <div class="border border-gray-200 bg-[#fcfcfc] rounded-sm">
    <h3 class="nyves-bg-gray-header text-nyves-blue font-bold p-2">Profiel</h3>
    <p class="px-2 text-xs" v-if="profile.about">
      {{ profile.about }}
    </p>
    <div class="p-2">
      <div class="text-xs leading-normal">
        <strong>Naam:</strong> {{ profile.name }}<br>
        Hyver sinds {{ profile.joinDate }}
      </div>
      <div class="mt-2 clear-both text-xs">
        <strong>Mijn merken: </strong>
        <template v-for="(brand, index) in profile.brands" :key="brand">
          <NuxtLink :to="`/brand/${brand.toLowerCase()}`">{{ brand }}</NuxtLink>
          <span v-if="index < profile.brands.length - 1">, </span>
        </template>
        <br />
        <strong>Spots:</strong> ({{ profile.spots }})
        <br />
        <strong>Website:</strong> <a :href="profile.website" v-if="profile.website" target="_blank">{{ profile.website }}</a>
      </div>
      <NuxtLink to="#" class="text-xs">› Bekijk volledig profiel</NuxtLink>
    </div>
  </div>
</template>
