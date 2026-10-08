---
title: Test and ship with confidence
description: Use Instant Play, Run and real devices at the right moments, keep Problems clear, back up your work, keep big boards fast and work through a publish checklist.
sidebar_label: Test and ship tips
keywords: [testing, publish checklist, release checklist, launch, backup, Git, performance, big boards, Problems, instant play, run, device, bundle identifier, signing key, Google Play, web]
---

Shipping is calmer when you test in the right place at the right time and have a way back to a good version. These tips cover both, plus a checklist for the day you publish.

## Test in the right place

| Test with | When | What you get |
|---|---|---|
| **Play** ([Instant Play](../test/instant-play.md)) | While you design | An instant tap-through on the board. Close to the real app, not exact. |
| **Run** ([Run your app](../test/run.md)) | Before you share or publish | Your real app in a phone frame, updated on every save. |
| A phone or emulator ([Run on a device or emulator](../test/devices.md), desktop app) | Before you publish | The real app on the device. In a cloud project, **Open on Mobile** shows a QR code for your phone. |
| **Share preview** ([Share your app](../test/share.md)) | When you want feedback | A link and QR code to an Instant Play preview. Cloud projects only. |

If **Play** and **Run** disagree, **Run** is right. **Play** shows placeholders for maps and paywalls and simulates Firebase sign-in. Try ads and payments on a device or an emulator.

- **Start a flow at its first screen.** A screen with a route starts your app's router at that path, so navigation works in **Play**.
- **Share the whole app.** A link from a played screen ends with `?screen=` and opens on that screen. Delete that part and the preview starts the app from the beginning.
- **Try the unhappy paths:** a wrong password, a failed request, an empty list.

## Keep Problems clear

- The red number in the status bar counts errors. Click it to open **Problems**.
- **From Nowa (Instant)** checks as you edit. **From Code Analysis (Accurate)** runs `flutter analyze` on the whole app when you click **Run Code Check**. Run it before you publish: publishing to the web starts with a code check and stops on errors.
- Click **Fix** when a row has one. For the rest, click **Navigate**, or ask Nowa AI: "Check my project for problems and fix them."
- If something fails only in the running app, read the **Logs** tab.

See [Find and fix problems](../test/problems.md).

## Keep a way back

- **Auto save** is on by default, and every Nowa AI request ends with a save.
- **Checkpoints** undo Nowa AI requests. They are not a backup: they live in `.nowa/temp/`, which Git ignores.
- **Git** keeps your history. Commit before big changes and before you publish. Git needs a plan that includes Git integration. See [Use Git](../code/git.md).
- **Download your code** as a zip from code mode in a cloud project. See [Download your code](../publish/download-code.md).
- **A local project** lives only on your computer, and Nowa doesn't back it up. Use Git and GitHub. See [Work with local projects](../code/local-projects.md).
- **Supabase:** **Pull Backend Files**, in the **Supabase** panel's ⋮ menu, copies your migrations, edge functions and bucket list into the `supabase/` folder, so you can commit it. It needs recorded migrations, and table data isn't copied. See [Manage your Supabase backend](../integrations/supabase/backend.md).
- **Signing keys:** download your Android signing key and your iOS certificate key, and keep them safe. Without the Android key you can't release updates.

## Keep big boards fast

Big boards need no setup. Items in view build first, and only the item you hover, select or play animates. To help:

- **Zoom in on your work.** When more than 8 items are in or near view, the rest show as still pictures until you hover, select or play them. Select an item and press <kbd>F</kbd> to zoom to it.
- **Use several boards.** One board per flow keeps each one small.
- **Remove what you don't need.** **Remove** takes a screen off the board and keeps it in your project.
- If one item fails to draw, only it shows **This screen failed to render**. Fix the cause and click **Reload screen**. If a project freezes when it opens, choose **Open in safe mode** from its ⋮ menu on the dashboard. It skips the tabs from your last session.

See [Work with boards](../design/boards.md#big-boards-and-errors).

## Publish checklist

<Badge type="cloud" /> <Badge type="paid" />

Publishing needs a cloud project on a paid plan. Work through this list first.

| Check | Where |
|---|---|
| **App Name**, **Bundle Identifier** (replace the `com.example` start), **Build version**, **Build number** and **App Icon** are set. Choose the identifier before your first store upload. | **Settings** → **Project Details** |
| Permissions are on for what you use, such as camera or location. | **Settings** → **Permissions** |
| Test settings are off: Stripe uses live keys instead of test keys and Google Pay's `testEnv: true` is changed. AdMob **Show Test Ads** is off on every banner and ad call, with real unit IDs and both App IDs. Maps has a key for each platform you ship. | [Stripe](../integrations/stripe.md), [AdMob](../integrations/admob.md#before-you-publish), [Google Maps](../integrations/google-maps.md) |
| No server secret sits in **Constants** or request headers, RLS is on for every table, and the project is **Private**. | [Keep secrets out of your app](data-and-state-tips.md#keep-secrets-out-of-your-app) |
| **Problems** is clear, and you have used the real app on a device. | [Test in the right place](#test-in-the-right-place) |
| **Read the store rules** for each store you publish to: payments, sign-in, accounts and privacy. | [Follow Apple's rules](../publish/ios.md#store-rules), [Follow Google Play's rules](../publish/android.md#store-rules) |
| **Android:** **Debug mode** is off and the signing key is saved and downloaded. Then click **Build** and upload the `.aab` in Google Play Console. | [Publish to Google Play](../publish/android.md) |
| **iOS:** your bundle ID is registered, and your App Store Connect credentials and distribution certificate are saved. | [Publish to the App Store](../publish/ios.md) |
| **Web:** click **Deploy**, then **Deploy** on the **Web** row. A custom domain needs a higher plan. | [Publish to the web](../publish/web.md) |
| After launch: raise **Build number** for every store update, and **Redeploy** the website. | [Ship an update](../publish/index.md#ship-an-update) |

## Next steps

- [Build a complete app, start to finish](complete-app.md)
- [Troubleshooting](../troubleshooting/index.md)
