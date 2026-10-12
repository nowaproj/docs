---
title: Known issues
description: Platform limits and editor quirks you may run into when you use Nowa, why they happen, and the quickest way around each one.
sidebar_label: Known issues
keywords: [known issues, limitations, Windows, Firebase, Firestore, test query, Firebase console query builder, Apple sign-in, Google Maps, AdMob, CORS, desktop app, Linux, code download spinning, custom domain pending, remove custom domain, rename variable, Shift drag, slash, route path, New UX, double-click, board toolbar missing, detach component, app bar drag, Connect Apps, firebase_options, InvalidType, Stripe, cancel subscription, Figma, Waiting for Authorization, playground, AI chat grey box, Add context, Redirect Logic, InitState Function, await, initState returned a Future]
---

A few things work differently depending on where you run Nowa or your app, and a few editor actions need a workaround
in this version. Here's what to expect, why it happens, and the quickest way around each one.

## Firestore queries can't be tested on Windows {#firebase-on-windows}

In the Windows desktop app, the **Test** section of a Firestore query is switched off. It shows "Testing Firestore
Queries isn't possible on Windows version", with the hint "Simply connect your query to the UI and test it by running
the app on a simulator, or use Nowa web or MacOS version". The Windows version of Nowa can't run Firestore queries
itself, so it can't try them out for you.

That doesn't stop you from building a Firebase app on Windows. Your queries still work in your app. You only check the
results another way:

1. Connect the query to your UI (see [Use Cloud Firestore](../integrations/firebase/firestore.md)).
2. Click **Run** to see real results in the **Embedded preview**, which runs the web version of your app. Or run it on
   an Android emulator or a phone (see [Run on a device or emulator](../test/devices.md)). Skip **Windows** in the
   **Run on** menu: Nowa connects Firebase for web, Android, iOS and macOS, not for Windows or Linux apps.

You can also try a query out before you build it:

- **In the Firebase console.** Open your Firebase project, go to **Databases & Storage** → **Firestore** → **Data**
  and click the **Query builder** tab. Choose **Collection** and type the collection's name, click **Add to query**
  for each filter, then click **Run**. Once the results look right, build the same query in Nowa. Reads you make in the console count toward your
  Firestore usage. See Firebase's guide to [querying data in the console](https://firebase.google.com/docs/firestore/using-console#query_data).
