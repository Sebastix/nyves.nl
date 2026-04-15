<script setup>
// Get the username from the route
const route = useRoute()
const username = route.params.username

// Set page meta
useSeoMeta({
  title: `${username} - Nyves`,
  description: `Bekijk het profiel van ${username} op Nyves`
})

// Mock data - in a real app this would come from an API
const profile = ref({
  name: 'Sebastian',
  username: 'sebastix',
  joinDate: '01-09-2005',
  brands: ['PHP', 'Honda'],
  spots:  Math.round((Math.floor(Math.random() * 100 + 50)) / 10)
})

const friends = ref([
  { id: 1, name: 'Christina', username: 'christina' },
  { id: 2, name: 'Elise', username: 'elise' },
  { id: 3, name: 'Monique', username: 'monique' },
  { id: 4, name: 'Bart', username: 'bart' },
  { id: 5, name: 'Hanneke', username: 'hanneke' },
  { id: 6, name: 'Isabeen', username: 'isabeen' },
  { id: 7, name: 'Bianca', username: 'bianca' },
  { id: 8, name: 'Josien', username: 'josien' },
  { id: 9, name: 'Frits', username: 'frminits' }
])

const photos = ref({
  albumCount: '3',
  photoCount: '67'
})

const krabbels = ref([
  {
    id: 1,
    author: {
      name: 'HVSbackup',
      username: 'hvsbackup'
    },
    content: `Versie 1.1.3 staat live!<br><br>
    En er staat ook een persbericht online op de website die vandaag is
    vernieuwd: <a href="http://hvesbackup.nl/red-met-hvesbackup-meer-dan-alleen-je-hyves-profiel-21112013.html">http://hvesbackup.nl/red-met-hvesbackup-meer-dan-alleen-je-hyves-profiel-21112013.html</a>`,
    createdAt: new Date('2013-11-21')
  }
])

const hyvesItems = ref([
  { id: 1, caption: 'helleen rust zach...', link: '#' },
  { id: 2, caption: 'Civic Club Holland', link: '#' },
  { id: 3, caption: 'HVSbackup', link: '#' },
  { id: 4, caption: 'Power Unlimited', link: '#' }
])

// Helper function to format dates
const formatDate = (date) => {
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'numeric'
  }
  return date.toLocaleDateString('nl-NL', options)
}

// In a real application, you would fetch the profile data based on the username
// For now, we'll use the mock data for any username
onMounted(async () => {
  // Mock API call
  try {
    // const profileData = await $fetch(`/api/profile/${username}`)
    // profile.value = profileData

    // For demo purposes, update the profile name to match the route
    if (username !== 'anne') {
      profile.value.name = username.charAt(0).toUpperCase() + username.slice(1)
      profile.value.username = username
    }
  } catch (error) {
    console.error('Error loading profile:', error)
    // Handle error - maybe show 404 page
  }
})
</script>
<template>
  <!-- Main Container -->
  <div class="mt-3">

    <div class="bg-yellow-50 p-2 mb-2 border border-yellow-400 text-sm">
      Dit is een mockup van een Hyves profielpagina.
    </div>

    <!-- Profile Header -->
    <div class="grid grid-cols-1 md:grid-cols-2">
      <h1 class="col-span-2 text-3xl font-bold mb-1">{{ profile.name }}</h1>
      <div class="mb-2">
        <NuxtLink :to="`/profile/${profile.username}`" class="text-orange-600 hover:underline mr-4 text-xs font-bold">Over</NuxtLink>
        <NuxtLink :to="`/profile/${profile.username}/vrienden`" class="mr-4 text-xs">Vrienden</NuxtLink>
        <NuxtLink :to="`/profile/${profile.username}/fotos`" class="mr-4 text-xs">Foto's</NuxtLink>
        <NuxtLink :to="`/profile/${profile.username}/meer`" class="text-xs">Meer</NuxtLink>
      </div>
      <NuxtLink to="#" class="justify-self-end text-xs mb-4">🛟 Toon eigen design!</NuxtLink>
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
        <NuxtLink to="/connect" class="block mb-1">🔑 Klik hier om in te loggen...</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>