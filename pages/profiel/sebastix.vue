<script setup>
// req -k 36767 -a 06639a386c9c1014217622ccbcf40908c4f1a0c33e23f8d6d68f4abf655f8f71 wss://relay.ditto.pub

const PUBKEY = '06639a386c9c1014217622ccbcf40908c4f1a0c33e23f8d6d68f4abf655f8f71';

// Modal functionality
const { openModal } = useModal();

// Custom design composable
const { designData, fetchCustomDesign, setCustomDesign, toggleCustomDesign, removeBackground, toggleFonts, toggleHeader, toggleFooter } = useCustomDesign()

// Custom design reactive property
const custom_design = computed(() => designData.value.custom_design)

const profile = ref({
  name: 'Sebastix',
  username: 'sebastix',
  joinDate: '01-09-2005',
  brands: ['PHP', 'Honda'],
  spots:  Math.round((Math.floor(Math.random() * 100 + 50)) / 10)
})

const friends = ref([]);

const photos = ref({
  albumCount: '3',
  photoCount: '67'
});

const krabbels = ref([]);

const hyvesItems = ref([]);

// Helper function to format dates
const formatDate = (date) => {
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'numeric'
  }
  return date.toLocaleDateString('nl-NL', options)
}

onMounted(async () => {
  // Fetch custom design settings for this profile
  await fetchCustomDesign(PUBKEY, 'wss://relay.ditto.pub')

  if (custom_design.value) {
    // Apply custom design to profile by setting custom_design to false first
    setCustomDesign(false)
    // Will enable the custom design on page load
    toggleCustomDesign()
  }

  // TODO's:
  // Get read and write relays from pubkey (NIP-65) and find the event kind 10063 on of the indexer relays
  // Get profile metadata (event kind 0) from write relays of pubkey
  // Get following list (event kind 3) of pubkey
  // Get messages to be displayed as krabbels, events with kind 24 (NIP-A4)
})

onUnmounted(() => {
  setCustomDesign(false)
  removeBackground()
  toggleFonts()
  toggleHeader()
  toggleFooter()
  close()
})

</script>

