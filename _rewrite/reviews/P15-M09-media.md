# P15 M09 media review: Firebase, Stripe, Nowa AI

Batch: 29 items (m001-m016, m047-m054, m216-m220). Pages: `docs/integrations/firebase/*`, `docs/integrations/stripe.md`, `docs/ai/*`.

I looked at every image, every video's 8-frame sheet and every YouTube thumbnail. Each Nowa screen was checked against the 3.13 captures and against `/home/user/nowa-master`.

## Items

| id | old page | what it shows (one line) | verdict | why (one line) | where added / what covers it |
|---|---|---|---|---|---|
| m001 | ai/exampleprompts.mdx | Result of the profile-screen prompt: dark profile with "Emma Wilson", emma.wilson@gmail.com, grid tiles reading `[label]` | PRIVACY | A readable full name and a real-looking gmail address (AI demo data, but the address could belong to someone). The result is also weak: the tiles show `[label]` placeholders instead of the labels the prompt asked for | - |
| m002 | ai/exampleprompts.mdx | Result of the stopwatch prompt: turquoise icon, "Stopwatch", 00:00:00 card, blue Start button, in a phone frame | ADD | App output with no Nowa chrome, matches the prompt on the page line by line | `docs/ai/prompting.md:138`, after the stopwatch prompt |
| m003 | ai/howtouseai.mdx | Opening the AI Assistant from the sidebar (v3.1.0) | OUTDATED | The chat field has the paperclip and think toggle, with no mode or thinking-level chip and no Supabase/Figma icons. A credits row shows under the header | Covered anyway by `ai-index-1.png` (`docs/ai/index.md`) |
| m004 | ai/howtouseai.mdx | Session Details popup, then Account Settings → AI Usage with Credits Overview and Usage History (v3.1.0) | OUTDATED | 3.13's account window lists Account Details, Billing and Usage (see `account-account-settings-1`), and the usage page shows Plan Usage Limits / Extra AI Usage instead of Credits Overview. The editor chat field is the old one too | - |
| m005 | ai/howtouseai.mdx | Think toggle on: "Make button yellow" with the Thinking process expanded (v3.1.2) | OUTDATED | The Think Mode toggle was removed. 3.13 has the Instant / Thinking / Deep Thinking chip (`modes.md` says so in a note) | - |
| m006 | ai/howtouseai.mdx | Think toggle off: "Make button green" (v3.1.2) | OUTDATED | Same as m005 | - |
| m007 | ai/howtouseai.mdx | ⋮ → Custom Instructions popup, type, Save, "Custom instructions saved successfully" (v3.1.0) | OUTDATED | The popup is close to 3.13, but every frame shows the old chat field and the old empty-chat screen | Covered by `ai-prompting-1.png` (`docs/ai/prompting.md`) |
| m008 | ai/howtouseai.mdx | Clicking widgets in the Outline adds a selection chip to the chat field (v3.1.0) | OUTDATED | Old chat field (paperclip, think toggle), and the chip sits in an older layout | - |
| m009 | ai/howtouseai.mdx | Paperclip → "Search attachments…" palette → pick HomePage (v3.1.0) | OUTDATED | In 3.13 it's **+** (**Add context**) with the hint "Search screens, components, files…" and UPLOAD / FROM YOUR APP sections | Covered by `ai-context-1.png` |
| m010 | ai/howtouseai.mdx | Paperclip → Attach image → Windows file picker → image.png chip (v3.1.0) | OUTDATED | Same old palette and paperclip as m009 | Covered by `ai-context-1.png` |
| m011 | ai/howtouseai.mdx | Paperclip → Attach text file → test.txt chip (v3.1.0) | OUTDATED | Same as m010 | Covered by `ai-context-1.png` |
| m012 | ai/howtouseai.mdx | Restore Checkpoint → "Undo Last Request?" → Continue, then Reapply (v3.1.0) | OUTDATED | The dialog matches 3.13, but every frame shows the old chat field and header | Covered by `ai-undo-1.png` and `ai-undo-2.png` |
| m013 | ai/howtouseai.mdx | + (New Session) clears the chat to the old welcome screen (v3.1.0) | OUTDATED | Old empty-chat screen and chat field, with no mode chips | - |
| m014 | ai/howtouseai.mdx | ⋮ → Chat History → All Sessions → open a session (v3.1.0) | OUTDATED | The All Sessions list is similar, but the frames show the old chat field and header | - |
| m015 | ai/howtouseai.mdx | "AI has been working for a while now" banner in a v3.1.0 editor | OUTDATED | The banner still exists in 3.13 (`packages/ai/lib/src/ui/content_views.dart:531`), but the screenshot shows the old chat field (paperclip, think toggle) and the old credits row | - (see Open questions) |
| m016 | ai/howtouseai.mdx | Red banner "This session has exceeded the token context window. Please start a new session" (v3.1.2) | OUTDATED | 3.13 shows a **Session Limit Reached** card for this error (`content_views.dart:437`), which `undo-and-history.md` describes. The editor is old too | - |
| m047 | firebase/firebase-connect.md | YouTube "Setting up Firebase project, Build To-Do App..." (title card thumbnail) | OUTDATED | The to-do series was recorded on an older Nowa. Connecting now goes through Settings → Integrations → Firebase with Connect Apps | - |
| m048 | firebase/firebase-email-auth.md | YouTube "Firebase Email Auth, Build Authentication for a Flutter To-Do app" (old editor in thumbnail) | OUTDATED | To-do series, older editor in the thumbnail. Providers are now added through Add Provider / Available Providers | - |
| m049 | firebase/firestore.md | YouTube "Firestore Full Tutorial, Build a Flutter e-commerce app..." | OUTDATED | It builds collections and queries from the Files panel, which 3.13 no longer has in the designer (`firestore.md` explains the AI workaround) | - |
| m050 | firebase/known-issues/firebase-windows.md | Query editor covered by "Testing Firestore Queries isn't possible on Windows version" (v2.0.6) | OUTDATED | v2.0.6 editor with the Files panel and its firebase folder, which 3.13 no longer shows. A small avatar photo is visible top right. It belongs on the known-issues page anyway | - |
| m051 | firebase/notification.md | App Settings → Firebase → turn on Push Notifications (FCM), Test Push Notifications box (v3.0 beta) | OUTDATED | The v3.0 App Settings list has a Deployment group and Permissions/Git under General, which 3.13 doesn't (see `account-project-settings-1`). The Firebase page lacks the Providers row, and the 3.13 Add Missing Dependencies dialog isn't shown | Covered by `integrations-firebase-notifications-1.png` |
| m052 | firebase/notification.md | Typing a title and text and clicking Send Test Notification (v3.0 beta) | COVERED | The test box labels match 3.13, and the page already shows that box | `integrations-firebase-notifications-1.png` (`notifications.md`, Turn on push notifications) |
| m053 | firebase/notification.md | Test notification on an iPhone | COVERED | The same file (identical md5) is already on the page | `/img/docs/integrations/firebase-notification-ios.png` (`notifications.md`, What a notification looks like) |
| m054 | firebase/notification.md | Test notification on an Android phone | COVERED | Same file (identical md5) already on the page | `/img/docs/integrations/firebase-notification-android.png` |
| m216 | payments/stripe/stripe-integration.md | YouTube "Nowa 3.7, Stripe Payments, Experimental UI & Support Update!" | OUTDATED | A 3.7 dev-diary release video that also covers other features. It isn't a how-to, and its title names an older Nowa | - |
| m217 | payments/stripe/stripe-integration.md | v3.7.1 App Settings → Stripe with Enabled circled | PRIVACY | The Publishable Key field shows a readable key value (`sb_publishable_fzl6...`, which is in fact a Supabase publishable key). The status bar and the old chat field are also outdated | Covered by `integrations-stripe-1.png` |
| m218 | payments/stripe/stripe-integration.md | Supabase dashboard, products table columns (id uuid, name, description, price float8, type, amount, image_url) | ADD (cropped) | Third-party screen that shows what the table needs (ID and price columns). The original shows the Supabase project ref in the browser URL and a browser profile initial, so I cropped the browser bar off | `docs/integrations/stripe.md:95`, under Connect your table step 2. New file `/img/docs/integrations/stripe-supabase-products-table.png` |
| m219 | payments/stripe/stripe-integration.md | v3.7.1 App Settings → Stripe, Business Table / Map Fields / Deploy Configuration | COVERED | The old editor is around it, and the page already shows the same section from 3.13 | `integrations-stripe-2.png` (`stripe.md`, Deploy the configuration) |
| m220 | payments/stripe/stripe-integration.md | Supabase Database Tables listing nowa_stripe_consumable_payments, nowa_stripe_one_time_payments, products, profiles, purchases | PRIVACY (fixed on the page) | The page already used a byte-identical copy (`/img/docs/integrations/stripe-supabase-tables.png`) that shows the Supabase project ref `pnodyjunz...` in the browser URL. I replaced that copy in place with a crop without the browser bar. The page line and alt text are unchanged | `docs/integrations/stripe.md:126` (existing line, now cropped image) |

