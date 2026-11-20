import { useI18n } from 'vue-i18n'

export const useDateHelpers = () => {
  // Dates and times follow the active locale instead of a hardcoded 'nl-NL'.
  const { locale } = useI18n()

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000)
    const options = {
      weekday: 'long',
      year: 'numeric',
      day: 'numeric',
      month: 'numeric'
    }
    return date.toLocaleDateString(locale.value, options)
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleTimeString(locale.value)
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
