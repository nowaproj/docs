---
title: Widget catalog
description: Every built-in widget in Nowa's widget picker, grouped by what it does, with what each one needs and links to the pages that cover the rest.
keywords: [widgets, widget list, widget catalog, widget picker, built-in widgets, container, text, text field, icon, sizedbox, empty widget, image, svg, button, icon button, floating button, group, tabview, list view, grid view, swipeable stack, page view, indexed stack, cross fade, wrap, data builder, video player, youtube player, lottie, rive, animated container, loading indicator, progress indicator, checkbox, switch, popup menu button, dropdown menu, slider, pin code field, app bar, bottom navigation bar, navigation bar, drawer, list tile, expansion tile, alert dialog, admob banner, web view, html, markdown, google maps, revenuecat paywall, request a widget]
---

Nowa comes with 45 ready-made widgets, from a plain **Container** to a Google map. This page lists every one, what it does and what it needs, and points you to the page that covers the ones with extra setup.

## Find a widget in the picker

- Press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd> with a board open, or click **Widget** in the toolbar. Type part of a name and press <kbd>Enter</kbd>. [Add widgets](../../design/add-widgets.md) has the full steps, including drag and drop.
- Your own components appear in the same list. Under **Search for:**, choose **Components** to see only them, or **BuiltIn** to see only the widgets on this page.
- Missing a widget? Click **Request a Widget** in the picker's search bar, describe it and click **Submit Request**.

With nothing typed, the picker lists the widgets in the order of the tables below, without group headings. The groups here are only to help you browse.

