---
sidebar_position: 4
title: Global States
description: How to create and use global states
---

# Global State

Global states in Nowa allow you to store data that is accessible from anywhere in your app — no matter which screen or component you're on. This is perfect for things like shopping carts, user sessions, settings, or any other shared data that multiple parts of your app need to read or update.

Global state in Nowa behaves just like `ChangeNotifier` in Flutter. That means it holds data and can notify any widgets listening to it whenever that data changes.

---

## 📦 Why Use Global State?

Let’s say you’re building an **e-commerce app**. You probably want to store:
- A list of products added to the cart.
- A total price.
- Functions to `addToCart` or `removeFromCart`.

This is a great case for global state!

Other examples:
- **Water Tracker App**: Track the daily water intake and goal across screens.
- **User Auth**: Store logged-in user data and update it from anywhere.
- **Theme Toggle**: Store dark/light mode selection and use it throughout the app.

---

## 🛠️ Creating a Global State

To create a global state:

1. In the **Files** panel, next to the `lib` folder, click on `+`.
2. Choose `New Global State`.
3. Give it a name (like `CartState`). You’ll see:
   - `Class`: Follows Dart best practices (CapitalCase).
   - `Path`: The file name and location (snake_case).
   You can click either to customize.
4. Click **Submit**.

You’ll find the new Dart file under the `lib` folder unless you changed the location.

<video controls width="850">
  <source src="/img/vars-params-functions/global-state/create_global_state.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

:::tip[Alternative Way]
You can also create a global state from the `Variables` panel on the board (when nothing is selected). Just look for the `Globals` section and click `Create global state`.
:::

:::note[Naming Convention]
When naming a global state:
- `Class` becomes the Dart class name.
- `Path` becomes the file name.
You can customize both before submitting.
:::

---

## ➕ Adding Variables and Functions

Click once on the global state file to open its editor:

- Click `+` next to **Variables** to add one.
  - Set name, type, default value, and whether it's `final`.
- Click `+` next to **Functions** to add logic.

<video controls width="850">
  <source src="/img/vars-params-functions/global-state/add_to_global_state.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

In this video:
- We created a `cartItems` variable, a `List<Product>`.
- We added a function `addToCart(Product product)` to add products to that list.

:::note[Final Variables]
Global states are single instances, so when you set a variable as `final` with a default value, it cannot be changed later.
This is different from models, where each instance can have different values.
:::

---

## 🔗 Adding the Global State to the App

Before using the global state in your UI, you must add it to the app:

1. On the **Board**, while nothing is selected, go to the right-side `Variables` panel.
2. Under `Globals`, click `Pick Global State`.
3. Choose the one you created earlier.

<video controls width="850">
  <source src="/img/vars-params-functions/global-state/adding_global_state.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

