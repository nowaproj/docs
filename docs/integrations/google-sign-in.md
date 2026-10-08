---
title: Google Sign-In
description: Add your Google OAuth client IDs so your app can sign users in with Google without Firebase, for example with Supabase.
sidebar_label: Google Sign-In
keywords: [google sign-in, google login, sign in with google, oauth, client id, supabase auth, google_sign_in, social login]
---

Let people sign in to your app with their Google account. This page stores your Google OAuth client IDs and prepares your iOS app for Google's sign-in screen. It is meant for sign-in without Firebase, for example with Supabase. If you use Firebase Authentication instead, Firebase handles Google sign-in: see [Sign users in with Firebase](./firebase/auth.md).

## Before you start

- OAuth 2.0 client IDs from the Google Cloud console ([Credentials](https://console.cloud.google.com/apis/credentials)): one for **iOS** and one for **Web**. Supabase's [Login with Google guide](https://supabase.com/docs/guides/auth/social-login/auth-google) walks through creating them.
- A backend that accepts Google sign-in. With Supabase, connect it first ([Connect Supabase](./supabase/connect.md)) and turn on Google as a sign-in provider in your Supabase project.
- To publish your iOS app on the App Store, read [App Store Review Guideline 4.8 Login Services](https://developer.apple.com/app-store/review/guidelines/#login-services). It names Google Sign-In.

## Add your client IDs

1. Click the gear in the top bar (**Settings**) or press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>,</kbd>. Under **Integrations**, click **Google Sign-In**.
2. Turn on **Enabled**. Nowa adds the `google_sign_in` package.
3. Under **Configuration**, paste your **iOS Client ID** and **Web Client ID**. Both look like `xxxxx.apps.googleusercontent.com`. Press <kbd>Enter</kbd> or click the send icon (**Submit**) after each one. A check mark confirms the save.

| Field | Used for | What Nowa does with it |
|---|---|---|
| **iOS Client ID** | Required for Google sign-in without Firebase. | Writes it to the iOS `Info.plist` as `GIDClientID` and adds the reversed ID as an iOS URL scheme. |
| **Web Client ID** | Also used as the server client ID on Android. | Saves it as the constant `AppConstants.webClientId` and lists it under **Constants**. It is not written to any platform file, and Nowa does not pass it to Google for you: your sign-in code reads it. |

If you also set a **URL Scheme** under [Deep links](./deep-links.md), check `Info.plist` as described there: both write a URL type to it.

## Build the sign-in flow

Nowa sets up the keys and the package. It does not generate a sign-in function or a Google button for this standalone setup, so ask Nowa AI to build the flow. Nowa's guidance for Supabase: connect your project, then ask Nowa AI to set it up.

:::tip[Or ask Nowa AI]
Try: "Add a Continue with Google button to the Login screen that signs the user in with Supabase."
:::

## When Firebase manages Google sign-in

If your project is connected to Firebase and Nowa has saved a Google client ID from it, this page shows **Managed by Firebase** ("Google Sign-In is configured through Firebase Authentication. To modify settings, go to Firebase settings.") and an **Open Firebase Settings** button. The **Enabled** switch and the fields are hidden. Change the setup in the Firebase settings instead.

Nowa saves that client ID when it sets Firebase up for your project and your Firebase project has Google sign-in turned on, for example when you connect Firebase or add the **Google** provider in Firebase Authentication.

## Turn Google Sign-In off

Turn **Enabled** off to remove the package and the iOS entries Nowa added. The **Web Client ID** value stays in **Constants**, under **Custom Constants** as `webClientId`.

## Next steps

- [Sign users in with Supabase](./supabase/auth.md)
- [Sign users in with Firebase](./firebase/auth.md)
- [Keys and constants](./constants.md)
