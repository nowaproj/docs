---
title: Send push notifications
description: Turn on Firebase Cloud Messaging, add the iOS capability and send a test notification from Nowa to your app.
sidebar_label: Push notifications
keywords: [push notifications, FCM, Firebase Cloud Messaging, notifications, topic, APNs, Xcode, Test Push Notifications, firebase_messaging, flutter_local_notifications]
---

Push notifications reach people even when your app is closed. Turn on **Push Notifications (FCM)** and Nowa adds the notification code to your app. Then send a test notification from the same page.

## Before you start

- A project connected to Firebase. See [Connect Firebase](connect.md).
- A device or emulator to run your app on. See [Run on a device or emulator](../../test/devices.md).

## Turn on push notifications

1. Open **Settings** → **Integrations** → **Firebase** and turn on **Push Notifications (FCM)**. The **Test Push Notifications** box appears below it.
2. For iOS, add the capability in Xcode: open your iOS project, then go to **Signing & Capabilities** → **Add Capability** → **Push Notifications**.
3. Run or publish your app again, so the build includes the notification code. See [Publish to Google Play](../../publish/android.md) and [Publish to the App Store](../../publish/ios.md).

Nowa shows the Xcode reminder under the switch. In the macOS desktop app it also has an **Open Xcode Workspace** link. It opens `ios/Runner.xcworkspace` from the project's folder, so it works for [local projects](../../code/local-projects.md).

{/* CAPTURE: id=integrations-firebase-notifications-1 | state: connected project, Push Notifications (FCM) on, Test Push Notifications filled in but not sent | show: the Push Notifications (FCM) switch with its description and the Xcode note, and the Test Push Notifications box | crop: Settings window content area */}

## What Nowa adds

- The `firebase_messaging` and `flutter_local_notifications` packages.
- `lib/firebase/notification_service.dart`, a `NotificationService` that `main()` starts when the app launches.

When the app starts, the service asks for notification permission and subscribes the device to the topic `all`. It shows a notification while the app is open and handles messages that arrive in the background. It doesn't open a particular screen when someone taps a notification.

| Platform | What to know |
|---|---|
| iOS | Add the Push Notifications capability in Xcode, as above. Nowa adds the `fetch` and `remote-notification` background modes. Firebase also needs your Apple push (APNs) credentials, which the [Firebase documentation](https://firebase.google.com/docs/cloud-messaging) explains. |
| Android | Nowa turns on the Android build setting (desugaring) that the notification libraries need. |
| Web | Nowa doesn't add any web-specific push setup. |

## Send a test notification

1. Under **Test Push Notifications**, type a **Notification Title** and **Notification Text**.
2. Choose a **Target Audience**.
3. Leave **Deliver with sound** on to play the default sound, or turn it off.
4. Click **Send Test Notification**. After a successful send, the title and text fields clear.

| Target Audience | Who gets it |
|---|---|
| **All Users** | Every device subscribed to the topic `all`. The generated service subscribes a device when your app starts. |
| **Topic** | Devices subscribed to the topic you type in **Topic name**. It starts as `all`. |

Nothing is sent when the title or the text is empty. Only the topic `all` is set up for you, so a test sent to another topic reaches only devices that your own code has subscribed to that topic.

Nowa sends the test with your Google sign-in. If sending fails, a red message shows one of these:

- "Permission denied. Check Firebase project permissions."
- "Project not found. Check Firebase project ID."
- "Network error occurred. Please check your connection."
- "Unknown error occurred while sending notification."

:::warning
If Google no longer accepts Nowa's sign-in, for example because it expired, Nowa disconnects Firebase from your project and the page returns to **Connect Firebase**. Only your Firestore collections and queries files stay. Connect again, then turn **Authentication** and **Push Notifications (FCM)** back on.
:::

## What a notification looks like

The look depends on the device. These are test notifications on iOS and Android.

![A test notification on an iPhone showing the title and message that were sent](/img/docs/integrations/firebase-notification-ios.png)

![A test notification on an Android phone showing the title and message that were sent](/img/docs/integrations/firebase-notification-android.png)

## Turn push notifications off

Turn off **Push Notifications (FCM)** to remove `lib/firebase/notification_service.dart` and the two packages.

## Next steps

- [Sign users in with Firebase](auth.md)
- [Use Cloud Firestore](firestore.md)
- [Run on a device or emulator](../../test/devices.md)
