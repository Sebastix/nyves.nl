<script setup>
// Section order and anchor ids. Titles and body text are resolved from the
// i18n locale files (voorwaarden.sections.<id>) so both the Dutch and English
// versions stay in sync. See i18n/locales/{nl,en}.json.
const { t, tm } = useI18n()

const sectionIds = [
  'acceptance',
  'definitions',
  'nature-of-service',
  'eligibility',
  'user-content',
  'prohibited',
  'moderation',
  'intellectual-property',
  'usernames',
  'nyves-ip',
  'operations',
  'termination',
  'decentralization',
  'third-party',
  'disclaimers',
  'indemnification',
  'liability',
  'disputes',
  'changes',
  'contact',
]

// Each section is { id, title, content }. content is an array of blocks:
//   - string                  -> plain paragraph
//   - { ul: [ ... ] }         -> bulleted list
//   - { defs: [ {term,text} ] } -> definition list (bold lead-in term)
//   - { p: '...{slot}...' }   -> paragraph rendered with <i18n-t> for inline markup
const sections = computed(() =>
  sectionIds.map((id) => ({
    id,
    title: t(`voorwaarden.sections.${id}.title`),
    content: tm(`voorwaarden.sections.${id}.content`) || [],
  }))
)

useSeoMeta({
  title: () => `${t('Voorwaarden')} - Nyves`,
  description: () => t('voorwaarden.meta_description'),
})
</script>

<template>
  <section>
    <h1 class="text-3xl text-nyves-blue my-3 text-center font-bold">{{ $t('Voorwaarden') }}</h1>
    <small class="block text-center mb-4">
      {{ $t('voorwaarden.last_updated') }}
    </small>

    <p class="text-center max-w-2xl mx-auto mb-8">
      {{ $t('voorwaarden.intro') }}
    </p>

    <section class="flex flex-col md:flex-row gap-x-8 gap-y-4 px-2">
      <!-- Table of contents -->
      <nav class="md:w-1/3 md:sticky md:top-2 md:self-start">
        <ol class="list-decimal ml-4 space-y-1">
          <li v-for="section in sections" :key="section.id">
            <a :href="`#${section.id}`" class="no-underline hover:underline">{{ section.title }}</a>
          </li>
        </ol>
      </nav>

      <!-- Content -->
      <div class="md:grow max-w-3xl">
        <template v-for="(section, si) in sections" :key="section.id">
          <h2 :id="section.id" class="text-xl font-bold mt-8 mb-2 scroll-mt-4">
            {{ si + 1 }}. {{ section.title }}
          </h2>

          <template v-for="(block, bi) in section.content" :key="bi">
            <i18n-t
              v-if="block && typeof block === 'object' && block.p"
              :keypath="`voorwaarden.sections.${section.id}.content.${bi}.p`"
              tag="p"
              class="mb-3"
            >
              <template #privacyPolicy>
                <NuxtLink to="/privacy">{{ $t('voorwaarden.privacy_policy_link') }}</NuxtLink>
              </template>
              <template #email>
                <a href="mailto:info@nyves.nl">info@nyves.nl</a>
              </template>
            </i18n-t>

            <ul
              v-else-if="block && typeof block === 'object' && block.ul"
              class="list-disc ml-6 space-y-1 mb-3"
            >
              <li v-for="(item, ii) in block.ul" :key="ii">{{ item }}</li>
            </ul>

            <ul
              v-else-if="block && typeof block === 'object' && block.defs"
              class="list-disc ml-6 space-y-1 mb-3"
            >
              <li v-for="(item, ii) in block.defs" :key="ii">
                <strong>{{ item.term }}</strong> {{ item.text }}
              </li>
            </ul>

            <p v-else class="mb-3">{{ block }}</p>
          </template>
        </template>
      </div>
    </section>
  </section>
</template>
