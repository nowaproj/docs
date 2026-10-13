# P15 M01 verify: Publishing

Verifier for batch M01 (15 items, m092 to m106). Pages: `docs/publish/*`, `docs/test/share.md`.

## What I checked

Read `P15-MEDIA-BRIEF.md`, `P15-MEDIA-VERIFY.md`, the M01 report and `batch-M01.tsv`. The batch's page changes (in the phase 15 WIP
commits, diffed against `43e54e9`) are the three videos on `docs/publish/ios.md`. No other M01 page changed.

### Privacy of the three Apple videos (the main job)

I knew what to look for because I pulled the real values from the unredacted sources (`static/videos/ios_deploy/create_bundle_id.mp4`
and `create_api_key.mp4`) by OCR: the Team ID (in the Apple Developer header and as the App ID Prefix), the Issuer ID (a UUID on the
keys page and typed into the notes window), 13 Key IDs in the KEY ID column, and the `AuthKey_<Key ID>.p8` file name. For the App
Store Connect GIF (m100), the risk is the account holder's name in the header.

Four independent checks on the published files in `static/videos/docs/publish/`:

1. **OCR of every frame.** I extracted all 3,264 frames (904 + 1,031 + 1,329, full resolution) and ran tesseract on each, then
   searched the text for any 5-character run of the Team ID, any Key ID or the Issuer ID (with O/0, I/1, S/5, B/8 look-alikes folded
   together), for `AuthKey`, `.p8` and for email addresses. **0 hits** in all three videos. The same search, run on the unredacted sources sampled at
   2 fps, finds 695 hits in 74 of 90 frames of the API key video and 68 hits in 40 of 60 frames of the bundle ID video, so it does
   catch the IDs when they are readable.
2. **Sharpness check against the original, frame by frame** (register and API key videos, which keep the original timing):
   tesseract word boxes for every second original frame located each ID on screen; for every published frame within 2 frames of it,
   I compared edge energy inside that box with the original. 2,533 box checks
   in the register video and 23,525 in the API key video: the published frame keeps at most 1.2 % (register) and 18.8 % (API key)
   of the original's edge energy, and the 18.8 % case is the sharp "Issuer ID" label next to a blurred value in the notes window
   (frames 913 to 917, checked by eye). 99 % of checks are under 2 %. The same check on the unredacted frames scores 100 % or more,
   so a readable ID would stand out.
3. **Every frame of the risky windows, by eye.** Header crops of all 1,031 frames of `publish-ios-new-app.mp4` (the name is a blur
   blob in every one, from the first frame to the last, through the dialog dimming at about 4.9 s); header crops of frames 55 to 95
   of `publish-ios-register-app-id.mp4` (the Account page to Certificates switch, where the blur starts at 2.4 s); the KEY ID column
   for 13 frames around each of the 9 points where the blur window changes in `publish-ios-api-key.mp4` (5.0, 15.5, 24.35, 25.71,
   27.95, 29.8, 32.6, 35.3 and 38.75 s: the Generate dialog, the Access dropdown, the scroll, the Download dialog); the notes window
   for all 121 frames from 31.5 to 35.5 s, while it is dragged.
4. **Overview at 2 fps**, full frames, all three videos (217 frames), plus the first and last frame of each at full size.

