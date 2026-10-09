---
title: Sign users in with Firebase
description: Turn on Firebase Authentication, add Email/Password, Google or Phone sign-in, and call the generated sign-in functions from your screens.
sidebar_label: Sign-in
keywords: [Firebase Authentication, sign in, sign up, login, email and password, Google sign-in, phone sign-in, SHA-1, SHA-256, SHA fingerprint, signInWithGoogle, FirebaseService, password reset, verify email, current user]
---

Firebase Authentication lets people create accounts and sign in to your app. Turn it on in Nowa, add the providers you want, and Nowa writes the sign-in functions for you. You call them from buttons like any other action.

## Before you start

- A project connected to Firebase. See [Connect Firebase](connect.md).
- The sign-in methods you want, turned on in the Firebase console. Nowa reminds you under the **Authentication** switch, and **Enable on Firebase.** opens the Authentication page of your project in the console.

## Turn on Authentication and add providers

1. Open **Settings** → **Integrations** → **Firebase**.
2. Turn on **Authentication**. **Add Provider** appears below the **Push Notifications (FCM)** section.
3. Click **Add Provider**. Once Email/Password or Google is on, the button reads **Manage Providers**.
4. On **Available Providers**, click the **+** on **Email/Password**, **Google** or **Phone**. A check mark means the provider is on. Click it to remove the provider.
5. Click the back arrow. The **Providers** row shows an icon for each provider that's on.

{/* CAPTURE: id=integrations-firebase-auth-1 | state: connected project, Authentication on, Available Providers open with one provider added | show: the Email/Password, Google and Phone tiles (one with a check mark) and the note above them | crop: Settings window content area */}

If adding **Google** shows the red message "Exception: Must Enable Google Authentication on Firebase", turn on Google sign-in in the Firebase console and try again.

If your iOS app offers **Google** sign-in, read [App Store Review Guideline 4.8 Login Services](https://developer.apple.com/app-store/review/guidelines/#login-services) before you submit it. It names Google Sign-In.

## Functions Nowa adds

Nowa puts the functions in `FirebaseService`, in `lib/firebase/firebase.dart`.

| Function | Added by | What it does |
|---|---|---|
| `signOut()` | **Authentication** | Signs the current user out. |
| `isUserSignedIn()` | **Authentication** | Returns true when someone is signed in. |
| `currentUser` | **Authentication** | The signed-in user, or nothing when nobody is signed in. |
| `sendVerificationEmail()` | **Authentication** | Sends a verification email to the signed-in user if their email isn't verified yet. |
| `signUpWithEmailAndPassword(email, password)` | **Email/Password** | Creates an account with that email and password. |
| `signInWithEmailAndPassword(email, password)` | **Email/Password** | Signs in an existing user. |
| `sendPasswordResetEmail(email)` | **Email/Password** | Sends a password reset email. |
| `signInWithGoogle()` | **Google** | Signs in with a Google account. It opens a popup on web and uses the `google_sign_in` package everywhere else. |
| `verifyPhoneNumber(phoneNumber)` | **Phone** | Sends an SMS code and returns a verification ID. |
| `signInWithPhoneNumber(verificationId, smsCode)` | **Phone** | Signs in with the verification ID and the code the user typed. |

**Google** and **Phone** also add the iOS settings they need, a URL scheme in `Info.plist`.

:::note
Currently, **Google** writes `signInWithGoogle()` for an older version of the `google_sign_in` package than the 7.x version Nowa installs. If your build reports errors about `GoogleSignIn` in `lib/firebase/firebase.dart`, this is the cause. Turning **Google** off removes the function and the package.
:::

## Use the functions in your screens

Call them from an event, such as a button's **On Pressed**.

1. Select the widget, such as a button.
2. In **Details**, click **+** next to the event. If the event already has logic, the button reads **Edit**. [Circuit](../../logic/circuit.md) opens.
3. Hover the dot under a node and click **+**. The **All nodes for this circuit** menu opens.
4. Open the **FIREBASE** category and pick a function. The category appears once Firebase is connected.
5. Fill in the parameters with your own values, such as [variables](../../logic/variables.md) that hold what the user typed.
6. Most of these functions return a Future. Select that node and find **Future Options** in **Details**. Click **+** next to **onValue** for what happens after a successful sign-in, such as [opening the home screen](../../logic/navigation.md). The **onError** function it creates runs when sign-in fails. See [Wait for a result](../../logic/circuit.md#future-options).

To skip the login screen when someone is already signed in, use `isUserSignedIn()` in the **Redirect Logic** of your home screen's route. See [Start on the login screen or the home screen](../../logic/router.md#start-on-login-or-home).

:::tip
Prefer to describe it? Once a provider is on, ask Nowa AI in **Agent** mode, for example: "Build a sign-in screen with email and password fields that signs the user in with Firebase and opens the home screen."
:::

## Test sign-in in Nowa

In Instant Play (**Play**), `signInWithGoogle()`, `signUpWithEmailAndPassword()`, `signInWithEmailAndPassword()` and `signInWithPhoneNumber()` don't contact Firebase. Each opens a preview dialog. Choose **Test with fake user** to simulate success, or the other button to simulate an error. The Google dialog uses **Test with fake Google user** and **Test error signing in**.

In the same way, `currentUser` returns a placeholder user whose values read `[email]` and `[displayName]`, and `isUserSignedIn()` returns false. To try real sign-in, run your app on a simulator or a device. See [Run on a device or emulator](../../test/devices.md).

## Add SHA fingerprints for Google sign-in on Android {#sha-fingerprints}

Google sign-in on Android needs your app's SHA fingerprints registered in Firebase. Nowa can add them for you.

1. On the Firebase page, click **Setup** under **SHA Certificate Fingerprints (For Google Sign in)**.
2. The table lists the fingerprints Firebase already has for your Android app, with their **Type**. It reads "No keys found" when there are none.
3. Under **Release key**, click **Add** next to **SHA-1** and **SHA-256**. A check mark replaces **Add** once the key is in Firebase. This section shows up when Nowa can get the fingerprints of your project's Android signing key. See [Publish to Google Play](../../publish/android.md).
4. To use Google sign-in in debug builds you run from your own computer, add your debug key too:
   1. Copy the `keytool` command under **Add a key** and run it in a terminal.
   2. Copy the SHA-1 it prints.
   3. Paste it into **Enter SHA-1 or SHA-256** and click **Add Key**. The key appears in the table.
5. Go back and click **Refresh/Update apps and config files** so your config files match Firebase.

Paste the fingerprint with its colons but without the `SHA1:` label that `keytool` prints in front of it. Nowa treats a value of exactly 59 characters as SHA-1 and anything else as SHA-256.

{/* CAPTURE: id=integrations-firebase-auth-2 | state: connected project, SHA Certificate Fingerprints → Setup | show: the fingerprints table, the Release key rows with Add, and the Add a key command with Add Key | crop: Settings window content area */}

## Turn Authentication off

Turn off **Authentication** to remove every function in the table above except `sendPasswordResetEmail()`, which stays in `FirebaseService`. Delete it in [code mode](../../code/code-mode.md) if you don't need it. Nowa also switches the providers off and removes the `firebase_auth` package.

## Next steps

- [Use Cloud Firestore](firestore.md)
- [Send push notifications](notifications.md)
- [Google Sign-In without Firebase](../google-sign-in.md)
