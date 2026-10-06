---
title: Connect Firebase
description: Connect your project to a Firebase project by signing in with Google, picking the project and letting Nowa set up your apps and config files.
sidebar_label: Connect Firebase
keywords: [Firebase, connect Firebase, Firebase project, Google account, google-services.json, GoogleService-Info.plist, firebase_options, FlutterFire, Continue with Google, Connect Apps, disconnect Firebase]
---

Sign in with Google, pick your Firebase project and click **Connect Apps**. Nowa registers your Android, iOS and web apps in Firebase, writes the config files and adds the Firebase code to your project. After that, sign-in, Cloud Firestore and push notifications are each a switch or a few clicks away.

## Before you start

- Create a Firebase project in the [Firebase console](https://console.firebase.google.com/). Nowa can't create projects.
- Use a Google account that can manage that project.
- Check your **Bundle Identifier** in **Settings** → **Project Details**. Nowa uses it to find or create your Firebase apps. See [Project settings](../../account/project-settings.md).
- On the Windows desktop app you can connect and build, but you can't test Firestore queries inside Nowa. See [Firebase on Windows](../../troubleshooting/known-issues.md#firebase-on-windows).

## Connect your project

1. Click **Settings** in the top bar (or press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>,</kbd>), then open **Integrations** → **Firebase**.
2. Click **Continue with Google** and approve the request in the Google window. In the desktop app, Nowa opens your browser for this.
3. Under **Projects**, click your Firebase project.
4. Check the **Apps** list. Nowa reuses matching apps that already exist in the project (same package name or bundle ID). For each missing app it shows "Android App will be automatically created", "iOS App will be automatically created" or "Web App will be automatically created".
5. Click **Connect Apps**. A spinner shows while Nowa works. When it finishes, the page switches to the connected view.

{/* CAPTURE: id=integrations-firebase-connect-1 | state: Settings → Integrations → Firebase, signed in with Google, a Firebase project clicked | show: the Apps list with the three "will be automatically created" lines and the Connect Apps button | crop: Settings window content area */}

:::note
Nowa AI can't connect Firebase for you. If you ask it to add `firebase_core`, it tells you to set Firebase up in **Settings** → **Integrations** → **Firebase** so the configuration is right.
:::

## If something goes wrong

- **No projects listed.** The page says "You don't have any Firebase project, please create one using firebase console!" Create a project in the Firebase console, then click **Reload Projects**.
- **An app can't be created.** A red banner says "Error creating apps, you  have finished your limits of apps on Firebase". Remove apps you don't use in the Firebase console, then click **Connect Apps** again.
- **The page asks you to sign in again.** Nowa remembers your Google sign-in on the device or browser you used. If it expires, or you open the project somewhere else, the **Firebase** page shows **Continue with Google** again. Your project stays connected.

## What Nowa adds to your project

| Added | What it is for |
|---|---|
| `android/app/google-services.json` and `ios/Runner/GoogleService-Info.plist` | Firebase config for your Android and iOS apps. |
| `lib/firebase_options.dart` | Connection options for Android, iOS and web. macOS apps use the iOS options. Other platforms get none. |
| `lib/firebase/firebase.dart` | `FirebaseService`, the class that holds your Firebase functions, such as sign-in. |
| `lib/firebase/collections.dart` and `lib/firebase/queries.dart` | Your Cloud Firestore collections and queries. They start empty. See [Use Cloud Firestore](firestore.md). |
| `lib/main.dart` | A line that starts Firebase when the app launches. |
| Packages and build files | `firebase_core` and `cloud_firestore` (added even if you only use sign-in), and the Android build files updated for Firebase. |

## The connected page

Once connected, **Settings** → **Integrations** → **Firebase** shows these sections, top to bottom.

| Section | What it does |
|---|---|
| **Project ID** and **Refresh/Update apps and config files** | Shows the connected project and downloads the config again. |
| **Authentication** | Switch for Firebase sign-in. The providers appear below when it's on. See [Sign users in with Firebase](auth.md). |
| **Push Notifications (FCM)** | Switch plus **Test Push Notifications**. See [Send push notifications](notifications.md). |
| **SHA Certificate Fingerprints (For Google Sign in)** | **Setup** manages the fingerprints Google sign-in needs on Android. See [Sign users in with Firebase](auth.md#sha-fingerprints). |
| **Go to your Firebase Dashboard** | Opens your project in the Firebase console. |
| **Disconnect Project** | Removes Firebase from your Nowa project. |

{/* CAPTURE: id=integrations-firebase-connect-2 | state: cloud project connected to a Firebase project, Authentication on with one provider, Push Notifications (FCM) on | show: the whole connected Firebase page, from Project ID down to Disconnect Project | crop: Settings window content area */}

Nowa's visual tools cover Authentication, Cloud Firestore and push notifications. Other Firebase products, such as Storage and Realtime Database, have no visual tools in Nowa.

## Refresh the apps and config files

Click **Refresh/Update apps and config files**, next to **Project ID**, to download the config files again and rebuild `lib/firebase_options.dart`. Use it after you change something in your Firebase project.

It also clears the problem Nowa adds to the **Problems** panel when you change your **Bundle Identifier** after connecting, for example `Firebase package name 'com.example.old' does not match the app package name 'com.example.new'. Try refreshing the config files`. Select the problem and click **Navigate** to open the Firebase page.

Refresh reuses the apps Nowa already connected. It doesn't register new ones. To get Firebase apps for a new identifier, disconnect and connect again.

## Disconnect Firebase

1. Open **Settings** → **Integrations** → **Firebase** and click **Disconnect Project**.
2. In the **Disconnect Firebase Project** dialog, choose what happens to your Firestore files:
   - **Keep Files** keeps `collections.dart` and `queries.dart` so you can reuse them with another project. Your queries show errors until you connect again.
   - **Clear All Files** deletes them too.

Either way, Nowa removes `FirebaseService`, the config files, the sign-in functions and notification code, the Firebase packages and the start-up line in `main.dart`. It also forgets your Google sign-in on this device. Nothing is deleted in Firebase itself.

:::warning
**Clear All Files** is permanent. Nowa can't restore the files once they're deleted.
:::

## Next steps

- [Sign users in with Firebase](auth.md)
- [Use Cloud Firestore](firestore.md)
- [Send push notifications](notifications.md)
- [Connect data and services](../index.md): compare Firebase with Supabase and REST APIs
