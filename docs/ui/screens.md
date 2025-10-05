---
sidebar_position: 3
title: Screens
description: Learn how to create, edit, and manage screens in Nowa.
---

Screens are the main building blocks of your app.  
Each screen represents a page or view — like a home page, settings page, or profile page.

This page explains how to create, rename, remove, and customize screens in Nowa.

---

## Creating a New Screen

To create a new screen:

1. Select the **Screen tool** from the **Toolbar**.  
2. Choose either an **empty screen** (with a default size) or start from one of the **available templates**.  
3. Give your screen a name.  
4. Click **Submit**.

<video controls width="720">
  <source src="/img/designer/Clipboard-20251002-101128-422.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

## Renaming a Screen

You can rename a screen in two ways:
- **Double-click** its name directly on the board.  
- Or select the screen, then click the **rename button** at the top of the **Details panel**.

---

## Adding Screens from the Files Panel

All screens you create are stored in the **Files panel**.  
You can drag and drop them from there onto your board to add them.

Each screen behaves like a **component** — which means:
- If you edit one instance of a screen, all other instances of that same screen will update automatically.  
- Dropping the same screen on multiple boards doesn’t create copies — it’s still the same screen file accessed from different places.

To separate a screen instance:
1. Right-click the screen on the board.  
2. Select **Detach**.

![](/img/designer/screens-pages.png)

---

## Removing Screens from the Board

To remove a screen from the board:
1. Right-click the screen on the board.  
2. Select **Remove**.

:::warning
Removing a screen from the board **does not delete it** from your project.  
It only removes it from the board view — the file will still exist in your **Files panel**.  
To permanently delete it, remove it from the **Files library**.
:::

---

## Screen Properties

Each screen has a set of properties you can view and edit in the **Details panel**.

![](/img/designer/screens-details-panel-1.png)

1. **Name** — Shows the screen name. You can rename it by clicking the **rename** button.  
2. **Open in a new tab** — Opens the screen as a separate file tab.  
3. **Layout** — Lets you change the screen’s position and size.  
4. **Group** — Screens are set to **Stack** by default. You can change the layout of its widgets to a **Column** or **Row**. Learn more in [Layout](./layout/).  
5. **Screen** — This wrapper defines the screen. If you remove it, the selected widget will no longer be a screen.  
6. **Color** — Changes the background color of the selected screen.  
7. **Navigation** — Add navigation widgets such as `Appbar`, `Floating action`, `Drawer`, or `Bottom navigation`.  
8. **Size** — Adjust the screen size or pick a preset size.  
9. **Make Home Screen** — Sets this screen as the **home screen**, making it the first one shown when the app runs.  
10. **Wrappers** — Add wrappers to your screen for extra layout control. Learn more in [Wrappers](./wrappers/).
