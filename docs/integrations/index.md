---
title: Connect data and services
description: Pick a backend, show its data on your screens, and add payments, ads, maps and sign-in with Nowa's integrations.
sidebar_label: Overview
keywords: [integrations, data connections, backend, database, API, REST API, Supabase, Firebase, Stripe, RevenueCat, AdMob, Google Maps, Google Sign-In, deep links, payments, ads, Data Builder, constants, API keys, settings, Add Missing Dependencies]
---

Give your app real data and real services: sign-in, a database, payments, ads and maps. Nowa connects them, writes the code and lets you test requests and queries in the editor.

## Choose a backend

| | Supabase | Firebase | REST API |
|---|---|---|---|
| Good for | [Sign-in](./supabase/auth.md), a [database](./supabase/database.md) and [file storage](./supabase/storage.md) in one place. Stripe builds on it. | [Sign-in](./firebase/auth.md) with Email/Password, Google or Phone, the [Cloud Firestore](./firebase/firestore.md) database and [push notifications](./firebase/notifications.md). | Any service that speaks HTTP: your own server, a public API or Xano. |
| What you get | A `SupabaseService` with sign-in functions, query and storage templates, and a panel to test them. | Your Android, iOS and web apps registered in Firebase, the config files and a `FirebaseService`. | A collection per API, with requests you test and turn into models. [Import](./rest-api/import.md) from Swagger, Postman, Xano or cURL. |
| Start here | [Connect Supabase](./supabase/connect.md), from the **Supabase** panel in the left sidebar | [Connect Firebase](./firebase/connect.md), from **Settings** → **Integrations** → **Firebase** | [Connect a REST API](./rest-api/index.md), from the **Api** panel in the left sidebar |

## Show the data on your screens

A **Data Builder** loads data from a request, a Supabase function or a Firestore query. It shows a loading widget while it waits and gives the widgets inside it the result as `data`. See [Show data in your UI](./show-data.md).

## Add payments, ads, maps and more

Each has a settings page with an **Enabled** switch. If Firebase handles Google sign-in, the **Google Sign-In** page shows **Managed by Firebase** instead.

- [Stripe](./stripe.md): one-time, consumable and subscription payments. Builds on Supabase.
- [RevenueCat](./revenuecat.md): in-app purchases and subscriptions, with a ready-made paywall.
- [AdMob](./admob.md): banner and full-screen ads on Android and iOS.
- [Google Maps](./google-maps.md): an interactive map on any screen.
- [Google Sign-In](./google-sign-in.md): sign-in with Google without Firebase, for example with Supabase.
- [Deep links](./deep-links.md): open your app from a custom URL scheme, or from links on your own domain on Android.

Maps, ads and paywalls come with widgets: **Google Maps**, **Admob Banner** and **RevenueCat Paywall**. If a widget's package is missing, Nowa shows **Add Missing Dependencies** when you add it. Click **Add**: Nowa adds the package, then places the widget. See [Add a widget that needs a package](../design/add-widgets.md#add-a-widget-that-needs-a-package).

## Find your settings and keys

Click the gear (**Settings**) in the top bar, or press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>,</kbd>. Under **Integrations** you find **Firebase**, **Stripe**, **RevenueCat**, **AdMob**, **Google Maps**, **Google Sign-In** and **Deep Links**. Supabase and REST APIs have their own panels in the left sidebar.

{/* CAPTURE: id=integrations-index-1 | state: playground starter open; click the gear in the top bar; the Integrations group visible in the left list | show: the Settings window showing the General group (Project Details, Packages, Constants) and the Integrations group (Google Maps, AdMob, RevenueCat, Deep Links, Google Sign-In, Stripe, Firebase) | crop: left list of the settings window */}

**Constants**, under **General**, holds your own values and the keys some integrations use, such as Stripe and RevenueCat. Everything there ships inside your app, so keep server secrets out of it. See [Keys and constants](./constants.md).

:::tip[Or ask Nowa AI]
In **Agent** mode, paste a cURL command and ask: "Add a request for this and show the results in a list on the home screen." To let Nowa AI work on your Supabase backend, turn on the Supabase connector first. See [Connect Figma and Supabase to Nowa AI](../ai/connectors.md).
:::
