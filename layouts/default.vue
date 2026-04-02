<script setup>

</script>

<template>
  <div class="flex justify-center">
    <div class="w-250">
      <Header />
      <main class="mx-3 min-h-120">
        <slot></slot>
      </main>
      <Footer />
    </div>
  </div>
</template>

<style scoped>

</style>