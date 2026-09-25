<script setup>
useSeoMeta({
  title: `Connect - Nyves`,
  description: ``
})
</script>

<template>
  <section>
    <h1 class="text-3xl text-nyves-blue my-3 text-center font-bold">Connect</h1>
    <p class="text-center text-xl mb-8">
      Ways to start to interacting with other profiles
    </p>
    <section class="px-2 max-w-2xl mx-auto">
      <p class="bg-orange-100/50 border border-orange-100 text-xl p-4 mb-4">
        <strong>
          At this moment it's not possible (yet) to create and connect a new profile with Nyves.
        </strong>
        <br />
        You can create a profile using the nostr application Ditto at
        <a href="https://ditto.pub?ref=nyves" target="_blank" class="inline-flex align-top">
          https://ditto.pub
          <svg class="size-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>.
      </p>
      <div class="connect-options mb-12">
        <details>
          <summary>1. Connect with a guest profile</summary>
          <p>
            Nyves will automatically give you a guest profile, so you can start interacting straight away.
            The guest profile is a real Nostr profile under the hood; it just has no name or picture (yet).
            On your first interaction, if you haven’t set a name, Nyves will prompt you to set one so others know who you are.
            Guest profiles with only a name will be removed after 7 days. If you would like to have a permanent profile, you will need to edit your profile and make backup of your private key.
          </p>
          <a href="#" class="cursor-not-allowed">Create a guest profile for me</a>
        </details>
        <details>
          <summary>2. Connect with a Google account</summary>
          <p>
            Sign in with your Google account to connect to Nyves, or to create a new Nostr profile automatically if you do not have one yet.
          </p>
          <p>
            How does this work?
            <br />
            Your private key is split into shards held by separate, independent (<a href="https://viewsource.win/fiatjaf.com/pomegranate/_/master" target="_blank">pomegranate</a>) operators, so it is never stored in one place. Google is only used to prove your identity to the operators, never to store your key.
          </p>
          <a href="#" class="cursor-not-allowed">Sign in with my Google account</a>
        </details>
        <details>
          <summary>3. Connect an existing profile using a remote signer <sup class="bg-amber-300 text-xs p-1 rounded-sm">advanced</sup></summary>
          <p>
            Use a <code>nostrconnect://</code> string.
          </p>
        </details>
        <details>
          <summary>4. Connect an existing profile using your encrypted private key <sup class="bg-red-300 text-xs p-1 rounded-sm">unrecommended</sup></summary>
          <p>
            Use a <code>ncrypt1</code> string.
          </p>
        </details>
      </div>
    </section>
  </section>
</template>

<style scoped>

</style>