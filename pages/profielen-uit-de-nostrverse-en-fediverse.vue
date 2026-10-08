<script setup>
const filters = ref({
  nl: {
    authors: [
        'npub1wqvalfqda474p8hn4cyduggldg0u30pfqp96um4vgdqs3qy3nq2q3vv2lr', // Soo Bosman
        'npub105em547c5m5gdxslr4fp2f29jav54sxml6cpk6gda7xyvxuzmv6s84a642', // TravelTelly
        'npub1l77twp5l02jadkcjn6eeulv2j7y5vmf9tf3hhtq7h7rp0vzhgpzqz0swft', // Jurjen
        'npub1qe3e5wrvnsgpggtkytxteaqfprz0rgxr8c3l34kk3a9t7e2l3acslezefe', // Sebastix
        'npub14a86ju58lhagkatxjluafzcgumu8turqk84s3jtfmzfczgxpt89snnv0nl', // Raoul
        'npub1u6u7c4enakj00phjzqvek6nhk5zt2vpnhghddpqgj8q5j7ww4lasmzjeyd', // Frank Meeuwsen
        'npub1tef4nks9rrfcvkxlwts9eu4zluhfs025nrr3ldkm8ssuqv7m46ksf7nskn', // Yme
        'npub17plqkxhsv66g8quxxc9p5t9mxazzn20m426exqnl8lxnh5a4cdns7jezx0', // Jeroen
        'npub1ye5ncw2tf47sh3uaw3h2mfdrxg8dawtcd74el5kfqhs3tmptuf0syn6dzx', // Wouter Constant
        'npub1xy04u0vum29hx3j6kzm9raaykakg6ru3kcgg88pywxqaxusyytsqvrpf8a', // M
        'npub1vra6xxynmqy7f9t7282v2lf70zl32nxph5era9uu7utsmg9msfcqcvyg3y', // MSJL Michel
        'npub1z8ksrle80k28qhpfxxr8hrvspk96enn0y740w3qvax9m2rszlv6qx82une', // Marco Davids
    ]
  },
  nostr: {
    authors: [
      'npub1lstmhn60p8dyu6qhvgnvfhrq4lhvu0dtl0lngtsaqvcgnp5s3ncqmvgvk7', // XZ
      'npub1kk0qpalwat5tclr4j9ecxqrdg2k0szvudh8nzuxmdjr4ayvwfy0qa66xq2', // Claire
      'npub102zph06yug4gzanfp770g9u8sm0qlmdh67trllwlqwh79ek46yfse9ekrj', // Ceruleon Skaiz
      'npub19yw8tkfh530kdgfqn782vcga7azgckdn2fjjp3nv5txu6dl3h7lqhv322j', // Jared Logan
      'npub1hspwpfkq7qddnj6h52c03muzgx79l7teeez99n57ys77g4m4vujs3hly9q', // Kip Ashlynn
      'npub1jvnpg4c6ljadf5t6ry0w9q0rnm4mksde87kglkrc993z46c39axsgq89sc', // MK Fain
      'npub1yzfm42rzr3dj2h50flpvdl0uzrv22kv2y4ghve804w5xqu6lzqcqkyfxu5', // Sam
      'npub1gcjcm7hqegzlfurjptqkjddzlpmyjqqwccydypng9jlmhx4ll4vqzwc4qs', // Link-NM
      'npub1q469xmf77nt9ltu4ks3excgts36ayt6v99ryn4rv2r2axmm4ye7q3vnkqp', // shantaram
      'npub1xsgymm0ne3vndqpvsvy285qfpu59049t5n5twg9vetmt92cyn95snyzazx', // Kagi
      'npub18s4zkd0wjq5gkthz4paw2704ty4s354wcp2krvxy0sewz3g9z2cs73ydrt', // Proton
      'npub1skj3cm05l26sjg8w8lxa5z4k6kueh0mccykp6zchf2wacu7mslfsney3cq', // Flag
      'npub1vxlhjzeqjjhmqdy4e8sndt8kzklqlnxzew2mtt8mtakvalsckp3qa0gnvx', // Logen
      'npub1aeh2zw4elewy5682lxc6xnlqzjnxksq303gwu2npfaxd49vmde6qcq4nwx', // Dn the Daniel
      'npub1hee433872q2gen90cqh2ypwcq9z7y5ugn23etrd2l2rrwpruss8qwmrsv6', // Lemon
      'npub1scvyzz02ayma34hesz62pdrd5nhsmxp74hjq8msmfs9khh3r3drsnw68d8', // Chad
      'npub1ven4zk8xxw873876gx8y9g9l9fazkye9qnwnglcptgvfwxmygscqsxddfh', // Danny the cyberguy
    ]
  },
  fediverse: {
    authors: [
        'npub1gaz8na0rwfxvqu4wlu3lfckhvjycjldpmcrkjes5lnfds4qarjpsytwsjn', // Frank Meeuwsen
        'npub1g629cekt0kgr4jw22wtwmz3h4qk5q8zwvxv4azsl4suq3fmw928s9lqlph', // Teletekst
        'npub15s3hussvmv9nyvw3w8lg0x72udazmdat7tcj5vmmjafnwcvv8tpqzz6r6y', // Meredith Whittaker
        'npub1xy8zx8ug6essztwhf5ykuv5dcfmwfl5nhck4q52g747jppa0g98q00zhxr', // SIDN
        'npub1lsqp7gn3qcgllnt28t7ufmyu3aumt00whutdk4vmkvp68per8t0q0dmx0m', // Molly White
        'npub13f3xuy2npzmpctnv3z4c0rte3ntsl7kflwcrkt97zrltlq68d5ws0pfd3f', // Internet Archive
        'npub1x2nsd57m43rt663drdxgnzlfsmmu6p5j7z0xzec2tpxwyvy79sts35u4eh', // Patrick Breyer
        'npub1tp3f6k0p9534lt37pv6yyr2ygyt30d2smcgmyhfnzsj09ahsvnysyze8qg', // Richard Stallman
        'npub1mf3yh9hywzgagz3xajrg6sn82yffykhlj7wcwypy75uzfee5r3cqfyeu5h', // JA Westenberg
        'npub10eflqqcuywqatyv2f7wqudndkcg44xn29mp7wysxjmqlk63cq8gqy9sljp', // Marleen Stikker
        'npub1yerpqzt2ht9ckwfnx4dr264reymvs2tq6rngusmyfhk8yp9xcd6sqq9vxk', // NRC
        'npub1nlek7d3xmvhj3jlux7f35lafc2rerp70rve4z9lxgerqgrjhuydqw3tk4d', // Marloes de Koning
        'npub17kfqm4kc55eksq5sxw7ac0z557sj8c5vucumjegnhnq9f62qjlvsgn0w2a', // European Commission
        'npub1q5dvaccqp9gxafrsjqrf8mr8gmw8gr5lv8jre90ujz24v5u7m3uq8gxex7', // Jeff Geerling
        'npub1u6wu3jd3f6q5te25z4n4gaxmtydh0zrr3qahc3l48ckp5n342dlsfhracd', // Sebastian Hagens
        'npub1ee488qmvxx2r3ketl0yevxtqs09hquyrf09q9zjgqh07yldhdgdqfl3shh', // Koen de Jonge
        'npub1yyujseqnpu89dnkhde622w369lz468xqshrgw0yaepd22nxf5shslufacp', // BjornW
        'npub1v6dna7e5h8y3yw00gxjwfpxsvzzhlrtgmhejf0ks9dswcju0k8uq05dsa7', // Social Coding Commons
    ]
  }
})
useSeoMeta({
  title: 'Ontdek profielen uit de Nostrverse en Fediverse',
  description: 'Ontdek enkele interessante profielen uit de Nostrverse en Fediverse.'
})
</script>

