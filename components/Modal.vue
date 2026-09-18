<script setup>
import { watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  modelContent: {
    type: String,
    default: 'modelContent from Modal.vue'
  }
});

const emit = defineEmits(
    [
        'update:modelValue',
        'update:modelContent'
    ]
);

const close = () => {
  emit('update:modelValue', false);
};

// Watch for modelValue changes to handle external updates
watch(() => props.modelValue, (newValue) => {
  if (!newValue && process.client) {
    document.body.classList.remove('overflow-hidden')
  } else if (newValue && process.client) {
    document.body.classList.add('overflow-hidden')
  }
});

// Close on escape key
onMounted(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape' && props.modelValue) {
      close();
    }
  };
  document.addEventListener('keydown', handleEscape);
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape);
  });
});
</script>

<template>
  <div v-if="modelValue" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- Backdrop -->
    <div 
      class="fixed inset-0 bg-black/60 backdrop-blur-lg"
      @click="close"
    ></div>
    
    <!-- Modal content -->
    <div class="flex min-h-full items-center justify-center p-4">
      <div class="relative w-full max-w-md transform rounded-sm border border-white/10 bg-black backdrop-blur-lg shadow-xl transition-all">
        <slot :close="close" />
      </div>
    </div>
  </div>
</template>