---
title: Build a complete app, start to finish
description: Build one realistic app, a recipe list with sign-in and a detail screen, from the first prompt to a published app.
sidebar_label: Build a complete app
keywords: [tutorial, walkthrough, complete app, login, list and detail, Supabase, publish]
---

Go from one sentence to a published app with sign-in, a list and a detail screen. You build Recipe Box: people sign in, see recipes and tap one to read it. Each step links to the page that covers it in depth, so you can swap in your own idea.

## Before you start

- A Nowa account. Nowa AI needs one. See [Create your account](../get-started/create-account.md).
- A [Supabase](https://supabase.com) account for the backend.
- To publish: a cloud project on a paid plan. See [Get ready to publish](../publish/index.md).

## 1. Describe the app

On the dashboard, keep the **Design** chip and describe the whole app in the box under **What do you want to build?**:

> A recipe box app. People sign in with email and password. The home screen lists recipes with a title and a short description. Tapping a recipe opens a detail screen with the ingredients and the steps.

Click the send button (tooltip **Build it**). Nowa AI designs the screens on your board with demo data. Answer any **Questions** card, then wait for **Your app design is complete**. Design mode builds the look and flow only. You make it work next, by hand or in **Agent** mode.

![The editor after the Recipe Box Design run: the board (highlighted) shows the recipe list home screen, the sign-in screen and the recipe detail screen side by side, and the AI Assistant panel shows the Your app design is complete card (highlighted) with the Make it real button.](/img/docs/guides/guides-complete-app-1.png)

Details: [Build your first app](../get-started/first-app.md), [Design, Plan and Agent modes](../ai/modes.md).

## 2. Refine it by hand

1. Open **Themes**, set your colors and text styles, and link your widgets to them. Details: [Create and edit themes](../design/themes.md), [Use theme colors and text styles](../design/theme-styles.md).
2. Select the recipe card, right-click and choose **Create component**. Name it `RecipeCard`, add the params `id`, `title` and `description`, and link the card's texts to them. Details: [Build reusable components](../design/components.md).
3. Set text fields and cards to **Expand** so they fill the width, then try the **Size** presets. Details: [Design for every screen size](../design/responsive.md).
4. Hover a screen's title and click **Play** to tap through it.

:::tip
Prefer to let Nowa AI do the wiring? Click **Make it real** on the design card, or switch to **Agent** mode, turn on the Supabase connector and ask for one feature at a time. Unsure what to ask? Start in **Plan** mode. See [Get the best from Nowa AI](ai-tips.md).
:::

## 3. Connect Supabase

Click **Supabase** in the left sidebar, then **Connect**. Approve Nowa in the browser, then click **Select** next to a project, or **Create New Project**. Nowa adds the Supabase package and a `SupabaseService` with `signUp`, `signIn` and `signOut`.

Nowa has no table editor, so create the table in Supabase, or ask Nowa AI. In **Agent** mode, click the Supabase icon in the chat field and ask:

> Create a recipes table with a uuid id, a title, a description, ingredients and steps. Signed-in people can read it but not change it. Add three sample recipes.

Approve each action Nowa AI asks about. Row Level Security (RLS) decides who can read and write.

Details: [Connect Supabase](../integrations/supabase/connect.md), [Connect Figma and Supabase to Nowa AI](../ai/connectors.md).

## 4. Add sign-in

1. In the **Supabase** panel, click `signUp` under **Authentication**. Type an **Email** and a **Password** under **Testing values** and click **Run**.
2. Run `signIn` with the same values, after you confirm the email if Supabase asks. The section now reads **Testing as:** and your email.
3. Use the login screen Nowa AI designed, or add the **Authentication Template** with the **Screen** tool. Its two screens, login and register, come without routes, so give each screen you open a path in **Route Settings**.
4. Select the login button, open its **On Pressed** and add `SupabaseService` → `signIn`. Link **Email** and **Password** to the `text` of your text fields' controllers.
5. Select the `signIn` node. Under **Future Options**, let **onValue** open the recipe list with a **GoRouter** node of type `go`, with the list screen's path in **Location**. Add **Show snackbar** to **onError** so people see what went wrong.
6. Select the login screen and click **Make home screen**.

Want signed-in people to skip the login screen? Make the recipe list your home screen instead of the login screen, then give its route **Redirect Logic** that sends everyone else to the login screen. See [Start on the login screen or the home screen](../logic/router.md#start-on-login-or-home).

For a sign-out button, call `signOut` and open the login screen in **onValue**.

Details: [Sign users in with Supabase](../integrations/supabase/auth.md#login-screen), [Start from a template](../design/templates.md), [Navigate between screens](../logic/navigation.md).

## 5. Show the recipes

1. In the **Supabase** panel, click **+** next to **Generate a Query**, then **Query Templates**. If it says **No Tables Found**, click **Fetch Tables**. Choose **Get All Records**, pick your recipes table, click **Create new model class** and **Generate Function**. Repeat for **Get Record by ID** and pick your model under **Use Existing Model**. Nowa names each function after its action and your table, so a `recipes` table gives `getAllRecipes` and `getByIdRecipes`.
2. Make sure **Testing as:** shows your email, then click `getAllRecipes` and **Run**. The result lists your sample recipes.
3. Select the recipe **List View** (or add one), click **Add Wrapper** and choose **Data Builder**. Set **Source** to **Supabase** and **Query** to `getAllRecipes`.
4. Select the List View. If **Type** shows **Normal**, choose **Builder**. Click **List**, open **LOCALS** and pick `data`.
5. Set **Item Builder** to `RecipeCard` with **Pick Widget**, then link each of its params to the matching field of `element`.

The Data Builder shows a progress circle while it loads and the error if the call fails.

Details: [Read and write Supabase data](../integrations/supabase/database.md), [Show data in your UI](../integrations/show-data.md), [Lists and grids](../reference/widgets/lists.md).

## 6. Open the detail screen

1. Add an `id` param to the detail screen. Its **Type** must match the `id` that `getByIdRecipes` takes: keep `String`, the default, because the table's `id` is a uuid. In **Route Settings**, set its **Path** to `/recipe/:id`. Open the **Router** panel, select the route and drag the `id` chip onto the screen's `id` param under **Screen Parameters**.
2. Open `RecipeCard` on its own: in the [Library](../design/library.md), double-click it, or select it and press <kbd>Enter</kbd>. Select its main widget, click **Add Wrapper** and choose **Gesture Detector**. Open **On Tap** and add a **GoRouter** node of type `push`. Type `/recipe/` in **Location**, then `$` and pick the `id` param.
3. On the detail screen, wrap the content in a **Data Builder** with **Source** set to **Supabase** and **Query** set to `getByIdRecipes`. Link its `id` input to the screen's `id` param, then show the fields of `data`.

Details: [Open a detail screen when a list item is tapped](../logic/navigation.md#open-a-detail-screen).

## 7. Test it

1. Hover the login screen's title and click **Play**. Sign in, open a recipe and go back.
2. Click **Run** to try the real app in a phone frame. The red number in the status bar counts the errors in **Problems**.
3. Try it on a phone. In a cloud project, **Open on Mobile** shows a QR code. In the desktop app, pick your device in the **Run on** menu.

Details: [Preview and test](../test/index.md), [Run on a device or emulator](../test/devices.md).

## 8. Publish

<Badge type="cloud" /> <Badge type="paid" />

Set the basics in **Settings** → **Project Details**: **App Name**, **Bundle Identifier** (replace the `com.example` start), **Build version**, **Build number** and **App Icon**. Under **Permissions**, switch on what the app needs.

- **Web:** click **Deploy**, then **Deploy** on the **Web** row. Nowa builds the site and shows its address.
- **Google Play:** open **Settings** → **Deployment** → **Android**. To test, turn on **Debug mode** and click **Build** for an `.apk`. For the store, turn it off, click **Generate** for a signing key, download the key and keep it safe, click **Build**, then upload the `.aab` in Google Play Console.
- **App Store:** open **Settings** → **Deployment** → **iOS**, save your App Store Connect credentials and a distribution certificate, then click **Build**. Nowa sends the build to App Store Connect.

Details: [Publish to the web](../publish/web.md), [Publish to Google Play](../publish/android.md), [Publish to the App Store](../publish/ios.md). Before you publish, work through the [publish checklist](ship-tips.md#publish-checklist).

## Next steps

That's the whole loop. Keep going:

- Let people add and edit recipes with the **Create Record**, **Update Record** and **Delete Record** templates, once your policies allow it. See [Read and write Supabase data](../integrations/supabase/database.md).
- Polish the result with the [Design tips](design-tips.md), and keep your data safe with the [Data and state tips](data-and-state-tips.md).
- To update a published app, publish again. For Google Play and the App Store, raise **Build number** first. See [Ship an update](../publish/index.md#ship-an-update).
