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
