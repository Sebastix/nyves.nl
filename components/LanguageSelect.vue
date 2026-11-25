<script setup>
const { locales, setLocale, locale } = useI18n()
const route = useRoute()
const switchLocalePath = useSwitchLocalePath()

// Current selected locale (reactive)
const selectedLocale = ref(locale.value)

// Handle language change
const handleLanguageChange = async (event) => {
  const newLocale = event.target.value

  // Capture query and fragment up front: setLocale() navigates on its own and
  // replaces the current route object underneath us.
  const { query, hash } = route

  // Localised path for the current page, without its own query/fragment.
  const localized = switchLocalePath(newLocale) || route.path
  const path = localized.split(/[?#]/)[0]

  try {
    // Set the new locale
    await setLocale(newLocale)

    // Update reactive reference
    selectedLocale.value = newLocale

    // Navigate to the same page but with new locale.
    // The fragment must be carried over: profile URLs encode the pubkey in it
    // (/profiel/<username>#npub1...), so dropping it leaves the page unable to
    // resolve which profile to show.
    await navigateTo({ path, query, hash }, { replace: true })
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
      :aria-label="$t('common.language')"
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