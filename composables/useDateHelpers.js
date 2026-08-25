import { ref, readonly } from 'vue'
import { options } from 'marked';

export const useDateHelpers = () => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000)
    const options = {
      weekday: 'long',
      year: 'numeric',
      day: 'numeric',
      month: 'numeric'
    }
    return date.toLocaleDateString('nl-NL', options)
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleTimeString('nl-NL')
  }

  const getDateObject = (timestamp) => {
    return new Date(timestamp * 1000)
  }

  return {
    formatDate,
    formatTime,
    getDateObject
  }
}