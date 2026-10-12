# P14-B08 verification log (verifier P14-B08-V)

Batch: `docs/integrations/` `index.md`, `show-data.md`, `constants.md`, `deep-links.md`, `google-maps.md`,
`google-sign-in.md`, `admob.md`, `revenuecat.md`, `rest-api/index.md`, `rest-api/import.md`.
Product code: `/home/user/nowa-master` 3.13.0+1 (`3cb32031c`). Code refs are relative to that root. Third-party pages
fetched 2026-10-12.

## Summary

(in progress)

## Anchors (coordinator request, done first)

The trial build reported `guides/ship-tips.md` → `/integrations/admob#before-you-publish` broken: the pass renamed
"Before you publish" to "Before and after you publish". Fixed with `## Before and after you publish {#before-you-publish}`.

Checked every batch page for anchors that existed on `origin/main` and are gone now (script comparing heading slugs and
explicit IDs, old vs new). Three more, none with inbound links in `docs/`, `src/`, `sidebars.js`,
`docusaurus.config.js` or the product's docs URLs, kept anyway because the live site carries them:

| Page | Old anchor | Now |
|---|---|---|
| `admob.md` | `#before-you-publish` | `## Before and after you publish {#before-you-publish}` (inbound: `guides/ship-tips.md:67`) |
| `revenuecat.md` | `#turn-on-revenuecat` | `## Turn on RevenueCat and add your keys {#turn-on-revenuecat}` |
| `revenuecat.md` | `#call-revenuecat-from-logic` | `## Use purchases in your logic {#call-revenuecat-from-logic}` |
| `google-sign-in.md` | `#add-your-client-ids` | `## Add your client IDs in Nowa {#add-your-client-ids}` |

No page links to the new slugs those headings had in the section pass. Re-run after the edits: no `origin/main` anchor
is missing on any batch page.

