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
        'npub1qeyzrlyc3j9ahvtm79ejmth4zs3ekfultpuxv5pk8d42g8k43xjqfpskkj', // Rob NWB
        'npub1vvqnak4hz0u7vkv0vs5jp4ha0dt359cgvz4jj4y2ku85z0dtt6zq9pv3s8', // Edward
        'npub12hcytyr8fumy3axde8wgeced523gyp6v6zczqktwuqeaztfc2xzsz3rdp4', // NoGood
        'npub18hwpk5qep3ptnmzatq22ptwr9mth7ccrku56rdntwpxjxlkfyr2qrav8du', // Jesse
        'npub1w4la29u3zv09r6crx5u8yxax0ffxgekzdm2egzjkjckef7xc83fs0ftxcd', // Bartus
        'npub1w98ems6ryhpv7zvmhwp5sv65p0pwrnvzw4lucn0ch776qan9ntdstscwpx', // Arnold
        'npub1600yr4qg5vcfp7svf6ysj0008tn7aphnu0gjs6lw5hjn74n0laasjx889v', // Henk
        'npub1qvx7sp8436674tgkn4zez6r0nyrhx9dgpxefly4xh2cjnqnjt65qnurefy', // Sappelen
        'npub1yd8fd4g4sqqt6nq0n3sgn5xa77xzv79gjfk8fmhc4gklga2rm9nq2rakmr', // Martien
        'npub17h7h2jzhq3hn06h93jvz67sfjxaq3jvk7kenjrazht28aun33hks42sd76', // Bart
        'npub1efz8l77esdtpw6l359sjvakm7azvyv6mkuxphjdk3vfzkgxkatrqlpf9s4', // Rik
        'npub1k4sj0t7es2hjpg5msnur3qz7ln7fc73q905d2dyffga0f8kgj3fqjsdn58', // Yvon
    ]
  },
  nostr: {
    authors: [
      'npub1kk0qpalwat5tclr4j9ecxqrdg2k0szvudh8nzuxmdjr4ayvwfy0qa66xq2', // Claire
      'npub102zph06yug4gzanfp770g9u8sm0qlmdh67trllwlqwh79ek46yfse9ekrj', // Ceruleon Skaiz
      'npub19yw8tkfh530kdgfqn782vcga7azgckdn2fjjp3nv5txu6dl3h7lqhv322j', // Jared Logan
      'npub1hspwpfkq7qddnj6h52c03muzgx79l7teeez99n57ys77g4m4vujs3hly9q', // Kip Ashlynn
      'npub1jvnpg4c6ljadf5t6ry0w9q0rnm4mksde87kglkrc993z46c39axsgq89sc', // MK Fain
      'npub1yzfm42rzr3dj2h50flpvdl0uzrv22kv2y4ghve804w5xqu6lzqcqkyfxu5', // Sam
      'npub1gcjcm7hqegzlfurjptqkjddzlpmyjqqwccydypng9jlmhx4ll4vqzwc4qs', // Link-NM
      'npub1lgf4fpmsjtwd049pj444cgt2e683nsnglvm4wrcv6y0xg6crsfaqex2mfc', // Sophia
      'npub1q469xmf77nt9ltu4ks3excgts36ayt6v99ryn4rv2r2axmm4ye7q3vnkqp', // shantaram
      'npub1xsgymm0ne3vndqpvsvy285qfpu59049t5n5twg9vetmt92cyn95snyzazx', // Kagi
      'npub18s4zkd0wjq5gkthz4paw2704ty4s354wcp2krvxy0sewz3g9z2cs73ydrt', // Proton
      'npub1skj3cm05l26sjg8w8lxa5z4k6kueh0mccykp6zchf2wacu7mslfsney3cq', // Flag
      'npub1yye4qu6qrgcsejghnl36wl5kvecsel0kxr0ass8ewtqc8gjykxkssdhmd0', // Eliza
      'npub1vxlhjzeqjjhmqdy4e8sndt8kzklqlnxzew2mtt8mtakvalsckp3qa0gnvx', // Logen
      'npub1aeh2zw4elewy5682lxc6xnlqzjnxksq303gwu2npfaxd49vmde6qcq4nwx', // Dn the Daniel
      'npub1sk5k0gzuhj4szla5js3umv9s77mvqr6yenxkz0qvknsc7fhkrkusxvvw6s', // Sandra
      'npub1hee433872q2gen90cqh2ypwcq9z7y5ugn23etrd2l2rrwpruss8qwmrsv6', // Lemon
      'npub1xff8z42r7mjrhcyxgegjnvps637hdnuvat28nrjgsezk8seh2zpseqt6y0', // AJ
      'npub1scvyzz02ayma34hesz62pdrd5nhsmxp74hjq8msmfs9khh3r3drsnw68d8', // Chad
      'npub1v0lxxxxutpvrelsksy8cdhgfux9l6a42hsj2qzquu2zk7vc9qnkszrqj49', // Kieran
      'npub1ven4zk8xxw873876gx8y9g9l9fazkye9qnwnglcptgvfwxmygscqsxddfh', // Danny the cyberguy
      'npub1sn0wdenkukak0d9dfczzeacvhkrgz92ak56egt7vdgzn8pv2wfqqhrjdv9', // Snowden
      'npub1klr0dy2ul2dx9llk58czvpx73rprcmrvd5dc7ck8esg8f8es06qs427gxc', // Florian
      'npub1xw7h0efeg5s8gla2uyu55jh4lfrlgppcjemrwkmdc7lgvhkcz3fqpvumsa', // Stella Assange
      'npub1gcxzte5zlkncx26j68ez60fzkvtkm9e0vrwdcvsjakxf9mu9qewqlfnj5z', // Vitor
      'npub1lstmhn60p8dyu6qhvgnvfhrq4lhvu0dtl0lngtsaqvcgnp5s3ncqmvgvk7', // XZ
      'npub1rzmgpryn39m37xadn5893vzks5p20dd8td8002zvemv6f6jmvt7q7pn6fz', // Dreiberge
      'npub1up9gelxkw2c7jgcws9gt5a6sjrwxe8zsg7ut7wwak4hs5x8luhnsk9yqq9', // Mary
      'npub1a8q2nsfw8gzwm4u6l3ma3xmvvsfue9pwl8npc509z2puh6wmpj8sqk3zhj', // Ben Arc
      'npub1m2jphmdkskgnvwl5gplksl9e0zwv2sldqf9mwlpz6tyymz84g9fsqr3wgu', // Geek
      'npub13afhst5xj05g47m3pdkksxp2m9eew0ygyt92ydamvq5gkyjkw09q33hxdh', // Morgan
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
        'npub16kgy8wk54sehmdz29axvlylck320cq3fxj5cpxm8lp053czpeuks289fan', // Angry Nerds podcast
        'npub1yerpqzt2ht9ckwfnx4dr264reymvs2tq6rngusmyfhk8yp9xcd6sqq9vxk', // NRC
        'npub1nlek7d3xmvhj3jlux7f35lafc2rerp70rve4z9lxgerqgrjhuydqw3tk4d', // Marloes de Koning
        'npub17kfqm4kc55eksq5sxw7ac0z557sj8c5vucumjegnhnq9f62qjlvsgn0w2a', // European Commission
        'npub1q5dvaccqp9gxafrsjqrf8mr8gmw8gr5lv8jre90ujz24v5u7m3uq8gxex7', // Jeff Geerling
        'npub1u6wu3jd3f6q5te25z4n4gaxmtydh0zrr3qahc3l48ckp5n342dlsfhracd', // Sebastian Hagens
        'npub1ee488qmvxx2r3ketl0yevxtqs09hquyrf09q9zjgqh07yldhdgdqfl3shh', // Koen de Jonge
        'npub1yyujseqnpu89dnkhde622w369lz468xqshrgw0yaepd22nxf5shslufacp', // BjornW
        'npub1v6dna7e5h8y3yw00gxjwfpxsvzzhlrtgmhejf0ks9dswcju0k8uq05dsa7', // Social Coding Commons
        'npub147c2erw0edrgylhkj3x83ek9jkrv9ewn7x39k2wyncecvxn5y83s9ey30c', // NWB
        'npub1nhwdxapuselehhynjrjzwl22nwd3s936xyylw87sg3zvaws3ddhsqanaya', // Groen Amsterdammer
        'npub13v7qd25svl0a0jmn2muwt0yt0ejjy4nenu09hwdlww336j64eaxqwhqsjd', // KNMI
        'npub18xdffzfz6fsmg8cnqn4jvkys0wdusjplu3t736j26y8rruv9ln4sfjkzcm', // Belastingdienst
        'npub1sh4jph0ftr98mnedahvvgg0nqjnv4nnsr705cqmqvyve9cxz29lqz32pt0', // Logius
        'npub16me3qx8h0lqcfjpqecfgvcnrzc0fjqqgdpcgec7zhkjwn7xar52sdhn4s6', // Opensource werken
        'npub1myywnml60aecm6ymkx2hkw8ru835v4d3cl4x8unh5z4umz3jdyhqrsssft', // Marcel Bootsman
        'npub19fwwstv5dg8qsmuj9rmgf98nt9lfz5gvv67jqx6y9jtgekpcz5pqpgulzp', // ProPublica
        'npub1xzt43pjyy7tzn3ylg8yadhvtsn87u6xvarx92zjvdx4cg2a9f6dqx9ujvl', // Volkskrant
        'npub1mnstqq3cztl069fm2j2psr4gvwq0rvfp7c2x6jvgf7t9pr5p8ausstwlqa', // Fokke en Sukke
        'npub194da6pp6707dvkarvlqau86e2uf32muwtkxg0497lv80rc0xfmeqj2ja05', // Eerlijk digitaal onderwijs
        'npub1r7384kwjpac08h892fghkhvs78eqh8mtxyahd5cuuttlcwhxvzls8hk07a', // Gina
        'npub1c5546dyxgn5jxny5p4u9zmwlzfpmas5scc7qhcjh3gr6fhtnen6qqfsly8', // Museum of Obsolete Media
        'npub1z04g44eclq892f8zn7xvw83cyzfcmw3aqaxv82e6lhpwkfaypaws8aw6eg', // Stux
        'npub12t7u5x9lnpphts9e4zyhm2dhmcelus5rsp5scpthyv5sgekg7hrskhv046', // Hacker news
        'npub1nl8kfluckgtpd6mespdxa4nr2ypnwalcx25603dk0uhddp49wttsvg5tfv', // Elena Rossini
        'npub1eus08dnf998x0hpdydlrj8zlh729ecg70hvaj9w5jaw4f0v8f50srpdpd2', // NOS
        'npub1sw634c7zv9zat85kwv79jvuju3r8g8grhv2vxp9xzpqvqc8fvgmq2czy0s', // Lobsters
    ]
  }
})
const { t } = useI18n()
useSeoMeta({
  title: () => t('ontdek_profielen.seo_title'),
  description: () => t('ontdek_profielen.seo_description')
})
</script>

