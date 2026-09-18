<script setup>
import { nip19 } from 'nostr-tools'
import LoadingSpinner from '../../../components/LoadingSpinner.vue';
const { fetchProfile } = useNostrProfile()
const { } = useSharedRelayPool() // Ensure shared pool is available
const route = useRoute()
const { formatDate} = useDateHelpers()
// Custom design composable
const { designData, fetchCustomDesign, setCustomDesign, toggleCustomDesign, removeBackground, toggleFonts, toggleHeader, toggleFooter } = useCustomDesign()
// Custom design reactive property
const custom_design = computed(() => designData.value.custom_design)
// Nyves profile data
const nyvesProfile = ref({
  name: '',
  username: '',
  joinDate: '',
  brands: ['Hyves'],
  spots:  Math.round((Math.floor(Math.random() * 100 + 50)) / 10),
  urlWaybackMachine: ''
})
// Nostr profile data
const profile = ref({})
const krabbels = ref([
  {
    author: {
      name: 'Nyves',
      username: 'Nyves'
    },
    content: `Met Nyves breng je jouw Hyves profiel terug tot leven.`,
    createdAt: new Date('2026-05-02')
  },
  {
    author: {
      name: 'HVSbackup',
      username: 'hvsbackup'
    },
    content: `Bekijk hier een video hoe de HVSbackup applicatie werkte: <a href="https://nyves.nl/hvsbackup">https://nyves.nl/hvsbackup</a>`,
    createdAt: new Date('2013-11-21')
  },
])
const hyvesItems = ref([])
const loading = ref(true)
const error = ref(null)

// Parse route parameter to determine format
const parseProfileId = (id, hash) => {
  // Format 1: profiel/username#pubkey which is a Nyves migrated profile
  if (hash && hash.startsWith('#')) {
    const pubkey = hash.substring(1)
    return {
      type: 'username-hash-nyves',
      username: id,
      pubkey: pubkey,
      npub: pubkey.startsWith('npub') ? pubkey : nip19.npubEncode(pubkey)
    }
  }

  // Format 2: profiel/npub1...which is a default nostr profile
  if (id.startsWith('npub1')) {
    try {
      const decoded = nip19.decode(id)
      if (decoded.type === 'npub') {
        return {
          type: 'npub1',
          npub: id,
          pubkey: decoded.data,
          username: null // Will be fetched from profile
        }
      }
    } catch (e) {
      console.error('Invalid npub format:', e)
      return null
    }
  }

  // Format 3: profiel/hex-pubkey (fallback)
  if (id.length === 64 && /^[0-9a-f]+$/i.test(id)) {
    return {
      type: 'pubkey-hex',
      pubkey: id,
      npub: nip19.npubEncode(id),
      username: null
    }
  }

  return null
}

// Load profile based on route
const loadProfile = async () => {
  loading.value = true
  error.value = null

  try {
    const profileId = parseProfileId(route.params.id, route.hash)

    if (!profileId) {
      error.value = 'Ongeldig profiel ID format'
      return
    }

    // Fetch profile from Nostr using pubkey
    const fetchedProfile = await fetchProfile(profileId.pubkey)

    if (fetchedProfile) {
      profile.value = {
        ...fetchedProfile,
        npub: profileId.npub,
        pubkey: profileId.pubkey,
        routeType: profileId.type,
        username: profileId.username || fetchedProfile.name || 'Onbekend'
      }

      if (fetchedProfile && fetchedProfile.tags.length) {
        for (const tag of fetchedProfile.tags) {
          // Get warc file tag from profile event, so we can construct an URL to the Wayback Machine to visit your archived profile there.
          if (tag[0] === 'warc_file') {
            const warc_filename = tag[1].split('/').at(-1)
            const date = warc_filename.split('-').at(-1).split('.')[0]
            const time = warc_filename.split('-').at(-2)
            profile.value.urlWaybackMachine = 'https://web.archive.org/web/'+date+time+'/http://'+profile.value.username+'.hyves.nl'
          }
        }
      }

      if (profileId.type === 'npub1') {
        // Lookup custom profile design properties (following the ditto.pub spec).
        await fetchCustomDesign(profile.value.pubkey, 'wss://relay.ditto.pub')
      }

      // Update page title with name
      useSeoMeta({
        title: `${profile.value.display_name || profile.value.name || 'Profiel'} - Nyves`,
        description: `Bekijk het Nostr profiel van ${profile.value.display_name || profile.value.name} op Nyves`
      })
    } else {
      error.value = 'Profiel niet gevonden'
    }
  } catch (e) {
    console.error('Error loading profile:', e)
    error.value = 'Er ging iets mis bij het laden van het profiel'
  } finally {
    loading.value = false
  }
}

// Load profile on mount and route changes
onMounted(async () => {
  await loadProfile()
  if (custom_design.value) {
    // Apply custom design to profile by setting custom_design to false first
    setCustomDesign(false)
    // Will enable the custom design on page load
    toggleCustomDesign()
  }
})

watch(
    () => [route.params.id, route.hash], loadProfile
)

onUnmounted(() => {
  setCustomDesign(false)
  removeBackground()
  toggleFonts()
  toggleHeader()
  toggleFooter()
  close()
})
definePageMeta({
  i18n: {
    paths: {
      nl: '/profiel/[id]',
      en: '/profile/[id]'
    }
  },
  // Validate route
  validate (route) {
    // todo
    return true
  }
})
// Set default SEO
useSeoMeta({
  title: 'Profiel - Nyves',
  description: 'Bekijk Nostr profiel op Nyves'
})
// Debug routing
console.log('[id]/index.vue loaded:', {
  path: route.path,
  id: route.params.id,
  fullPath: route.fullPath
})
</script>

