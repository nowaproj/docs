---
title: Navigate between screens
description: Open, close and replace screens with GoRouter or Navigator, pass data between them, and open a detail screen when someone taps a list item.
sidebar_label: Navigate between screens
keywords: [navigation, navigate, route, path, GoRouter, go_router, Navigator, push, pop, go, replace, pushReplacement, pushAndRemoveUntil, deep link, query parameter, path parameter, home screen, Make home screen, Router panel, list item tap, detail screen]
---

Navigation takes people from one screen to another and back. New projects use GoRouter, where every screen has a path such as `/settings`. Older projects use Flutter's Navigator, and you can [switch them to GoRouter](./router.md#switch-an-older-project-to-gorouter).

## GoRouter or Navigator

| | GoRouter | Navigator |
|---|---|---|
| Used by | New projects (since Nowa 3.5) | Older projects |
| You point to a screen by | Its path, such as `/settings` | Picking the screen |
| Web URLs, browser back button, deep links | Supported | Limited or not out of the box |

Not sure which one your project uses? Click **Router** in the sidebar. A GoRouter project opens **Router Settings**. An older project opens **New Router System**: see [Switch an older project to GoRouter](./router.md#switch-an-older-project-to-gorouter).

## Give a screen a path

Each screen needs a route, the path that opens it. A new screen from the **Empty Page** template gets one automatically: its name in lowercase with hyphens, so `HomePage` becomes `/home-page`.

To set or change a path:

1. Select the screen (click its title on the board).
2. In **Details**, find **Route Settings**. It only appears in GoRouter projects.
3. Type a **Path**, such as `/settings`, and press <kbd>Enter</kbd>. If the screen has no route yet, Nowa creates it.

To make a screen the one your app opens first, click **Make home screen** in the screen's **Details**. Nowa adds a route if the screen has none and sets it as the start location. To open the home screen only for people who are signed in, see [Start on the login screen or the home screen](./router.md#start-on-login-or-home).

## Go to another screen

These steps are for GoRouter projects. For an older project, see [Use the Navigator](#use-the-navigator).

1. Open the logic that should navigate. For a button, click **Edit** next to **On Pressed** in **Details**: see [Respond to taps and other events](./events.md).
2. Hover the dot under the top node until it becomes **+**, and click it. In **All nodes for this circuit**, open **GLOBALS** and click **GoRouter**. Nowa adds a node that pushes the location `/path`.
3. In **Details**, choose the **Type**.
4. Replace the **Location** with your screen's path, such as `/settings`. It is plain text, so copy the path from **Route Settings**. To put a value in the path, type `$` and pick a variable.

| Type | What it does |
|---|---|
| `push` | Opens the screen on top of the current one, so people can go back. |
| `go` | Jumps to the screen and replaces the current ones. |
| `pushReplacement`, `replace` | Swaps the current screen for the new one. |
| `pop` | Closes the current screen and goes back. It can hand a **result** to the screen below. |
| `goNamed`, `pushNamed`, `pushReplacementNamed`, `replaceNamed` | The same actions by route name. The Router panel doesn't set route names, so use these for routes named in code. |

{/* CAPTURE: id=logic-navigation-1 | state: playground starter, the Button's On Pressed open in Circuit, a GoRouter node added from GLOBALS with Type go and Location /home-page | show: the GoRouter node in the circuit and Details with Type and Location | crop: Circuit panel and Details */}

The **Extra** field hands any object to the next route without putting it in the URL.

To go back with a value, add a **GoRouter** node with **Type** `pop` and set **result**. On the screen that opened it, select the `push` node, turn on **await** under **Future Options**, and use **Store result** to keep the value. See [Build logic in Circuit](./circuit.md).

In **Play**, a screen with a route starts your app's router at that path, so navigation works. A screen without a route plays on its own, with route-based navigation off.

:::tip Or ask Nowa AI
Try: "When I tap the Get Started button, open the Settings screen." See [How Nowa AI works](../ai/index.md).
:::

## Pass data to the next screen

The destination screen receives data through its **Params**, so add one there first: see [Pass data with parameters](./parameters.md). With GoRouter, the data travels in the path or after a question mark.

**Path parameter**, like the `42` in `/product/42`:

1. Select the destination screen, which needs a path. In **Details** → **Route Settings**, hover the **Route Parameters** row and click **+** (**Add Route Parameter**). Nowa adds `/:param1` to the **Path**. You can also type `/product/:id` into the **Path**.
2. Open the [**Router** panel](./router.md#open-the-router-panel) and select the route. Drag the parameter's chip onto the screen's parameter under **Screen Parameters**.
3. Navigate to `/product/` followed by `$` and a variable.

**Query parameter**, like the `shoes` in `/search?q=shoes`:

1. In the **Router** panel, select the route and click **+** (**Add Query Parameter**) under **Route Parameters**. Right-click the new chip, choose **Rename** and name it, for example `q`.
2. Drag the chip onto the screen's parameter under **Screen Parameters**.
3. Navigate to `/search?q=` followed by `$` and a variable.

Values arrive as text. If you drag a chip onto a parameter of another type, such as a whole number or a true/false value, Nowa adds the conversion for you.

## Open a detail screen when a list item is tapped {#open-a-detail-screen}

Tap a row in a list and open a screen about that row. Inside a list item, `element` is the row it shows, so every row can send its own id to the next screen.

Before you start, connect a list to a **List View** or **Grid View** in **Builder** mode: see [Fill a list from your data](../reference/widgets/lists.md#connect-a-list). The list can be a variable or the `data` of a **Data Builder**. Also set up the detail screen with a path such as `/product/:id`, using steps 1 and 2 of the **Path parameter** in [Pass data to the next screen](#pass-data-to-the-next-screen).

1. Select the item in the list. A **List Tile** has **On Tap** in **Details**. For any other widget, click **Add Wrapper** and choose **Gesture Detector** or **Ink Well**. See [Respond to taps and other events](./events.md).
2. Click the button next to **On Tap**, then add a **GoRouter** node as in [Go to another screen](#go-to-another-screen). Keep **Type** on `push`.
3. In **Location**, type `/product/` and then `$`. In the menu, open **LOCALS** and click `element`, the tapped row. The text now reads `/product/${element}`. Type `.id` after `element`, inside the braces, so it reads `/product/${element.id}`. Use the field that holds your id. If the item is a [component](../design/components.md) with an `id` param, add the tap inside the component and pick that param after `$` instead.
4. On the detail screen, wrap the widget that shows the row in a **Data Builder**. Set **Source** to **Supabase** and pick the function you made from the **Get Record by ID** template as the **Query**. Link its id input to the screen's param under **LOCALS**, then link the widgets inside to `data`. See [Show data in your UI](../integrations/show-data.md).
5. Click **Play** on the list screen and tap a row. The list screen needs a route for navigation to work in **Play**.

The path carries text, so this recipe sends the id and the detail screen loads the row. **Extra** can carry a whole row, but the Router panel can't connect it to a screen's param. In a Navigator project, you can send the whole row: give the destination's param your model as its type, then click the brush icon in the **Navigator** node, click the param's name and pick `element` under **LOCALS**. See [Use the Navigator](#use-the-navigator).

To have Nowa AI build it, ask in **Agent** mode: "When I tap a product in the list, open a detail screen that shows it."

## Use the Navigator

In a project that uses the Navigator, you pick the screen instead of typing a path.

1. Open the logic, hover the dot under a node and click **+**. In **GLOBALS**, click **Navigator**. Nowa adds a node that pushes a screen.
2. In **Details**, choose the **Type**.
3. Click **to** and pick the screen. The widget picker opens on its **Components** filter, which lists your screens and components.

| Type | What it does |
|---|---|
| `push` | Opens the screen on top of the current one. |
| `pop` | Closes the current screen and goes back. |
| `pushReplacement` | Replaces the current screen with the new one. |
| `pushAndRemoveUntil` | Opens the screen and removes every screen below it. |

To pass data, click the brush icon next to the screen. A popup lists the screen's parameters. Type a value, or click a parameter's name to link a variable, a parameter or an expression: see [Expressions and conditions](./expressions.md).

To return a result, add a **Navigator** node with **Type** `pop` on the second screen. Choose **result type** and set **result**. On the first screen, turn on **await** under **Future Options** for the push node and use **Store result**, or add your logic to **onValue**.

Navigator and GoRouter nodes need a screen's `context`. Add them to events and functions of screens and components, not to a global state's functions.

## Set up routes in the Router panel {#manage-routes-in-the-router-panel}

Add, nest and edit routes, choose the first screen, and switch an older project to GoRouter in [Set up routes in the Router panel](./router.md).

## Next steps

- [Pass data with parameters](./parameters.md) so a screen can receive values.
- [Deep links](../integrations/deep-links.md) to open your app from a link.
- [Create and set up screens](../design/screens.md) for the **Route Settings** and **Make home screen** controls.
