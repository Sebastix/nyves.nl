<script setup>
// Section order and anchor ids. Titles and body text are resolved from the
// i18n locale files (voorwaarden.sections.<id>) so both the Dutch and English
// versions stay in sync. See i18n/locales/{nl,en}.json.
const { t, tm } = useI18n()
const localePath = useLocalePath()

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

// Each section is { id, title, content }. `title` is resolved with t().
// `content` is an array of blocks, retrieved with tm() for its *structure*
// only. IMPORTANT: the actual text of every block is always resolved through
// i18n-t using a keypath, because @nuxtjs/i18n precompiles locale strings at
// build time — tm() returns the compiled message AST, not the raw string, so
// rendering a tm() leaf directly would dump the AST as JSON.
//
// Block shapes:
//   - string                   -> plain paragraph  (keypath: content.<bi>)
//   - { p: '...{slot}...' }    -> paragraph with inline markup (keypath: .p)
//   - { ul: [ ... ] }          -> bulleted list    (keypath: .ul.<ii>)
//   - { defs: [{term,text}] }  -> definition list  (keypath: .defs.<ii>.term/.text)
const sections = computed(() =>
  sectionIds.map((id) => ({
    id,
    title: t(`voorwaarden.sections.${id}.title`),
    content: tm(`voorwaarden.sections.${id}.content`) || [],
  }))
)

// Short "in a nutshell" summary shown before the numbered sections. Only the
// array structure is taken from tm(); each item's text is rendered through
// i18n-t by keypath (see note above about precompiled messages).
const shortVersionItems = computed(() => tm('voorwaarden.short_version.items') || [])

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

    <p class="text-center max-w-xl mx-auto mb-8">
      {{ $t('voorwaarden.intro') }}
    </p>

    <!-- Short version (summary to orient the reader, before the full agreement) -->
    <section class="max-w-2xl mx-auto border border-gray-200 bg-[#fcfcfc] rounded-sm mb-8">
      <div class="h-[44px] nyves-bg-gray-header"></div>
      <div class="px-8 pb-8">
        <h2 class="text-lg font-bold mb-2">{{ $t('voorwaarden.short_version.title') }}</h2>
        <ul class="list-disc ml-5 space-y-1">
          <i18n-t
              v-for="(item, i) in shortVersionItems"
              :key="i"
              scope="global"
              :keypath="`voorwaarden.short_version.items.${i}`"
              tag="li"
          />
        </ul>
        <p class="mt-3 text-sm text-gray-600">{{ $t('voorwaarden.short_version.note') }}</p>
      </div>
    </section>

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
            <!-- Paragraph containing inline markup (link / e-mail) -->
            <i18n-t scope="global"
              v-if="block && typeof block === 'object' && block.p"
              :keypath="`voorwaarden.sections.${section.id}.content.${bi}.p`"
              tag="p"
              class="mb-3"
            >
              <template #privacyPolicy>
                <NuxtLink :to="localePath('/privacy')">{{ $t('voorwaarden.privacy_policy_link') }}</NuxtLink>
              </template>
              <template #email>
                <a href="mailto:info@nyves.nl">info@nyves.nl</a>
              </template>
            </i18n-t>

            <!-- Bulleted list -->
            <ul
              v-else-if="block && typeof block === 'object' && block.ul"
              class="list-disc ml-6 space-y-1 mb-3"
            >
              <i18n-t scope="global"
                v-for="(item, ii) in block.ul"
                :key="ii"
                :keypath="`voorwaarden.sections.${section.id}.content.${bi}.ul.${ii}`"
                tag="li"
              />
            </ul>

            <!-- Definition list (bold lead-in term + text) -->
            <ul
              v-else-if="block && typeof block === 'object' && block.defs"
              class="list-disc ml-6 space-y-1 mb-3"
            >
              <li v-for="(item, ii) in block.defs" :key="ii">
                <i18n-t scope="global"
                  :keypath="`voorwaarden.sections.${section.id}.content.${bi}.defs.${ii}.term`"
                  tag="strong" class="mr-2"
                />
                <i18n-t scope="global"
                  :keypath="`voorwaarden.sections.${section.id}.content.${bi}.defs.${ii}.text`"
                  tag="span"
                />
              </li>
            </ul>

            <!-- Plain paragraph (stored as a string) -->
            <i18n-t scope="global"
              v-else
              :keypath="`voorwaarden.sections.${section.id}.content.${bi}`"
              tag="p"
              class="mb-3"
            />
          </template>
        </template>
      </div>
    </section>
  </section>
</template>
