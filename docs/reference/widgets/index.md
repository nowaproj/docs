---
title: Widget catalog
description: Every built-in widget in Nowa's Library, grouped by what it does, with what each one needs and links to the pages that cover the rest.
keywords: [widgets, widget list, widget catalog, widget picker, built-in widgets, container, text, text field, icon, sizedbox, empty widget, image, svg, button, icon button, floating button, group, tabview, list view, grid view, swipeable stack, page view, indexed stack, cross fade, wrap, data builder, video player, youtube player, lottie, rive, animated container, loading indicator, progress indicator, checkbox, switch, popup menu button, dropdown menu, slider, pin code field, app bar, bottom navigation bar, navigation bar, drawer, list tile, expansion tile, alert dialog, admob banner, web view, html, markdown, google maps, revenuecat paywall, request a widget, loading circular, index stack, lottie animation, rive animation, webview, listtile, floating action button, appbar, tabs, elevated button, text form field, dropdown menu item, card swiper, otp]
---

Nowa comes with 45 ready-made widgets, from a plain **Container** to a Google map. This page lists every one, what it does and what it needs, and points you to the page that covers the ones with extra setup.

## Find a widget in the Library {#find-a-widget-in-the-picker}

- Press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd> with a board open, or click **Widget** in the toolbar. The [Library](../../design/library.md) opens with its search ready. Type part of a name and press <kbd>Enter</kbd>. [Add widgets](../../design/add-widgets.md) has the full steps, including drag and drop.
- The widgets on this page are under **Built-in**, in groups such as **Basic**, **Buttons** and **Layout**. Your own screens and components are under **Project**. **Filter** limits the list to one kind of thing. Its default, **Widgets**, shows screens, components and widgets.
- Missing a widget? The Library has no request link. Open the widget picker dialog instead (select an empty container and click **+**, for example), click **Request a Widget** in its search bar, describe it and click **Submit Request**.

The Library lists the built-in widgets by group, not in the order of the tables below. The groups on this page follow the same ones, only to help you browse.

Nine widgets need a Flutter package: SVG, Swipeable Stack, YouTube Player, Lottie, Rive, Pin Code Field, Admob Banner, Google Maps and RevenueCat Paywall. If your project doesn't have the package yet, Nowa opens **Add Missing Dependencies** when you add one with <kbd>Enter</kbd>, a double-click or **Insert**. Clicking **Add** installs the package and places the widget. See [Add a widget that needs a package](../../design/add-widgets.md#add-a-widget-that-needs-a-package).

![The widget picker dialog with svg typed in the search box. The SVG row is selected, and its preview card shows the description, the Dependencies list with flutter_svg (highlighted) and the Open Documentation link.](/img/docs/reference/reference-widgets-1.png)

The Library's details card shows a preview, the name and the first lines of the description, but no **Dependencies** list or **Open Documentation** link. The picture above is the widget picker dialog, which has both.

## Basic

