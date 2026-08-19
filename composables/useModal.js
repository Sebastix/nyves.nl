import { ref, readonly } from 'vue'
/**
 * Composable for managing modal state across the application
 */

const isModalOpen = ref(false)
const modalType = ref(null)
const modalContent = ref('')

export const useModal = () => {
  const openModal = (type = null, content = '') => {
    modalType.value = type
    modalContent.value = content
    isModalOpen.value = true
    
    // Prevent body scroll when modal is open
    if (process.client) {
      document.body.classList.add('overflow-hidden')
    }
  }

  const closeModal = () => {
    isModalOpen.value = false
    modalType.value = null
    modalContent.value = ''
    
    // Re-enable body scroll
    if (process.client) {
      document.body.classList.remove('overflow-hidden')
    }
  }

  const toggleModal = () => {
    if (isModalOpen.value) {
      closeModal()
    } else {
      openModal()
    }
  }

  return {
    isModalOpen: readonly(isModalOpen),
    modalType: readonly(modalType),
    modalContent: readonly(modalContent),
    openModal,
    closeModal,
    toggleModal
  }
}