## Added

2 items added:

- m002: `docs/ai/prompting.md:138`, references `/img/ai/prompt2.png` where it already lives (in repo, not moved).
- m218: `docs/integrations/stripe.md:95`. **New file** `static/img/docs/integrations/stripe-supabase-products-table.png`: `static/img/stripe/product-table.png` cropped to `3010x1530+119+254` (removes the browser tab bar, the URL with the project ref and the profile icon) and resized to 1600 px wide.

File changes beyond that:

- **Replaced in place:** `static/img/docs/integrations/stripe-supabase-tables.png` (m220's copy, already on `stripe.md`). Same crop and resize from `static/img/stripe/supabase-tables.png`, to remove the readable Supabase project ref. It's now 1600x813 (was 3248x1938).
- No videos added, cut or re-encoded.

Checks: `node scripts/check-videos.mjs` gives "Validated 10 video embed(s) and 10 unique MP4 file(s)". `python3 -I _rewrite/tools/site-checks.py` gives "problems: 0".

## Routed

None. m050 belongs to `docs/troubleshooting/known-issues.md#firebase-on-windows`, but it's OUTDATED, so there's nothing to place.

## Open questions

1. **Old files still served with the project ref.** `static/img/stripe/product-table.png` and `static/img/stripe/supabase-tables.png` are still in `static/` and served live, with the Supabase project ref readable in the URL bar. `static/img/stripe/enable-stripe.png` shows a readable publishable key. I didn't touch them because the new docs don't reference them (only old-docs/legacy paths might). The orchestrator may want to crop or delete them, or check whether `docs/legacy/` references them.
2. **Text gap, not media.** 3.13 still shows an "AI has been working for a while now" banner with a **Continue with the request** button, which sends "continue with your last task" (`packages/ai/lib/src/ui/content_views.dart:503-540`). `docs/ai/chat.md` doesn't mention it. A one-line bullet under "Recover from errors" would cover it. The old screenshot (m015) can't be used because the editor around it is outdated.
3. m218's table has a column named `amount` besides `price`. The alt text says Amount Field is `price`, matching the step text and `integrations-stripe-2.png`. If that still reads as confusing, drop the image.

## Counts

- ADD: 2 (m002, m218)
- COVERED: 4 (m052, m053, m054, m219)
- OUTDATED: 20 (m003-m016, m047-m051, m216)
- NOT USEFUL: 0
- PRIVACY: 3 (m001, m217, m220)
