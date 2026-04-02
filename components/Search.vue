<script setup>

</script>

<template>
  <form action="/zoek" id="search" class="bg-white/80 hover:bg-white/95 transition-bg duration-150 border border-nyves-orange rounded-xs shadow-inner/5 focus:outline-none flex justify-between">
    <input type="text" name="searchterms" id="s" class="px-2 text-sm/7 focus:outline-none" placeholder="Zoek profielen..." />
    <button id="search-submit" type="submit" class="px-1 border-l border-l-gray-300">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    </button>
  </form>
</template>

<style scoped>

</style>