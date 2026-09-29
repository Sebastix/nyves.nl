<script setup>
useSeoMeta({
  title: `Veelgestelde vragen - Nyves`,
  description: ``
})
</script>

<template>
  <section class="leading-relaxed mb-8">
    <h1 class="text-3xl text-nyves-blue my-3 text-center font-bold">Veelgestelde vragen</h1>
    <p class="text-xl text-center">
      Alles wat je moet weten over Nyves
    </p>
  </section>
  <section class="categorie">
    <h2>Aan de slag</h2>
    <details>
      <summary>Wat is Nyves?</summary>
      Nyves is een nostr applicatie.
    </details>
    <details>
      <summary>Hoe maak ik een nieuw profiel aan?</summary>
      Dit is momenteel (nog) niet mogelijk.
    </details>
    <details>
      <summary>Is Nyves opensource?</summary>
      Ja, alle code is openbaar in te zien via verschillende repositories:
      <a
          href="https://gitlab.com/sebastix-group/nyves"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center align-top"
      >
        https://gitlab.com/sebastix-group/nyves
        <svg class="size-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
      en
      <a
          href="https://gitworkshop.dev/relay.nyves.nl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center align-top"
      >
        https://gitworkshop.dev/relay.nyves.nl
        <svg class="size-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </details>
    <details>
      <summary>Wat is een relay?</summary>
      Een relay is een eenvoudige webserver.
    </details>
    <details>
      <summary>Wat betekent zo'n <code class="text-sm bg-gray-200 p-1">npub1...</code> reeks die ik in de links en op profielen zie staan?</summary>
      Dit is een public key / publieke sleutel.
    </details>
    <details>
      <summary>Kan ik mijn profiel verwijderen?</summary>
      Ja, stuur een verzoek naar info[at]nyves.nl.
    </details>
    <details>
      <summary>Weten de oprichters van Hyves van het bestaan van Nyves af?</summary>
      Dat is niet met zekerheid te zeggen, maar een van de stafleden van het Hyves team weet er wel vanaf. Dat is <a href="profiel/npub1tef4nks9rrfcvkxlwts9eu4zluhfs025nrr3ldkm8ssuqv7m46ksf7nskn">Yme Bosma</a>.
    </details>
    <details>
      <summary>Mogen kinderen gebruikmaken van Nyves?</summary>
      Wij vinden van wel, maar we adviseren wel om dit te overleggen met je ouders als je zelf een kind bent.
    </details>
    <details>
      <summary>Is Nyves verantwoordelijk voor de content in de applicatie?</summary>
      Nee. Wij zijn alleen verantwoordelijk wat we zelf hosten op onze relays.
    </details>
    <details>
      <summary>Hoe kan ik zien waar de content vandaan komt?</summary>
      Dat is een hele goed vraag. Content kan namelijk van verschillende relays worden opgehaald die getoond wordt in de applicatie.
    </details>
    <details>
      <summary>Waar zijn alle Hyves gegevens gebleven?</summary>
      Antwoorden vind je in dit artikel waar VPNgids in 2019 al onderzoek naar deed:
      <br />
      https://www.vpngids.nl/nieuws/hyves-waar-zijn-onze-gegevens-gebleven/
    </details>
    <details>
      <summary>Wat is het verschil tussen Nyves en Hyves?</summary>
      Antwoorden op deze vraag vind je op <NuxtLink to="/blog/verschil-tussen-nyves-en-hyves">deze pagina</NuxtLink>.
    </details>
    <h2 class="text-xl">Content</h2>
    <details>
      <summary>Hoe verwijder ik content?</summary>
    </details>
    <h2 class="text-xl">Privacy</h2>
    <details>
      <summary>Is mijn content zichtbaar voor iedereen?</summary>
    </details>
    <details>
      <summary>Hoe maak ik mijn content alleen zichtbaar voor mijn vrienden?</summary>
    </details>
    <div class="hidden">
      <h2 class="text-xl">Moderatie</h2>
      <details>
        <summary>Ik zie ongewenste content, hoe kan dat?</summary>
      </details>
      <details>
        <summary>Kan ik ongewenste of strafbare content rapporteren?</summary>
      </details>
      <details>
        <summary>Kan ik ongewenste of strafbare content verwijderen?</summary>
      </details>
      <details>
        <summary>Kan ik iemand anders blokkeren zodat die persoon mijn profiel niet meer kan zien of met mij kan communiceren?</summary>
      </details>
    </div>
    <h2 class="text-xl">Technische vragen</h2>
    <details>
      <summary>Met welke technologie is de Nyves applicatie gemaakt?</summary>
      Met <NuxtLink to="/nostr">nostr</NuxtLink>.
    </details>
    <details>
      <summary>Waar kan ik de code zien van de Nyves applicatie?</summary>
      Dat kan via
    </details>
    <details>
      <summary>Wie beheert nu alle keypairs van alle aangemaakte profielen?</summary>
      Op dit moment zijn deze keypairs in beheer bij Sebastian Hagens die de Nyves applicatie ontwikkelt.
    </details>
    <h2 class="text-xl">Support</h2>
    <details>
      <summary>Hoe kan ik contact opnemen met Nyves?</summary>
      Stuur een mail naar info[at]nyves.nl of gebruik de contactgegevens die je kunt vinden op de website van Sebastian Hagens.
    </details>
  </section>
</template>

<style scoped>

</style>