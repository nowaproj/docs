---
title: Publish to Google Play
description: Build a quick test version or a signed release of your app for Android in the cloud, then upload the release to Google Play.
sidebar_label: Android and Google Play
keywords: [android, google play, play store, apk, aab, app bundle, signing key, keystore, release, debug mode, sha-1, sha-256, fingerprint, build for android, play policies, data safety, rejected, store rules, privacy policy, account deletion, billing]
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
3. Pick a **Branch** and click **Build**. Leave the default unless you work with several branches. [Start a build](./builds.md#start-a-build) explains what a branch is and the build card.
4. When the build finishes, open **Latest Build**, click the `.apk` file under **Artifacts** to download it, then install it on an Android device.

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

- **SHA-1** and **SHA-256**: the key's fingerprints, each with a copy button. Services such as Google Sign-In ask for them. With Firebase, Nowa can add them for you: see [Add SHA fingerprints for Google sign-in on Android](../integrations/firebase/auth.md#sha-fingerprints). If you use Play App Signing, also add the fingerprints that Play Console lists on its app signing page. Android's [Sign your app](https://developer.android.com/studio/publish/app-signing) explains both keys.
- The download icon (**Download Signing Key**) saves the zip again.
- **Remove** asks "Are you sure?" before it deletes the key.

{/* CAPTURE: id=publish-android-1 | state: signed in, paid plan, cloud project with a saved Android signing key; Settings → Deployment → Android tab, Debug mode off | show: Debug mode switch, saved Signing Key card with SHA-1 and SHA-256 rows, download icon and Remove, and the Start New Build card | crop: Deployment page, Android tab */}

## Build a release

1. Make sure **Debug mode** is off.
2. In **Start New Build**, pick a **Branch** (the default is fine: see [what a branch is](./builds.md#start-a-build)) and click **Build**. The button stays off until the signing key is saved.
3. Wait for the build to finish.

Or click **Deploy** in the top bar, then **Deploy** on the **Android Release** row. It shows **Set up** until the key is saved.

## Download your files

When the build finishes, open **Latest Build** and click a file under **Artifacts** to download it. By default, a release build lists an app bundle (`.aab`) and an `.apk`.

- Upload the `.aab` to Google Play. [Android App Bundles](https://developer.android.com/guide/app-bundle) is the format Google Play uses.
- The `.apk` installs directly on a device, which is handy for trying the release build yourself.

## Upload to Google Play

Nowa doesn't upload to Google Play for you. When your release build is done, you finish in [Google Play Console](https://play.google.com/console):

1. Create your app there.
2. Add its listing details and promotional materials. Google's [Publish your app](https://developer.android.com/studio/publish) names screenshots, videos, graphics and text, and details such as the category and content rating. [Export as image](../design/select-and-edit.md#export-as-image) saves a screen from your board as a PNG or JPG.
3. Add the `.aab` to a release and publish it. Once it passes Google's review, your app is live.

Before you publish, read [Follow Google Play's rules](#store-rules). [Play Console Help](https://support.google.com/googleplay/android-developer) covers the store side in full.

## Follow Google Play's rules {#store-rules}

Read the [Google Play Developer Policy Center](https://play.google.com/about/developer-content-policy/) before you publish, and check [Google Play Policies](https://developer.android.com/distribute/play-policies) for upcoming deadlines. These parts match what you can build with Nowa:

- **Payments.** [Google Play's billing system](https://developer.android.com/google/play/billing) is "a service that enables you to sell digital products and content in your Android app", with one-time purchases or subscriptions. Read [Understanding Google Play's Payments policy](https://support.google.com/googleplay/android-developer/answer/10281818) too. See [Stripe or RevenueCat?](../integrations/index.md#stripe-or-revenuecat) for what each does in Nowa.
- **Data safety.** "The Play Console includes a Data safety form on the App content page. In this form, you explain to users which types of user data your app collects and shares." If a third-party SDK or library in your app collects or shares user data, "you must reflect this collection and sharing in the Data safety form". See [Declare your app's data use](https://developer.android.com/privacy-and-security/declare-data-use) and the [User Data policy](https://play.google.com/about/privacy-security-deception/user-data/).
- **Accounts.** Read [Understanding Google Play's app account deletion requirements](https://support.google.com/googleplay/android-developer/answer/13327111). The sign-up functions Nowa adds don't delete accounts.
- **Pre-review checks.** Play Console has "pre-review checks" that help you "identify issues early, like incomplete policy declarations or crashes, and avoid rejections". In December 2025, Google said it had expanded them "for privacy policy links, login credential requirements, data deletion request links, inaccuracies in your Data safety form, and more": see [Building a safer Android and Google Play, together](https://developer.android.com/blog/posts/building-a-safer-android-and-google-play-together).

## Release an update

1. Raise **Build number** in **Settings** → **Project Details**. Change **Build version** too when users should see a new version.
2. Build a release again with the same signing key.
3. Upload the new `.aab` in Google Play Console.

## Next steps

- [Build history and logs](./builds.md): follow a build and read its logs.
- [Publish to the App Store](./ios.md): ship the iOS version.
- [Download your code](./download-code.md): take the full Flutter source with you.
