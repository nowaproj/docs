---
title: Google Sign-In
description: Let people sign in with their Google account without Firebase, for example with Supabase. Create your client IDs in Google Cloud, add them in Nowa and let Nowa AI build the sign-in button.
sidebar_label: Google Sign-In
keywords: [google sign-in, google login, sign in with google, continue with google, oauth, client id, google auth platform, supabase auth, social login]
---

Let people sign in to your app with the Google account they already have: one tap instead of yet another password. Nowa stores your Google client IDs and prepares your iPhone and iPad app for Google's sign-in screen. This setup is for sign-in without Firebase, for example with Supabase. If you use Firebase Authentication, Firebase handles Google sign-in instead (see [Sign users in with Firebase](./firebase/auth.md)).

## Before you start

- A backend that accepts Google sign-in. With Supabase, connect it first ([Connect Supabase](./supabase/connect.md)), then turn on Google as a sign-in provider in your Supabase project. [Sign users in with Supabase](./supabase/auth.md#google) shows the steps.
- Your app's **Bundle Identifier**, set in **Settings** → **Project Details**. Google asks for it. See [Check your app details](../publish/index.md#app-details).
- To publish your iOS app on the App Store, read [App Store Review Guideline 4.8 Login Services](https://developer.apple.com/app-store/review/guidelines/#login-services). It names Google Sign-In.

## Create your client IDs in Google Cloud

A client ID tells Google which app is asking to sign someone in. You create one for each kind of app, all in the same Google Cloud project:

1. In the Google Cloud console, open the **Google Auth Platform** [Clients](https://console.cloud.google.com/auth/clients) page. If Google asks, create a project and register your app for Google sign-in first.
2. Click **CREATE CLIENT**, choose **Web application**, give it a name and click **CREATE**. Copy the client ID. Google shows the client secret only now, so keep it somewhere safe if your backend asks for it.
3. Click **CREATE CLIENT** again and choose **iOS**. Enter your **Bundle Identifier** as the bundle ID and click **CREATE**. Copy this client ID too.
4. For Android, Supabase's guide has you create one more client of type **Android**, with your **Bundle Identifier** as the package name and the SHA-1 fingerprint of your signing key (Nowa shows it with a copy button, see [Create a signing key](../publish/android.md#create-a-signing-key)). Nowa has no field for this one: its client ID goes into Supabase with the others.

Google's [Manage OAuth Clients](https://support.google.com/cloud/answer/6158849) help explains each client type, and Supabase's [Login with Google guide](https://supabase.com/docs/guides/auth/social-login/auth-google) covers the Supabase side, including the separate fingerprints for testing and publishing.

## Add your client IDs in Nowa {#add-your-client-ids}

1. Click the gear in the top bar (**Settings**) or press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>,</kbd>. Under **Integrations**, click **Google Sign-In**.
2. Turn on **Enabled**. Nowa adds what your app needs for Google sign-in.
3. Under **Configuration**, paste your **iOS Client ID** and **Web Client ID**. Both look like `xxxxx.apps.googleusercontent.com`. Press <kbd>Enter</kbd> or click the send icon (**Submit**) after each one. A check mark confirms the save.

| Field | What it's for |
|---|---|
| **iOS Client ID** | Lets Google's sign-in screen open from your iPhone and iPad app and come back to it. Needed for Google sign-in without Firebase. |
| **Web Client ID** | Lets your backend, such as Supabase, check who signed in. Its help text says it's also used as the server client ID on Android. It shows on the **Constants** page too. Nowa only stores it: the sign-in flow you build with Nowa AI uses it. |

Also using a **URL Scheme** for [deep links](./deep-links.md)? Both settings add a link entry to your iPhone app, so read [Use deep links with Google Sign-In](./deep-links.md#with-google-sign-in) before you test on iOS.

## Build the sign-in flow

Nowa stores your client IDs and prepares your app, but it doesn't create a sign-in function or a Google button for this setup. That's the part Nowa AI builds for you. With Supabase, connect your project and turn on Google in Supabase first, then ask.

:::tip[Or ask Nowa AI]
In **Agent** mode, try: "Add a Continue with Google button to the Login screen that signs the user in with Supabase." Then check **Problems** for errors and try the button in your app on a device.
:::

## When Firebase manages Google sign-in

If your project is connected to Firebase and Nowa has saved a Google client ID from it, this page shows **Managed by Firebase** ("Google Sign-In is configured through Firebase Authentication. To modify settings, go to Firebase settings.") and an **Open Firebase Settings** button. The **Enabled** switch and the fields are hidden. Change the setup in the Firebase settings instead.

Nowa saves that client ID when it sets Firebase up for your project and your Firebase project has Google sign-in turned on, for example when you connect Firebase or add the **Google** provider in Firebase Authentication.

## Turn Google Sign-In off

Turn **Enabled** off. Nowa takes the Google sign-in setup out of your iPhone and iPad app. Your **Web Client ID** stays on the **Constants** page, under **Custom Constants** as `webClientId`. Working in the code? See [What Nowa adds to your code](../code/generated-code.md#google-sign-in).

## Next steps

- [Sign users in with Supabase](./supabase/auth.md)
- [Sign users in with Firebase](./firebase/auth.md)
- [Keys and constants](./constants.md)
