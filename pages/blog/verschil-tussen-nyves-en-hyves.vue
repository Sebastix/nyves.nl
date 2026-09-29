<script setup>
useSeoMeta({
  title: `Wat is het verschil tussen Nyves en Hyves | Blog - Nyves`,
  description: `De N van Nyves verwijst naar nostr. Nyves is geen platform.`
})
</script>

<template>
  <section class="leading-relaxed max-w-2xl mx-auto">
    <h1 class="text-3xl text-nyves-blue my-3 text-center font-bold">Wat is het verschil tussen Nyves en Hyves?</h1>
    <p class="text-xl text-center">
      Het korte antwoord is simpel: 1 letter ;-) De N van Nyves verwijst naar nostr.
      <br />
      Het lange antwoord is iets complexer.
      <br />
      <br />
      Nyves is namelijk <strong>geen platform</strong>.
    </p>
    <p class="my-8 text-gray-600 leading-relaxed">
      Nostr is een afkorting die staat voor Notes and Other Stuff Transmitted by Relays.
      Het is een open protocol, net zoals bijvoorbeeld e-mail. Het is een eenvoudig protocol dat beschrijft hoe je berichten verstuurt tussen applicaties en relays.
      Er is een open netwerk waarop iedereen applicaties kan bouwen. Nyves is zo'n applicatie.
    </p>
    <h2 class="text-2xl font-bold">
      Archief
    </h2>
    <p class="my-4 text-gray-600 leading-relaxed">
      Met Nyves kun je oude Hyves-profielen opzoeken en bekijken.
      Deze zijn gearchiveerd door
      <a href="https://wiki.archiveteam.org/index.php/Hyves" target="_blank" class="inline-flex align-top">
        https://wiki.archiveteam.org/index.php/Hyves
        <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
      voordat Hyves als sociaal netwerk op zwart ging.
      Dit archief is speciaal voor Nyves opnieuw opgebouwd op basis van de beschikbare data die je ook kunt vinden via The Wayback Machine.
    </p>
    <h2 class="text-2xl font-bold">
      Digitaal erfgoed
    </h2>
    <p class="my-4 text-gray-600 leading-relaxed">
      Dankzij Hyves zijn veel herinneringen ontstaan en daarom is het goed om deze sporen uit het verleden te bewaren.
      Laten we niet vergeten hoe sociaal Hyves was, voordat social media asociaal werd in de periode na Hyves.
      Dit stukje collectief geheugen borgen we door alle content van Hyves beschikbaar te stellen via nostr relays.
    </p>
    <h2 class="text-2xl font-bold">
      Interoperabel
    </h2>
    <p class="my-4 text-gray-600 leading-relaxed">
      Omdat er gebruik wordt gemaakt van een open protocol, zijn er afspraken over hoe alle berichten worden opgemaakt die tussen relays en applicaties worden uitgewisseld.
      In principe kan iedereen met een relay communiceren. Jouw profiel is niet specifiek gebonden aan de Nyves applicatie, maar zal ook werken in andere nostr applicaties.
      <br />
      Alle data is interoperabel; daarmee heb je de keuzevrijheid om andere applicaties te gebruiken die het beste bij jouw wensen en behoeften passen.
    </p>
    <h2 class="text-2xl font-bold">
      Geen accounts
    </h2>
    <p class="my-4 text-gray-600 leading-relaxed">
      Nyves werkt niet met accounts, maar met profielen op basis van zogenaamde keypairs.
      Je hebt dus geen gebruikersnaam en wachtwoord die ergens op een centrale, afgesloten plek zijn opgeslagen.
      Wat je wel hebt, zijn een publieke en een geheime sleutel waarmee je jezelf kunt identificeren of waarmee anderen jou kunnen verifiëren.
      Voor elk Hyves-profiel is een keypair aangemaakt.
      Elk stukje content dat bij een profiel hoort, is voorzien van een digitale handtekening.
      Die kan iedereen zien en verifiëren, zodat je zeker weet dat die content ook echt bij het profiel hoort.
    </p>
    <h2 class="text-2xl font-bold">
      Geen centrale database
    </h2>
    <p class="my-4 text-gray-600 leading-relaxed">
      Omdat alle data wordt verstuurd via relays, is er geen centrale plek waar alle data wordt opgeslagen.
      Deze relays zijn eenvoudige servers en overal ter wereld staan waar een internetverbinding is.
      Op dit moment zijn er enkele duizenden relays die niets anders doen dan berichten versturen tussen applicaties.
    </p>
    <h2 class="text-2xl font-bold">
      Opensource
    </h2>
    <p class="my-4 text-gray-600 leading-relaxed">
      Alle code van de Nyves applicatie en relay is door iedereen te bekijken dankzij de AGPLv2-licentie. Iedereen is vrij om een kopie van deze code te maken, bijvoorbeeld om een variant van de Nyves applicatie te bouwen of om zelf een relay op te zetten waar je jouw berichten naartoe stuurt.
      <br />
      <a
          href="https://gitworkshop.dev/relay.nyves.nl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center px-4 py-2 bg-nyves-orange text-white! font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
      >
        Code
        <svg class="size-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </p>
    <h2 class="text-2xl font-bold">
      Build in public
    </h2>
    <p class="my-4 text-gray-600 leading-relaxed">
      Nyves wordt in het openbaar ontwikkeld. Iedereen kan zien wat er ontwikkeld wordt.
      De backlog met epics en user stories is openbaar, dus je kunt zien waaraan er gewerkt wordt.
      <br />
      <a
          href="https://taiga.sebastix.dev/project/nyves/timeline"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center px-4 py-2 bg-nyves-blue text-white! font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
      >
        Project
        <svg class="size-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </p>
    <h2 class="text-2xl font-bold">
      Autonomie ligt bij het individu
    </h2>
    <p class="my-4 text-gray-600 leading-relaxed">
      Dankzij het open netwerk is er geen centrale tussenpartij die alle mensen met elkaar verbindt, zoals Facebook, TikTok, WhatsApp, Instagram of Hyves.
      Met Nyves herdefiniëren we social media. Het is een gedecentraliseerd netwerk waar de macht bij het individu ligt. In zo'n netwerk verdwijnen de belangen die vandaag de dag al onze aandacht opeisen en ons digitaal welzijn afbreken.
    </p>
    <h2 class="text-2xl font-bold">
      Nederlands project
    </h2>
    <p class="mt-4 mb-12 text-gray-600 leading-relaxed">
      Nyves is een idee dat wordt ontwikkeld door een Nederlander, in Nederland zelf. Zowel de applicatie op nyves.nl als de relay op rely.nyves.nl staan op een server in Nederland.
    </p>
  </section>
</template>

<style scoped>

</style>