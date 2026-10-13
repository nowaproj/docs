# P15 M09 verify: Firebase, Stripe, Nowa AI

Verifier for batch M09 (29 items: m001-m016, m047-m054, m216-m220). I didn't do this batch. Inputs: `P15-MEDIA-BRIEF.md`, `P15-M09-media.md`, `batch-M09.tsv`. The M09 edits were already in the WIP commits (`git diff` was empty for these pages), so I checked the pages and files as they are now.

## What I checked

- **Both ADDs** (m002, m218), image by image, against the page text, the 3.13 captures and `/home/user/nowa-master`.
- **The m220 replacement** (`static/img/docs/integrations/stripe-supabase-tables.png`): I viewed the crop and the top strip of the original to confirm what was cut away.
- **Every third-party or privacy item:** m001, m217, m218, m220 (images), m047, m048, m049, m216 (YouTube thumbnails), m053, m054 (phone notifications; md5 checked).
- **Nowa OUTDATED items, spot-checked:** m005, m007, m012 (sheets), m015, m016 (images), m051 (sheet). That's 6 of 20. All reasons are specific, and I agree with each one.
- **COVERED items:** m052 (sheet against `integrations-firebase-notifications-1.png`), m053 and m054 (identical md5 to the files on `notifications.md:105,107`), m219 (`map-fields.png` against `integrations-stripe-2.png`).

## m002: `/img/ai/prompt2.png` on `docs/ai/prompting.md:138`

**Is it from an old version?** Yes. It comes from the old `exampleprompts.mdx` (Nowa 3.1 era), from before Design mode existed. But it shows no editor at all. It's the app's output only: a stopwatch screen inside a realistic iPhone frame with a notch. There's no Nowa label, panel or button for a reader to act on, so it can't contradict the 3.13 interface.

- **The frame.** The frame still exists in 3.13. The designer's play mode uses `DevicePreviewStore` with `defaultDevice: Devices.ios.iPhone13` and `frame.DeviceFrame` (`packages/designer/lib/src/play_mode/play_mode.dart:169,791`). The board itself shows screens without a frame (`design-boards-2.png`), and the old 3.1 board didn't have one either (m012 sheet). The Run preview's **Phone** frame is a plain rounded border (`nowa_run_play_mode.dart`, `DeviceFrameWrapper`). So the image looks like a preview, not the board.
- **The content.** It matches the prompt above it point by point: turquoise icon, "Stopwatch" title, 00:00:00 in large digits, blue rounded Start button. The text around it hedges ("One possible result", and the tip "results vary"), and the next paragraph correctly says the Start button won't run the timer yet.
- **Privacy.** Nothing personal is visible.
- **Verdict: confirmed.** I changed the alt text to say the result is "shown in a phone frame", so it doesn't suggest that's how the board looks.

## m218: Supabase products table on `docs/integrations/stripe.md:95`

**Problem.** The batch's crop showed all seven columns, including `amount` (int4, nullable) next to `price`. The image sits right under the step "set **Amount Field** to the column with the price", and Nowa's tooltip for Amount Field reads "The column containing the payment amount" (`stripe_settings.dart:367-373`). A reader who sees a column literally named `amount` is likely to pick it. That column holds something else (in this coin-market sample, probably a coin quantity). Nowa sends that value × 100 to Stripe (`stripe_edge_functions.dart:99,124`), so the wrong pick charges the wrong amount. Only the alt text said "Amount Field is price", and sighted readers don't see alt text. The full table also showed a `type` column that 3.13 doesn't use (only ID, Amount and Currency are mapped), and it had no currency column, while step 3 offers **From Column**.

**Fix.** I kept the image, because it's a third-party screen the user asked for. I re-cropped it from `static/img/stripe/product-table.png` (`crop=3010:1006:119:254`, scaled to 1600x535) so it shows only the header and the `id`, `name`, `description` and `price` rows. The `type`, `amount` and `image_url` rows and the "7 columns" footer are gone. The browser bar with the project ref is still cut off. I rewrote the alt text to match.

**Privacy.** No project ref and no URL. The avatar at the top right is Supabase's generic icon. The org "Nowa" and the project "coin_market-backend" are not personal.

