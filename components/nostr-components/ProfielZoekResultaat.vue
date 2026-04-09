<script setup>
const router = useRouter()

const props = defineProps({
  profiel: {
    type: Object,
    required: true
  }
})

const selecteerProfiel = () => {
  router.push({ path: '/profiel/'+props.profiel.name })
}
</script>

<template>
  <div 
    @click="selecteerProfiel"
    class="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150 border-b border-gray-100 last:border-b-0"
  >
    <div class="flex items-center space-x-3">
      <!-- Placeholder avatar (simpele cirkel met initiaal) -->
      <div class="w-8 h-8 bg-nyves-blue text-white rounded-full flex items-center justify-center text-sm font-medium">
        {{ profiel.name.charAt(0).toUpperCase() }}
      </div>
      
      <!-- Profiel info -->
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium text-gray-900 truncate">
          {{ profiel.display_name }}
        </p>
        <p v-if="profiel.display_name !== profiel.name" class="text-xs text-gray-500 truncate">
          @{{ profiel.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>