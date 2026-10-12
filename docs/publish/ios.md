---
title: Publish to the App Store
description: Set up your Apple account step by step, save your Apple keys in Nowa once, then build and sign your iOS app in the cloud and send it to App Store Connect.
sidebar_label: iOS and App Store
keywords: [ios, iphone, app store, apple, testflight, app store connect, apple developer program, enroll, api key, team key, issuer id, key id, users and access, integrations, distribution certificate, certificate, signing, code signing, p12, p8, ipa, bundle id, bundle identifier, app id, identifiers, certificates identifiers and profiles, sku, new app, build for ios, provisioning, export compliance, missing compliance, revoke certificate, app review, review guidelines, rejected, store rules, privacy policy, account deletion, in-app purchase]
---

Nowa builds and signs your iOS app in the cloud, so you don't need your own Mac to publish it. You set your app up on Apple's side once and give Nowa two keys from your Apple account. From then on, every build goes straight to App Store Connect, ready for testing and review.

<Badge type="cloud" /> <Badge type="paid" />

Here's the whole journey at a glance:

1. Join the Apple Developer Program.
2. Register your app's bundle ID with Apple.
3. Create your app in App Store Connect.
4. Create an App Store Connect API key, so Nowa can work with your Apple account.
5. Save that key and a distribution certificate in Nowa.
6. Build, then test and submit your app in App Store Connect.

Steps 1 to 4 happen on Apple's websites. Most of it is a one-time job: the same membership, API key and certificate work for all your apps.

## Before you start

