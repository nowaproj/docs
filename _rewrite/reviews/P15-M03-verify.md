# P15 M03 verify: Desktop app, local projects, devices

I read `P15-MEDIA-BRIEF.md`, `P15-MEDIA-VERIFY.md`, the batch report `P15-M03-media.md` and `batch-M03.tsv` (36 items).
The batch's changes are already in the WIP commits: two images on `docs/get-started/desktop-app.md`, plus the two crops
`static/img/nowadesktop/autosetup/local-setup-panel.png` and `android-toolchain.png`. Code refs are relative to
`/home/user/nowa-master` (3.13.0).

## ADDs

### m149: `/img/nowadesktop/autosetup/local-setup-panel.png` at desktop-app.md:64

- **Valid:** a crop of `autosetup/1.png` with the settings sidebar removed (its Plan / AI Usage / Credits are now Billing /
  Usage, so removing it was right). Every label in the crop matches `packages/core/lib/src/settings/editor_settings/local_setup.dart`
  exactly: header **Environment** with the computer icon and close X (`name => 'Environment'`, l.69), **Automatic setup**
  (l.130), "Let Nowa download and configure Flutter and the Android toolchain for you." (l.133), **Set up automatically**
  (l.143), **Flutter SDK Path** with its info icon (l.182, `helperData`), **Default Projects Path** (l.210), **VS code
  Path** (l.223), and **Browse** on each row (`fields/path_field.dart:130`). The sidebar tab is still **Local Setup**
  (`account_editor_settings.dart:33`). The `/usr/local/bin` VS Code default isn't personal.
- **Place:** right after step 2 ("Under **Editor Settings**, click **Local Setup**."). No other picture of this page exists
  in the docs (`account-account-settings-1` shows Account Details), so not COVERED.
- **Words:** alt text is accurate. The page's own text says the page is titled **Environment**, which the image confirms.
- **Privacy:** nothing personal. **File:** exists.

### m154: `/img/nowadesktop/autosetup/android-toolchain.png` at desktop-app.md:90 (now re-cropped)

- **Valid:** labels match `packages/core/lib/src/environment/environment_setup_dialog.dart`: **Set up local environment**
  (l.313), stepper **Flutter** / **Verify** (l.409-410; the Android screen shows the Verify header, l.328), consent text
  (l.782) and links **Android SDK Terms**, **Flutter license**, **Temurin JDK license**, **Privacy** (l.796-799),
  **Android toolchain** / **Not installed** (l.959), **Android emulator** with "Install the Android toolchain first" (l.98)
  and a disabled Install, **Back**, and **Skip for now** (l.709, shown while the toolchain is missing).
- **P159 check:** the two rows don't contradict the page: they show exactly the state the page describes (toolchain
  missing, emulator Install locked until the toolchain is in). But the M03 crop kept the dialog's caption, which reads "The
  emulator (~1.5 GB) is optional too. You can add these later from Settings → Environment." (l.546-548). That is the
  misleading string in product issue P159, and it contradicts step 7's note that the emulator has to be installed in the
  same go because this screen only opens while the toolchain is missing. **Fixed:** I re-cropped from the original
  `autosetup/6.png` (`crop=1060:590:508:574`) so the image starts at the license checkbox and leaves out the caption, title
  and stepper. Nothing the reader acts on was lost: the checkbox, both rows, Back and Skip for now are still there.
