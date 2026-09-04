<script setup>

</script>

<template>
  <section>
    <h1 class="text-3xl text-nyves-blue my-3 text-center font-bold">Connect</h1>
    <p class="text-center text-xl mb-12">
      Ways to start to interacting with other profiles
    </p>
    <section class="px-2 max-w-2xl mx-auto">
      <div class="connect-options">
        <details>
          <summary>1. Connect with a guest profile</summary>
          <p>
            Nyves will automatically give you a guest profile, so you can start interacting straight away.
            The guest profile is a real Nostr profile under the hood; it just has no name or picture (yet).
            On your first interaction, if you haven’t set a name, Nyves will prompt you to set one so others know who you are.
            Guest profiles with only a name will be removed after 7 days. If you would like to have a permanent profile, you will need to edit your profile and make backup of your private key.
          </p>
          <a href="#">Create a guest profile for me</a>
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
          <a href="#">Sign in with my Google account</a>
        </details>
        <details>
          <summary>3. Connect an existing profile using a remote signer <sup class="bg-amber-300 text-xs p-1 rounded-sm">advanced</sup></summary>
          <p>
            Use a <code>nostrconnect://</code> string
          </p>
        </details>
        <details>
          <summary>4. Connect an existing profile using your encrypted private key <sup class="bg-red-300 text-xs p-1 rounded-sm">unrecommended</sup></summary>
          <p>
            Use a <code>ncrypt1</code> string
          </p>
        </details>
      </div>
    </section>
  </section>
</template>

<style scoped>

</style>