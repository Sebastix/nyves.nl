import { defineStore } from 'pinia'
import { ref, readonly } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const successData = ref(null)
  const eventJsonData = ref(null)
  const contentData = ref('');
  
  const setSuccessData = (data) => {
    successData.value = data
  }
  
  const clearSuccessData = () => {
    successData.value = null
  }

  const setEventJsonData = (event) => {
    eventJsonData.value = event
  }

  const setContent = (content) => {
    contentData.value = content
  }

  const clearEventJsonData = () => {
    eventJsonData.value = null
  }
  
  const resetApp = () => {
    // Clear success data
    clearSuccessData()
  }
  
  return {
    successData: readonly(successData),
    eventJsonData: readonly(eventJsonData),
    contentData: readonly(contentData),
    setSuccessData,
    clearSuccessData,
    setEventJsonData,
    clearEventJsonData,
    resetApp
  }
})