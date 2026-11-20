<script setup>

</script>

<template>
  <section class="mb-8">
    <div class="max-w-5xl mx-auto">
      <!-- Main Content -->
      <div class="border border-gray-200 bg-[#fcfcfc] rounded-sm overflow-hidden">
        <div class="h-[44px] nyves-bg-gray-header"></div>
        <div class="grid md:grid-cols-2 gap-8 items-center px-12 pb-[44px]">
          <!-- Content Sectie -->
          <div>
            <div class="space-y-4 text-gray-600 leading-relaxed">
              <p>{{ $t('home.aos.donation') }}</p>
              <blockquote class="border-l-3 pl-3 italic">
                {{ $t('home.aos.quote') }}
              </blockquote>
              <p>
                <a href="https://divine.video/" target="_blank">
                  Divine
                  <svg class="size-4 inline align-text-top" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                {{ $t('home.aos.divine') }}
              </p>
            </div>

            <div class="mt-8">
              <a href="https://andotherstuff.org/" target="_blank" class="inline-flex items-center font-medium">
                https://andotherstuff.org/
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
          <!-- Logo Sectie -->
          <div>
            <img
                src="~/assets/AndOtherStuff_logo.svg"
                alt="And Other Stuff Logo"
                class="w-48 md:w-92 mx-auto md:mx-0"
            />

          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>

</style>