<template>
  <div class="mt-3">
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center min-h-64">
      <div class="text-center">
        <LoadingSpinner class="size-12 mx-auto mb-12" />
        <p class="text-gray-600">Profiel wordt geladen...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex justify-center items-center min-h-64">
      <div class="text-center">
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {{ error }}
        </div>
        <NuxtLink
            to="/"
            class="text-nyves-blue hover:text-nyves-blue/80 underline"
        >
          ← Terug naar homepage
        </NuxtLink>
      </div>
    </div>

    <!-- Profile -->
    <div v-else-if="profile">

      <!-- Profile Header -->
      <div class="grid grid-cols-1 md:grid-cols-2 profileHeader">
        <h1 class="col-span-2 text-3xl font-bold mb-1">{{ profile.name }} <a :href="profile.urlWaybackMachine" target="_blank" class="text-xs" v-if="profile.urlWaybackMachine">{{ profile.urlWaybackMachine }}</a></h1>
        <div class="mb-2">
          <NuxtLink :to="`/profiel/${profile.npub}/over`" class="mr-4 text-xs font-bold">Over</NuxtLink>
          <NuxtLink :to="`/profiel/${profile.npub}/vrienden`" class="mr-4 text-xs">Vrienden</NuxtLink>
          <NuxtLink :to="`/profiel/${profile.npub}/media`" class="mr-4 text-xs">Foto's</NuxtLink>
          <NuxtLink :to="`/profiel/${profile.npub}/meer`" class="text-xs">Meer</NuxtLink>
        </div>
        <button
            @click="toggleCustomDesign"
            class="justify-self-end text-xs mb-1 cursor-pointer px-1"
            :class="[ custom_design ? 'bg-linear-to-b from-[#65d018] to-[#49a811] text-white rounded-sm font-bold border border-[#96e05e] hover:border-[#44a806] text-shadow-xs' : '' ]"
        >
          <span class="text-white font-sans" v-if="custom_design">🛟 Toon in standaard design</span>
          <span class="text-nyves-blue" v-else>🛟 Toon eigen design!</span>
        </button>
      </div>

      <!-- Main Content -->
      <div class="grid grid-cols-3 lg:flex gap-2">
        <!-- Profile Picture Column -->
        <div class="col-span-1 lg:w-[150px]">
          <!-- Profile Section Component -->
          <ProfielProfilePicture :profile="profile" :nyvesProfile="nyvesProfile" />
        </div>

        <!-- Profile About Column -->
        <div class="col-span-2 lg:w-[420px]">
          <ProfielProfileAbout :profile="profile" :nyvesProfile="nyvesProfile" />
        </div>

        <!-- Right Column -->
        <div class="col-span-3 md:flex-1">
          <!-- Friends Grid Component -->
          <ProfielFriendsGrid :profile="profile" />
        </div>
      </div>

      <!-- Bottom Sections -->
      <div class="flex flex-col md:flex-row gap-2 mt-3">
        <!-- Bottom Left -->
        <div class="basis-1/2">

          <ProfielMedia :profile="profile" :nyvesProfile="nyvesProfile" />

          <!-- Krabbels Section -->
          <div class="border border-gray-200 bg-[#fcfcfc] rounded-sm">
            <h3 class="nyves-bg-gray-header p-2 text-nyves-blue font-bold">Krabbels</h3>
            <ProfielKrabbels :profile="profile" />
          </div>
        </div>

        <!-- Bottom Right -->
        <div class="basis-1/2">
          <!-- Hyves Section -->
          <div class="border border-gray-200 bg-[#fcfcfc] rounded-sm mb-3">
            <h3 class="nyves-bg-gray-header p-2 text-nyves-blue font-bold">Hyves</h3>
            <p v-if="!hyvesItems.length" class="p-2 text-sm">
              Geen items gevonden
            </p>
            <div v-else class="grid grid-cols-4 gap-2 p-2">
              <div v-for="item in hyvesItems" :key="item.id" class="text-center">
                <NuxtLink :to="`${item.link}${item.caption}`" class="text-xs">
                  <div class="min-h-[80px] aspect-square bg-gray-200 border border-gray-300 hover:border-gray-600 transition-border duration-150 shadow-md/5 mx-auto mb-1"></div>
                  {{ item.caption }}
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- WWW section -->
          <div class="border border-gray-200 bg-[#fcfcfc] rounded-sm mb-3">
            <h3 class="nyves-bg-gray-header p-2 text-nyves-blue font-bold">WieWatWaar</h3>
            <p class="p-2 text-sm">
              Geen items gevonden
            </p>
            <div class="my-1">
              <NuxtLink :to="`${profile.npub}/wie-wat-waar`" class="text-xs mx-2">› Meer</NuxtLink>
            </div>
          </div>

          <!-- Blogs section -->
          <div class="border border-gray-200 bg-[#fcfcfc] rounded-sm mb-3">
            <h3 class="nyves-bg-gray-header p-2 text-nyves-blue font-bold">Blog</h3>
            <ProfielBlog :profile="profile" />
            <div class="my-1">
              <NuxtLink :to="`${profile.npub}/blog`" class="text-xs mx-2">› Meer</NuxtLink>
            </div>
          </div>

          <!-- Login Box -->
          <div class="bg-yellow-100 border border-yellow-400 p-2 mb-3 text-xs">
            Je moet ingelogd zijn om dit onderdeel te bekijken!
            <div class="mt-2">
              <NuxtLink to="/connect" class="block mb-1">🔑 Klik hier om in te loggen...</NuxtLink>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div> <!-- End of main profile content -->
</template>

<style scoped>
code {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}
</style>