## m220: replaced `stripe-supabase-tables.png` on `stripe.md:126`

- **Crop.** I viewed the top 420 px of the original, where the URL `supabase.com/dashboard/project/pnodyjunz…` sits at about y=200. The crop starts at y=254, so the whole browser bar (tab, URL, the profile initial "Z", extensions) is gone. The crop starts at Supabase's own top bar, and the avatar there is the generic icon.
- **Alt text.** The image shows the Database Tables list with `nowa_stripe_consumable_payments`, `nowa_stripe_one_time_payments`, `products`, `profiles` and `purchases`. The alt text ("listing the nowa_stripe_one_time_payments and nowa_stripe_consumable_payments tables created by Deploy Configuration") is true and names the tables that matter.
- **Placement.** Right after the paragraph that asks you to confirm the tables in the dashboard. Fine.
- **Verdict: confirmed.**

## Rejected items re-checked

- **m001 PRIVACY: confirmed.** "Emma Wilson" and `emma.wilson@gmail.com` are readable, and the tiles show `[label]` placeholders.
- **m217 PRIVACY: confirmed.** The Publishable Key field shows `sb_publishable_fzl6TZuBdQ2mFKaF0wxDdQ_3OXWth…` in full. It's also a v3.7.1 editor (credits row, old App Settings list with a Deployment group, status bar error).
- **m047, m048, m049, m216 OUTDATED: confirmed.** These are Nowa's own YouTube videos, not third-party screens. m047 and m049 have title-card thumbnails from the to-do and shoe-shop series, m048 shows the old editor with the Files tree, and m216 is the "Dev Diary 3.7" release video. None of them is a 3.13 how-to.
- **m051 OUTDATED: confirmed.** v3.0-beta App Settings, with Permissions and Git under General, a Deployment group, and no Providers row.
- **m052 COVERED: confirmed.** It's the same Test Push Notifications box as `integrations-firebase-notifications-1.png`.
- **m053, m054 COVERED: confirmed.** Byte-identical to `firebase-notification-ios.png` and `firebase-notification-android.png`, already on the page.
- **m219 COVERED: confirmed.** `integrations-stripe-2.png` shows the same Business Table and Map Fields area in 3.13.
- **m005, m007, m012, m015, m016 OUTDATED: confirmed.** Every frame has the 3.1 chat field (paperclip and think toggle) and the credits row. In m012 and m007 the dialogs themselves are close to 3.13, but the brief says a video is valid only if every frame is.

## Changes

- `~` `static/img/docs/integrations/stripe-supabase-products-table.png`: re-cropped to the header and the `id` to `price` rows (1600x535, was 1600x813), so the confusing `amount` column and the unused `type` column are gone.
- `~` `docs/integrations/stripe.md:95`: alt text rewritten to match the crop ("The first columns of a products table … id (uuid, primary key), name, description and price (float8). For this table, ID Field is id and Amount Field is price.").
- `~` `docs/ai/prompting.md:138`: alt text now says the result is "shown in a phone frame".

No verdicts overturned. No items added or removed.

## Checks

- `node scripts/check-videos.mjs`: "Validated 15 video embed(s) and 15 unique MP4 file(s)." (M09 added no videos.)
- `python3 -I _rewrite/tools/site-checks.py`: "problems: 0".

## Open questions

1. **Old originals still served (same as the batch's question 1).** `static/img/stripe/product-table.png` and `supabase-tables.png` (Supabase project ref in the URL bar) and `enable-stripe.png` (publishable key) are still in `static/`. No page under `docs/` or `src/` references them, `docs/legacy/` included (grep). The orchestrator can delete or crop them.
2. **m002 isn't a 3.13 Design-mode output.** It comes from the 3.1 AI. It's labelled "One possible result", so I kept it. If the orchestrator wants only 3.13-generated results, swap it for a fresh capture of the same prompt.
3. **Text gap (same as the batch's question 2).** `docs/ai/chat.md` doesn't mention the "AI has been working for a while now" banner.

## Counts (M09)

- ADDs confirmed: 2 (m002 with an alt tweak; m218 re-cropped, with new alt text)
- ADDs removed: 0
- Items added: 0
