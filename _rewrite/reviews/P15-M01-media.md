# P15 M01 media: Publishing (iOS, Android, web, share)

Batch: 15 items (m092 to m106). Pages owned: `docs/publish/*`, `docs/test/share.md`.

I looked at every image and every preview sheet. For the three Apple videos I also extracted frames at 1 to 30 fps to find every
readable ID, then checked the redacted outputs frame by frame around every scene change (dialogs fading in and out, the Access
dropdown, the scroll, and the dragged notes window).

## Items

| id | old page | what it shows (one line) | verdict | why (one line) | where added / what covers it |
|---|---|---|---|---|---|
| m092 | deployment/android-deploy.md | Nowa 3.8 App Settings on Project Details, with **Deployment → Mobile** highlighted in the sidebar | OUTDATED | 3.13 has no **Mobile** entry: Settings → **Deployment** opens one page with **Android**, **iOS** and **Web** tabs, and the General group is only Project Details, Packages, Constants | covered by `/img/docs/publish/publish-android-1.png` (android.md:72) |
| m093 | deployment/android-deploy.md | **Mobile Deployment** page with Android **Release** / **Debug** cards and an iOS **Release** card | OUTDATED | 3.13 replaces the Release/Debug cards with a **Debug mode** switch on the Android tab | publish-android-1.png |
| m094 | deployment/android-deploy.md | **Android Release** sub-page: Start New Build with "Missing configuration", History, empty **Signing Key** form (Keystore Password, Key Alias, Key Password, Key File, Browse, Generate, Save) | OUTDATED | Sub-page with back arrow and old sidebar is gone; in 3.13 the Signing Key card sits on the Android tab above Start New Build | publish-android-1.png |
| m095 | deployment/android-deploy.md | Android Release sub-page with **Build** and the saved **Signing Key** (check mark, download, Remove) | OUTDATED | Same old sub-page layout and sidebar (Mobile/Web/macOS) | publish-android-1.png |
| m096 | deployment/android-deploy.md | **Active Build** card, "Preparing" with Cancel, History "Just now" | OUTDATED | Old sub-page and sidebar; the 3.13 build card differs (Latest Build with Build Info, Steps, History) | `/img/docs/publish/publish-builds-1.png` (builds.md:51) |
| m097 | deployment/android-deploy.md | **Latest Build** card: Build Info, Artifacts (apk, aab, mapping.txt), Steps list | OUTDATED | Card is close to 3.13, but it sits in the removed App Settings → Mobile → Android Release sub-page | publish-builds-1.png (builds.md:51) |
| m098 | deployment/ios-deploy.md | Video (8 s): Nowa 3.8 App Settings → Project Details, copying **Bundle Identifier** into a notes window | OUTDATED | Field is the same, but the Settings sidebar is the 3.8 one (Permissions, Main, Platform Files, Git, Project Sync, Deployment → Mobile/Web/macOS) | current Settings: `/img/docs/account/account-project-settings-1.png` |
| m099 | deployment/ios-deploy.md | Video (30 s): Apple Developer account → Identifiers → **+** → App IDs → App → **Register an App ID** (Description, Explicit Bundle ID) → **Confirm your App ID** → **Register** | ADD | Apple's flow matches steps 2 to 8 of "Register your bundle ID" exactly (recorded in 2026). Team ID was readable in the header and App ID Prefix: blurred | ios.md:56-60, new file `/videos/docs/publish/publish-ios-register-app-id.mp4` |
| m100 | deployment/ios-deploy.md | GIF (37 s): App Store Connect **Apps** → **+** → **New App** dialog filled in (Platforms, Name, Primary Language, Bundle ID, SKU, User Access) → **Create** → the new app's page | ADD | Same dialog and fields as the page's table and Apple's "Add a new app" guide. A person's name in the account menu and the browser avatar were readable: browser bar cropped off, name blurred, old ASC home page cut | ios.md:83-87, new file `/videos/docs/publish/publish-ios-new-app.mp4` |
| m101 | deployment/ios-deploy.md | Video (45 s): Apple Developer → **Users and Access** → **Integrations** → **Team Keys** → **+** → **Generate API Key** (name, Access: Admin) → **Generate** → **Download API Key** dialog → Download → copy Key ID | ADD | Matches steps 1 and 3 to 8 of "Create an App Store Connect API key" (recorded in 2026). Issuer ID, all Key IDs, the values typed in the notes window and the downloaded `AuthKey_<KeyID>.p8` file name were readable: all blurred or cut | ios.md:104-108, new file `/videos/docs/publish/publish-ios-api-key.mp4` |
| m102 | deployment/ios-deploy.md | Video (39 s): Nowa 3.8 App Settings → Mobile → iOS, filling Key ID / Issuer ID, picking the `.p8`, Generate certificate, Build | OUTDATED | Old App Settings → Mobile → iOS Release sub-page; 3.13 uses the iOS tab of Deployment. Also shows readable Issuer ID, Key ID, the AuthKey file name and fragments of the `.p8` key text (see Open questions) | `/img/docs/publish/publish-ios-1.png` (ios.md, section "Save your App Store Connect credentials") |
| m103 | deployment/share.md | YouTube "Instant Preview Share \| Share Your App Without Build or Deploy" (ORa4ohpK4pQ) | OUTDATED | The old page already marked this feature deprecated; the video's frames show the Nowa 3.0 play toolbar above the phone and a **Publish** button, while 3.13 puts **Share preview** in the play controls at the bottom of the board | `/img/docs/test/test-share-1.png` (share.md:57) |
| m104 | deployment/web-deploy.mdx | Video (8 s): old **Publish as website** popover from the globe icon, Development / Production tabs, Publish, deploying dots | OUTDATED | 3.13 publishes from **Deploy** → Web or the **Web** tab of Deployment, one site with a **Your Website** card; no Development/Production tabs | `/img/docs/publish/publish-web-1.png` (web.md:24) |
| m105 | deployment/web-deploy.mdx | Video (2 s): same old popover, clicking the open icon, the preview.nowa.dev site opening in a browser tab | OUTDATED | Old popover and old `-development.preview.nowa.dev` address scheme | publish-web-1.png |
| m106 | deployment/web-deploy.mdx | App Settings → **Web**: "Publish as Website" with **Development Environment** and **Production Environment** cards | OUTDATED | 3.13 has one **Your Website** card (Published date, Expires In, address, Custom Domain, Download Files, Deactivate, Update); old sidebar (Android Build, iOS Build, Macos Build) | publish-web-1.png |

