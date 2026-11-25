# nyves-nl — TODO Scan

Scan of `nostr://sebastix.dev/relay.ngit.dev/nyves-nl` at commit `65d322a` ("npm update"), branch `develop`, on 2026-11-17. 14 markers in 13 files.

## Relay handling

- [ ] `stores/nostr.js:226` — TODO: implement relay list loading — query kind 10002 events for the user's relay list, parse and store relay configuration. Function is currently a stub that only logs to the console.
- [ ] `components/profiel/Media.vue:20` — get read relay from the pubkey instead of the hardcoded relay list (wss://relay.damus.io, …)
- [ ] `components/profiel/FriendsGrid.vue:23` — get read relay from the pubkey instead of the hardcoded relay list

## Profile & media pages

- [ ] `components/profiel/Media.vue:29` — add NIP-71 video support: kinds 21, 22, 34235 and 34236 (currently only NIP-68 picture kind 20)
- [ ] `components/profiel/Media.vue:46` — add a composable to fetch media from notes (event kind 1s)
- [ ] `pages/profiel/[id]/media.vue:109` — check whether `item.tags[0][1]` value is a Blossom hash of a file (inside a `hidden` block)
- [ ] `pages/profiel/[id]/media.vue:120` — "TODO: categorize media with tabs" — user-visible heading in the UI
- [ ] `pages/profiel/[id]/wiewatwaar.vue:30` — fetch event kinds 1s
- [ ] `pages/profiel/[id]/index.vue:179` — `validate()` route middleware is an empty stub that returns `true`

## Payments / donations

- [ ] `components/modal/Invoice.vue:43` — set a listener for when a Lightning invoice has been paid
- [ ] `pages/doneer/index.vue:119` — bare `<!-- @todo -->` near the invoice-generation link (intent not written down)

## Homepage & misc

- [ ] `components/homepage/Statistics.vue:120` — how to compute this number using multiple relays as a source?
- [ ] `components/homepage/Statistics.vue:121` — get total active unique authors from last year
- [ ] `components/modal/NostrCreateProfile.vue:11` — "@todo - inloggen met je Google account" — user-visible text in the create-profile modal
- [ ] `.gitlab-ci.yml:53` — commented-out `deploy:prod-ssr` job: deploy the application with SSR / universal rendering for https://next.nyves.nl

## Notes

- Two of the above are user-visible: the tabs heading (`pages/profiel/[id]/media.vue:120`) and the Google-login todo string (`components/modal/NostrCreateProfile.vue:11`).
- Excluded as noise: `package-lock.json` (integrity hashes matching "XXX") and locale strings in `i18n/locales/*.json` containing words like "hacktivisten".