| Widget | What it does | Good to know |
|---|---|---|
| <Anchor id="container" />**Container** | A box you can fill with a color, gradient or image, and give a border, rounded corners, a shadow, padding and margin. | Holds one widget. The **Shape** tool draws one. Also a [wrapper](../wrappers.md#container). |
| <Anchor id="text" />**Text** | Text in a single style. | Type `$` in the text to insert a variable: see [Expressions and conditions](../../logic/expressions.md#dollar). |
| <Anchor id="textfield" />[**Text Field**](./forms.md) | A box where people type. | Nowa creates a variable such as `text` and links it to **Controller**. You can add validators to check the input. |
| <Anchor id="icon" />**Icon** | One icon from the Material icon set. | Pick the icon, **Size** and **Color** in **Details**: see [Fonts and icons](../../design/fonts-icons.md#choose-an-icon). |
| <Anchor id="empty-widget" />**SizedBox** | An empty box of a fixed size, for spacing or to reserve room. | Earlier docs called it Empty widget. |

## Images

| Widget | What it does | Good to know |
|---|---|---|
| <Anchor id="image" />[**Image**](./media.md) | A picture from a web address, from your project's assets or from bytes. | Choose **Network**, **Asset** or **Bytes**. On **Asset**, **Pick Image** chooses a file or uploads one. |
| <Anchor id="svg" />[**SVG**](./media.md) | A vector image (`.svg`) from the web or from a file you upload. | Needs the `flutter_svg` package. Use **Pick SVG** on the **Asset** tab (`.svg` files only). |

## Buttons

| Widget | What it does | Good to know |
|---|---|---|
| <Anchor id="button" />**Button** | A button that runs an action when pressed. | Its label is a Text widget inside it. Click **Edit** next to **On Pressed** to build the action: see [Respond to taps and other events](../../logic/events.md). |
| <Anchor id="icon-button" />**Icon Button** | A tap target that shows only an icon. | Same events as Button: **On Pressed**, **On Long Press** and **On Hover**. |
| <Anchor id="floating-action-button" />[**Floating Button**](./navigation.md) | A button that floats above the content of a screen. | Drop it on a screen and it goes into the screen's floating button slot. |

## Layout

| Widget | What it does | Good to know |
|---|---|---|
| <Anchor id="group" />[**Group**](../../design/layout.md#groups) | Arranges widgets stacked on top of each other (Stack), side by side (Row) or top to bottom (Column). | Starts as an empty Stack. Switch the arrangement in **Details**. |
| <Anchor id="tabview" />[**TabView**](./navigation.md) | Tabs, with a page for each. | Starts with two tabs, "Tab1" and "Tab2". |
| <Anchor id="listview" />[**List View**](./lists.md) | A scrolling list: **Builder** repeats one item for each entry of a list, **Normal** holds widgets you add yourself. | Starts in **Builder** with three placeholder items. Click **Connect** next to **List** to use a list variable. |
| <Anchor id="gridview" />[**Grid View**](./lists.md) | A scrolling grid with the same **Builder** and **Normal** choice. | Starts in **Builder** with two columns and three placeholder items. |
| <Anchor id="swipeable-stack" />[**Swipeable Stack**](./lists.md) | A deck of cards that people swipe away. | Needs the `flutter_card_swiper` package and creates a `swiperController` variable. The board draws at most two cards. |
| <Anchor id="pageview" />[**Page View**](./navigation.md) | Pages that people swipe between, one at a time, with a row of dots at the bottom. | The dots are a separate indicator on top of the pages: choose its style with **Effect type**. They come from the `smooth_page_indicator` package: see [Swipe between pages](./navigation.md#page-view). |
| <Anchor id="index-stack" />[**Indexed Stack**](./navigation.md) | Widgets on top of each other, where only the one at **Index** shows. | Link **Index** to a variable to switch content, for example the `pageIndex` of a Bottom Navigation Bar. |
| <Anchor id="cross-fade" />[**Cross Fade**](./navigation.md) | Fades between two widgets, **First Child** and **Second Child**. | **Cross Fade State** picks which one shows. **Duration** sets the fade time. |
| <Anchor id="wrap" />**Wrap** | Lays widgets out in a row (or column) and continues on a new line when it runs out of room. | Set the gaps with **Spacing** and **Run Spacing**. See [Lay out widgets](../../design/layout.md#scroll-or-wrap-content). |
| <Anchor id="data-builder" />[**Data Builder**](../../integrations/show-data.md) | Loads data and builds the widgets inside it from the result, with loading and error states. | Pick a **Source**: **API Request**, **Supabase** or **Firestore**. Also a [wrapper](../wrappers.md#data-builder), which keeps the widget you already built. |

## Players

| Widget | What it does | Good to know |
|---|---|---|
| <Anchor id="video-player" />[**Video Player**](./media.md) | Plays a video from a web address or from a file you upload, with player controls. | Use **Pick Video** on the **Asset** tab for a file. The board shows a placeholder, not the video. |
| <Anchor id="youtube-player" />[**YouTube Player**](./media.md) | Plays a YouTube video inside your app. | Needs the `youtube_player_flutter` package. Type the video id in **Initial Video Id**. The board shows the video's thumbnail and title. |

## Animations

| Widget | What it does | Good to know |
|---|---|---|
| <Anchor id="lottie" />[**Lottie**](./media.md) | Plays a Lottie animation from the web or from a file you upload. | Needs the `lottie` package. Use **Pick Lottie** on the **Asset** tab (`.json` files only). |
| <Anchor id="rive" />[**Rive**](./media.md) | Plays a Rive animation. | Needs the `rive` package. Use **Pick Rive** on the **Asset** tab (`.riv` files only), then choose an **Artboard** and a **State Machine**. |
| <Anchor id="animated-container" />**AnimatedContainer** | A container that animates when its properties change. | Starts with a 300 ms **Duration**. Also a [wrapper](../wrappers.md#animated-container). |

## Progress indicators

| Widget | What it does | Good to know |
|---|---|---|
| <Anchor id="loading-circular" />**Circular Progress Indicator** | A spinning ring that shows something is loading. | Spins until you set **Value**, a number from 0 to 1. |
| <Anchor id="linear-progress-indicator" />**Linear Progress Indicator** | A loading bar. | Works like the circular one: set **Value** (0 to 1) to show a fixed amount. |

## Forms

| Widget | What it does | Good to know |
|---|---|---|
| <Anchor id="checkbox" />**Checkbox** | A tick box. | **Value** is its state. **On Changed** runs when someone taps it. |
| <Anchor id="switch" />**Switch** | An on/off switch. | **Value** is its state. **On Changed** runs when someone flips it. |
| <Anchor id="popup-menu-button" />**Popup Menu Button** | A button that opens a small menu. | Starts with one item, "Item 1". **On Selected** runs when someone picks an item. |
| <Anchor id="dropdown-menu" />[**Dropdown menu**](./forms.md) | A dropdown for choosing one option from a list. | Starts with one option, "first". Add more under **Items**. |
| <Anchor id="slider" />**Slider** | A slider for choosing a number between **Min** and **Max**. | **On Changed** runs as the thumb moves. |
| <Anchor id="pin-code-field" />[**Pin Code Field**](./forms.md) | Boxes for typing a short one-time code (OTP). | Needs the `pin_code_fields` package and creates a `pinCode` variable. **Pin Code Length** goes up to 6. |

## Screen components

| Widget | What it does | Good to know |
|---|---|---|
| <Anchor id="appbar" />[**App Bar**](./navigation.md) | The bar at the top of a screen, with a title and actions. | Drop it on a screen and it becomes the screen's app bar. |
| <Anchor id="navigation-bar" />[**Bottom Navigation Bar**](./navigation.md) | A row of tabs at the bottom of a screen. | Nowa creates a `pageIndex` variable and links **Current Index** and **On Tap** to it. |
| <Anchor id="drawer" />[**Drawer**](./navigation.md) | A side menu that slides in over a screen. | Drop it on a screen and it goes into the screen's drawer slot. Also a [wrapper](../wrappers.md#drawer). |
| <Anchor id="listtile" />**List Tile** | One row with a title and optional leading, subtitle and trailing widgets. | Typically the item of a **List View**. **On Tap** makes the row tappable. |
| <Anchor id="expansion-tile" />**Expansion Tile** | A tile that expands to show more widgets. | Put the hidden widgets in **Children**. **Initially Expanded** opens it from the start. |
| <Anchor id="alert-dialog" />**Alert Dialog** | A pop-up box with a title, content and action buttons. | To show it in a running app, add a `showDialog` step in logic: see [Show dialogs, sheets, snackbars and pickers](../../logic/popups.md#show-a-dialog). |

## Integrations

| Widget | What it does | Good to know |
|---|---|---|
| <Anchor id="admob-banner" />[**Admob Banner**](../../integrations/admob.md) | A banner ad. | Needs the `nowa_mobile_ads` package and your App IDs in **Settings** → **Integrations**. Test ads are on by default. |
| <Anchor id="webview" />[**Web View**](./media.md) | A web page inside your app. | Nowa adds `https://` if you leave it out. The board shows a placeholder: run your app to see the page. |
| <Anchor id="html" />[**Html**](./media.md) | Formatted text written in HTML. | Type or paste your HTML in **Data**. |
| <Anchor id="markdown" />[**Markdown**](./media.md) | Formatted text written in Markdown. | Type or paste your Markdown in **Data**. People can select the text unless you turn **Selectable** off. |
| <Anchor id="google-maps" />[**Google Maps**](../../integrations/google-maps.md) | An interactive map with markers, polygons and custom styling. | Needs the `google_maps_flutter` package and your API keys in **Settings** → **Integrations**. The board shows a placeholder: run your app to see the map. |
| <Anchor id="revenuecat-paywall" />[**RevenueCat Paywall**](../../integrations/revenuecat.md) | A ready-made paywall screen for in-app purchases and subscriptions. | Needs the `purchases_flutter` and `purchases_ui_flutter` packages and your RevenueCat keys in **Settings** → **Integrations**. The board shows a placeholder. |

:::tip Or ask Nowa AI
Not sure which widget you need? Try "Add a card with a photo, a title and a Buy button." Nowa AI picks the widgets for you, and you can still adjust them on the board.
:::

## Next steps

- [Add widgets](../../design/add-widgets.md) from the Library, the toolbar, drag and drop, or paste.
- [Change widget properties](../../design/properties.md) in **Details**.
- [Wrappers](../wrappers.md) add padding, taps, scrolling and more around a widget.
- [Lay out widgets](../../design/layout.md) with groups, rows and columns.