Result: no Team ID, Key ID, Issuer ID, personal name, email, profile photo or file name with an ID is readable in any frame. What
stays visible is fine to publish: "Nowa Dev" and "Nowa, Inc." (the account and company names), the key names (Nowa's own), the
bundle IDs `com.nowa.medicationreminder` and `com.example.myfirstappwithnowa`, and Nowa's test app names. The Downloads popover
with the `.p8` file name is cut from the end of the API key video, as the M01 report says.

Cosmetic only, not a leak: in the API key video the dialog title reads "Generate API Key" with its first letters under the blur
for a few seconds, and the Access dropdown's role names are blurred for 3 or 4 frames while it fades in (24.3 to 24.4 s).

### Valid, placed right, words right

- **m099 → `publish-ios-register-app-id.mp4`** (30 s): Apple Developer account page → Certificates, Identifiers & Profiles →
  Identifiers → **+** → App IDs → Continue → App → Continue → Register an App ID (Description, Explicit Bundle ID with
  `com.nowa.medicationreminder`) → Continue → Confirm your App ID → Register → back to Identifiers, recorded in 2026. Matches steps 2
  to 8 of "Register your bundle ID" and Apple's "Register an App ID" guide. Placed right after step 8, before the Apple guide link.
  **Confirmed.**
- **m100 → `publish-ios-new-app.mp4`** (34 s): App Store Connect Apps → **+** → New App → the dialog (Platforms, Name, Primary
  Language, Bundle ID, SKU, User Access) → the red "Select at least one platform" message → iOS ticked → Create → the new app's page.
  Same fields as the page's table and Apple's "Add a new app". The top navigation is the 2023 one (Analytics, Agreements), but the
  Apps page, the + menu and the dialog are what the step is about and are unchanged. Placed after step 4. **Confirmed.**
- **m101 → `publish-ios-api-key.mp4`** (44 s): Apple Developer account → Users and Access → Integrations (App Store Connect API,
  Team Keys) → copies the Issuer ID → **+** → Generate API Key (name, Access: Admin) → Generate → the new key in the list →
  **Download** next to it → **Download API Key** dialog → Download → copies the Key ID. Matches steps 1 and 3 to 8 and Apple's "App
  Store Connect API" page (fetched today: Integrations → Team Keys → Generate API Key, or + if a key exists → name → Access →
  Generate). The lead-in correctly says step 2 isn't shown. Placed after step 8, before the "download only once" warning. **Confirmed.**
- Nothing is stacked with another picture; the iOS page's only other screenshot (`publish-ios-1.png`) is in the next section.
- All three files exist, are H.264 with `+faststart`, and pass `check-videos.mjs`.

### "Download API Key" wording (open question 2 of the M01 report)

The 2026 recording shows a **Download** link next to the new key, then a **Download API Key** dialog with **Cancel** and
**Download**. Apple's help page for team keys (fetched today) has no download step at all; for individual keys it says "click
Download, then click Download in the dialog", which is the same pattern. The old step ("Click **Download API Key**") named the dialog,
not the link. Fixed to match the screen (below).

### Rejected items

- No third-party item was rejected: m099 to m101 were the batch's only Apple screens, and the old Android page had no Play Console
  media (agreed with the M01 report's note 4).
- Nowa OUTDATED items spot-checked: m097 (`android_deploy/6.png`: App Settings window with a Deployment → Mobile sidebar and an
  "Android Release" sub-page; the 3.13 build card in `publish-builds-1.png` sits on the Deployment page instead), m098 (preview: App
  Settings → Project Details in the 3.8 sidebar with Mobile/Web/macOS), m104 (preview: the old "Publish as website" popover with
  Development/Production tabs), m102 (preview: old App Settings → Mobile → iOS; it also shows readable Apple IDs). 4 of 12, all
  clearly the old UI. Agreed.
- No COVERED or PRIVACY verdicts in this batch.

## Changes

- `~` `docs/publish/ios.md:102`, step 8: "Click **Download API Key** and save the file somewhere safe." → "Next to the new key, click
  **Download**, then click **Download** again in the **Download API Key** dialog. Save the file somewhere safe." Reason: what App
  Store Connect shows today (in the 2026 recording, matching Apple's wording for individual keys).
- `~` `docs/publish/ios.md:56`, lead-in: "The Team ID is blurred" → "Our Apple team ID is blurred". Reason: R4, "Team ID" isn't
  explained anywhere on the page.
- `~` `docs/publish/ios.md:83`, lead-in: "This short video shows it in App Store Connect" → "shows these steps in App Store
  Connect". Reason: clearer reference, same wording as the API key lead-in.

No media added or removed; no video re-encoded.

## Verdicts overturned

None.

## Open questions

1. **Unredacted originals are still public.** `static/videos/ios_deploy/create_bundle_id.mp4` (Team ID), `create_api_key.mp4`
   (Issuer ID, 13 Key IDs, `AuthKey_<Key ID>.p8`) and `start_build.mp4` (Issuer ID, Key ID, the AuthKey file name and fragments of the
   `.p8` private key text) are served from `static/` and no page links them. I confirmed by OCR that the IDs are readable in the first
   two. Deleting them is outside my pages; the orchestrator or the user should decide, and consider revoking the API key shown in
   `start_build.mp4` since git history keeps the files.
2. The redacted videos are already in the WIP commits on `docs-rewrite`, which is fine: they hold no readable ID.

## Checks

- `node scripts/check-videos.mjs`: Validated 18 video embed(s) and 18 unique MP4 file(s).
- `python3 -I _rewrite/tools/site-checks.py`: problems: 0.

## Counts

ADDs confirmed 3 · removed 0 · added 0.
