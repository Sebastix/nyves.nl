<script setup>
const { t } = useI18n()

useSeoMeta({
  title: () => `${t('blog_article.static.difference.seo_title')} - Nyves`,
  description: () => t('blog_article.static.difference.seo_description')
})
</script>

<template>
  <section class="leading-relaxed max-w-2xl mx-auto">
    <h1 class="text-3xl text-nyves-blue my-3 text-center font-bold">{{ $t('blog_article.static.difference.title') }}</h1>
    <p class="text-xl text-center">
      {{ $t('blog_article.static.difference.intro_short') }}
      <br />
      {{ $t('blog_article.static.difference.intro_long') }}
      <br />
      <br />
      <i18n-t keypath="blog_article.static.difference.intro_no_platform" tag="span" scope="global">
        <template #strong><strong>{{ $t('blog_article.static.difference.intro_no_platform_strong') }}</strong></template>
      </i18n-t>
    </p>
    <p class="my-8 text-gray-600 leading-relaxed">
      {{ $t('blog_article.static.difference.nostr_body') }}
    </p>
    <h2 class="text-2xl font-bold">
      {{ $t('blog_article.static.difference.heading_archive') }}
    </h2>
    <p class="my-4 text-gray-600 leading-relaxed">
      <i18n-t keypath="blog_article.static.difference.archive_body" tag="span" scope="global">
        <template #link>
          <a href="https://wiki.archiveteam.org/index.php/Hyves" target="_blank" class="inline-flex align-top">
            https://wiki.archiveteam.org/index.php/Hyves
            <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </template>
      </i18n-t>
    </p>
    <h2 class="text-2xl font-bold">
      {{ $t('blog_article.static.difference.heading_heritage') }}
    </h2>
    <p class="my-4 text-gray-600 leading-relaxed">
      {{ $t('blog_article.static.difference.heritage_body') }}
    </p>
    <h2 class="text-2xl font-bold">
      {{ $t('blog_article.static.difference.heading_interoperable') }}
    </h2>
    <p class="my-4 text-gray-600 leading-relaxed">
      {{ $t('blog_article.static.difference.interoperable_body_1') }}
      <br />
      {{ $t('blog_article.static.difference.interoperable_body_2') }}
    </p>
    <h2 class="text-2xl font-bold">
      {{ $t('blog_article.static.difference.heading_no_accounts') }}
    </h2>
    <p class="my-4 text-gray-600 leading-relaxed">
      {{ $t('blog_article.static.difference.no_accounts_body') }}
    </p>
    <h2 class="text-2xl font-bold">
      {{ $t('blog_article.static.difference.heading_no_database') }}
    </h2>
    <p class="my-4 text-gray-600 leading-relaxed">
      {{ $t('blog_article.static.difference.no_database_body') }}
    </p>
    <h2 class="text-2xl font-bold">
      {{ $t('blog_article.static.difference.heading_opensource') }}
    </h2>
    <p class="my-4 text-gray-600 leading-relaxed">
      {{ $t('blog_article.static.difference.opensource_body') }}
      <br />
      <a
          href="https://gitworkshop.dev/relay.nyves.nl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center px-4 py-2 bg-nyves-orange text-white! font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
      >
        {{ $t('blog_article.static.difference.code_button') }}
        <svg class="size-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </p>
    <h2 class="text-2xl font-bold">
      {{ $t('blog_article.static.difference.heading_build_in_public') }}
    </h2>
    <p class="my-4 text-gray-600 leading-relaxed">
      {{ $t('blog_article.static.difference.build_in_public_body') }}
      <br />
      <a
          href="https://taiga.sebastix.dev/project/nyves/timeline"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center px-4 py-2 bg-nyves-blue text-white! font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
      >
        {{ $t('blog_article.static.difference.project_button') }}
        <svg class="size-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </p>
    <h2 class="text-2xl font-bold">
      {{ $t('blog_article.static.difference.heading_autonomy') }}
    </h2>
    <p class="my-4 text-gray-600 leading-relaxed">
      {{ $t('blog_article.static.difference.autonomy_body') }}
    </p>
    <h2 class="text-2xl font-bold">
      {{ $t('blog_article.static.difference.heading_dutch_project') }}
    </h2>
    <p class="mt-4 mb-12 text-gray-600 leading-relaxed">
      {{ $t('blog_article.static.difference.dutch_project_body') }}
    </p>
  </section>
</template>

<style scoped>

</style>