---
title: Set up routes in the Router panel
description: Add and arrange your app's routes, choose the screen that opens first, send signed-out people to a login screen with redirect logic, and switch an older project to GoRouter.
sidebar_label: Routes and the Router panel
keywords: [Router panel, Router Settings, routes, route, Add Route, Add Sub-Route, Router Configuration, Initial Location, Redirect Logic, "Remove # in URLs", Enable GoRouter, New Router System, migrate to GoRouter, first screen, start screen, home screen, login screen, signed in, splash screen, launch screen, redirect, route guard, isUserSignedIn, currentSession]
---

The Router panel lists every route in your app, the paths that open your screens. Add and arrange routes here, choose which screen opens first, and send people somewhere else when a screen shouldn't open for them yet, such as the home screen before they sign in.

It works in GoRouter projects, which new projects are. For an older project, see [Switch an older project to GoRouter](#switch-an-older-project-to-gorouter). To open one screen from another, see [Navigate between screens](./navigation.md).

## Open the Router panel

Click **Router** in the sidebar, below the divider under the other panel icons. **Router Settings** opens in the workspace with your routes on the left and the selected route's settings on the right. The route icon (**Open Router Editor**) in a screen's **Route Settings** opens it too.

{/* CAPTURE: id=logic-navigation-2 | state: playground starter, Router icon clicked, the home route selected | show: the Routes list on the left and the route details on the right (Path, Screen, Route Parameters, Screen Parameters) | crop: Router Settings view */}

## Add, nest and delete routes

In the **Routes** list:

- Click **+** (**Add Route**) and choose **Route** to add a route. Then set its **Path** and **Screen**.
- Hover a route and click **+** (**Add Sub-Route**) to nest a route inside it. To move a route, drag it onto another route to nest it, or onto a route's top or bottom edge to place it at that route's level. A moved route goes to the end of its new list.
- Right-click a route and choose **Delete Route**. A **Remove Route** dialog warns that the route's child routes go too.

## Edit a route

Select a route to edit it:

| Setting | What it does |
|---|---|
| **Path** | The route's own path, which can contain parameters like `:id`. **Full Path** shows it with its parents' paths. |
| **Screen** | The screen the route shows. Click it to pick another one. The bolt button (**Edit Function**) opens the route's builder in Circuit. |
| **Route Parameters** | Path and query parameters as chips. Path chips carry a red `*`. Right-click a chip to **Rename** or **Delete** it. |
| **Screen Parameters** | The screen's own params, shown when it has any. Drag a chip onto one to feed it. |
| **Redirect Logic** | A function that can send people elsewhere, for example to a login screen. Click **+** (**Add Redirect Logic**), then the bolt button to open it in Circuit. See [Start on the login screen or the home screen](#start-on-login-or-home). |

## Set options for the whole app

Click the gear (**Router Configuration**) for app-wide settings:

| Setting | What it does |
|---|---|
| **Initial Location** | The path the app opens first. It must start with `/`. |
| **Redirect Logic** | A redirect for every route. |
| **Remove # in URLs** | Cleaner web links. |

## Start on the login screen or the home screen {#start-on-login-or-home}

People who are signed in shouldn't have to log in every time they open your app. Give your home screen's route **Redirect Logic** that checks for a signed-in person before the screen opens, and sends everyone else to the login screen.

**Redirect Logic** is a function. It receives `context` and `state` (where the person is heading) and returns a path, such as `/login-page`, to send them there, or nothing (`null`) to let the screen open. A new one returns nothing, so it lets everyone through until you add a condition.

Before you start:

- Your project uses GoRouter. If it doesn't, see [Switch an older project to GoRouter](#switch-an-older-project-to-gorouter).
- Sign-in works. See [Sign users in with Supabase](../integrations/supabase/auth.md) or [Sign users in with Firebase](../integrations/firebase/auth.md).
- Your home screen and your login screen each have a path, such as `/home-page` and `/login-page`. See [Name the route](../design/screens.md#name-the-route). Screens from the **Authentication Template** start without one: see [Start from a template](../design/templates.md).

1. Select your home screen and check that **Details** says **This is the home screen**. If it doesn't, click **Make home screen**.
2. Click **Router** in the sidebar and select the route that shows your home screen.
3. Next to **Redirect Logic**, click **+** (**Add Redirect Logic**), then click the bolt button (**Edit Function**). Circuit opens in a floating panel.
4. Hover the dot under the top node, click **+** and choose **Add If statement**.
5. In **Details**, click the **Condition** label and link a check that tells you whether someone is signed in:
   - **Firebase:** open **FIREBASE** and click `isUserSignedIn`.
   - **Supabase:** click **Custom Expression...**, type `Supabase.instance.client.auth.currentSession != null` and press <kbd>Enter</kbd>. Nowa adds no ready-made check for Supabase. This one asks the Supabase library for the current session, which is empty when nobody is signed in.
6. Click the dot in the **False** branch, choose **Add Return**, and set **Return** to your login screen's path, such as `/login-page`. Leave the **True** branch empty.
7. Close Circuit with **×**.

{/* CAPTURE: id=logic-router-1 | state: signed-in cloud project connected to Firebase with Authentication on, Router panel open, the home route selected, Redirect Logic added and opened in Circuit with an If statement whose Condition is isUserSignedIn and a Return in the False branch set to /login-page | show: the Circuit panel with the If node (empty True branch, Return in the False branch) and Details showing Condition | crop: Circuit panel and Details */}

A signed-in person now opens the home screen, because the **Return** node below the **If** still returns nothing. Anyone else goes to `/login-page`. Your login screen should open the home screen when sign-in works, and a sign-out button should open the login screen: the two sign-in pages above show how.

Add the same **Redirect Logic** to every other screen that needs sign-in. The app-wide **Redirect Logic** under **Router Configuration** runs for every route, including the login screen, so a route's own is the simpler choice here.

### Stay signed in between launches

Supabase and Firebase both save the session on the device and restore it when the app starts. Nowa starts them with their default settings, in `lib/main.dart`, before your first screen opens, so the check finds the person who signed in last time.

### Test it

Run the app, sign in, close it and open it again. The home screen should open without the login screen. See [Run your app](../test/run.md#run-your-app) or [Run on a device or emulator](../test/devices.md). **Play** doesn't sign in to Firebase and `isUserSignedIn()` returns false there, so check this in the real app: see [Test sign-in in Nowa](../integrations/firebase/auth.md#test-sign-in-in-nowa).

:::tip Or ask Nowa AI
In **Agent** mode, try: "When the app opens, show the home screen if someone is signed in, and the login screen if not." For Supabase, you can also ask for a function in `SupabaseService` that tells you whether someone is signed in. Open the result in the Router panel to check it. See [Design, Plan and Agent modes](../ai/modes.md).
:::

## Fix route problems

Nowa lists route problems, such as duplicate paths, a route without a builder, or an initial location with no route, in the **Problems** console: see [Find and fix problems](../test/problems.md).

## Switch an older project to GoRouter

1. Click **Router** in the sidebar to open **New Router System**, which compares Navigator (**Legacy**) with GoRouter (**Recommended**).
2. Click **Enable GoRouter**.
3. Read the **Confirm Action** dialog and click **Confirm**. **Migrating to New Router** shows the progress, then the Router panel opens.

:::warning
Switching can't be undone. If your project uses named routes, update your navigation afterwards.
:::

## Next steps

- [Navigate between screens](./navigation.md): open screens from a tap and pass data to them.
- [Sign users in with Supabase](../integrations/supabase/auth.md) or [Sign users in with Firebase](../integrations/firebase/auth.md): the login screen that goes with it.
- [Deep links](../integrations/deep-links.md): open your app from a link.