:::warning[Don't Skip This Step]
If you don’t add the global state to the app, it won’t show up when connecting to UI components.
:::

---

## 🧩 Connecting UI to a Global Variable

To display or use a global variable in your UI:

1. Select a property in the **Details** panel (like `List` for `ListView` widget).
2. In the linking menu, go to `Globals`, then pick your global state, then choose the variable you want to connect the field to.

<video controls width="850">
  <source src="/img/vars-params-functions/global-state/connecting_to_global_state.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

In the video:
- We connected a `ListView` to `cartItems` in `CartState`.
- We then connected each placeholder’s `product` parameter to the `element` in the list. (`element` is a variable created by the `ListView` where it presents a single item from the list itself. For more, check out [ListView widget](../ui/widgets/widget-desc/listview.md) 

Now the ListView is connected to the `cartItems` list from the global state. But, if the list changed (new item was added), the UI won't update by itself. To do so, continue to the next sections:

---

## 🔄 Updating Global Variables

To trigger UI updates after changing a variable in a global state, use the `notifyListeners` node that exist inside any global state.

- It’s available only when building functions **inside** the global state itself under `locals` category (as a local function)
- It updates any widget that’s listening to a variable from that global state.

<video controls width="850">
  <source src="/img/vars-params-functions/global-state/add_to_cart_function.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

Here’s what we did in the video:

- In the `addToCart` function we created earlier inside the `CartState` global state, we called the `add` method on the `cartItems` list.  
- We passed the `product` parameter (which was received by the function) to the `add` method, adding it to the `cartItems` list.  
- Since the value of `cartItems` changed (a new item was added) and there’s a `ListView` in the UI listening to this list, we called `notifyListeners` from the `Locals` category to update the UI and reflect the new data.


:::note[Access Scope]

When working inside a global state file, it's important to understand how variable access works:

- Any variable or function that you define **within the same global state** will appear under the `Locals` category. That’s because from the perspective of the function you’re building, these elements are local to the current file — even though they are technically global to the app.

- If you need to access variables or functions from a **different global state**, you’ll find them under the `Globals` category. This helps keep things organized and avoids confusion between what's defined in the current global state and what exists in others.

For example, when you’re implementing a function like `addToCart` inside `CartState`, you’ll see `cartItems` under `Locals`. But if you had another global state called `UserState` and wanted to access the current user from there, you’d find it under `Globals`.
:::

:::warning[Avoid Calling `notifyListeners` From Outside]

Technically, `notifyListeners` is a public method and can be called from outside the global state.  
However, **you should avoid doing that**, as it's not recommended and breaks the principle of encapsulation.

Instead, follow best practices:
- Create a **function** inside the global state that updates the necessary variables and calls `notifyListeners` internally.
- Call that function from other parts of the app.

This keeps your state management clean, predictable, and easier to maintain.
:::

---

## 🧠 Calling a Global Function

To use a global function inside your logic:

1. In the **Circuit**, click on a node connector.
2. Go to the `Globals` section and pick the global state.
3. In the **Details** panel, click `+` under `Expression`, then select the function that is inside the global state.

If the function:
- Has parameters → you’ll see fields to fill them.
- Returns a result → you can store it in a variable to use later.

For more, read about [functions](./functions/create-local-function.mdx)

<video controls width="850">
  <source src="/img/vars-params-functions/global-state/use_add_to_cart.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

In the video, we used a component that displays a single product item called `item_cart` — this component serves as the placeholder inside a `ListView` that shows all available products on the home screen.

- Inside the component, there's an icon button that allows the user to add the displayed product to the shopping cart.
- To implement this functionality, we opened the `On Pressed` event for that icon and called the `addToCart` function from the `CartState` global state.
- We passed a variable called `product` — a parameter of the component itself that holds the current product — into the `addToCart` function though the `product` parameter of the function.
- By calling the function `addToCart`, it added the product to the `cartItems` list in `CartState` and triggered `notifyListeners` as we implemented it earlier, which updated any widget that’s listening to `cartItems` (like the `ListView` in the cart screen).

At the end of the video, we ran the app starting from the home screen:
- The user browses the product list.
- Tapping the add-to-cart icon triggers the `On Pressed` event.
- The product gets added to the cart and `notifyListeners` to update the cart screen.
- When the user taps the cart icon in the top right corner and navigates to the cart screen, they see the list of items they added — thanks to the `ListView` being connected to the `cartItems` list.

As a bonus, we also showed a **Snackbar** with the product name to confirm that it was successfully added to the cart.  

For more on how to show snackbars, check out [using Snackbars](../logic/ui-popups/snackbar.md).

---
:::tip[💧 Example: Water Tracker App] 

In our **Water Tracker** tutorial, we used a global state called `WaterState` to:
- Store a list of water intakes.
- Store the daily goal.
- Add and delete logs.

Watch the tutorial starting from 7:58 for the steps and logic involved in dealing with global state for that usecase.

<iframe width="560" height="315" src="https://www.youtube.com/embed/cnrIhGEGIeE?si=w5VkTLLqA2uskH64&amp;start=478" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
:::

---

## ✅ Wrapping Up

Global states help you manage app-wide data in a clean and consistent way.

They’re powerful when:
- You have shared data across multiple screens or components.
- You want to avoid passing data manually between screens.
- You want automatic updates when data changes.

Try it out by managing your cart, user session, app settings, or anything that should persist across your app.

Now you’re ready to build smarter, state-aware apps in Nowa!

