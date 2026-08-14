<script setup>
const props = defineProps({
  profile: {
    type: Object,
    required: true
  },
  friends: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="border border-gray-200 bg-[#fcfcfc] rounded-sm">
    <!-- Friends Section -->
    <h3 class="nyves-bg-gray-header h-10 font-bold text-nyves-blue mb-2 p-2">
      <NuxtLink :to="`/profiel/${profile.npub}/vrienden`">
        Vrienden ({{ Math.round((Math.floor(Math.random() * 200 + 150)) / 10) }})
      </NuxtLink>
    </h3>
    <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-3 gap-1 mb-4">
      <div v-for="friend in friends" :key="friend.id" class="text-center">
        <NuxtLink :to="`/profiel/${friend.username}`" class="text-xs">
          <div class="size-25 bg-gray-200 border border-gray-300 hover:border-gray-600 transition-border duration-150 shadow-md/5 mx-auto mb-1"></div>
          {{ friend.name }}
        </NuxtLink>
      </div>
    </div>
    <div class="my-1">
      <NuxtLink :to="`/profiel/${profile.npub}/vrienden`" class="text-xs mx-2">› Bekijk alle vrienden</NuxtLink>
    </div>
  </div>
</template>
