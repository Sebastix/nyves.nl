<script setup>
const { isModalOpen, modalContent, closeModal } = useModal()
</script>

<template>
  <div class="flex justify-center">
    <div class="w-250">
      <Header />
      <main class="min-h-120 px-2 lg:px-0">
        <slot></slot>
      </main>
      <Footer />
    </div>
  </div>
  <!-- Modal with dynamic content -->
  <Modal v-model="isModalOpen" @update:modelValue="closeModal">
    <div class="relative p-6">
      <button @click="closeModal" class="absolute top-2 right-2 text-gray-400 hover:text-white">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
      <!-- Connect modal content -->
      <ModalNostrConnect v-if="modalContent === 'connect'" @close="closeModal" />
      <ModalEventJson v-else-if="modalContent === 'event-json'" @close="closeModal" />
      <!-- Other modal content types can be added here -->
      <div v-else>
        <component :is="modalContent" @close="closeModal" />
      </div>
    </div>
  </Modal>
</template>

<style scoped>

</style>