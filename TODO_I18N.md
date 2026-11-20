# TODO — i18n coverage for `components/`

Branch: `feat/i18n-components` (worktree `/home/sebastix/Transporter/Sebastix.nl/nyves-i18n`)
Locales: `i18n/locales/nl.json` (default) + `i18n/locales/en.json`

Legend: `[ ]` todo · `[x]` done

---

## Phase 0 — Baseline fixes (blocks everything else)

- [x] Add missing locale keys that components already reference (were rendering as raw keys):
  - [x] `Blog` (used in `Footer.vue`)
  - [x] `HVSbackup` (used in `Footer.vue`)
  - [x] `Nostr`, `relays` (used in `homepage/Hero.vue`)
  - [x] `Soapbox`, `Ditto` (used in `homepage/SoapboxCollab.vue`)
- [x] Remove 2 stray keys in `en.json` (Dutch sentences at lines 20-21, left over from `doneer` nesting)
- [x] Remove unused keys from both locales: `head_title`, `welcome`, `of_bekijk_dit_voorbeeld`
- [x] Verify nl/en key parity with a script (must be 0 diff)

## Phase 1 — Shared `common` namespace

- [x] Add `common.*` keys (no_items, loading, load_more, previous, next, page, reply, comments, code, home)
- [x] `Footer.vue` → `Code`, `HVSbackup`
- [x] `Header.vue` → `Home`

## Phase 2 — Profile components (`components/profiel/*`)

- [x] `ProfileHeader.vue` → Over, Vrienden, WWW, Foto's, Blog, Meer
- [x] `ProfileAbout.vue` → Profiel, Naam:, Hyver sinds, Mijn merken:, Spots:, Website:, Bekijk volledig profiel
- [x] `Media.vue` → Foto's & video's, Gespot! (n), Geen items gevonden, Bekijk alle foto's en video's
- [x] `FriendsGrid.vue` → Vrienden (n), Bekijk alle vrienden
- [x] `Krabbels.vue` → Geen items gevonden, Reageer
- [x] `Blog.vue` → Geen items gevonden
- [x] `WieWatWaars.vue` → Geen items gevonden, "0 reactie(s) Reageer", "0 Nyvers respecteren dit"
- [x] `ProfilePicture.vue` → Gespot! (n)

## Phase 3 — Search + relay status

- [x] `Search.vue` → (meer beschikbaar), Pagina n, n profielen gevonden voor, Vorige, Volgende, Laden..., Meer laden, Geen profielen gevonden voor, Helaas geen profielen gevonden
- [x] `Search.vue` → use `localePath('zoek')` instead of hardcoded `/zoek`
- [x] `RelayHealthCheck.vue` → ~33 strings (labels, headings, tooltips, limitations list)
- [x] `composables/useRelayHealth.js` → returned status texts (`Verbonden`, `Verbinding maken...`, `Verbinding gefaald`, `Niet verbonden`, `uitstekend/goed/redelijk/traag`) must go through i18n
- [x] `nostr-components/RelayPoolStatus.vue` → tooltip `n verbonden relays`
- [x] `modal/RelayConnections.vue` → `n verbonden relays`
- [x] `composables/useNostrSearch.js` → hardcoded error message

## Phase 4 — Homepage sections (`components/homepage/*`)

- [x] `Hero.vue` → hardcoded `/zoek` link, `toLocaleString('nl-NL')`
- [x] `SoapboxCollab.vue` → heading "We doen het niet alleen", taglines "Taking back the internet." / "Your content. Your vibe. Your rules."
- [x] `Statistics.vue` → Statistieken, 2 questions, 9 content labels, 2 profile labels + `toLocaleString('nl-NL')` x4
- [x] `BuildInPublic.vue` → 27 strings (headings, cards, bullets, footer text)
- [x] `SidnFondsSupport.vue` → badge, body, links, blockquote, attribution
- [x] `AOSCollectiveSupport.vue` → donation sentence, AOS blockquote (EN), Divine sentence
- [x] `ProtocolsNotPlatforms.vue` → both card titles, both subtitles, both body paragraphs
- [x] `InternetArchiveEurope.vue` → heading + body paragraph
- [x] `BringBackHyvesVideo.vue` → 20-segment transcript, Play video / Pause
- [x] `SebastixHVSbackup.vue` → heading (component currently unused by any page)

