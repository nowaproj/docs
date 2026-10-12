---
title: Use Cloud Firestore
description: See how Nowa stores Firestore collections and queries, how the query builder and the test work, and how to show the results in your app.
sidebar_label: Cloud Firestore
keywords: [Firestore, Cloud Firestore, Firebase database, collections, sub collections, queries, query builder, where, orderBy, snapshots, stream, count, Data Builder, NoSQL, Add Main Collection, Add New Query, collections.dart, queries.dart]
---

Cloud Firestore is Firebase's database. In Nowa, your collections and queries are Dart files that Nowa writes for you. You describe them with fields and dropdown steps, test queries against your database and show the results with a Data Builder.

## Before you start

- A project connected to Firebase. See [Connect Firebase](connect.md). Connecting creates the collections and queries files.
- Create a Cloud Firestore database in the Firebase console. Nowa doesn't create it.
- If you use the Windows desktop app, you can't test queries inside Nowa. See [Firebase on Windows](../../troubleshooting/known-issues.md#firebase-on-windows).
- In Nowa 3.13, the designer has no button for adding a collection or a query. Read [Add collections and queries in Nowa 3.13](#add-collections-and-queries) first.

## Add collections and queries in Nowa 3.13 {#add-collections-and-queries}

Nowa 3.13 has no button in the designer for adding a collection or a query. **Add Main Collection** and **Add New Query** used to open when you clicked `collections.dart` or `queries.dart` in the **Files** panel, but **Files** now shows only in [code mode](../../code/code-mode.md), where a click opens the file as plain code.

The editors are still there. Open `FirestoreService` (your queries) or one of your collections from the [Library](../../design/library.md), and the **Queries** or **Collections** editor opens. To list them, set **Filter** to **Everything**. The editor says "select a query from the outline panel to open it" or "select a collection from the outline panel to open it", but there's no outline panel for it.

Here's what works today:

- Collections and queries that are already in your project keep working in your running app.
- They also work in a [Data Builder](#use-a-query-in-your-app) and in Circuit, but each time you open the project, click **Refresh/Update apps and config files** in **Settings** → **Integrations** → **Firebase** first. Until you do, **Select Firestore Query** is empty.
- In code mode, open `lib/firebase/collections.dart` or `lib/firebase/queries.dart` from **Files** and edit the Dart code yourself. Then click **Refresh/Update apps and config files** so Nowa's lists match your file.
- To add, set or delete documents, write the function in `lib/firebase/queries.dart` yourself. In Nowa 3.13 the builder's `add` and `doc` steps don't work: the step shows as **func** and **Problems** reports an error such as "The function 'add' isn't defined."

## Define your collections

A collection is a list of documents, such as `orders`. In Nowa, each collection is a model with `fromJson` and `toJson` (see [Data models](../../logic/models.md)) that your queries use. It describes the structure only. A collection appears in Firestore when you add its first document.

Nowa keeps your collections in `lib/firebase/collections.dart`. To add one, see [Add collections and queries in Nowa 3.13](#add-collections-and-queries). When a collection is selected, the **Collections** editor shows its field list, with a details panel on the right:

1. Click **+ Field**. A new field named `var1` appears as text (**String**), with its name selected. Type the field's name.
2. Click the field's type to pick another one, such as **int**, **double** or **bool**.
3. Click a field to edit it on the right. The panel, headed **Edit** and the field's name, has **Name**, **Type**, **Default Value**, **Is Final**, **Is Static** and **Remove**.

Double-click a field name to rename it later. The name you type for a collection is its name in Firestore, so it must match your database. Names must be unique.

## Build a query

Each query is a function of `FirestoreService`, in `lib/firebase/queries.dart`. To add one, see [Add collections and queries in Nowa 3.13](#add-collections-and-queries). When a query is selected, the **Queries** editor lets you build it one step at a time:

1. Under **Query**, the builder starts with `FirebaseFirestore.instance`.
2. Open **Select Collection** and pick a collection. It reads "No Collections" until you define one, or until you click **Refresh/Update apps and config files** after opening the project.
3. Open the dropdown that appears and pick the next step. Fill in its arguments: **Select Field**, **Select Operator** and **Select Value**.
4. Keep adding steps until the query ends in a step that reads or writes data. Click the backspace icon at the top right of the builder to remove the last step.
5. Check the icon at the lower right of the builder. A check mark (tooltip: "Query is Future or Stream, you can run it") means you can test the query. A warning icon (tooltip: "Query not Future or Stream, so you can't run it") means it isn't ready yet.

| Step | What it does | What can follow |
|---|---|---|
| `where` | Keeps documents that match a field, an operator (`>`, `<`, `==`, `!=`, `<=`, `>=` or `contains`) and a value. | `get`, `where`, `orderBy`, `count`, `snapshots` |
| `orderBy` | Sorts by a field, ascending or descending. | `get`, `where`, `orderBy`, `count`, `snapshots` |
| `count` | Counts the documents. | `get` |
| `get` | Reads once and returns a Future. | Nothing |
| `snapshots` | Reads and keeps listening, so the result updates live. It returns a Stream. | Nothing |
| `doc` | Points at one document. Type its ID or use a parameter. | `set`, `get`, `delete`, `snapshots`, or a sub collection |
| `add` | Adds a new document. | Nothing |
| `set` | Creates or replaces the document at that ID. | Nothing |
| `delete` | Deletes the document. | Nothing |

After the collection you can pick `add`, `doc`, `get`, `where`, `orderBy`, `count` or `snapshots`. In Nowa 3.13, `add` and `doc` can't be built yet, so `set` and `delete` can't either. See [Add collections and queries in Nowa 3.13](#add-collections-and-queries).

To make a query reusable, open a value dropdown and choose **Create New Param**. The parameter appears in the **Params** list on the right, and you pass a value each time you use the query. Nowa names it `addedParam` and gives it the field's type. Double-click it in **Params** to rename it. If the builder then looks empty, select the query again: your steps are still there. **Enter Value** types a fixed value instead.

The builder has no `update` or `limit` step.

## Test a query

The **Test** section sits below the builder in the **Queries** editor.

1. In **Test**, set a value for each parameter under **Parameters**. Each one is labeled from its name, such as **Min Price** for `minPrice`. Parameters you leave alone use their defaults. For a `double` parameter, type a value with a fraction, such as `50.5`: in Nowa 3.13 a whole number such as `50` is dropped and the test runs with the default.
2. Click **Run Test**. The result appears under **Preview**.
3. For a stream, the button becomes **Restart** and the preview updates as the data changes.

Your Firestore security rules apply to the test. With rules that don't allow the read, such as the locked rules of a database created in production mode, the preview shows "No Data was found." with an **Error:** line such as `[cloud_firestore/permission-denied] Missing or insufficient permissions.`

![The Queries editor for a query named productsByPrice: the builder rows FirebaseFirestore.instance, collection('products'), where price >= minPrice, orderBy price descending and snapshots, with the green check mark at the lower right (rows and check mark highlighted); below it the Test section with the Min Price parameter set to 20.5, the Restart button and a Preview that lists two documents as JSON, Running Shoes at 120 and Wireless Headphones at 79.99 (highlighted); and on the right the Params list with minPrice (highlighted).](/img/docs/integrations/integrations-firebase-firestore-1.png)

The preview shows your documents as JSON, "Data was added successfully" after an `add`, or "No Data was found." for an empty result. If the query fails, an **Error:** line with the message appears under "No Data was found."

:::warning
Test runs against your real database. `add`, `set` and `delete` change real data, so test them on a throwaway project.
:::

On the Windows desktop app, a message covers the **Test** section: "Testing Firestore Queries isn't possible on Windows version". See [Firebase on Windows](../../troubleshooting/known-issues.md#firebase-on-windows) for ways around it.

## Use a query in your app

**Show the results.** Wrap the widget that should show them, such as a **List View**, in a [Data Builder](../show-data.md).

1. Select the widget, click **Add Wrapper** and choose **Data Builder**.
2. In **Details**, set **Source** to **Firestore**.
3. Next to **Query**, click the button and pick your query in **Select Firestore Query**. Fill in its parameters below, if it has any. If the list is empty after you reopen the project, click **Refresh/Update apps and config files** in **Settings** → **Integrations** → **Firebase**.
4. Inside the Data Builder, `data` holds the result. For a list, `data.docs` has one entry per document, and each entry's `data()` holds your fields.

On the board, Nowa doesn't call Firestore. A list shows three placeholder documents built from your collection's fields, and text reads like `[title]`. Click **Play** on the screen, or run the app, to see your real documents. In the Windows desktop app, run the app on a simulator instead.

**Run it from an event.** In [Circuit](../../logic/circuit.md#add-a-node), add a node from the **FIREBASE** category and pick your query. If your queries are missing there, refresh the same way. Set its parameters. A query that ends in `get`, `add`, `set` or `delete` returns a Future, so use **Future Options** for what happens next. For `add` and `set`, pass a model object.

:::tip
Prefer to describe it? Ask Nowa AI in **Agent** mode, for example: "Show the documents from my orders query in a list on the Orders screen."
:::

## Next steps

- [Show data in your UI](../show-data.md)
- [Sign users in with Firebase](auth.md)
- [Send push notifications](notifications.md)