Nine widgets need a Flutter package: SVG, Swipeable Stack, YouTube Player, Lottie, Rive, Pin Code Field, Admob Banner, Google Maps and RevenueCat Paywall. When you pick one, Nowa opens **Add Missing Dependencies**, and clicking **Add** installs the package and places the widget. See [Add a widget that needs a package](../../design/add-widgets.md#add-a-widget-that-needs-a-package).

{/* CAPTURE: id=reference-widgets-1 | state: playground starter open, press Ctrl+K (or click Widget in the toolbar), type svg and keep SVG highlighted | show: the widget picker with Search for a widget, Request a Widget, the Search for: All / BuiltIn / Components chips, the SVG row highlighted and its preview card with the description, the Dependencies list and Open Documentation | crop: the picker dialog and preview */}

## Basic

| Widget | What it does | Good to know |
|---|---|---|
| <span id="container"></span>**Container** | A box you can fill with a color, gradient or image, and give a border, rounded corners, a shadow, padding and margin. It holds one widget. | Starts as a gray box. The **Shape** tool draws one. Also available as a [wrapper](../wrappers.md#container). |
| <span id="text"></span>**Text** | Text in a single style. | Starts as "Write something". Type `$` in the text to insert a variable: see [Expressions and conditions](../../logic/expressions.md#dollar). |
| <span id="textfield"></span>[**Text Field**](./forms.md) | A box where people type. | Nowa creates a variable such as `text` and links it to **Controller**. You can add validators to check what people type. |
| <span id="icon"></span>**Icon** | One icon from the Material icon set. | Starts as a star outline. Choose the icon, **Size** and **Color** in **Details**: see [Fonts and icons](../../design/fonts-icons.md#choose-an-icon). |
| <span id="empty-widget"></span>**SizedBox** | An empty box of a fixed size, for spacing or to reserve room. | Starts 100 by 100. Earlier docs called it Empty widget. |

## Images

| Widget | What it does | Good to know |
|---|---|---|
| <span id="image"></span>[**Image**](./media.md) | A picture from a web address, from your project's assets or from bytes. | Choose **Network**, **Asset** or **Bytes**. On **Asset**, click **Pick Image** to choose a file or upload one. |
| <span id="svg"></span>[**SVG**](./media.md) | A vector image (`.svg`) from the web or from a file you upload. | Needs the `flutter_svg` package. Click **Pick SVG** on the **Asset** tab. Only `.svg` files are accepted. |

## Buttons

| Widget | What it does | Good to know |
|---|---|---|
| <span id="button"></span>**Button** | A button that runs an action when pressed. | Its label is a Text widget inside it and starts as "Button". Click **+** next to **On Pressed** to build the action: see [Respond to taps and other events](../../logic/events.md). |
| <span id="icon-button"></span>**Icon Button** | A tap target that shows only an icon. | Starts with the "add" icon. It has the same events as Button: **On Pressed**, **On Long Press** and **On Hover**. |
| <span id="floating-action-button"></span>[**Floating Button**](./navigation.md) | A round button that floats above the content of a screen. | Starts with the "add" icon. Drop it on a screen and it goes into the screen's floating button slot. |

## Layout

| Widget | What it does | Good to know |
|---|---|---|
| <span id="group"></span>[**Group**](../../design/layout.md#groups) | Arranges widgets stacked on top of each other (Stack), side by side (Row) or top to bottom (Column). | Starts as an empty Stack. Switch the arrangement in **Details**. |
| <span id="tabview"></span>[**TabView**](./navigation.md) | Tabs, with a page for each. | Starts with two tabs, "Tab1" and "Tab2", and a text page for each. |
| <span id="listview"></span>[**List View**](./lists.md) | A scrolling list. In **Builder** type it repeats one item for every entry of a list. In **Normal** type you add the widgets yourself. | Starts in **Builder** with three placeholder items. Click **Connect** next to **List** to use a list variable. |
| <span id="gridview"></span>[**Grid View**](./lists.md) | A scrolling grid, with the same **Builder** and **Normal** choice. | Starts in **Builder** with two columns and three placeholder items. |
| <span id="swipeable-stack"></span>[**Swipeable Stack**](./lists.md) | A deck of cards that people swipe away. | Needs the `flutter_card_swiper` package and creates a `swiperController` variable. The board draws at most two cards. |
| <span id="pageview"></span>[**Page View**](./navigation.md) | Pages that people swipe between, one at a time, with a row of dots underneath. | Starts with two pages. The dots are a separate indicator on top of the pages: choose its style with **Effect type**. |
| <span id="index-stack"></span>[**Indexed Stack**](./navigation.md) | Widgets on top of each other, where only the one at **Index** shows. | Link **Index** to a variable to switch content, for example the `pageIndex` of a Bottom Navigation Bar. |
| <span id="cross-fade"></span>[**Cross Fade**](./navigation.md) | Fades between two widgets, **First Child** and **Second Child**. | Starts with two placeholder boxes and a 200 ms **Duration**. **Cross Fade State** picks which one shows. |
| <span id="wrap"></span>**Wrap** | Lays widgets out in a row (or column) and continues on a new line when it runs out of room. | Starts empty. Set the gaps with **Spacing** and **Run Spacing**. See [Lay out widgets](../../design/layout.md#scroll-or-wrap-content). |
| <span id="data-builder"></span>[**Data Builder**](../../integrations/show-data.md) | Loads data and builds the widgets inside it from the result, with a loading state and an error state built in. | Pick a **Source**: **API Request**, **Supabase** or **Firestore**. Also available as a [wrapper](../wrappers.md#data-builder), which is usually easier. |

## Players

| Widget | What it does | Good to know |
|---|---|---|
| <span id="video-player"></span>[**Video Player**](./media.md) | Plays a video from a web address or from a file you upload, with player controls. | Click **Pick Video** on the **Asset** tab to use a file. The board shows a placeholder, not the video. |
| <span id="youtube-player"></span>[**YouTube Player**](./media.md) | Plays a YouTube video inside your app. | Needs the `youtube_player_flutter` package. Type the video id in **Initial Video Id**. The board shows the video's thumbnail and title. |

## Animations

| Widget | What it does | Good to know |
|---|---|---|
| <span id="lottie"></span>[**Lottie**](./media.md) | Plays a Lottie animation (`.json`) from the web or from a file you upload. | Needs the `lottie` package. Click **Pick Lottie** on the **Asset** tab. Only `.json` files are accepted. |
| <span id="rive"></span>[**Rive**](./media.md) | Plays a Rive animation (`.riv`). | Needs the `rive` package. Click **Pick Rive** on the **Asset** tab. Once the file loads, choose an **Artboard** and a **State Machine**. |
| <span id="animated-container"></span>**AnimatedContainer** | A container that animates when its properties change. | Starts with a 300 ms **Duration** and a gray fill. Also available as a [wrapper](../wrappers.md#animated-container). |

## Progress indicators

| Widget | What it does | Good to know |
|---|---|---|
| <span id="loading-circular"></span>**Circular Progress Indicator** | A spinning ring that shows something is loading. | Spins until you set **Value**, a number from 0 to 1. |
| <span id="linear-progress-indicator"></span>**Linear Progress Indicator** | A loading bar. | Starts 200 wide. Like the circular one, it shows a fixed amount once you set **Value** (0 to 1). |

## Forms

| Widget | What it does | Good to know |
|---|---|---|
| <span id="checkbox"></span>**Checkbox** | A tick box. | Starts checked. **Value** is its state and **On Changed** runs when someone taps it. |
| <span id="switch"></span>**Switch** | An on/off switch. | Starts on. **Value** is its state and **On Changed** runs when someone flips it. |
| <span id="popup-menu-button"></span>**Popup Menu Button** | A button that opens a small menu. | Starts labeled "Popup Menu" with one item, "Item 1". **On Selected** runs when someone picks an item. |
| <span id="dropdown-menu"></span>[**Dropdown menu**](./forms.md) | A dropdown for choosing one option from a list. | Starts with one option, "first". Add more under **Items**. |
| <span id="slider"></span>**Slider** | A slider for choosing a number between **Min** and **Max**. | Starts at 0.5. **On Changed** runs as the thumb moves. |
| <span id="pin-code-field"></span>[**Pin Code Field**](./forms.md) | Boxes for typing a short one-time code (OTP). | Needs the `pin_code_fields` package and creates a `pinCode` variable. **Pin Code Length** goes up to 6. |

## Screen components

| Widget | What it does | Good to know |
|---|---|---|
| <span id="appbar"></span>[**App Bar**](./navigation.md) | The bar at the top of a screen, with a title and actions. | Starts with the title "Title". Drop it on a screen and it becomes the screen's app bar. |
| <span id="navigation-bar"></span>[**Bottom Navigation Bar**](./navigation.md) | A row of tabs at the bottom of a screen. | Starts with two items, "home" and "call". Nowa creates a `pageIndex` variable and links **Current Index** and **On Tap** to it. |
| <span id="drawer"></span>[**Drawer**](./navigation.md) | A side menu that slides in over a screen. | Drop it on a screen and it goes into the screen's drawer slot. Also available as a [wrapper](../wrappers.md#drawer). |
| <span id="listtile"></span>**List Tile** | One row with a title and optional leading, subtitle and trailing widgets. | Starts with the title "Tile". Typically used as the item of a **List View**. **On Tap** makes the row tappable. |
| <span id="expansion-tile"></span>**Expansion Tile** | A tile that expands to show more widgets. | Starts with the title "Tile" and one placeholder child. Put the hidden widgets in **Children**. **Initially Expanded** opens it from the start. |
| <span id="alert-dialog"></span>**Alert Dialog** | A pop-up box with a title, content and action buttons. | Starts with the title "Hello". To show it in a running app, add a `showDialog` step in logic: see [Show dialogs, sheets, snackbars and pickers](../../logic/popups.md#show-a-dialog). |

## Integrations

| Widget | What it does | Good to know |
|---|---|---|
| <span id="admob-banner"></span>[**Admob Banner**](../../integrations/admob.md) | A banner ad. | Needs the `nowa_mobile_ads` package and your App IDs in **Settings** → **Integrations**. Test ads are on by default. |
| <span id="webview"></span>[**Web View**](./media.md) | A web page inside your app. | Starts at `https://nowa.dev`. Nowa adds `https://` if you leave it out. The board shows a placeholder: run your app to see the page. |
| <span id="html"></span>[**Html**](./media.md) | Formatted text written in HTML. | Starts as `<h1>Hello World</h1>`. Type or paste your HTML in **Data**. |
| <span id="markdown"></span>[**Markdown**](./media.md) | Formatted text written in Markdown. | Starts as `# Hello World`. Type or paste your Markdown in **Data**. **Selectable** lets people select the text. |
| <span id="google-maps"></span>[**Google Maps**](../../integrations/google-maps.md) | An interactive map with markers, polygons and custom styling. | Needs the `google_maps_flutter` package and your API keys in **Settings** → **Integrations**. The board shows a placeholder: run your app to see the map. |
| <span id="revenuecat-paywall"></span>[**RevenueCat Paywall**](../../integrations/revenuecat.md) | A ready-made paywall screen for in-app purchases and subscriptions. | Needs the `purchases_flutter` and `purchases_ui_flutter` packages and your RevenueCat keys in **Settings** → **Integrations**. The board shows a placeholder. |

:::tip Or ask Nowa AI
Not sure which widget you need? Try "Add a card with a photo, a title and a Buy button." Nowa AI picks the widgets for you, and you can still adjust them on the board.
:::

## Next steps

- [Add widgets](../../design/add-widgets.md) from the picker, the toolbar, drag and drop, or paste.
- [Change widget properties](../../design/properties.md) in **Details**.
- [Wrappers](../wrappers.md) add padding, taps, scrolling and more around a widget.
- [Lay out widgets](../../design/layout.md) with groups, rows and columns.
