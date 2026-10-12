---
title: Data and state tips
description: Decide where each value lives, choose a backend, keep secrets out of your app, test queries before you build, and show loading and error states.
sidebar_label: Data and state tips
keywords: [state management, variables, parameters, global state, models, backend, Supabase, Firebase, REST API, secrets, API keys, constants, row level security, RLS, loading state, error state, Data Builder]
---

Data is where apps get tricky: a cart that forgets its items, a list that never loads, a key that leaks. Two habits prevent most of it. Keep each value in the place that fits it, and never let anything secret travel inside your app.

## Pick where each value lives

Every value in your app, from a counter to a person's cart, needs a home. This table helps you pick one.

| The value is... | Use | Good to know |
|---|---|---|
| One screen's own and changes while the screen is open, such as a counter or a loading flag | A [variable](../logic/variables.md) | In Circuit, add **refresh** (it redraws the screen) after you change it, or the screen keeps showing the old value. |
| Handed to a screen or component from outside, such as the recipe to show | A [param](../logic/parameters.md) | Fixed once it arrives. To change it, copy it into a variable. |
| Shared by several screens, such as a cart or a setting | [Global state](../logic/global-state.md) | Add **notifyListeners** after a change: it tells every screen that shows this data to update. |
| Fixed and the same everywhere, such as a publishable key (one that's safe to share) | A [constant](../integrations/constants.md) | It ships inside your app. |
| Small, and must survive closing the app, such as a chosen tab | [Shared Preferences](../logic/actions.md#save-values-on-the-device) | **SHARED PREFERENCES** → **set** and **get**. Values aren't encrypted, so keep private data out. |
| Belongs to a person, or is shared between people | Your backend | Supabase, Firebase or a REST API. |

Start local. Move a value to global state only when a second screen needs it.

## Describe your data with models

A model describes one kind of thing in your app, such as a recipe with its title, description and ingredients.

- Create one [model](../logic/models.md) per kind of thing, such as `Recipe` or `Task`. Nowa keeps it up to date as you add and remove fields, including the part that turns data from your backend into a recipe and back.
- Let Nowa write them. Query Templates can create one for a table, **Generate Model** builds one from a tested REST response, and **Generate Models From Json...** builds them from sample JSON (the text format most online services use to send data).
- Use a model as a param's type to hand a whole item to a screen or component, and as a list variable's type (**As List**). While they're empty, the board shows placeholder values shaped like your data.

## Choose a backend

A backend is the online service that stores your app's data and signs people in.

| Choose | When you want |
|---|---|
| [Supabase](../integrations/supabase/connect.md) | Sign-in, a database and file storage in one place, or Stripe payments. |
| [Firebase](../integrations/firebase/connect.md) | Firebase sign-in with email, Google or phone, Cloud Firestore, or push notifications. |
| [A REST API](../integrations/rest-api/index.md) | Data that already lives behind an API: your own server, a public API or Xano. |

Nowa has no table editor, so ask Nowa AI in **Agent** mode to create your Supabase tables through its Supabase connector, or [create them in Supabase](../integrations/supabase/database.md#create-a-table). Nowa AI can set up Supabase this way, but it can't connect Firebase for you. See [Connect data and services](../integrations/index.md).

## Keep secrets out of your app

Anything inside your app can be read by anyone who has a copy of it, so treat everything in it as public.

- **Constants ship in the app.** The **Constants** page talks about secret keys, but everything on it is built into your app.
- **Request settings ship too.** The base URL (the service's address) and the header values (extra details sent with every request, often keys) that you type in a REST collection are saved in your project and go into the app.
- **Fine to ship:** publishable keys, client IDs, RevenueCat's public keys, and the Supabase URL and anon key (your Supabase project's public key).
- **Never ship:** a Stripe secret key, a database password or any server key. Nowa's Stripe setup keeps the secret key and the webhook secret (which proves that payment updates really come from Stripe) in Supabase secrets, stored in your Supabase project, not in your app.
- **Let the server decide who sees what.** The Supabase anon key ships, so Row Level Security (RLS) must decide who can read and write each row. Turn it on for every table and add rules (policies): ask Nowa AI in **Agent** mode with the Supabase connector, for example "Turn on Row Level Security for every table so people only see their own rows", or set it up in Supabase. Then test your queries while signed in (see below).
- **Keep the project private.** With **Public project** on, anyone with the link can read every file, **Constants** included. See [Share your app](../test/share.md).

## Test queries before you build the screen

A query is a request for data, such as "all recipes" or "this person's orders". Try each one on its own first, so a broken screen doesn't hide a broken query.

- **Supabase:** click a function in the **Supabase** panel, fill in **Testing values** and click **Run**. If the table uses RLS, sign in first. **RLS Policy Error** means a policy blocked the call, and **Empty Result - Possible RLS Filtering** means a policy may be hiding rows. See [Test a function](../integrations/supabase/database.md#test-a-function).
- **REST API:** click **Test**, then **Run Test**. Check the **Json** and **Object** results, then click **Generate Model**. See [Test a request](../integrations/rest-api/index.md#test-a-request).
- **Firestore:** click **Run Test** in the **Queries** editor. Testing isn't possible in the Windows desktop app. In Nowa 3.13 the designer can't open a query in that editor: see [Test a query](../integrations/firebase/firestore.md#test-a-query) and [what works in Nowa 3.13](../integrations/firebase/firestore.md#add-collections-and-queries).

Tests run against your real backend, so create, update and delete calls change real data. Use a test project or throwaway rows.

## Show loading and error states

People notice when a screen sits blank or fails silently. Plan for both.

- A **Data Builder** shows a progress circle while it loads and the error in red if the call fails. Design your own under **Loading Widget** and **Error Builder**. See [Show data in your UI](../integrations/show-data.md).
- A source that returns nothing keeps the **Loading Widget** on screen. That's what **Get Record by ID** does when no row matches, so test an ID that doesn't exist.
- An empty list shows nothing. When your source returns a list, show a message instead. Ask Nowa AI in **Agent** mode, for example: "When the recipe list is empty, show the message No recipes yet." To do it yourself, put the list and the message in a **Column** inside the Data Builder and set the list's height to **Expand**. Wrap the message in **Visibility**, link **Visible** to `data`, then pick `isEmpty` (true when the list has no items).
- The board shows placeholder values, not a real call, so click **Play** to see real loading, results and empty lists. See [Placeholders on the board, real values in Play](../test/instant-play.md#placeholders-on-the-board-real-values-in-play).
- A tap that calls a backend, such as save or sign-in, takes a moment, so its step has **Future Options** (a Future is something that finishes later). Use **onValue** for what happens when it works and **onError** for when it fails, and add **Show snackbar** in **onError** so people get a short message. See [Wait for a result](../logic/circuit.md#future-options).

## Next steps

- [Build a complete app, start to finish](complete-app.md)
- [Test and ship with confidence](ship-tips.md)