<template>
  <section>
    <h1 class="text-3xl text-nyves-blue my-3 text-center font-bold">{{ $t('ontdek_profielen.title') }}</h1>
    <p class="text-xl text-center mb-8">
      {{ $t('ontdek_profielen.intro') }}
    </p>
  </section>
  <section class="mb-8">
    <h2 class="text-2xl text-nyves-blue my-3 text-center font-bold">
      {{ $t('ontdek_profielen.nl_profiles') }}
    </h2>
    <NostrComponentsHighlightProfiles :filters="filters.nl" :limit="24" class="text-center" />

    <h2 class="text-2xl text-nyves-blue my-3 text-center font-bold">
      {{ $t('ontdek_profielen.fediverse') }}
    </h2>
    <NostrComponentsHighlightProfiles :filters="filters.fediverse" :limit="24" class="text-center" />

    <h2 class="text-2xl text-nyves-blue my-3 text-center font-bold">
      {{ $t('ontdek_profielen.global_profiles') }}
    </h2>
    <NostrComponentsHighlightProfiles :filters="filters.nostr" :limit="24" class="text-center" />

  </section>
  <section class="max-w-xl mx-auto">
    <details>
      <summary>{{ $t('ontdek_profielen.what_is_nostrverse_q') }}</summary>
      <p>{{ $t('ontdek_profielen.what_is_nostrverse_a1') }}</p>
      <p>{{ $t('ontdek_profielen.what_is_nostrverse_a2') }}</p>
    </details>
    <details>
      <summary>{{ $t('ontdek_profielen.what_is_fediverse_q') }}</summary>
      <p>{{ $t('ontdek_profielen.what_is_fediverse_a1') }}</p>
      <p>{{ $t('ontdek_profielen.what_is_fediverse_a2') }}</p>
    </details>
    <details>
      <summary>{{ $t('ontdek_profielen.create_profile_q') }}</summary>
      <p>{{ $t('ontdek_profielen.create_profile_a1') }}</p>
      <p>
        <i18n-t scope="global" keypath="ontdek_profielen.create_profile_a2">
          <template #ditto>
            <a href="https://ditto.pub" target="_blank" rel="noopener noreferrer">Ditto</a>
          </template>
        </i18n-t>
      </p>
    </details>
    <details>
      <summary>{{ $t('ontdek_profielen.create_design_q') }}</summary>
      <p>
        <i18n-t scope="global" keypath="ontdek_profielen.create_design_a1">
          <template #ditto>
            <a href="https://ditto.pub" target="_blank" rel="noopener noreferrer">Ditto</a>
          </template>
        </i18n-t>
      </p>
      <p>{{ $t('ontdek_profielen.create_design_a2') }}</p>
    </details>
  </section>
</template>

<style scoped>

</style>