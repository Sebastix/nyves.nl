/**
 * For debugging only fow now.
 */
export default defineNuxtRouteMiddleware((to, from) => {
  const router = useRouter()
  const localePath = useLocalePath()

  // A locale prefix combined with a *default locale* path does not exist, e.g.
  // /en/profiel/<id> (English uses /en/profile/<id>) or /en/zoek (-> /en/search).
  // nuxt-i18n only registers the localised path for each locale, so these would
  // 404. Resolve the unprefixed path to a route name and redirect to the
  // correctly localised path, so old bookmarks and hand-written links keep
  // working instead of showing a 404.
  const prefixed = to.path.match(/^\/([a-z]{2})\/(.+)$/)
  if (prefixed) {
    const [, , rest] = prefixed
    const resolved = router.resolve('/' + rest)
    if (resolved.name && resolved.matched.length > 0) {
      const localized = localePath(
        { name: resolved.name, params: resolved.params },
        prefixed[1]
      )
      if (localized && localized !== to.path) {
        return navigateTo(localized + to.hash, { redirectCode: 301 })
      }
    }
  }

  // Only handle profiel routes
  if (!to.path.startsWith('/profiel/')) {
    return
  }

  // Extract path segments
  const pathSegments = to.path.split('/').filter(Boolean)
  
  // Must have at least 2 segments: ['profiel', 'id']  
  if (pathSegments.length < 2) {
    return
  }

  const profileId = pathSegments[1]
  const subPath = pathSegments[2]


  // Handle vrienden subpath
  // if (subPath === 'vrienden') {
  //   // Validate that profileId looks like npub
  //   if (profileId.startsWith('npub1')) {
  //     // Let the pages/profiel/[id]/vrienden.vue handle this - no redirect needed
  //     return
  //   } else {
  //     // Invalid npub format for vrienden page
  //     console.log('Invalid npub format for vrienden:', profileId)
  //     throw createError({
  //       statusCode: 404,
  //       statusMessage: 'Invalid profile ID format voor vrienden pagina'
  //     })
  //   }
  // }

  // Handle main profile routes (no subpath)
  if (!subPath) {

    // Check if this looks like a username#pubkey format
    if (profileId.includes('#') || to.hash !== '') {
      console.log('username#pubkey format for migrated Hyves profile detected:', profileId, 'with pubkey', to.hash)
      // pages/profiel/[id]/index.vue handle this
      return
    }
    
    // Check if this is an npub
    if (profileId.startsWith('npub1')) {
      console.log('npub1 format detected:', profileId)
      // pages/profiel/[id]/index.vue handle this
      return
    }
    
    // Check if this is hex pubkey (64 chars)
    if (/^[a-fA-F0-9]{64}$/.test(profileId)) {
      console.log('Hex pubkey format detected:', profileId)
      // pages/profiel/[id]/index.vue handle this
      return
    }
    
    // Check if this is a username (no # or special format)
    if (profileId.match(/^[a-zA-Z0-9_-]+$/)) {
      console.log('Username format detected:', profileId)
      // pages/profiel/[id]/index.vue handle this
      return
    }
    
    // If we get here, the format is unrecognized
    console.log('Unrecognized profile ID format:', profileId)
    throw createError({
      statusCode: 404,
      statusMessage: 'Ongeldig profiel ID formaat'
    })
  }

})