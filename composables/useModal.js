import { ref, readonly } from 'vue'

/**
 * Composable for managing modal state across the application
 */

const isModalOpen = ref(false)
const modalContent = ref(null)

export const useModal = () => {
  const openModal = (content = null) => {
    modalContent.value = content
    isModalOpen.value = true
    
    // Prevent body scroll when modal is open
    if (process.client) {
      document.body.classList.add('overflow-hidden')
    }
  }

  const closeModal = () => {
    isModalOpen.value = false
    modalContent.value = null
    
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
    modalContent: readonly(modalContent),
    openModal,
    closeModal,
    toggleModal
  }
}