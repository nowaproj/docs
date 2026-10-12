# Phase 14: items routed between batches

Items a section agent or verifier found for a page outside its batch, and what happened to each.

| # | From | Target page | Item | Status |
|---|---|---|---|---|
| 1 | B06 | `integrations/firebase/auth.md:28` (B09) | Links `notifications.md#set-up-notifications-for-iphone`, which doesn't exist on `notifications.md` mid-pass. | check after B09 and its verifier |
| 2 | B06 | `code/generated-code.md` (code page) | Circuit draws only expression statements, local variables, if/else, try/catch, while and return (`P14-B06-for-code.md` `#variables-and-functions`). | for the code page agent |
| 3 | B06 | `logic/circuit.md` (structure) | Page is ~2,980 words; writer proposes moving If, Try and loops to a "Make decisions and handle errors" page. | decide after B06 verification |
| 4 | B02 | `guides/ship-tips.md` (B01) | Drop the code-only `.nowa/temp/` folder from the Checkpoints bullet (same wording as ai-tips). | sent to B01 |
| 5 | B02 | `troubleshooting/known-issues.md` (B12) | P50: grey AI toolbar in the playground before sign-in; add only if the code confirms, check whether Enter still asks to sign in. | sent to B12 |
| 6 | B02 | `troubleshooting/known-issues.md` (B12) | P10: Attach text file in the web app. Not confirmed live, so not documented as a bug; `ai/context.md` offers pasting the text. | no action (unconfirmed) |
| 7 | B02 | `guides/ai-tips.md` (B01) | Optional link to `ai/prompting.md#when-the-result-isnt-right`. | sent to B01 |
| 8 | B05 | `guides/design-tips.md` (B01) | Replace the `MediaQuery.of(context).size.width` formula with Visibility + width condition / Nowa AI, link `design/responsive.md#show-different-widgets-on-wide-and-narrow-screens`. | sent to B01 |
| 9 | B05 | `guides/design-tips.md` (B01) | Optional: the app starts in the Active theme each time; ask Nowa AI to remember the choice. | sent to B01 |
| 10 | B05 | `integrations/firebase/auth.md` (B09) | Same broken anchor as #1. | see #1 |
| 11 | B11 | `troubleshooting/known-issues.md` (B12) | P9 code download keeps spinning (web), P17 pending custom domain can't be removed: entries with workarounds. | sent to B12 |
| 12 | B11 | `code/generated-code.md#publishing` (code page) | Developer facts at the end of `P14-B11-for-code.md`; ios.md promises how to export a Mac certificate's key as text there. | for the code page agent |
| 13 | B11 | `integrations/firebase/notifications.md` (B09) | Link the Push Notifications capability step to `publish/ios.md` (register the bundle ID, enable capabilities). | sent to B09 |
| 14 | B11 | `publish/ios.md`, `publish/android.md` (structure) | ~2,930 and ~2,290 words; writer proposes moving "Set up your Apple account" to `publish/apple-account.md`. | decide after B11 verification |
| 15 | B04 | `guides/design-tips.md` (B01) | "snake_case" → "lowercase with underscores" (or drop). | sent to B01 |
| 16 | B04 | `reference/glossary.md` (B14) | Five entries: Constraints, Group, Instance, Row/Column/Stack, Fixed/Auto/Expand. | sent to B14 |
| 17 | B04 | `troubleshooting/known-issues.md` (B12) | Expand inside a Wrap (P14) only if a live run confirms the error; layout.md already says to use Fixed or Auto in a Wrap. | no action (unconfirmed live) |
| 18 | B04 | `design/layout.md` (structure) | ~2,080 words; stack sections could become their own page. | decide after B04 verification |
| 19 | B03 | `troubleshooting/known-issues.md` (B12) | New UX flag: double-click on the board doesn't work (and the board toolbar hides); turn the flag off. | sent to B12 |
| 20 | B03 | `get-started/create-account.md` (B01) | Optional Terms and Privacy Policy links after the terms checkbox. | sent to B01 verifier |
| 21 | B03 | `ai/index.md` (B02) | Optional link to `account/plans-and-usage.md#what-your-plan-includes`. | sent to B02 verifier |
| 22 | B01 | `code/local-projects.md` (B15) | Local projects still need an internet connection (old docs promised offline work). | sent to B15 |
| 23 | B01 | `troubleshooting/index.md` (B12) | Starting the desktop app offline may open the sign-in page instead of No Internet Connection (code reading, hedged). | sent to B12 |
| 24 | B01 | `guides/complete-app.md` (structure) | ~2,300 words; writer proposes two parts. | decide after B01 verification |
| 25 | B03 | product team | The load packages switch's description is out of date (3.13: it only gates Nowa AI adding packages). New UX flag breaks double-click. | for the report (product copy and bug) |
| 26 | B10 | `integrations/google-sign-in.md` (B08) | Supabase bullet: turn on Google as a provider, link `supabase/auth.md#google`. | sent to B08 |
| 27 | B10 | `guides/complete-app.md`, `guides/data-and-state-tips.md` (B01) | Email confirmation pointer (`supabase/auth.md#confirm-email`); link to `supabase/database.md#create-a-table`. | sent to B01 verifier |
| 28 | B10 | `integrations/stripe.md` (B09) | Link to `supabase/database.md#create-a-table` from the table bullet. | sent to B09 |
| 29 | B10 | `troubleshooting/known-issues.md` (B12) | "Supabase tables don't load with Use Keys" (anon key no longer gets the schema since April 2026). Not seen live. | hold until B10 verifier confirms the source |
| 30 | B10 | product team | Supabase is moving away from the anon key; Nowa 3.13 accepts only the anon key with Use Keys. Create/Update Record templates may send empty id/created_at (not seen live). | for the report |
| 31 | B10 | `integrations/supabase/database.md` (structure) | ~2,300 words; split proposal in notes. | decide after B10 verification |
| 32 | B13 | `design/fonts-icons.md` (B05) | Fill/weight/grade/optical size have no visible effect on the Material icons in the picker; Text Direction flips direction-aware icons. | sent to B05 verifier |
| 33 | B13 | `design/properties.md` (B04) | Text Align has no Default (four buttons); use Overflow as the example. | sent to B04 verifier |
| 34 | B13 | `logic/events.md` (B06) | Optional: what On Hover does. | sent to B06 verifier |
| 35 | B13 | `reference/wrappers.md` (B14) | Optional: a Container wrapper's fill sits behind the widget, so it can't tint a picture; use the Image's Color and Blendmode. | sent to B14 |
| 36 | B13 | `reference/widgets/*` (structure) | index ~2,650, media ~2,500, lists ~2,250 words. | decide after B13 verification |
| 37 | B12 | `get-started/desktop-app.md` (B01) | The Android emulator row is only reachable while the Android toolchain is missing; don't say "add it later". | sent to B01 verifier |
| 38 | B12 | `integrations/firebase/firestore.md` (B09) | Windows: click Run (embedded web preview) or use an emulator or phone. | sent to B09 |
| 39 | B12 | `code/local-projects.md` or `code/vs-code.md` (B15) | Optional: run on your own iPhone with Xcode signing (local projects). | sent to B15 verifier |
| 40 | B12 | product team | Setup wizard's Android emulator row unreachable once the Android toolchain is installed, though the caption says you can add it later. | for product-issues.md and the report |
