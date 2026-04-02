<script setup>
import "@hcaptcha/vanilla-hcaptcha";
</script>

<template>
  <div class="border border-gray-200 bg-[#fcfcfc] rounded-sm text-center pb-12">
    <div class="h-[44px] nyves-bg-gray-header"></div>
    <form method="post" action="https://mailings.sebastix.dev/subscription/form" class="listmonk-form">
      <div>
        <h3 class="text-xl font-bold mb-2">
          Blijf op de hoogte
        </h3>
        <input type="hidden" name="nonce" />
        <p>
          <input type="email" name="email" required placeholder="E-mail" class="p-2 bg-white border border-nyves-orange rounded-sm" />
        </p>
        <p>
          <input id="6ef0a" type="checkbox" name="l" checked value="6ef0a7dc-b3b2-4f8e-bb8f-c6f03b327e4c" class="hidden" />
        </p>
        <h-captcha data-sitekey="93256e36-e8e2-4268-92d6-08e8376e03a3"></h-captcha>
        <input type="submit" value="Aanmelden" class="bg-nyves-orange text-white! font-bold p-3 mt-2 rounded-lg" />
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>