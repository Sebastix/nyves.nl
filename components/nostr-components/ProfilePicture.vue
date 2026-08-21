<script setup>
import { nip19 } from 'nostr-tools'
import LoadingSpinner from '../LoadingSpinner.vue';
const { fetchProfileByPubkey } = useNostrProfile()

const loading = ref(true)
const name = ref('')
const picture = ref('')

const props = defineProps({
  pubkey: {
    // Hex formatted public key
    type: String,
    required: true
  }
})

let imageHealthCheck = async (image_url) => {
  // Check if the image is available, otherwise return default placeholder
  if (!image_url) {
    return '/jan-paparazzi.webp';
  }
  const xhr = new XMLHttpRequest();
  // create a `HEAD` request
  xhr.open('HEAD', image_url);
  // listen for `onload` event
  xhr.onload = () => {
    if (xhr.status === 404) {
      console.log('404 for ' + image_url);
      return '/jan-paparazzi.webp';
    } else {
      console.log(xhr.responseURL);
      console.log('return - ' + image_url);
      return xhr.responseURL;
    }
  };
  // send request
  xhr.send();
};

onMounted(async() => {
  try {
    const profile = await fetchProfileByPubkey(props.pubkey)
    picture.value = profile?.picture ? profile.picture : '/jan-paparazzi.webp'
    name.value = profile?.name || profile?.display_name || profile?.displayName || props.pubkey
    loading.value = false
  } catch (e) {
    loading.value = false
  }
})
</script>

<template>
  <div v-if="loading">
    <div class="size-25 bg-gray-200 border border-gray-300 hover:border-gray-600 transition-border duration-150 shadow-md/5 mx-auto mb-1 flex justify-center items-center">
      <LoadingSpinner />
    </div>
  </div>
  <div v-else>
    <img
        :src="picture"
        :alt="name"
        class="max-h-25 min-h-12 bg-gray-200 shadow-md/5 mx-auto"
    />
  </div>
</template>

<style scoped>

</style>