<script setup>
const props = defineProps({
  event: {
    type: Object,
    required: true
  }
})

const render = (content) => {
  // What content do we need to render to HTML from a note (event kind 1) content field?
  /*
   * 1. Emojis
   * 2. NIP-19 identifiers
   * 3. Images
   * 4. Video
   * 5. URL's
   * 6. Linebreaks \n to <br />
   */

}

const renderEmojis = (content) => {
  // Check if the event has some emoji tags
  for (const tag of props.event.tags) {
    if (tag[0] === 'emoji') {
      const emojiName = tag[1]
      const emojiUrl = tag[2]
      
      // Replace all instances of :emojiName: with HTML image
      const regex = new RegExp(`:${emojiName}:`, 'g')
      content = content.replace(regex, `<img src="${emojiUrl}" alt="${emojiName}" class="inline-block size-5" />`)
    }
  }
  // Handle line-breaks
  content = content.replace(/\r\n|\r|\n/g, '<br>');
  return content;
}
</script>

<template>
  <div class="text-xs leading-normal mb-1 break-all" v-html="renderEmojis(event.content)">

  </div>
</template>

<style scoped>

</style>