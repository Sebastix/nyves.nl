<script setup>
const props = defineProps({
  profile: {
    type: Object,
    required: true
  },
  nyvesProfile: {
    type: Object,
    required: true
  },
})

onMounted(() => {
  //console.log(props.nyvesProfile)
})
</script>
<template>
  <div class="border border-gray-200 bg-[#fcfcfc] rounded-sm">
    <h3 class="nyves-bg-gray-header text-nyves-blue font-bold p-2">Profiel</h3>
    <p class="px-2 text-xs" v-if="profile.about">
      {{ profile.about }}
    </p>
    <p class="px-2 pt-2 font-mono text-xs" v-if="profile.npub" :title="profile.npub">
      {{ profile.npub.slice(0, 8) }}...{{ profile.npub.substr(profile.npub.length - 8) }}
    </p>
    <div class="p-2">
      <div class="text-xs leading-normal">
        <strong>Naam:</strong> {{ profile.name }}<br>
        <template v-if="nyvesProfile.joinDate">
          Hyver sinds {{ nyvesProfile.joinDate }}
        </template>
      </div>
      <div class="mt-2 clear-both text-xs">
        <template v-if="nyvesProfile.username">
          <strong>Mijn merken: </strong>
          <template v-for="(brand, index) in nyvesProfile.brands" :key="brand">
            <NuxtLink :to="`#${brand.toLowerCase()}`">{{ brand }}</NuxtLink>
            <span v-if="index < nyvesProfile.brands.length - 1">, </span>
          </template>
          <br />
          <strong>Spots:</strong> ({{ nyvesProfile.spots }})
          <br />
        </template>
        <template v-if="profile.website">
          <strong>Website:</strong> <a :href="profile.website" v-if="profile.website" target="_blank">{{ profile.website }}</a>
        </template>
      </div>
      <NuxtLink :to="`${profile.npub}/meer`" class="text-xs">› Bekijk volledig profiel</NuxtLink>
    </div>
  </div>
</template>
