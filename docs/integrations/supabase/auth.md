---
title: Sign users in with Supabase
description: Let people sign up, sign in and sign out of your app with Supabase Authentication, and test it in the editor first.
sidebar_label: Sign users in
keywords: [Supabase auth, Supabase authentication, login, sign in, sign up, sign out, signIn, signUp, signOut, email and password, Testing as, login screen, Supabase user]
---

Supabase Authentication lets people create an account and sign in with an email and a password. When you connect Supabase, Nowa generates `signUp`, `signIn` and `signOut` for you. Test them in the editor, then call them from your own login screen.

## Before you start

- [Connect Supabase](connect.md).

## Meet the auth functions

The **Authentication** section of the **Supabase** panel lists three functions:

| Function | You give it | What it does |
|---|---|---|
| `signUp` | **Email**, **Password** | Creates a user in Supabase Authentication. |
| `signIn` | **Email**, **Password** | Signs in with an email and a password. |
| `signOut` | Nothing | Signs the current user out. |

The section also tells you who you're testing as: **Not logged in**, or **Testing as:** followed by an email. Functions that you or Nowa AI add to `SupabaseService` to sign users in, up or out show up here too.

## Test sign-up and sign-in

1. Click `signUp` under **Authentication**. The test panel opens at the bottom of the editor.
2. Under **Testing values**, type an **Email** and a **Password**.
3. Click **Run**. Supabase creates the user. If something goes wrong, the result area shows **Error:** and the message from Supabase.
4. Click `signIn`, then repeat steps 2 and 3 with the same **Email** and **Password**. The section now reads **Testing as:** and your email.
5. Test your other functions. They run as this user, the way they will in your app.
6. When you're done, run `signOut` to go back to **Not logged in**.

{/* CAPTURE: id=integrations-supabase-auth-1 | state: signed-in cloud project connected to Supabase, signIn clicked in the Authentication section with an email and password typed | show: the Authentication section reading "Testing as: ...", and the test panel with Testing values (Email, Password), Run and Edit Code | crop: Supabase panel + bottom test panel */}

The test uses your real Supabase project, so every `signUp` creates a real user. If your Supabase project asks new users to confirm their email, click the link in the confirmation email before `signIn` works.

Sign in before you test queries on tables that use Row Level Security (RLS). Signed out, such a query can come back empty or with an **RLS Policy Error**. See [Read and write Supabase data](database.md#test-a-function).

## Add sign-in to a login screen {#login-screen}

Call the functions from an event, such as a button's **On Pressed**. Here is the usual flow for a login screen.

1. Build the screen with two **Text Field** widgets and a button: see [Add widgets](../../design/add-widgets.md). To start from a ready-made design, pick the **Authentication Template** in the screen template picker: see [Start from a template](../../design/templates.md).
2. Optional: rename each Text Field's controller in the **Variables** panel, for example to `email` and `password`. Nowa gives every Text Field a controller that holds what the user types, and clear names make the next steps easier. See [Store data in variables](../../logic/variables.md).
3. Select the button. In **Details**, open its **On Pressed** event in [Circuit](../../logic/circuit.md): click **+** to create it, or **Edit** if it already has logic. See [Respond to taps and other events](../../logic/events.md).
4. Hover the dot under the top node until it becomes **+**, then click it. The **All nodes for this circuit** menu opens.
5. Search for `SupabaseService` and click it. Then click `signIn`.
6. In **Details**, click the **Email** label, open **LOCALS**, pick the email controller, then choose `text`. See [Expressions and conditions](../../logic/expressions.md).
7. Link **Password** the same way, with the password controller.
8. With the `signIn` node selected, find **Future Options** in **Details** and click **+** next to **onValue**. A new Circuit opens: add a **GoRouter** or **Navigator** node from **GLOBALS** that opens your home screen, then close it with **×**. See [Navigate between screens](../../logic/navigation.md).
9. Select the `signIn` node again, open **Future Options**, and click **Edit** next to **onError**. Add **Show snackbar**, so people see why signing in failed. Nowa pre-fills **onError** with a `print` of the error.
10. Click **Play** on the screen, enter the email and password of a user you created, and click the button. See [Play your app on the board](../../test/instant-play.md).

Sign-up works the same way with `signUp`. If your Supabase project asks for email confirmation, show a message such as "Check your email" in **onValue** instead of opening the home screen.

To sign people out, put `SupabaseService` → `signOut` on a button, and open the login screen in **onValue**.

:::tip
Or ask Nowa AI. In **Agent** mode, try: "Add a sign-in screen that uses SupabaseService and opens the home screen when it works." See [How Nowa AI works](../../ai/index.md).
:::

## Other ways to sign in

For Google sign-in with Supabase, set up your Google client IDs in **Settings** → **Integrations** → **Google Sign-In**, then ask Nowa AI to set it up with Supabase. See [Google Sign-In](../google-sign-in.md). For anything else Supabase Authentication offers, ask Nowa AI to add a function to `SupabaseService`, or write it in [code](../../code/custom-code.md).

## Next steps

- [Read and write Supabase data](database.md)
- [Store files in Supabase](storage.md)
- [Manage your Supabase backend](backend.md)
