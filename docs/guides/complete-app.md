---
title: Build a complete app, start to finish
description: Follow one realistic app, a recipe list with sign-in and a detail screen, from the first prompt to a published app, with a link to the detailed page for every step.
sidebar_label: Build a complete app
keywords: [tutorial, walkthrough, complete app, login, list and detail, Supabase, publish]
---

This walkthrough builds Recipe Box. People sign in, see a list of recipes and tap one to read it. Each step is short and links to the page that covers it in depth, so you can follow along, or swap in your own idea.

## Before you start

- A Nowa account. Nowa AI needs one. See [Create your account](../get-started/create-account.md).
- A [Supabase](https://supabase.com) account for the backend.
- To publish: a cloud project on a paid plan. See [Get ready to publish](../publish/index.md).

## 1. Describe the app

Start wide. On the dashboard, keep the **Design** chip and describe the whole app in **What do you want to build?**:

> A recipe box app. People sign in with email and password. The home screen lists recipes with a title and a short description. Tapping a recipe opens a detail screen with the ingredients and the steps.

Click the send button (**Build it**). Nowa AI designs the screens on your board with demo data. Answer any **Questions** card, then wait for **Your app design is complete**. Design mode builds the look and flow only. Making the app work comes next, by hand or in **Plan** and **Agent** mode.

{/* CAPTURE: id=guides-complete-app-1 | state: cloud project after a Design-mode run of the recipe box prompt | show: the board with the login, list and detail screens and the design-complete card | crop: whole editor window */}

Details: [Build your first app](../get-started/first-app.md), [Design, Plan and Agent modes](../ai/modes.md).

## 2. Refine it by hand

You can change everything Nowa AI built, visually.

1. Open **Themes**, set your colors and text styles, and link your widgets to them. Details: [Create and edit themes](../design/themes.md), [Use theme colors and text styles](../design/theme-styles.md).
2. Select the recipe card, right-click and choose **Create component**. Name it `RecipeCard`, add the params `id`, `title` and `description`, and link the card's texts to them. Details: [Build reusable components](../design/components.md).
3. Set text fields and cards to **Expand** so they fill the width, then try the **Size** presets. Details: [Design for every screen size](../design/responsive.md).
4. Hover a screen's title and click **Play** to tap through the demo.

:::tip
Prefer to let Nowa AI do more of the wiring? Click **Make it real** on the design card, or switch to **Agent** mode, turn on the Supabase connector and ask for one feature at a time, such as "Connect the login screen to Supabase and open the recipe list when it works." Not sure what to ask for? Start in **Plan** mode. See [Get the best from Nowa AI](ai-tips.md).
:::

## 3. Connect Supabase

Click **Supabase** in the left sidebar, then **Connect**. Approve Nowa in the browser, then click **Select** next to a project, or **Create New Project**. Nowa adds the Supabase package and a `SupabaseService` with `signUp`, `signIn` and `signOut`.

Nowa has no table editor, so create the table in Supabase, or ask Nowa AI. In **Agent** mode, click the Supabase icon in the chat field and ask:

> Create a recipes table with a title, a description, ingredients and steps. Signed-in people can read it but not change it. Add three sample recipes.

Approve each action Nowa AI asks about. Row Level Security (RLS) is what decides who can read and write.

Details: [Connect Supabase](../integrations/supabase/connect.md), [Connect Figma and Supabase to Nowa AI](../ai/connectors.md).

## 4. Add sign-in

1. In the **Supabase** panel, click `signUp` under **Authentication**. Type an **Email** and a **Password** under **Testing values** and click **Run**. Then run `signIn`, after you confirm the email if Supabase asks. The section reads **Testing as:** and your email.
2. Use the login screen Nowa AI designed, or add the **Authentication Template** with the **Screen** tool, which gives you a login and a register screen. A template with several files adds no routes, so give each screen a path in **Route Settings**.
3. Select the login button, open its **On Pressed** and add `SupabaseService` → `signIn` with the email and password fields.
4. Select the `signIn` node. Under **Future Options**, let **onValue** open the recipe list with a **GoRouter** node of type `go`, with the list screen's path in **Location** (set one in **Route Settings** if it has none). Let **onError** show a **Show snackbar** so people see what went wrong.
5. Select the login screen and click **Make home screen**.

For a sign-out button, call `signOut` and open the login screen in **onValue**.

Details: [Sign users in with Supabase](../integrations/supabase/auth.md#login-screen), [Start from a template](../design/templates.md), [Navigate between screens](../logic/navigation.md).

## 5. Show the recipes

1. In the **Supabase** panel, click **+** next to **Generate a Query**, then **Query Templates**. Choose **Get All Records**, pick your recipes table, click **Create new model class** and **Generate Function**. Repeat for **Get Record by ID** and pick your model under **Use Existing Model**.
2. Make sure **Testing as:** shows your email, then click `getAllRecipes` and **Run**. You should see your sample recipes.
3. Select the recipe **List View** (add one from the widget picker if your screen has none), click **Add Wrapper** and choose **Data Builder**. Set **Source** to **Supabase** and **Query** to `getAllRecipes`.
4. Select the List View and click **List** (it reads **Connect**). Open **LOCALS** and pick `data`. Set **Item Builder** to `RecipeCard` with **Pick Widget**, then link its params to `element`.

The Data Builder shows a progress circle while it loads and the error if the call fails.

Details: [Read and write Supabase data](../integrations/supabase/database.md), [Show data in your UI](../integrations/show-data.md), [Lists and grids](../reference/widgets/lists.md).

## 6. Open the detail screen

1. Add an `id` param to the detail screen. In **Route Settings**, set its **Path** to `/recipe/:id`. In the **Router** panel, drag the path parameter onto the screen's `id` param.
2. Open `RecipeCard` on its own (double-click it in the **Widgets** panel), select its main widget, click **Add Wrapper** and choose **Gesture Detector**. Open **On Tap** and add a **GoRouter** node of type `push`. Type `/recipe/` in **Location**, then `$` and pick the `id` param.
3. On the detail screen, wrap the content in a **Data Builder** with **Source** set to **Supabase** and **Query** set to `getByIdRecipes`. Link its `id` input to the screen's `id` param, then show the fields of `data`.

Details: [Navigate between screens](../logic/navigation.md#pass-data-to-the-next-screen), [Pass data with parameters](../logic/parameters.md).

## 7. Test it

1. Hover the login screen's title and click **Play**. Sign in, open a recipe and go back. A screen with a route starts your app's router at that path, so navigation works.
2. Click **Run** to try the real app in a phone frame. The red number in the status bar counts the errors in **Problems**.
3. Try it on a phone. In a cloud project, **Open on Mobile** shows a QR code. In the desktop app, pick your device in the **Run on** menu.

Details: [Preview and test](../test/index.md), [Run on a device or emulator](../test/devices.md).

## 8. Publish

<Badge type="cloud" /> <Badge type="paid" />

Set the basics in **Settings** → **Project Details**: **App Name**, **Bundle Identifier** (replace the `com.example` start), **Build version**, **Build number** and **App Icon**. Under **Permissions**, switch on what the app needs.

- **Web:** click **Deploy**, then **Deploy** on the **Web** row. Nowa builds the site and shows its address.
- **Google Play:** open **Settings** → **Deployment** → **Android**. Test with **Debug mode**, which builds an `.apk`. Turn it off, click **Generate** for a signing key, download the key and keep it safe, click **Build**, then upload the `.aab` in Google Play Console.
- **App Store:** save your Apple credentials and a distribution certificate, then build.

Details: [Publish to the web](../publish/web.md), [Publish to Google Play](../publish/android.md), [Publish to the App Store](../publish/ios.md). Before you publish, work through the [publish checklist](ship-tips.md#publish-checklist).

## Next steps

You have walked the whole loop, from one sentence to an app ready to ship. Keep going:

- Let people add and edit recipes with the **Create Record**, **Update Record** and **Delete Record** templates, once your policies allow it. See [Read and write Supabase data](../integrations/supabase/database.md).
- Polish the result with the [Design tips](design-tips.md), and keep your data safe with the [Data and state tips](data-and-state-tips.md).
- To update a published app, raise **Build number** and publish again. See [Test and ship with confidence](ship-tips.md).