## Added

3 videos, all on `docs/publish/ios.md`, each after the last step of its task, with a one-line lead-in that also says what is
blurred.

New files (all H.264, yuv420p, `+faststart`, no audio):

- `static/videos/docs/publish/publish-ios-register-app-id.mp4` (30.1 s, 1670x1080, 670 KB), from
  `static/videos/ios_deploy/create_bundle_id.mp4`. Blurred: the "Nowa Dev / Nowa, Inc. - <Team ID>" line in the header from 2.4 s
  on, and the App ID Prefix (Team ID) value from 14.4 s to the end.
- `static/videos/docs/publish/publish-ios-new-app.mp4` (34.4 s, 1600x940, 700 KB), from the old-commit GIF
  `docs/deployment/img/add-app-ios.gif` (scratchpad copy). Converted from GIF to MP4, top 96 px (browser bar with the profile
  avatar) cropped, account name in the App Store Connect header blurred, first 2.6 s (old App Store Connect home page with
  the name in a different spot) cut. The GIF itself was not copied to `static/`.
- `static/videos/docs/publish/publish-ios-api-key.mp4` (44.3 s, 1670x1080, 1.4 MB), from
  `static/videos/ios_deploy/create_api_key.mp4`. Blurred: the Key ID column (window adjusted for the Generate dialog, the Access
  dropdown, the scroll and the Download dialog so the dialog text and role names stay sharp), the Issuer ID on the page, and the
  values in the notes window (which is dragged once, around 33 to 34 s). Last 0.9 s cut, where Safari's Downloads popover shows
  `AuthKey_<Key ID>.p8`.

The redaction script is in the scratchpad (`tools/redact.py`); it overlays crops of a blurred copy of the frame, with time windows.

Nothing copied from `old commit only` into `static/` unchanged. Nothing re-encoded in place.

## Routed

None. All items belong to M01 pages.

## Open questions

1. **Old files still served with readable Apple IDs.** These files are still in `static/` and so public, and no page links them
   any more (only `redirects.js`, the old build and research notes mention the folders):
   - `static/videos/ios_deploy/create_bundle_id.mp4` and `bundle_id.mp4`: Team ID (create_bundle_id) readable.
   - `static/videos/ios_deploy/create_api_key.mp4`: Issuer ID and 13 Key IDs readable, plus the AuthKey file name.
   - `static/videos/ios_deploy/start_build.mp4`: Issuer ID, Key ID, the AuthKey file name with a local path, and fragments of the
     `.p8` private key text around grey boxes.
   Deleting them (and maybe rotating the keys, and noting that git history keeps them) is the orchestrator's or the user's call.
   I didn't delete them.
2. **"Download API Key" wording.** Step 8 of "Create an App Store Connect API key" says to click **Download API Key**. In the
   video (recorded 2026) the row link reads **Download**, then a **Download API Key** dialog asks to confirm with **Download**.
   Apple's help page says "Download API Key link". I left the text as it is (the text wins and the two don't conflict much),
   but a writer may want "click **Download** next to the new key, then **Download** in the dialog".
3. **App Store Connect header in m100.** The GIF was recorded in 2023: its header reads Apps, Analytics, Trends, Reports, Users and
   Access, Agreements, where today's (seen in m101) reads Apps, Trends, Reports, Business, Users and Access. The **Apps** page,
   the **+** menu and the **New App** dialog are the same, which is what the step shows, so I added it.
4. The old video the user remembers for Google Play doesn't exist in this batch: the old Android page only had Nowa screenshots
   (all outdated). There is no old Play Console media to bring back.

## Checks

- `node scripts/check-videos.mjs`: "Validated 18 video embed(s) and 18 unique MP4 file(s)."
- `python3 -I _rewrite/tools/site-checks.py`: "problems: 0".

## Counts

ADD 3 · COVERED 0 · OUTDATED 12 · NOT USEFUL 0 · PRIVACY 0 (privacy issues in the 3 added videos were resolved by blurring;
m102 also shows secrets but is OUTDATED first).
