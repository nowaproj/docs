---
title: Publish to Google Play
description: Build a quick test version or a signed release of your app for Android in the cloud, then upload the release to Google Play.
sidebar_label: Google Play
keywords: [android, google play, play store, apk, aab, app bundle, signing key, keystore, release, debug mode, sha-1, sha-256, fingerprint, build for android]
---

Nowa builds your Android app in the cloud. Test with a quick unsigned build, then make a signed release for Google Play. Nowa hands you the files, and you upload them in Google Play Console.

<Badge type="cloud" /> <Badge type="paid" />

## Before you start

- Use a cloud project on a paid plan.
- Set your app details first: **App Name**, **Bundle Identifier**, **Build version**, **Build number** and **App Icon**. See [Check your app details](./index.md#app-details). Nowa uses the **Bundle Identifier** as your Android package name.
- For a release, have a Google Play developer account. Sign in to [Google Play Console](https://play.google.com/console).

## Test on a device

Debug builds are for quick tests. They are unsigned, so you can build one without a key.

1. Click **Settings** → **Deployment** and open the **Android** tab.
2. Turn on **Debug mode**. Its note reads "Unsigned builds for quick testing on devices. Turn off for store-ready release builds."
3. Pick a **Branch** and click **Build**. [Build history and logs](./builds.md) explains the build card.
4. When the build finishes, click the `.apk` file under **Artifacts** to download it, then install it on an Android device.

You can also click **Deploy** in the top bar, then **Deploy** on the **Android Debug** row. To test without a cloud build, [run your app](../test/run.md) instead.

## Create a signing key

Google Play needs a release that is signed with your key. Turn **Debug mode** off to see the **Signing Key** card. A warning icon on it means no key is saved yet. Hover over the icon to read **Missing signing key**.

### Let Nowa generate a key

1. Click **Generate** in the **Signing Key** card.
2. In the **Important!** dialog, click **Download** and save `android_signing_key.zip` somewhere safe. It holds `keystore.jks` and `key_info.txt`, which lists the key alias and both passwords.

### Use a key you already have

1. Enter your **Keystore Password**, **Key Alias** and **Key Password**.
2. Click **Browse** next to **Key File** and pick your `.jks` or `.keystore` file.
3. Click **Save**.

:::warning[Keep your signing key safe]
If you lose this key, you can't release new updates for your app. Download it, store it somewhere safe and keep a backup. **Remove** deletes the key from Nowa and can't be undone.
:::

Once a key is saved, the icon turns into a check mark (hover to read **Signing key saved**), and the card shows these controls:

- **SHA-1** and **SHA-256**: the key's fingerprints, each with a copy button. Services such as Google Sign-In ask for them. With Firebase, add them as described in [Sign users in with Firebase](../integrations/firebase/auth.md). If Google Play re-signs your app with its own key (Play App Signing), also add the fingerprints that [Play Console shows](https://support.google.com/googleplay/android-developer/answer/9842756).
- The download icon (**Download Signing Key**) saves the zip again.
- **Remove** asks "Are you sure?" before it deletes the key.

{/* CAPTURE: id=publish-android-1 | state: signed in, paid plan, cloud project with a saved Android signing key; Settings → Deployment → Android tab, Debug mode off | show: Debug mode switch, saved Signing Key card with SHA-1 and SHA-256 rows, download icon and Remove, and the Start New Build card | crop: Deployment page, Android tab */}

## Build a release

1. Make sure **Debug mode** is off.
2. In **Start New Build**, pick a **Branch** and click **Build**. The button stays off until the signing key is saved.
3. Wait for the build to finish.

Or click **Deploy** in the top bar, then **Deploy** on the **Android Release** row. It shows **Set up** until the key is saved.

## Download your files

When the build finishes, open **Latest Build** and click a file under **Artifacts** to download it. A release build lists an app bundle (`.aab`) and an `.apk`.

- Upload the `.aab` to Google Play. [Android App Bundles](https://developer.android.com/guide/app-bundle) is the format Google Play uses.
- The `.apk` installs directly on a device, which is handy for trying the release build yourself.

## Upload to Google Play

Nowa doesn't upload to Google Play for you. In [Google Play Console](https://play.google.com/console), create your app and add the `.aab` to a release. Google's help covers the store side: [Create and set up your app](https://support.google.com/googleplay/android-developer/answer/9859152) and [Prepare and roll out a release](https://support.google.com/googleplay/android-developer/answer/9859348).

## Release an update

1. Raise **Build number** in **Settings** → **Project Details**. Change **Build version** too when users should see a new version.
2. Build a release again with the same signing key.
3. Upload the new `.aab` in Google Play Console.

## Next steps

- [Build history and logs](./builds.md): follow a build and read its logs.
- [Publish to the App Store](./ios.md): ship the iOS version.
- [Download your code](./download-code.md): take the full Flutter source with you.