<template>
  <section>
    <h1 class="text-3xl text-nyves-blue my-3 text-center font-bold">Ontdek enkele interessante profielen</h1>
    <p class="text-xl text-center mb-8">
      Een lijst van profielen die de moeite waard zijn om te bekijken.
    </p>
  </section>
  <section class="mb-8">
    <h2 class="text-2xl text-nyves-blue my-3 text-center font-bold">
      Nederlandse profielen uit de Nostrverse
    </h2>
    <NostrComponentsHighlightProfiles :filters="filters.nl" :limit="24" class="text-center" />

    <h2 class="text-2xl text-nyves-blue my-3 text-center font-bold">
      Fediverse
    </h2>
    <NostrComponentsHighlightProfiles :filters="filters.fediverse" :limit="24" class="text-center" />

    <h2 class="text-2xl text-nyves-blue my-3 text-center font-bold">
      Globaal uit de Nostrverse
    </h2>
    <NostrComponentsHighlightProfiles :filters="filters.nostr" :limit="24" class="text-center" />

  </section>
  <section class="max-w-xl mx-auto">
    <details>
      <summary>Wat de Nostrverse?</summary>
      Dit is het netwerk van verschillende Nostr relays en applicaties.
    </details>
    <details>
      <summary>Wat de Fediverse?</summary>
      Dit is het netwerk van verschillende platformen gebaseerd op het open ActivityPub protocol.
    </details>
  </section>
</template>

<style scoped>

</style>