---
title: Data and state tips
description: Decide where each value lives, choose a backend, keep secrets out of your app, test queries before you build, and show loading and error states.
sidebar_label: Data and state tips
keywords: [state management, variables, parameters, global state, models, backend, Supabase, Firebase, REST API, secrets, API keys, constants, row level security, RLS, loading state, error state, Data Builder]
---

Data is where apps get tricky. Two habits fix most of it: keep each value in the place that fits it, and never let anything secret travel inside your app.

## Pick where each value lives

| The value is... | Use | Good to know |
|---|---|---|
| One screen's own and changes while the screen is open, such as a counter or a loading flag | A [variable](../logic/variables.md) | Add **refresh** after you change it, or the screen keeps showing the old value. |
| Handed to a screen or component from outside, such as the recipe to show | A [param](../logic/parameters.md) | Fixed once it arrives. To change it, copy it into a variable. |
| Shared by several screens, such as a cart or a setting | [Global state](../logic/global-state.md) | Call `notifyListeners` after a change and every widget that shows it updates. |
| Fixed and the same everywhere, such as a publishable key | A [constant](../integrations/constants.md) | It ships inside your app. |
| Small, and must survive closing the app, such as a chosen tab | [Shared Preferences](../logic/actions.md#save-values-on-the-device) | **SHARED PREFERENCES** → **set** and **get**. Values aren't encrypted, so keep private data out. |
| Belongs to a person, or is shared between people | Your backend | Supabase, Firebase or a REST API. |

Start local. Move a value to global state only when a second screen needs it.

## Describe your data with models

- Create one [model](../logic/models.md) per kind of thing, such as `Recipe` or `Task`. Nowa keeps its constructor, `fromJson` and `toJson` up to date.
- Let Nowa write them. Query Templates can create one for a table, **Generate Model** builds one from a tested REST response, and **Generate Models From Json...** builds them from sample JSON.
- Use a model as a param's type to hand a whole item to a screen or component, and as a list variable's type (**As List**). While they're empty, the board shows placeholder values shaped like your data.

## Choose a backend

| Choose | When you want |
|---|---|
| [Supabase](../integrations/supabase/connect.md) | Sign-in, a database and file storage in one place, or Stripe payments. |
| [Firebase](../integrations/firebase/connect.md) | Firebase sign-in with email, Google or phone, Cloud Firestore, or push notifications. |
| [A REST API](../integrations/rest-api/index.md) | Data that already lives behind an API: your own server, a public API or Xano. |

Nowa has no table editor, so create Supabase tables in Supabase or ask Nowa AI. Nowa AI can set up Supabase through its connector, but it can't connect Firebase for you. See [Connect data and services](../integrations/index.md).

## Keep secrets out of your app

Anything inside your app can be read by anyone who has it.

- **Constants ship in the app.** The **Constants** page talks about secret keys, but everything on it is compiled into your app.
- **Request settings ship too.** The base URL and the header values you type in a REST collection are saved in your project's code and go into the app.
- **Fine to ship:** publishable keys, client IDs, RevenueCat's public keys, and the Supabase URL and anon key.
- **Never ship:** a Stripe secret key, a database password or any server key. Nowa's Stripe setup keeps the secret key and the webhook secret in Supabase secrets, not in your app.
- **Let the server decide who sees what.** The Supabase anon key ships, so Row Level Security (RLS) must decide who can read and write. Turn it on for every table and write policies, or ask Nowa AI with the Supabase connector.
- **Keep the project private.** With **Public project** on, anyone with the link can read every file, **Constants** included. See [Share your app](../test/share.md).

## Test queries before you build the screen

- **Supabase:** click a function in the **Supabase** panel, fill in **Testing values** and click **Run**. If the table uses RLS, sign in first. **RLS Policy Error** means a policy blocked the call, and **Empty Result - Possible RLS Filtering** means a policy may be hiding rows. See [Test a function](../integrations/supabase/database.md#test-a-function).
- **REST API:** click **Test**, then **Run Test**. Check the **Json** and **Object** results, then click **Generate Model**. See [Test a request](../integrations/rest-api/index.md#test-a-request).
- **Firestore:** click **Run Test** in the **Queries** editor. Testing isn't possible in the Windows desktop app. In Nowa 3.13 the designer can't open a query in that editor: see [Test a query](../integrations/firebase/firestore.md#test-a-query) and [what works in Nowa 3.13](../integrations/firebase/firestore.md#add-collections-and-queries).

Tests run against your real backend, so create, update and delete calls change real data. Use a test project or throwaway rows.

## Show loading and error states

- A **Data Builder** shows a progress circle while it loads and the error in red if the call fails. Design your own under **Loading Widget** and **Error Builder**. See [Show data in your UI](../integrations/show-data.md).
- A source that returns nothing keeps the **Loading Widget** on screen. That's what **Get Record by ID** does when no row matches, so test an ID that doesn't exist.
- An empty list shows nothing. When your source returns a list, you can show a message instead. Put the list and the message in a **Column** inside the Data Builder and set the list's height to **Expand**. Wrap the message in **Visibility**, link **Visible** to `data`, then pick `isEmpty`.
- The board shows placeholder values, not a real call, so click **Play** to see real loading, results and empty lists. See [Placeholders on the board, real values in Play](../test/instant-play.md#placeholders-on-the-board-real-values-in-play).
- For a tap that calls a backend, such as save or sign-in, use **onValue** and **onError** under **Future Options**, and show a **Show snackbar** in **onError**. See [Wait for a result](../logic/circuit.md#future-options).

## Next steps

- [Build a complete app, start to finish](complete-app.md)
- [Test and ship with confidence](ship-tips.md)