<template>
  <!-- Main Container -->
  <div class="mt-3">

    <div class="bg-yellow-50 p-2 mb-2 border border-yellow-400 text-sm">
      Dit is een bestaand Nostr profiel (<span class="text-xs font-mono break-all">{{ PUBKEY }}</span>) in een mockup van een Hyves profielpagina.
    </div>

    <!-- Profile Header -->
    <div class="grid grid-cols-1 md:grid-cols-2 profileHeader mb-2">
      <h1 class="col-span-2 text-3xl font-bold mx-2">{{ profile.name }}</h1>
      <div class="mx-2">
        <NuxtLink :to="`/profile/${profile.username}`" class="text-orange-600 hover:underline mr-4 text-xs font-bold">Over</NuxtLink>
        <NuxtLink :to="`/profile/${profile.username}/vrienden`" class="mr-4 text-xs">Vrienden</NuxtLink>
        <NuxtLink :to="`/profile/${profile.username}/fotos`" class="mr-4 text-xs">Foto's</NuxtLink>
        <NuxtLink :to="`/profile/${profile.username}/meer`" class="text-xs">Meer</NuxtLink>
      </div>
      <button 
        @click="toggleCustomDesign"
        class="p-1 justify-self-end text-xs mx-2 cursor-pointer"
        :class="[ custom_design ? 'bg-linear-to-b from-[#65d018] to-[#49a811] text-white rounded-sm font-bold border border-[#96e05e] hover:border-[#44a806] text-shadow-xs' : '' ]"
      >
        <span v-if="custom_design">🛟 Toon in standaard design</span>
        <span v-else>🛟 Toon eigen design!</span>
      </button>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-3 lg:flex gap-2">
      <!-- Profile Picture Column -->
      <div class="col-span-1 lg:w-[150px]">
        <!-- Profile Section Component -->
        <ProfielProfilePicture :profile="profile" />
      </div>

      <!-- Profile About Column -->
      <div class="col-span-2 lg:w-[420px]">
        <ProfielProfileAbout :profile="profile" />
      </div>

      <!-- Right Column -->
      <div class="col-span-3 md:flex-1">
        <!-- Friends Grid Component -->
        <ProfielFriendsGrid :friends="friends" />
      </div>
    </div>

    <!-- Bottom Sections -->
    <div class="flex flex-col md:flex-row gap-2 mt-3">
      <!-- Bottom Left -->
      <div class="basis-1/2">
        <!-- Foto's & Video's Section -->
        <div class="border border-gray-200 bg-[#fcfcfc] rounded-sm mb-3">
          <h3 class="nyves-bg-gray-header p-2 text-nyves-blue font-bold flex justify-between">
            <span>Foto's & video's</span>
            <NuxtLink to="#" class="text-xs/5 font-normal">Gespot! ({{ profile.spots }})</NuxtLink>
          </h3>
          <div class="grid grid-cols-4 lg:grid-cols-5 gap-2 p-2">
            <div class="min-h-[80px] aspect-square bg-gray-200 border border-gray-300 hover:border-gray-600 transition-border duration-150 shadow-md/5"></div>
            <div class="bg-gray-200 border border-gray-300 hover:border-gray-600 transition-border duration-150 shadow-md/5"></div>
            <div class="bg-gray-200 border border-gray-300 hover:border-gray-600 transition-border duration-150 shadow-md/5"></div>
            <div class="bg-gray-200 border border-gray-300 hover:border-gray-600 transition-border duration-150 shadow-md/5"></div>
            <div class="bg-gray-200 border border-gray-300 hover:border-gray-600 transition-border duration-150 shadow-md/5"></div>
            <div class="bg-gray-200 border border-gray-300 hover:border-gray-600 transition-border duration-150 shadow-md/5"></div>
            <div class="min-h-[80px] aspect-square bg-gray-200 border border-gray-300 hover:border-gray-600 transition-border duration-150 shadow-md/5"></div>
            <div class="bg-gray-200 border border-gray-300 hover:border-gray-600 transition-border duration-150 shadow-md/5"></div>
            <div class="bg-gray-200 border border-gray-300 hover:border-gray-600 transition-border duration-150 shadow-md/5"></div>
            <div class="bg-gray-200 border border-gray-300 hover:border-gray-600 transition-border duration-150 shadow-md/5"></div>
            <div class="min-h-[80px] aspect-square bg-gray-200 border border-gray-300 hover:border-gray-600 transition-border duration-150 shadow-md/5"></div>
            <div class="bg-gray-200 border border-gray-300 hover:border-gray-600 transition-border duration-150 shadow-md/5"></div>
            <div class="min-h-[80px] aspect-square bg-gray-200 border border-gray-300 hover:border-gray-600 transition-border duration-150 shadow-md/5"></div>
          </div>
          <div class="my-1">
            <NuxtLink to="#" class="text-xs mx-2">› Bekijk alle foto's ({{ photos.albumCount }} albums, {{ photos.photoCount }} foto's)</NuxtLink>
          </div>
        </div>

        <!-- Krabbels Section -->
        <div class="border border-gray-200 bg-[#fcfcfc] rounded-sm">
          <h3 class="nyves-bg-gray-header p-2 text-nyves-blue font-bold">Krabbels</h3>
          <div v-for="krabbel in krabbels" :key="krabbel.id" class="border-b border-gray-200 p-2">
            <div class="flex gap-2">
              <div>
                <div class="size-12 bg-gray-200 border border-gray-300 hover:border-gray-600 transition-border duration-150"></div>
              </div>
              <div>
                <NuxtLink :to="`/profile/${krabbel.author.username}`" class="font-bold text-xs">{{ krabbel.author.name }}</NuxtLink>
                <div class="text-xs leading-normal mb-1 krabbel-content" v-html="krabbel.content"></div>
                <div class="text-xs text-[#a9a9a9]">
                  {{ formatDate(krabbel.createdAt) }}, <NuxtLink to="#">Reageer</NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Right -->
      <div class="basis-1/2">
        <!-- Hyves Section -->
        <div class="border border-gray-200 bg-[#fcfcfc] rounded-sm mb-3">
          <h3 class="nyves-bg-gray-header p-2 text-nyves-blue font-bold">Hyves</h3>
          <div class="grid grid-cols-4 gap-2 p-2">
            <div v-for="item in hyvesItems" :key="item.id" class="text-center">
              <NuxtLink :to="item.link" class="text-xs">
                <div class="min-h-[80px] aspect-square bg-gray-200 border border-gray-300 hover:border-gray-600 transition-border duration-150 shadow-md/5 mx-auto mb-1"></div>
                {{ item.caption }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Login Box -->
    <div class="bg-yellow-100 border border-yellow-400 p-2 mt-3 text-xs">
      Je moet ingelogd zijn om dit onderdeel te bekijken!
      <div class="mt-2">
        <NuxtLink @click.prevent="openModal('connect')" class="block mb- cursor-pointer">🔑 Klik hier om in te loggen...</NuxtLink>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>