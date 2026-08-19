/**
 * For debugging only fow now.
 */
export default defineNuxtRouteMiddleware((to, from) => {
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
  const subPath = pathSegments[2] // Could be 'vrienden' or undefined

  console.log('Profile routing middleware:', { 
    path: to.path, 
    profileId, 
    subPath,
    pathSegments 
  })

  // Handle vrienden subpath
  if (subPath === 'vrienden') {
    console.log('Routing to vrienden page for:', profileId)
    
    // Validate that profileId looks like npub
    if (profileId.startsWith('npub1')) {
      // Let the [id]/vrienden.vue handle this - no redirect needed
      return
    } else {
      // Invalid npub format for vrienden page
      console.log('Invalid npub format for vrienden:', profileId)
      throw createError({
        statusCode: 404,
        statusMessage: 'Invalid profile ID format voor vrienden pagina'
      })
    }
  }

  // Handle main profile routes (no subpath)
  if (!subPath) {
    console.log('Main profile route for:', profileId)
    
    // Check if this looks like a username#pubkey format
    if (profileId.includes('#')) {
      console.log('Legacy username#pubkey format detected:', profileId)
      // Let [username].vue handle this via redirect to [id].vue
      return
    }
    
    // Check if this is an npub
    if (profileId.startsWith('npub1')) {
      console.log('NPub format detected:', profileId)
      // Let [id].vue handle this
      return
    }
    
    // Check if this is hex pubkey (64 chars)
    if (/^[a-fA-F0-9]{64}$/.test(profileId)) {
      console.log('Hex pubkey format detected:', profileId)
      // Let [id].vue handle this
      return
    }
    
    // Check if this is a username (no # or special format)
    if (profileId.match(/^[a-zA-Z0-9_-]+$/)) {
      console.log('Username format detected:', profileId)
      // This should go to [username].vue, but we need to ensure routing
      return
    }
    
    // If we get here, the format is unrecognized
    console.log('Unrecognized profile ID format:', profileId)
    throw createError({
      statusCode: 404,
      statusMessage: 'Ongeldig profiel ID formaat'
    })
  }

  // Handle other subpaths (future routes like /profiel/npub.../posts, etc.)
  //console.log('Unknown subpath for profile:', subPath)
  //return
})