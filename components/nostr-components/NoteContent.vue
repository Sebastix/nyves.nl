<script setup>
import { nip19 } from 'nostr-tools'

const props = defineProps({
  event: {
    type: Object,
    required: true
  }
})

/*
 * Rendering model
 * ---------------
 * The content is parsed into tokens (text, URL, image, video, emoji, NIP-19 identifier, line break)
 * and rendered with v-for. Nothing is rendered with v-html anymore, so:
 *   - untrusted note content is escaped by Vue automatically (no XSS), and
 *   - real components can be used, such as NostrComponentsPubkeyToName for npub1 identifiers.
 */
const parts = computed(() => parseContent(props.event.content ?? '', props.event.tags ?? []))

const IMAGE_EXT = '\\.(?:png|jpg|jpeg|webp|gif)'
const VIDEO_EXT = '\\.mp4'
// URL body: stops at whitespace, quotes and angle brackets (same class as before).
const URL_BODY = '[^\\s<>"\']+'
// bech32 character set (no 1, b, i or o)
const NPUB_CHARS = '023456789acdefghjklmnpqrstuvwxyz'

const escapeRegExp = (str) => String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

// One pass over the content with all patterns, so the order of the alternatives decides priority:
// a media URL wins over a plain URL, and an emoji only counts when it is defined in the event tags.
// The media alternatives have no $ anchor: an URL only has to END with the extension, otherwise a
// media URL somewhere in the middle of a note would be classified as a plain URL.
const buildMatcher = () => new RegExp([
  `(?<video>https?:\\/\\/${URL_BODY}${VIDEO_EXT})`,
  `(?<image>https?:\\/\\/${URL_BODY}${IMAGE_EXT})`,
  `(?<npub>nostr:npub1[${NPUB_CHARS}]+)`,
  `(?<nprofile>nostr:nprofile1[${NPUB_CHARS}]+)`,
  `(?<url>https?:\\/\\/${URL_BODY})`,
  `(?<emoji>:[a-zA-Z0-9_+-]+:)`,
  `(?<br>\\r\\n|\\r|\\n)`,
].join('|'), 'g')

const parseContent = (content, tags) => {
  const emojiUrls = new Map(tags
    .filter((tag) => tag[0] === 'emoji' && tag[1] && typeof tag[2] === 'string' && /^https?:\/\//i.test(tag[2]))
    .map((tag) => [tag[1], tag[2]]))

  const matcher = buildMatcher()
  const parts = []
  let last = 0
  let match

  while ((match = matcher.exec(content)) !== null) {
    if (match.index > last) parts.push({ type: 'text', value: content.slice(last, match.index) })
    const groups = match.groups

    if (groups.video) {
      parts.push({ type: 'video', src: groups.video })
    } else if (groups.image) {
      parts.push({ type: 'image', src: groups.image })
    } else if (groups.npub || groups.nprofile) {
      parts.push(nostrIdentifier(match[0]))
    } else if (groups.url) {
      // Keep trailing punctuation outside the link, so "see https://nyves.nl." links the URL only.
      const url = trimTrailingPunctuation(groups.url)
      parts.push({ type: 'url', value: url, href: url })
      if (url.length < groups.url.length) parts.push({ type: 'text', value: groups.url.slice(url.length) })
    } else if (groups.emoji) {
      const name = groups.emoji.slice(1, -1)
      const src = emojiUrls.get(name)
      parts.push(src ? { type: 'emoji', src, alt: name } : { type: 'text', value: groups.emoji })
    } else if (groups.br) {
      parts.push({ type: 'br' })
    }

    last = matcher.lastIndex
  }

  if (last < content.length) parts.push({ type: 'text', value: content.slice(last) })
  return parts
}

// "nostr:npub1…" and "nostr:nprofile1…" (NIP-19 / NIP-27) become links to the profile page,
// rendered with the name of the profile via NostrComponentsPubkeyToName. Both carry the same
// pubkey: nprofile1 wraps it in a TLV that may also hold relay hints, npub1 is the bare key.
// Anything that does not decode stays plain text.
const nostrIdentifier = (raw) => {
  const identifier = raw.replace(/^nostr:/, '')
  try {
    const decoded = nip19.decode(identifier)
    if (decoded.type === 'npub') return { type: 'npub', npub: identifier, pubkey: decoded.data }
    if (decoded.type === 'nprofile') return { type: 'npub', npub: nip19.npubEncode(decoded.data.pubkey), pubkey: decoded.data.pubkey }
  } catch (e) {
    // invalid identifier, fall through to plain text
  }
  return { type: 'text', value: raw }
}

const trimTrailingPunctuation = (match) => {
  let url = match.replace(/[.,:!?]+$/, '')
  // Strip closing brackets only when they are unbalanced: "(see https://nyves.nl)" vs
  // a URL that genuinely contains brackets, like https://en.wikipedia.org/wiki/Nostr_(protocol)
  const pairs = { ')': '(', ']': '[', '}': '{' }
  const count = (s, c) => s.split(c).length - 1
  while (url.length) {
    const last = url[url.length - 1]
    const opener = pairs[last]
    if (!opener || count(url, last) <= count(url, opener)) break
    url = url.slice(0, -1)
  }
  return url
}
</script>

<template>
  <div class="text-xs leading-normal mb-1 break-all">
    <template v-for="(part, i) in parts" :key="i">
      <br v-if="part.type === 'br'" />
      <img v-else-if="part.type === 'image'" :src="part.src" alt="" />
      <video v-else-if="part.type === 'video'" controls>
        <source :src="part.src" />
      </video>
      <img v-else-if="part.type === 'emoji'" :src="part.src" :alt="part.alt" class="inline-block size-5" />
      <NuxtLink v-else-if="part.type === 'npub'" :to="`/profiel/${part.npub}`">
        <NostrComponentsPubkeyToName :pubkey="part.pubkey" />
      </NuxtLink>
      <a v-else-if="part.type === 'url'" :href="part.href" target="_blank" rel="noopener noreferrer nofollow">{{ part.value }}</a>
      <template v-else>{{ part.value }}</template>
    </template>
  </div>
</template>

<style scoped>

</style>
