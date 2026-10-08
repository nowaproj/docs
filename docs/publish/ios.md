---
title: Publish to the App Store
description: Save your Apple credentials once, then build and sign your iOS app in the cloud and send it to App Store Connect.
sidebar_label: iOS and App Store
keywords: [ios, iphone, app store, apple, testflight, app store connect, api key, distribution certificate, certificate, signing, code signing, p12, p8, ipa, bundle id, build for ios, provisioning, app review, review guidelines, rejected, store rules, privacy policy, account deletion, in-app purchase]
---

Nowa builds and signs your iOS app in the cloud, so you don't build on your own computer. You give Nowa two things: an App Store Connect API key from Apple and a distribution certificate key (Nowa can generate one for you). Nowa then sends the build to your App Store Connect account.

<Badge type="cloud" /> <Badge type="paid" />

## Before you start

- Use a cloud project on a paid plan.
- Set your app details, above all the **Bundle Identifier**. See [Check your app details](./index.md#app-details).
- Join the Apple Developer Program. [Enroll on Apple's site](https://developer.apple.com/programs/enroll/).

## Set up your Apple account

You do these three things on Apple's side. Apple's own guides cover the clicks:

- **Register your bundle ID** in your Apple Developer account. It must match the **Bundle Identifier** in Nowa exactly. See [Apple Developer Account Help](https://developer.apple.com/help/account/).
- **Create your app** in [App Store Connect](https://appstoreconnect.apple.com/) with that bundle ID.
- **Create an App Store Connect API key** so Nowa can send builds for you. Note its **Key ID** and **Issuer ID**, and download the `.p8` private key file. Apple lets you download it only once. See [Creating API keys](https://developer.apple.com/documentation/appstoreconnectapi/creating-api-keys-for-app-store-connect-api).

## Save your App Store Connect credentials

1. Click **Settings** → **Deployment** and open the **iOS** tab. The **Distribution Certificate** card holds an **App Store Connect** section with a warning icon. Hover over it to read **Missing App Store Connect credentials**.
2. Enter your **Key ID** and **Issuer ID**.
3. Next to **Private Key File**, click **Browse** and pick your `.p8` file. You can also paste the key text into the field.
4. Click **Save**. The icon turns into a check mark (hover to read **App Store Connect credentials saved**).

{/* CAPTURE: id=publish-ios-1 | state: signed in, paid plan, cloud project with no iOS credentials yet; Settings → Deployment → iOS tab | show: Distribution Certificate card with Generate, Certificate Private Key + Browse + Save, and the App Store Connect section with Key ID, Issuer ID, Private Key File | crop: Deployment page, iOS tab */}

Nowa saves your **Bundle Identifier** together with these credentials. If you change the identifier later, click the pencil (**Change credentials**) and **Save** again so Nowa picks up the new one. The X (**Discard changes**) closes the form without saving.

## Add a distribution certificate {#apple-distribution-certificate}

A distribution certificate is Apple's proof that an app comes from you. Nowa signs every iOS build with it, using the certificate's private key. You give Nowa that key in one of two ways. If a build failed at **iOS code signing**, start with [the troubleshooting steps](#if-the-ios-code-signing-step-fails) at the end of this page.

### Let Nowa generate a key

1. In the **Distribution Certificate** card, click **Generate**. A warning icon means no key is saved yet (**Missing distribution certificate**).
2. Read the **Important!** warning. Apple allows only three active certificates at a time. If you have already used three, the build fails. Reusing a certificate is best. If you need a new one anyway, revoke an existing one in your Apple Developer account first, which breaks any builds that use the revoked one. Click **Generate anyways** to go on, or **Cancel**.
3. In the next **Important!** dialog, click **Download** and save `ios_distribution_certificate_key.p12` somewhere safe. If you lose it, you can't sign other iOS apps and you have to generate a new one.

### Use a key you already have

1. Click **Browse** next to **Certificate Private Key** and pick the key file for your Apple Distribution certificate. The file picker lists `.p12` files.
2. Click **Save**.

Nowa reads this file as plain text, so use a key file in the same format as the one you get when you click **Generate**. Nowa recommends reusing an existing certificate when you can.

### Manage the saved key

Once a key is saved, the card shows a check mark (hover to read **Distribution certificate saved**). The download icon (**Download Certificate**) saves the key file again. **Remove** asks "Are you sure?" and then deletes Nowa's copy of the key. To remove the certificate itself, revoke it in your Apple Developer account.

## Build and send to App Store Connect

1. In **Start New Build**, pick a **Branch** and click **Build**. Leave the default unless you work with several branches: [Start a build](./builds.md#start-a-build) explains what a branch is. The button stays off until both the certificate and the App Store Connect credentials are saved.
2. Follow the build. It signs your app in the **iOS code signing** step, builds the `.ipa` and ends with a **Publishing** stage that uploads it to App Store Connect. [Build history and logs](./builds.md) explains the build card.
3. When the build finishes, check your app in App Store Connect. By default, the `.ipa` is also listed under **Artifacts**.

You can also click **Deploy** in the top bar, then **Deploy** on the **iOS** row. It shows **Set up** until everything above is saved.

By default, Nowa's part ends at the upload. [After the upload](#after-the-upload) says what comes next in App Store Connect.

To send a new build, raise **Build number** in **Settings** → **Project Details** (and **Build version** for a new release), then build again.

## After the upload

Once the build is uploaded, you carry on in [App Store Connect](https://appstoreconnect.apple.com/):

1. Wait for Apple to process the build. It appears in App Store Connect when processing is done, and Apple emails you. See [Upload builds](https://developer.apple.com/help/app-store-connect/manage-builds/upload-builds).
2. To try the app with testers first, use TestFlight. See [TestFlight overview](https://developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview).
3. To release the app, fill in the information Apple requires for it, choose the build for your app version and submit it for review. See [Required, localizable, and editable properties](https://developer.apple.com/help/app-store-connect/reference/app-information/required-localizable-and-editable-properties) and [Submit an app](https://developer.apple.com/help/app-store-connect/manage-submissions-to-app-review/submit-an-app).

Before you submit for review, read [Follow Apple's rules](#store-rules). Apple's [App Store Connect Help](https://developer.apple.com/help/app-store-connect/) covers the rest.

## Follow Apple's rules {#store-rules}

Read Apple's [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) before you submit. These parts match what you can build with Nowa:

- **Payments.** [3.1.1 In-App Purchase](https://developer.apple.com/app-store/review/guidelines/#in-app-purchase) says "you must use in-app purchase" to unlock features or functionality, for example with subscriptions, in-game currencies or access to premium content. [3.1.3 Other Purchase Methods](https://developer.apple.com/app-store/review/guidelines/#other-purchase-methods) lists apps that "may use purchase methods other than in-app purchase". See [Stripe or RevenueCat?](../integrations/index.md#stripe-or-revenuecat).
- **Google sign-in.** [4.8 Login Services](https://developer.apple.com/app-store/review/guidelines/#login-services) names Google Sign-In as an example of a third-party or social login service. An app that uses one to set up or authenticate the user's primary account "must also offer as an equivalent option another login service" with the features Apple lists, unless an exception applies.
- **Accounts.** [5.1.1(v)](https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage): "If your app supports account creation, you must also offer account deletion within the app." The sign-up functions Nowa adds don't delete accounts. Apple's [Offering account deletion in your app](https://developer.apple.com/help/app-review/guideline-reference/5-1-1-account-deletion) has the details.
- **Privacy.** [5.1.1(i)](https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage): "All apps must include a link to their privacy policy in the App Store Connect metadata field and within the app in an easily accessible manner." For the link inside your app, use the [`openUrl` action](../logic/actions.md#open-a-link). [App privacy details on the App Store](https://developer.apple.com/app-store/app-privacy-details/) covers what you provide in App Store Connect, including for third-party code.
- **Demo account.** Apple's [Before You Submit](https://developer.apple.com/app-store/review/guidelines/#before-you-submit) list asks for "an active demo account or fully-featured demo mode" if your app includes account-based features.

## If the iOS code signing step fails

Open the failed step under **Steps** in the build and read its log. Apple's limit of three active certificates is one known cause. Click **Explain with AI** to send the failure to Nowa AI, or **Documentation** to come back to this page.

## Next steps

- [Build history and logs](./builds.md): start builds, follow them and read their logs.
- [Publish to Google Play](./android.md): ship the Android version.
- [Get ready to publish](./index.md): the Deploy menu and your app details.
