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
      <p>
        Nyves zelf kan op dit moment (nog) geen nieuw profiel aanmaken of een bestaand profiel koppelen.
        In ontwikkeling: Nyves geeft je automatisch een gastprofiel waarmee je kunt reageren en berichten plaatsen.
        Een gastprofiel is een echt Nostr-profiel, maar heeft enkel een naam en wordt na 7 dagen verwijderd als je het niet permanent maakt.
      </p>
      <p>
        Wil je een blijvend profiel? Maak er dan een aan met een Nostr-applicatie zoals
        <a href="https://ditto.pub" target="_blank" rel="noopener noreferrer" class="inline-flex items-center align-top">
          Ditto
          <svg class="size-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>.
        Bewaar je privésleutel altijd op een veilige plek: wie die sleutel bezit, heeft volledige toegang tot je profiel.
      </p>
    </details>
    <details>
      <summary>Hoe maak ik een eigen design voor mijn profiel?</summary>
      <p>
        Nyves ondersteunt zogenoemde thema's of eigen designs voor je profiel.
        Zo'n design wordt vastgelegd in een Nostr-event (kind 16767) dat je maakt met een applicatie die profielthema's ondersteunt, zoals
        <a href="https://ditto.pub" target="_blank" rel="noopener noreferrer" class="inline-flex items-center align-top">
          Ditto
          <svg class="size-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>.
        Je kunt daarin onder meer de achtergrondkleur of -afbeelding, de kleuren van de tekst en de gebruikte lettertypes instellen.
      </p>
      <p>
        Zodra jouw profiel een eigen design heeft, verschijnt op je profielpagina de knop 'Toon eigen design!' waarmee je heen en weer kunt schakelen tussen je eigen design en het standaard design van Nyves.
        Wil je inspiratie opdoen? Bekijk dan de
        <NuxtLink to="/profielen-uit-de-nostrverse-en-fediverse">profielen met een eigen design</NuxtLink>.
      </p>
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
      <summary>Hoe voeg ik iemand toe als vriend?</summary>
    </details>
    <details>
      <summary>Wat is Hyves?</summary>
      Hyves was een social media platform die in Nederland actief was vanaf 2004 tot 2013. Hierbij enkele feiten van het platform uit die tijd:
      <ul class="list-disc pl-8">
        <li>850 million krabbels were sent.</li>
        <li>8% of all Dutch people online were spent on Hyves.</li>
        <li>The Partysquad was the most played band: more than 8 million times in one year.</li>
        <li>Gerard Joling was most popular with more than 290.000 friends.</li>
        <li>All the hosted data was around 2 petabytes big. That was insane for a small country such as the Netherlands.</li>
        <li>At some days, more than 2 million pictures were uploaded in a single day.</li>
      </ul>
    </details>
    <details>
      <summary>Waar zijn alle Hyves gegevens gebleven?</summary>
      Antwoorden vind je in dit artikel waar VPNgids in 2019 al onderzoek naar deed:
      <br />
      <a
          href="https://www.vpngids.nl/nieuws/hyves-waar-zijn-onze-gegevens-gebleven/"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center align-top"
      >
        https://www.vpngids.nl/nieuws/hyves-waar-zijn-onze-gegevens-gebleven/
        <svg class="size-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </details>
    <details>
      <summary>Wie is de eigenaar van Hyves?</summary>
      <p>
        Dat is Mediahuis.
      </p>
    </details>
    <details>
      <summary>Welke gegevens heeft Mediahuis nog van Hyves?</summary>
      <p>
        Volgens
        <a
            href="https://www.nu.nl/tech/5994609/ruim-negen-miljoen-gearchiveerde-hyves-profielen-online-te-vinden.html"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center align-top"
        >
          deze bron
          <svg class="size-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>, heeft Mediahuis mogelijk nog alle inloggegevens. In 2018 is Hyves Games verkocht aan Azerion waarbij alle data mee is verhuisd, op de wachtwoorden na.
      </p>
    </details>
    <details>
      <summary>Wat is het verschil tussen Nyves en Hyves?</summary>
      Antwoorden op deze vraag vind je op <NuxtLink to="/blog/verschil-tussen-nyves-en-hyves">deze pagina</NuxtLink>.
    </details>
    <details>
      <summary>Wat is de Nostrverse?</summary>
      <p>
        De Nostrverse is het geheel van relays, applicaties en personen die samen gebruikmaken van het open Nostr-protocol.
        Anders dan bij een centraal platform is er geen eigenaar: je identiteit is een sleutelpaar dat volledig van jou is, en je content wordt bewaard op relays die jij kiest.
      </p>
      <p>
        Omdat je profiel, volgers en berichten niet aan één applicatie gebonden zijn, kun je vrij wisselen tussen verschillende Nostr-apps en toch alles behouden.
        Denk aan het verschil tussen het telefoonnetwerk en één specifieke app: het netwerk blijft, de app kun je vervangen.
      </p>
    </details>
    <details>
      <summary>Wat is de Fediverse?</summary>
      <p>
        De Fediverse is het netwerk van verschillende platformen die via het open ActivityPub-protocol met elkaar kunnen praten, zoals Mastodon, Pixelfed en PeerTube.
        Ook hier is er geen centrale eigenaar: iedereen kan een eigen server beginnen en die servers wisselen onderling berichten uit.
      </p>
      <p>
        De Fediverse en Nostr delen dezelfde idealen van decentralisatie en gebruikersvrijheid, maar gebruiken een ander protocol.
        Daarom tonen we profielen uit beide werelden naast elkaar op de pagina
        <NuxtLink to="/profielen-uit-de-nostrverse-en-fediverse">Ontdek profielen uit de Nostrverse en Fediverse</NuxtLink>.
      </p>
    </details>
    <h2 class="text-xl">Content</h2>
    <details>
      <summary>Hoe verwijder ik content?</summary>
    </details>
    <details>
      <summary>Hoe plaats ik een krabbel?</summary>
    </details>
    <details>
      <summary>Hoe plaats ik een foto of video?</summary>
    </details>
    <details>
      <summary>Hoe kan ik mijn profielfoto aanpassen?</summary>
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