- Use a cloud project on a paid plan.
- Set your app details in Nowa, above all the **Bundle Identifier**. See [Check your app details](./index.md#app-details).
- Keep a note open while you work. You'll copy a few IDs from Apple's sites into Nowa, and it helps to have them in one place.

Your **Bundle Identifier** is your app's bundle ID: its unique name in Apple's systems, written like a reversed web address, such as `com.yourcompany.yourapp`. Choose it with care. Once you upload your first build to App Store Connect, Apple doesn't let you change it.

## Set up your Apple account

If you share an Apple team with other people, some of these steps need the Account Holder or an Admin. Each step says which.

### Join the Apple Developer Program

Publishing on the App Store needs a membership in the Apple Developer Program. It has a yearly fee, shown on [Apple's enrollment page](https://developer.apple.com/programs/enroll/).

1. Sign in with your Apple Account, or create one. Turn on two-factor authentication, and use your legal first and last name: a nickname or company name delays Apple's approval.
2. On the enrollment page, click **Start your enrollment** and enroll as an individual or as an organization. An organization also needs a D-U-N-S Number (a business identification number) and a public website on its own domain.
3. Once Apple has verified your details, agree to the Apple Developer Program License Agreement and complete the purchase.

### Register your bundle ID

Apple needs to know your bundle ID before you can create your app or sign it. You register it once, as an App ID, in your developer account. This needs the Account Holder or Admin role.

1. In Nowa, click **Settings** → **Project Details** and copy your **Bundle Identifier**.
2. Sign in to your [Apple Developer account](https://developer.apple.com/account) and open **Certificates, Identifiers & Profiles**.
3. Click **Identifiers** in the sidebar, then the add button (**+**).
4. Select **App IDs** and click **Continue**. Keep **App** as the type and click **Continue** again.
5. In **Description**, enter a name you'll recognize, such as your app's name.
6. Select **Explicit App ID** and paste your bundle identifier into **Bundle ID**. It has to match Nowa letter for letter.
7. Under **Capabilities**, tick the Apple features your app uses, such as push notifications or Apple Pay. **In-App Purchase** is already on. Not sure? Leave the rest off. You can turn capabilities on later: select the App ID, click **Edit**, then **Save**.
8. Click **Continue**, check the details and click **Register**.

Apple's guide: [Register an App ID](https://developer.apple.com/help/account/identifiers/register-an-app-id).

### Create your app in App Store Connect

App Store Connect is Apple's website for everything about your app on the store: its page, its builds, testing with TestFlight and App Review. Your app needs a place there before Nowa can send it builds. This needs the Account Holder, Admin or App Manager role, and the Account Holder must have signed Apple's latest agreement in the **Business** section.

1. Sign in to [App Store Connect](https://appstoreconnect.apple.com/) and open **Apps**.
2. Click the add button (**+**) and choose **New App**.
3. Fill in the dialog:

| Field | What to enter |
|---|---|
| **Platforms** | **iOS**. |
| **Name** | The name people see on the App Store, 2 to 30 characters. You can change it until you submit the app for review. |
| **Primary Language** | The main language of your App Store page. You can change it later. |
| **Bundle ID** | The bundle ID you registered above. It's locked once you upload a build. |
| **SKU** | An ID for your own records that customers never see. Your bundle ID works well. You can't change it later. |
| **User Access** | **Full Access**, or **Limited Access** to choose which people on your team can see the app. |

4. Click **Create**. If anything is missing, App Store Connect tells you.

Apple's guide: [Add a new app](https://developer.apple.com/help/app-store-connect/create-an-app-record/add-a-new-app).

### Create an App Store Connect API key

An API key is a pass that lets Nowa work with your Apple account for you. During each build, Nowa uses it to fetch or create the signing files your app needs, then to upload the finished app. You create it once and can use it for all your apps. This needs the Account Holder or Admin role.

1. In App Store Connect, open **Users and Access**, then the **Integrations** tab. **App Store Connect API** is already selected.
2. The very first time, the Account Holder clicks **Request Access**, ticks the box to agree to the terms and clicks **Submit**. Apple reviews the request before anyone can create keys.
3. Click **Team Keys**, then **Generate API Key**. If you already have a key, click the add button (**+**) instead.
4. Give the key a name you'll recognize, such as "Nowa". It's only for you.
5. Under **Access**, choose **Admin** or **App Manager**. Nowa needs one of these to sign and upload your builds.
6. Click **Generate**. The new key appears in the list.
7. Copy two values into your note: the **Issuer ID**, shown above the list of keys, and the new key's **Key ID**.
8. Click **Download API Key** and save the file somewhere safe. It's a `.p8` file: a small text file that holds the secret part of your key.

:::warning[You can download the key only once]
Apple doesn't keep a copy of the `.p8` file. If you lose it, revoke the key on the same page (**Edit**, select the key, **Revoke Key**), generate a new one and save it in Nowa. Keep the file private, like a password.
:::

Use a team key like this one, not the individual key on your profile, which can't create signing files. A key's access can't be changed later, so if you picked the wrong one, generate a new key. Apple's guide: [App Store Connect API](https://developer.apple.com/help/app-store-connect/get-started/app-store-connect-api).

## Save your App Store Connect credentials

Back in Nowa, add the key you created.

1. Click **Settings** → **Deployment** and open the **iOS** tab. The **Distribution Certificate** card holds an **App Store Connect** section with a warning icon. Hover over it to read **Missing App Store Connect credentials**.
2. Enter your **Key ID** and **Issuer ID**.
3. Next to **Private Key File**, click **Browse** and pick your `.p8` file. You can also paste the key text into the field.
4. Click **Save**. The icon turns into a check mark (hover to read **App Store Connect credentials saved**).

![The iOS tab of the Deployment page for a project with no Apple credentials: the Distribution Certificate card with its warning icon, Generate, the Certificate Private Key field with Browse and Save, and the App Store Connect section (highlighted) with Key ID, Issuer ID, the Private Key File box, Browse and Save.](/img/docs/publish/publish-ios-1.png)

Nowa saves your **Bundle Identifier** together with these credentials. If you change the identifier later, click the pencil (**Change credentials**) and **Save** again so Nowa picks up the new one. The same pencil is how you swap in a new API key. The X (**Discard changes**) closes the form without saving.

## Add a distribution certificate {#apple-distribution-certificate}

A distribution certificate is your digital signature as an Apple developer. Nowa signs every iOS build with it, so Apple can tell the app really comes from your team and hasn't been changed since it was signed. The certificate belongs to your team rather than to one app, so one certificate can sign all your apps.

Every certificate is paired with a private key, a secret file that only you and Nowa should have. That key is what Nowa needs. On a Mac, people usually create the key with Keychain Access and then request the certificate from Apple. With Nowa you skip that: during the build, Nowa looks in your Apple account for the certificate that matches your key, and creates one if there isn't one yet.

If a build failed at **iOS code signing**, start with [the troubleshooting steps](#if-the-ios-code-signing-step-fails) at the end of this page.

### Let Nowa generate a key

1. In the **Distribution Certificate** card, click **Generate**. A warning icon means no key is saved yet (**Missing distribution certificate**).
2. Read the **Important!** warning. It explains that Apple allows only three active certificates at a time, and that the build fails if you have already used three. Reusing a certificate is best. If you need a new one anyway, first revoke an existing one in your Apple Developer account (this breaks any builds that use the revoked one). Click **Generate anyways** to go on, or **Cancel**.
3. In the next **Important!** dialog, click **Download** and save `ios_distribution_certificate_key.p12` somewhere safe. If you lose it, you can't sign your other iOS apps with this certificate and you have to generate a new one.

Nowa creates the matching certificate in your Apple account the first time it signs a build with this key. After that build, you'll find it under **Certificates** in your developer account.

### Use a key you already have

The easiest key to reuse is one Nowa gave you for another app: the `ios_distribution_certificate_key.p12` file you downloaded there. That way all your apps share one certificate, and you stay clear of Apple's limit.

1. Click **Browse** next to **Certificate Private Key** and pick the key file. The file picker lists `.p12` files.
2. Click **Save**.

Nowa reads the key as text, in the same format as its own download. A `.p12` file exported from Keychain Access on a Mac is a different, binary format: Nowa can't read it, and the card shows **Failed to load or save certificate info**. If you have a certificate from a Mac and are comfortable with code, [What Nowa adds to your code](../code/generated-code.md#publishing) explains how to export its key as text. Otherwise, let Nowa generate a key.

### Manage the saved key

Once a key is saved, the card shows a check mark (hover to read **Distribution certificate saved**). The download icon (**Download Certificate**) saves the key file again, which is handy when you set up your next app. **Remove** asks "Are you sure?" and then deletes Nowa's copy of the key. The certificate itself stays in your Apple account.

To remove the certificate itself, revoke it in your Apple Developer account. This needs the Account Holder or Admin role.

1. In **Certificates, Identifiers & Profiles**, click **Certificates** in the sidebar.
2. Select the certificate and click **Revoke**, then click **Revoke** again in the dialog.

Apple says apps already on the App Store aren't affected when you revoke a certificate. You can't upload new builds signed with it, though, and builds you uploaded but haven't submitted for review yet may be marked Invalid Binary. See Apple's [Certificates overview](https://developer.apple.com/support/certificates/).

### Share one certificate

Keep using the same certificate for all your apps and their updates: save the same key in each project instead of generating a new one each time. If several people publish from one Apple account, each person can have their own certificate until you reach Apple's limit. After that, share one.

## Build and send to App Store Connect

With your credentials and certificate saved, you're ready to build.

1. In **Start New Build**, pick a **Branch** and click **Build**. Leave the default unless you work with several branches. [Start a build](./builds.md#start-a-build) explains what a branch is. The button stays off until both the certificate and the App Store Connect credentials are saved.
2. Follow the build. It signs your app in the **iOS code signing** step, builds the `.ipa` (the installable iPhone app file) and ends with a **Publishing** stage that uploads it to App Store Connect. [Build history and logs](./builds.md) explains the build card.
3. When the build finishes, look for it in App Store Connect. By default, the `.ipa` is also listed under **Artifacts**, but you don't need to download it: Nowa has already uploaded it.

You can also click **Deploy** in the top bar, then **Deploy** on the **iOS** row. It shows **Set up** until everything above is saved.

By default, Nowa's part ends at the upload. [After the upload](#after-the-upload) says what comes next in App Store Connect.

To send a new build, raise **Build number** in **Settings** → **Project Details** (and **Build version** for a new release), then build again. Apple tells your uploads apart by the build number, so every upload needs a new one.

## After the upload

Once the build is uploaded, you carry on in [App Store Connect](https://appstoreconnect.apple.com/):

1. Wait for Apple to process the build. Apple emails you when it's done, and the build shows up on your app's **TestFlight** tab. See [Upload builds](https://developer.apple.com/help/app-store-connect/manage-builds/upload-builds).
2. Answer Apple's questions about encryption (export compliance). Until you do, TestFlight marks the build **Missing Compliance**. Open the build, click **Provide Export Compliance Information**, answer the questions and click **Save**. See [Provide export compliance information for beta builds](https://developer.apple.com/help/app-store-connect/test-a-beta-version/provide-export-compliance-information-for-beta-builds/).
3. To try the app with testers first, use TestFlight. See [TestFlight overview](https://developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview).
4. To release the app, fill in the information Apple requires for it, choose the build for your app version and submit it for review. See [Required, localizable, and editable properties](https://developer.apple.com/help/app-store-connect/reference/app-information/required-localizable-and-editable-properties) and [Submit an app](https://developer.apple.com/help/app-store-connect/manage-submissions-to-app-review/submit-an-app).

Before you submit for review, read [Follow Apple's rules](#store-rules). Apple's [App Store Connect Help](https://developer.apple.com/help/app-store-connect/) covers the rest.

## Follow Apple's rules {#store-rules}

Read Apple's [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) before you submit. These parts match what you can build with Nowa:

- **Payments.** [3.1.1 In-App Purchase](https://developer.apple.com/app-store/review/guidelines/#in-app-purchase) says "you must use in-app purchase" to unlock features or functionality, for example with subscriptions, in-game currencies or access to premium content. [3.1.3 Other Purchase Methods](https://developer.apple.com/app-store/review/guidelines/#other-purchase-methods) lists apps that "may use purchase methods other than in-app purchase". See [Stripe or RevenueCat?](../integrations/index.md#stripe-or-revenuecat).
- **Google sign-in.** [4.8 Login Services](https://developer.apple.com/app-store/review/guidelines/#login-services) names Google Sign-In as an example of a third-party or social login service. An app that uses one to set up or authenticate the user's primary account "must also offer as an equivalent option another login service" with the features Apple lists, unless an exception applies.
- **Accounts.** [5.1.1(v)](https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage): "If your app supports account creation, you must also offer account deletion within the app." The sign-up functions Nowa adds don't delete accounts. Apple's [Offering account deletion in your app](https://developer.apple.com/help/app-review/guideline-reference/5-1-1-account-deletion) has the details.
- **Privacy.** [5.1.1(i)](https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage): "All apps must include a link to their privacy policy in the App Store Connect metadata field and within the app in an easily accessible manner." For the link inside your app, use the [`openUrl` action](../logic/actions.md#open-a-link). [App privacy details on the App Store](https://developer.apple.com/app-store/app-privacy-details/) covers what you provide in App Store Connect, including for third-party code.
- **Demo account.** Apple's [Before You Submit](https://developer.apple.com/app-store/review/guidelines/#before-you-submit) list asks for "an active demo account or fully-featured demo mode" if your app includes account-based features.

## If the iOS code signing step fails

Open the failed step under **Steps** in the build and read its log. Click **Explain with AI** to send the failure to Nowa AI, or **Documentation** to come back to this page. Then check these, one at a time:

- **Apple's certificate limit.** If you generated a new key while your account already had three certificates, revoke one you no longer use, or click **Remove** and use a key you already have.
- **A revoked certificate.** If the certificate that matches your key was revoked, remove the key and generate a new one, or use another key.
- **The API key's access.** It must be **Admin** or **App Manager**. Access can't be changed, so generate a new team key and save it with the pencil (**Change credentials**).
- **The bundle ID.** It must match an App ID in your developer account exactly. If you changed **Bundle Identifier** after saving your credentials, click the pencil and **Save** again.

## Next steps

- [Build history and logs](./builds.md): start builds, follow them and read their logs.
- [Publish to Google Play](./android.md): ship the Android version.
- [Get ready to publish](./index.md): the Deploy menu and your app details.
