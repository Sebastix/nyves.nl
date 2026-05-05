<script setup>
const { locales, setLocale, locale } = useI18n()
const route = useRoute()

// Current selected locale (reactive)
const selectedLocale = ref(locale.value)

// Handle language change
const handleLanguageChange = async (event) => {
  const newLocale = event.target.value
  
  try {
    // Set the new locale
    await setLocale(newLocale)
    
    // Update reactive reference
    selectedLocale.value = newLocale
    
    // Navigate to the same page but with new locale
    // This ensures URL updates correctly with new language prefix
    await navigateTo({
      path: route.path,
      query: route.query
    }, {
      replace: true
    })
  } catch (error) {
    // Reset select to current locale on error
    selectedLocale.value = locale.value
  }
}

// Watch for external locale changes and sync with select
watch(locale, (newLocale) => {
  selectedLocale.value = newLocale
})
</script>

<template>
  <form id="languageSelect">
    <select 
      :value="selectedLocale" 
      @change="handleLanguageChange"
    >
      <option 
        v-for="localeOption in locales" 
        :key="localeOption.code"
        :value="localeOption.code"
        class="py-1"
      >
        {{ localeOption.icon }} {{ localeOption.name }}
      </option>
    </select>
  </form>
</template>

<style scoped>

</style>