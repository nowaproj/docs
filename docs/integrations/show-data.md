---
title: Show data in your UI
description: Use Data Builder to load data from a REST API, Supabase or Firestore and show it in your widgets, with loading and error states built in.
sidebar_label: Show data
keywords: [Data Builder, data builder wrapper, show data, display data, list from API, future builder, stream builder, loading widget, error builder, data source, bind data]
---

**Data Builder** connects your data to your screen. It calls a request, shows a loading widget while it waits, shows an error widget if the call fails, and gives everything inside it the result as `data`.

## Before you start

You need something to load. Create one of these first:

- a request from the **Api** panel ([Connect a REST API](./rest-api/index.md)),
- a function from the **Supabase** panel ([Read and write Supabase data](./supabase/database.md)),
- a query from [Cloud Firestore](./firebase/firestore.md).

A source has to return a value that arrives later (a Future) or a live feed (a Stream). Requests do. A Firestore query does once it ends with a step that reads the data, such as `get` or `snapshots`.

## Add a Data Builder

1. Select the widget that should show the data. For a list, add a **List View** first.
2. In **Details**, scroll down and click **Add Wrapper**. Search for **Data Builder** and click it. Your widget now sits inside it.
3. Below your widget's own settings, the Data Builder fields appear. Set **Source** to **API Request**, **Supabase** or **Firestore**.
4. In the row below **Source**, click the button that reads `none`. The row is labeled **API** for requests and **Query** for Supabase and Firestore. Pick your request, function or query from the list, or pick **None** to clear it.
5. If the request has parameters, their fields appear. Fill them in or link them to variables.

| Source | Row label | What the list shows |
|---|---|---|
| **API Request** | **API** | The requests in all your collections. |
| **Supabase** | **Query** | The functions in your Supabase panel. |
| **Firestore** | **Query** | Your Firestore queries. |

{/* CAPTURE: id=integrations-show-data-1 | state: playground starter, a request with a model, List View wrapped in Data Builder with Source API Request chosen | show: Details with the Data Builder fields, board with placeholder values | crop: right panel + board */}

You can also add Data Builder as a widget: press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd> and search for **Data Builder**. The wrapper keeps the widget you already built, so it is usually the easier way.

## Use the data in your widgets

Inside a Data Builder, `data` is the result of your source. If the source returns a list, `data` is a list.

1. Click the label of a property, such as **Text** on a Text widget. A link menu opens.
2. Open **LOCALS** and click `data`. If `data` is a model, its fields open next. Pick the one you want, for example `title`.
3. Click **+** after a linked value to go deeper into it.

If the source returns a model, the fields have names. That is why it helps to [generate a model](./rest-api/index.md#turn-the-response-into-a-model) for your requests. Pick the source first: `data` takes its type from it. For more on the link menu, see [Expressions and conditions](../logic/expressions.md).

### Show a list

1. Wrap a **List View** in a Data Builder and choose a source that returns a list.
2. Select the List View. In **Details**, find **List** and click **Connect**. If **Type** shows **Normal**, choose **Builder** first.
3. Open **LOCALS** and click `data`. Nowa sets **Item Count** to the length of the list.
4. Design one item. Link its properties to `element`, the current row: click a label, open **LOCALS**, click `element`, then pick a field.

Every row repeats the item you designed. A new List View starts with three placeholder items.

To open a detail screen when someone taps a row, see [Open a detail screen when a list item is tapped](../logic/navigation.md#open-a-detail-screen).

## What you see while it loads

- **Loading Widget** shows while the data is on its way. By default it is a centered progress circle.
- **Error Builder** shows if the call fails. By default it is the error in red text. Inside it, `error` holds the problem.

Both are fields under **Source**, so you can design your own. If the source returns nothing (null), the **Loading Widget** stays on screen. If you haven't picked a source yet, the **Error Builder** shows "No data source provided".

A Stream source, such as a Firestore `snapshots` query or a Supabase stream, updates the screen live.

## See it on the board and in Play

On the board, a request that has a **Model** isn't called. Nowa shows placeholder values built from the model instead: text appears as `[title]`, a list shows three items, and images show a picture placeholder.

Press **Play** on the screen to load real data, or **Run** the app. See [Play your app on the board](../test/instant-play.md) and [Run your app](../test/run.md).

:::tip[Or ask Nowa AI]
Describe what you want to see: "Show the results of getItems in a list on the home screen, with each item's title and price."
:::

## Next steps

- [Connect a REST API](./rest-api/index.md)
- [Connect Supabase](./supabase/connect.md) and [Use Cloud Firestore](./firebase/firestore.md)
- [Data models](../logic/models.md)
