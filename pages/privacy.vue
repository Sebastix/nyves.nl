<script setup>
// Privacy policy. All texts live in i18n locale files (privacy.*) so the Dutch
// and English versions stay in sync. `blocks` is an ordered list of content
// blocks; only its structure comes from tm(), every block's text is rendered
// through i18n-t by keypath (see pages/voorwaarden.vue for why: @nuxtjs/i18n
// precompiles messages, so a tm() leaf is a message AST, not a string).
//
// Block shapes:
//   { h3: '...' }               -> section heading
//   { h4: '...' }               -> sub heading
//   { p: '...' }                -> paragraph
//   { ul: [ '...' ] }           -> bulleted list
//   { dl: [{ term, text }] }    -> definition list
//   { lines: [ '...' ] }        -> paragraph with line breaks
const { t, tm } = useI18n()

const blocks = computed(() => tm('privacy.blocks') || [])
const shortVersionItems = computed(() => tm('privacy.short_version.items') || [])

useSeoMeta({
  title: () => `${t('Privacy')} - Nyves`,
  description: () => t('privacy.meta_description'),
})
</script>

<template>
  <section>
    <h1 class="text-3xl text-nyves-blue my-3 text-center font-bold">{{ $t('Privacy') }}</h1>
    <small class="block text-center mb-4">
      {{ $t('privacy.last_updated') }} &middot;
      {{ $t('privacy.effective_date') }}
    </small>

    <!-- Short version (summary to orient the reader, before the full policy) -->
    <section class="max-w-2xl mx-auto border border-gray-200 bg-[#fcfcfc] rounded-sm mb-8">
      <div class="h-[44px] nyves-bg-gray-header"></div>
      <div class="px-8 pb-8">
        <h2 class="text-lg font-bold mb-2">{{ $t('privacy.short_version.title') }}</h2>
        <ul class="list-disc ml-5 space-y-1">
          <i18n-t
              v-for="(item, i) in shortVersionItems"
              :key="i"
              scope="global"
              :keypath="`privacy.short_version.items.${i}`"
              tag="li"
          />
        </ul>
        <p class="mt-3 text-sm text-gray-600">{{ $t('privacy.short_version.note') }}</p>
      </div>
    </section>

    <section class="px-2 max-w-xl mx-auto">
      <template v-for="(block, i) in blocks" :key="i">
        <!-- section heading -->
        <i18n-t
          v-if="block && typeof block === 'object' && 'h3' in block"
          scope="global"
          :keypath="`privacy.blocks.${i}.h3`"
          tag="h3"
          class="text-xl text-nyves-blue mt-4"
        />

        <!-- sub heading -->
        <i18n-t
          v-else-if="block && typeof block === 'object' && 'h4' in block"
          scope="global"
          :keypath="`privacy.blocks.${i}.h4`"
          tag="h4"
          class="text-lg"
        />

        <!-- bulleted list -->
        <ul v-else-if="block && typeof block === 'object' && 'ul' in block" class="list-disc pl-4">
          <i18n-t
            v-for="(item, j) in block.ul"
            :key="j"
            scope="global"
            :keypath="`privacy.blocks.${i}.ul.${j}`"
            tag="li"
          />
        </ul>

        <!-- definition list -->
        <ul v-else-if="block && typeof block === 'object' && 'dl' in block" class="list-disc pl-4">
          <li v-for="(item, j) in block.dl" :key="j">
            <i18n-t scope="global" :keypath="`privacy.blocks.${i}.dl.${j}.term`" tag="strong" />
            <span> - </span>
            <i18n-t scope="global" :keypath="`privacy.blocks.${i}.dl.${j}.text`" tag="span" />
          </li>
        </ul>

        <!-- paragraph with line breaks -->
        <p v-else-if="block && typeof block === 'object' && 'lines' in block">
          <template v-for="(line, j) in block.lines" :key="j">
            <i18n-t scope="global" :keypath="`privacy.blocks.${i}.lines.${j}`" tag="span" />
            <br v-if="j < block.lines.length - 1" />
          </template>
        </p>

        <!-- plain paragraph -->
        <i18n-t v-else scope="global" :keypath="`privacy.blocks.${i}.p`" tag="p" />
      </template>
    </section>
  </section>
</template>
