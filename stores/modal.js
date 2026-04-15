import { defineStore } from 'pinia'
import { ref, readonly } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const successData = ref(null)
  const eventJsonData = ref(null)
  
  const setSuccessData = (data) => {
    successData.value = data
  }
  
  const clearSuccessData = () => {
    successData.value = null
  }

  const setEventJsonData = (event) => {
    eventJsonData.value = event
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
    setSuccessData,
    clearSuccessData,
    setEventJsonData,
    clearEventJsonData,
    resetApp
  }
})