- **Place:** inside step 7, right after the step text. But the page's existing `get-started-desktop-app-2.png` (Flutter
  step) sat after step 8, three lines below, so the two images were nearly stacked and out of order (step 7's picture
  above step 2's). **Fixed:** I moved `get-started-desktop-app-2.png` up into the list, after step 4 (Install), which is what
  it shows (Install location, ticked licence box, Install). The images now follow the steps and are separated.
- **Words:** dropped "on the Verify step" from the alt text, since the stepper is no longer in the crop.
- **Privacy:** nothing personal. **File:** exists, 1060 × 590.

## Rejected items

- **Third-party:** m123 (Gmail welcome email), m124 (Google consent screen), m162 (Windows folder picker).
  - m123 PRIVACY confirmed: readable verify-account token in the link, and the addressee's first name. The link flow is
    also outdated: 3.13 confirms the email with a 6-digit code.
  - m124 PRIVACY confirmed: the name and email are only lightly blurred, and "G… T…" is guessable, especially next to m163's
    `gellert234`. The screen is Google's familiar Sign in with Google consent layout, so it would be valid for
    create-account.md ("Sign up with Google" step 1) once the values are fully hidden. I made a version with solid boxes
    over the account chip, name and email (`<scratchpad>/media/verify/google-consent.png`) and tried to add it to
    create-account.md (M04's page). The permission system refused writing it into `static/`, so I didn't add it. See open
    questions.
  - m162 NOT USEFUL confirmed: the OS folder picker, in Hungarian, opened from the removed Create Local Project dialog.
- **PRIVACY:** m153 confirmed ("Ziad's iPhone" in the Devices list, plus `locale en-JO` in the flutter doctor line). m163
  confirmed (path `C:\Users\gellert234\...`). Both screens are outdated or not added anyway.
- **COVERED:** m121 (email sign-up form) → `get-started-create-account-1.png` shows the current form. m150 (Flutter step) →
  `get-started-desktop-app-2.png` shows the same step in 3.13. Both confirmed.
- **NOT USEFUL:** m151 and m152 (progress and spinner states) confirmed. m155 (the Android screen after install, with Ready ·
  Virtual device ready) confirmed: it would stack with m154, and it also shows the P159 caption.
- **Nowa OUTDATED, spot-checked 11 of 24:** m120, m127, m148, m157, m158, m159, m161, m167, m169, m171 and m173. All
  confirmed:
  - m120: WELCOME BACK / Sign in / Forget password? against 3.13's **Welcome back!** and **Forgot Password?** (`lib/auth/auth_view.dart:286,351`).
  - m127, m158, m173: the 3.0.4 dashboard with Cloud Projects / Local Projects / New Cloud Project.
  - m148: **Download for Desktop** with a Macos/Windows flyout against 3.13's Download Desktop App dialog.
  - m157: the Environment page with no Automatic setup box, and the old Plan / AI Credits sidebar.
  - m159, m161: **Create Local Project** isn't in the 3.13 code.
  - m167: the BETA editor with Build settings.
  - m169, m171: the card ⋮ → Sync… menu and the Project Sync modal over the v3.1 dashboard. In 3.13 it's a settings page
    with Linked Project (`project_sync_settings.dart`). The Sync Warning dialog still exists, but every frame shows the old
    dashboard.

## Changes

- `~` `static/img/nowadesktop/autosetup/android-toolchain.png`: re-cropped to leave out the caption with the P159 claim "You
  can add these later from Settings → Environment" (and the title and stepper above it).
- `~` desktop-app.md:90 alt text: removed "on the Verify step" to match the new crop.
- `~` desktop-app.md: moved the existing `get-started-desktop-app-2.png` from after step 8 to after step 4 (the step it
  shows), so it no longer sits just under the step 7 image, out of order.

No verdicts overturned.

## Checks

`node scripts/check-videos.mjs`: 15 embeds OK. `python3 -I _rewrite/tools/site-checks.py`: problems: 0.

## Open questions

- **m124** (for the orchestrator): add the fully redacted Google consent screen to `docs/get-started/create-account.md`?
  Proposed placement: step 1 of "Sign up with Google" becomes "...and pick your Google account. If Google asks, click
  **Continue** to let Nowa see your name, email address and profile picture.", followed by the indented image
  `/img/signup/google/consent.png` with this alt text: "Google's Sign in to Nowa window: the account you picked on the
  left, and on the right the name, profile picture and email address Google shares with Nowa (hidden here), with Cancel
  and the highlighted Continue button below." The source file is `<scratchpad>/media/verify/google-consent.png`. I
  couldn't confirm from a primary source that Google's current wording is still "Google will allow Nowa to access this
  info about you". The layout and the Cancel / Continue buttons are the familiar ones.
- **m153** could serve step 6 if "Ziad's iPhone" were blurred, but steps 4 and 7 now have pictures, so a step 6 image
  would stack. Not added.
