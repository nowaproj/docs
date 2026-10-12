---
title: Show data in your UI
description: Use Data Builder to load data from a REST API, Supabase or Firestore and show it in your widgets, with loading and error states built in.
sidebar_label: Show data
keywords: [Data Builder, data builder wrapper, show data, display data, list from API, future builder, stream builder, loading widget, error builder, data source, bind data, connect query to UI]
---

**Data Builder** is how your screens show real data, such as the products in your shop or today's bookings. It loads the data from your source, shows a loading widget while it waits and an error widget if something goes wrong, and hands everything inside it the result as `data`.

## Before you start

You need something to load. Create one of these first:

- a request from the **Api** panel ([Connect a REST API](./rest-api/index.md)),
- a function from the **Supabase** panel ([Read and write Supabase data](./supabase/database.md)),
- a query from [Cloud Firestore](./firebase/firestore.md).

A source has to give back a value that arrives a moment later (a Future) or a feed that keeps updating (a Stream). Requests do. A Firestore query does once it ends with a step that reads the data, such as `get` or `snapshots`.

## Add a Data Builder

1. Select the widget that should show the data. For a list, add a **List View** first.
2. In **Details**, scroll down and click **Add Wrapper**. Search for **Data Builder** and click it. Your widget now sits inside it, so it can use what the Data Builder loads.
3. Below your widget's own settings, the Data Builder fields appear. Set **Source** to **API Request**, **Supabase** or **Firestore**. A new Data Builder starts on **Custom**, which loads nothing.
4. In the row below **Source**, click the button that reads `none`. The row is labeled **API** for requests and **Query** for Supabase and Firestore. Pick your request, function or query from the list. To switch to another one later, click the button again.
5. If the request has parameters, their fields appear. Fill them in or link them to variables.

| Source | Row label | What the list shows |
|---|---|---|
| **API Request** | **API** | The requests in all your collections. |
| **Supabase** | **Query** | The functions in your Supabase panel. |
| **Firestore** | **Query** | Your Firestore queries. |

![The Details panel for the List View, scrolled to its Data Builder section, next to the board: the Source row (API Request) and the API row (getTodos) are highlighted, with Loading Widget and Error Builder below. The HomePage screen on the board shows the connected list with three items that show the placeholder text title in brackets.](/img/docs/integrations/integrations-show-data-1.png)

You can also add Data Builder as a widget: press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd> and search for **Data Builder**. The wrapper keeps the widget you already built, so it's usually the easier way.

## Use the data in your widgets

Inside a Data Builder, `data` is whatever your source gave back. If the source returns a list, `data` is a list.

1. Click the label of a property, such as **Text** on a Text widget. A link menu opens.
2. Open **LOCALS** and click `data`. If `data` is a model, its fields open next. Pick the one you want, for example `title`.
3. Click **+** after a linked value to go deeper into it.

The same works for pictures: on an **Image**, choose the **Network** tab and link **Url** to a field that holds a picture's web address, so each recipe shows its own photo. See [Images, video, animations and web content](../reference/widgets/media.md).

If the source returns a model, the fields have names you'll recognize. That's why it helps to [generate a model](./rest-api/index.md#turn-the-response-into-a-model) for your requests. Pick the source first, so Nowa knows what `data` holds. For more on the link menu, see [Expressions and conditions](../logic/expressions.md).

### Show a list

1. Wrap a **List View** in a Data Builder and choose a source that returns a list.
2. Select the List View. In **Details**, find **List** and click **Connect**. If **Type** shows **Normal**, choose **Builder** first.
3. Open **LOCALS** and click `data`. Nowa sets **Item Count** to the length of the list, so you get exactly one row per item.
4. Design one item. Link its properties to `element`, the item that row is showing: click a label, open **LOCALS**, click `element`, then pick a field.

Every row repeats the item you designed, filled with its own data. A new List View starts with three placeholder items.

To open a detail screen when someone taps a row, see [Open a detail screen when a list item is tapped](../logic/navigation.md#open-a-detail-screen).

## What you see while it loads

- **Loading Widget** shows while the data is on its way. By default it's a centered progress circle.
- **Error Builder** shows if the call fails. By default it's the error in red text. Inside it, `error` holds what went wrong.

Both are fields under **Source**, so you can design your own, such as a friendly "Couldn't load your bookings" message. If the source gives back nothing (null), the **Loading Widget** stays on screen. If you haven't picked a source yet, the **Error Builder** shows "No data source provided".

A Stream source, such as a Firestore `snapshots` query or a Supabase stream, keeps the screen up to date as the data changes.

## See it on the board and in Play

On the board, a request that has a **Model** isn't called. Nowa shows placeholder values built from the model instead: text appears as `[title]`, a list shows three items, and images show a picture placeholder. That way you can design the layout before any real data arrives.

Press **Play** on the screen to load real data, or **Run** the app. To load the data again, for example to see a new random picture, click **Stop**, then **Play** again. See [Play your app on the board](../test/instant-play.md) and [Run your app](../test/run.md).

:::tip[Or ask Nowa AI]
Describe what you want to see: "Show the results of getItems in a list on the home screen, with each item's title and price."
:::

## Next steps

- [Connect a REST API](./rest-api/index.md)
- [Connect Supabase](./supabase/connect.md) and [Use Cloud Firestore](./firebase/firestore.md)
- [Data models](../logic/models.md)