- **In another version of Nowa.** Open the same project in the web app or the macOS desktop app, where the **Test**
  section is on. For a local project, make a cloud copy first with
  [Project Sync](../code/local-projects.md#link-a-cloud-copy-with-project-sync). In Nowa 3.13 the designer can't open a
  query in its editor on any platform: see [Add collections and queries in Nowa 3.13](../integrations/firebase/firestore.md#add-collections-and-queries).

## API tests fail in the web app but work elsewhere {#api-requests-blocked-in-the-browser}

In the web app, Nowa sends test requests from your browser. Browsers follow a safety rule called CORS: a web page may
only call an API that says it accepts calls from that page's address. If an API doesn't, the test fails in the web
app, even though the same request works in the desktop app and in your built mobile app.

To test it anyway, use the desktop app. If you run the API yourself, for example on a backend service you set up, look
in its settings for the list of allowed addresses (often called allowed origins or CORS) and add
`https://app.nowa.dev`. Your published web app runs in a browser too, so allow its address as well. See
[Connect a REST API](../integrations/rest-api/index.md).

## Continue with Apple is missing in the desktop app

**Continue with Apple** appears only in the web app and on iOS. In the desktop app, sign in with email or
**Continue with Google**. If you signed up with Apple, sign in from the web app or on iOS. See
[Create your account](../get-started/create-account.md).

## Google Maps shows a placeholder

The **Google Maps** widget shows "Run to preview" on the board. In **Play** and in a shared preview it says "Run on a
simulator/emulator or mobile device to preview". Neither draws a live map, so run your app to see the real one. See
[Add Google Maps](../integrations/google-maps.md).

## Ads show test ads

The **Admob Banner** widget and interstitial ads show Google's test ads (sample ads meant for testing) until you turn
**Show Test Ads** off, and real ads run only on Android and iOS. See [Show ads with AdMob](../integrations/admob.md).

## Instant Play is close, not exact

**Play** on the board runs your screens instantly, but it's an approximation. Its own tooltip says so: "In board
preview is not 100% accurate, run the app to see the real output". Use **Run** whenever you need to know how the real
app behaves. See [Preview and test](../test/index.md).

## Linux: the preview opens in your browser and updates are manual

The Linux desktop app has no in-app preview yet. When you run your app, the preview pane says "Your app is running" and offers **Open in Browser**. Click it to open your app in your browser. See [Run your app](../test/run.md#choose-where-to-run).

The Linux app doesn't update itself either. When a new version is out, the update message offers **Download v…** and **Skip**. To update, download the new archive and run `install.sh` again, as you did to install it. See [Install on Linux](../get-started/desktop-app.md#install-on-linux).

## The code download keeps spinning in the web app {#code-download-spinner}

After you click the zip in the **Code download** popup, its row keeps spinning and can't be clicked again. The download itself works, so check your browser's downloads. To download once more, close the popup and open it again. See [Download your code](../publish/download-code.md#download-the-zip).

## A pending custom domain can't be removed {#pending-custom-domain}

The trash icon in **Custom Domain** (**Remove custom domain**) appears only after Nowa has verified your domain. While it's still pending, you can't remove or change it yourself, so double-check the spelling before you click **Set**. If you need to change a pending domain, ask the Nowa team with **Chat with support**. See [Use your own domain](../publish/web.md#use-your-own-domain).

## Some letters don't type in the Variables list {#variables-list-rename}

When you name a new variable, param or function in the **Variables** list, or double-click one to rename it, the letters t, r, v and f can trigger board shortcuts instead of typing, and the rename may stop. Select the item and type the name in **Name** in **Details** instead, which takes every letter. See [Store data in variables](../logic/variables.md#add-a-variable).

## Shift + drag can drop a widget out of its screen {#shift-drag}

Holding <kbd>Shift</kbd> while you drag a widget keeps it on one axis, even when your pointer drifts off that line. If the pointer is outside the screen when you let go, the widget leaves the screen and becomes its own item on the board, even if it still looks inside. Keep the pointer inside the screen, or press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Z</kbd> once to put the widget back. To nudge a widget in a **Stack** along one axis, select it and press <kbd>Shift</kbd> + an arrow key, 10 pixels per press. See [Select, move and resize](../design/select-and-edit.md#move-widgets).

## A `/` you type in Details doesn't appear {#slash-in-details}

In Nowa 3.13, a `/` you type in a field in **Details** is dropped. Fields in Circuit aren't affected. A route path (the address of a screen, such as `/home`) typed in **Route Settings** loses its slashes, and **Problems** reports "Top-level route path must start with a leading slash". Type route paths in the Router panel instead: select the route and type the path in **Path**, which keeps every `/`. For other text with a `/`, such as a web address, paste it into the field. See [Give a screen a path](../logic/navigation.md#give-a-screen-a-path).

## Detach loses an instance's param values {#detach}

When you detach a component instance, its widgets still point at the component's params (the values each copy of the component gets, such as its title), and the values you gave that instance are lost. The board shows a red box such as "[title] is not found", while **Problems** lists nothing. Note the values before you detach. Afterwards, click each broken property's name, choose **Detach...** and type the value again, or link it to something else. See [Build reusable components](../design/components.md#edit-a-component-or-one-instance).

## Double-clicking on the board doesn't work {#new-ux-double-click}

If you turned on the **New UX** experimental flag, double-clicking a widget on the board doesn't go one level deeper or start editing its text, and the board's usual toolbar at the bottom is hidden. Turn the flag off: open **Settings** (the gear in the top bar) → **Project Details** → **Experimental flags** → **Edit**, switch off **New UX** and click **Apply**. Nowa saves your project and reopens it with the usual board. See [Experimental flags](../account/project-settings.md#experimental-flags).

## A widget dragged across the app bar keeps the app bar's size {#drag-across-app-bar}

When you drag a widget in a screen over the screen's app bar, the app bar takes it in while your pointer is there. If you carry on and drop it in the body or on the board, it keeps the size it had in the app bar: a Container can land as a thin line with a height of 0, and a Text or a Button gets a fixed width and height. Press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Z</kbd> to undo the drop, and keep the pointer off the app bar while you drag. See [Where a dragged widget lands](../design/select-and-edit.md#where-a-dragged-widget-lands).

## Reloading right after connecting Firebase loses the connection {#firebase-reload-after-connect}

In Nowa 3.13, if you reload the page or close Nowa soon after **Connect Apps**, the connection can be lost before it's saved. Your app then can't start, because a Firebase settings file it needs is gone, and **Settings** → **Integrations** → **Firebase** asks for your project again. To avoid it, save first: press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>S</kbd>, or click the save icon in the status bar, then **Save now**. The icon shows a check mark once everything is saved. If it already happened, connect again: Nowa reuses the Firebase apps it created, so you don't end up with duplicates in Firebase. See [Connect Firebase](../integrations/firebase/connect.md#connect-your-project).

## The status bar shows "Unsupported invalid type" {#invalid-type-in-status-bar}

After you turn on Firebase **Authentication**, the status bar can show a cut-off error that starts with "Unsupported operation: Unsupported invalid type InvalidType", while **Problems** says "No issues detected". Nothing has been found to stop working because of it, so you can carry on. See [Sign users in with Firebase](../integrations/firebase/auth.md).

## Stripe subscriptions can't be cancelled from your app {#stripe-cancel-subscription}

In Nowa 3.13, the cancel function that **Deploy Configuration** adds to your Supabase project has an error, so cancelling a subscription from your app fails, even though deploying ends with "Deployed successfully!". Until a fix ships, cancel subscriptions in your Stripe Dashboard: on the **Subscriptions** page, open the subscription's overflow menu, choose **Cancel subscription**, pick when it ends and confirm. Your Stripe webhook then updates the subscription's record in Supabase, so your app sees the change. See [Accept payments with Stripe](../integrations/stripe.md#fix-common-problems) and Stripe's guide to [cancelling subscriptions](https://docs.stripe.com/billing/subscriptions/cancel).

## Connecting Figma doesn't work right now {#figma-connect}

When you click the Figma icon in the chat field, or **Connect** next to Figma in your account settings, **Waiting for Authorization...** appears but no browser window opens, so Figma can't be linked. Click **Cancel**. Linking fails for every account, so until it's fixed you can't turn on the Figma connector unless your account was already linked to Figma. See [Connect Figma and Supabase to Nowa AI](../ai/connectors.md#connect-figma).

## The AI chat shows a grey box in the playground {#playground-ai-toolbar}

In the playground, before you sign in, the toolbar under the chat field can show as a grey box, and the mode menu and **Add context** don't open. Nowa AI needs an account anyway, and you can still get there: type your message and press <kbd>Enter</kbd>, and Nowa asks you to sign in. See [Try Nowa without an account](../get-started/playground.md).

## The Redirect Logic row keeps showing + {#redirect-logic-plus}

In the Router panel, after you click **+** next to **Redirect Logic**, Nowa adds the function at once, but the row can keep showing **+** for minutes. Don't click it again. Click `<>` in the top bar to open code mode, then `<>` again to come back: the row now shows the bolt button (**Edit Function**). The trip to code mode and back is only a way to refresh the panel. See [Start on the login screen or the home screen](../logic/router.md#start-on-login-or-home).

## The app shows an error when a screen loads data at start {#await-in-initstate}

In Nowa 3.13, if you turn on **await** for a step in a screen's **InitState Function** (the logic that runs when the screen opens), the screen shows an error when you run your app, with a message that includes "initState() returned a Future". **await** makes the whole start-up function wait, and Flutter, the toolkit your app is built on, doesn't allow that. Put the waiting steps in a function of their own, with **await** inside it, and call that function from **InitState Function** with **await** off. Or ask Nowa AI in **Agent** mode, for example: "Load the products in a separate function and call it when the screen opens, without awaiting it." Then click **Run** to check that the error is gone. See [Run logic when a screen opens or closes](../logic/functions.md#lifecycle).

## Next steps

- [Troubleshooting](index.md): find a fix by the message you see.
- [Get help](../account/help.md): chat with the Nowa team, report an issue or find the community.