## Phase 5 — Modals (`components/modal/*`)

- [x] `NostrConnect.vue` → 16 strings (mixed NL/EN) + 2 `alert()` messages
- [x] `EventJson.vue` → header, Copy JSON, View on njump
- [x] `Invoice.vue` → `2100 sats` (reuse `doneer.bitcoin`)
- [x] `NostrCreateProfile.vue` → heading (component currently unused)

## Phase 6 — Article components (`components/nostr-components/*`)

- [x] `Articles.vue` → Error Loading Articles, Geen artikelen gevonden, 3 "No articles found…" variants, Zoek opnieuw
- [x] `ArticleCard.vue` → relative dates (Today/Yesterday/N days/months/years ago), "n min read", "by"
- [x] `composables/useNostrArticles.js` → `'Untitled Article'` fallback

## Phase 7 — Locale-aware formatting

- [x] `composables/useDateHelpers.js` → `nl-NL` hardcoded; follow active locale
- [x] `ArticleCard.vue` → `en-US` hardcoded
- [x] `RelayHealthCheck.vue` → `nl-NL` time formatting
- [x] `RelayPoolStatus.vue` / `Statistics.vue` / `Hero.vue` → `toLocaleString('nl-NL')`

## Phase 3b — Extras found during the work

- [x] `LanguageSelect.vue` → `aria-label` via `common.language`
- [x] `RelayHealthCheck.vue` → NIP-11/45/50 feature labels
- [x] `EventJson.vue` → copy confirmation uses `common.copied`
- [x] `NostrConnect.vue` → `connected_as` status line + locale-aware `toLocaleString`
- [x] `useNostrArticles.js` → `articles.untitled` fallback

## Phase 8 — Verification

- [x] `npx nuxt prepare` succeeds
- [x] `npm run build` — fixed, see below.
- [x] Script check: every `$t('…')` key exists in both locales
- [x] Script check: nl/en parity, no duplicate keys
- [ ] Manual smoke test of `/`, `/zoek`, `/over-nyves`, `/profiel/[id]`, modal flows

## Phase 9 — Nitro build failure (pre-existing, now fixed)

Commit `65d322a` ("npm update") bumped `nuxt` 4.6.1 → 4.6.4, which ships
`@nuxt/nitro-server` 4.6.2+. That release resolves `imports: false` when
`experimental.nitroAutoImports` is off — and with `future.compatibilityVersion: 5`
the option now defaults to `false`. The auto-import presets get stripped, so the
virtual `#imports` module has no exports at all.

`@nuxtjs/i18n`'s server runtime does `import { useRuntimeConfig } from '#imports'`,
hence:

```
RollupError: node_modules/@nuxtjs/i18n/dist/runtime/shared/utils.js (1:9):
"useRuntimeConfig" is not exported by "virtual:#imports"
```

Fix: set `experimental: { nitroAutoImports: true }` in `nuxt.config.js`.
Verified that this single flag flips the build from failing to passing, and that a
production build serves `/` and `/en` with translated strings and locale-aware
links.

- [x] Confirmed failure reproduces on a clean `develop` worktree
- [x] Bisected to nuxt 4.6.1 (ok) → 4.6.2 (fails) via `@nuxt/nitro-server`
- [x] Applied `experimental.nitroAutoImports: true`
- [x] `npm run build` succeeds, `node .output/server/index.mjs` serves 200 for `/` and `/en`
- [x] Headless Chromium check: EN page renders `Search profiles...`,
      `0 connected relays`, `An initiative of`, `href="/en/search"`
