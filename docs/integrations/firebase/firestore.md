---
title: Use Cloud Firestore
description: Describe your Firestore collections, build queries by picking steps from dropdowns, test them against your database and show the results in your app.
sidebar_label: Cloud Firestore
keywords: [Firestore, Cloud Firestore, Firebase database, collections, sub collections, queries, query builder, where, orderBy, snapshots, stream, count, Data Builder, NoSQL]
---

Cloud Firestore is Firebase's database. In Nowa you describe your collections, build queries by picking steps from dropdowns, test them against your database and show the results with a Data Builder. Nowa writes the Firestore code for you.

## Before you start

- A project connected to Firebase. See [Connect Firebase](connect.md). Connecting creates the collections and queries files.
- Create a Cloud Firestore database in the Firebase console. Nowa doesn't create it.
- If you use the Windows desktop app, you can build queries but not test them inside Nowa. See [Firebase on Windows](../../troubleshooting/known-issues.md#firebase-on-windows).

## Define your collections

A collection is a list of documents, such as `orders`. In Nowa, each collection is a model with `fromJson` and `toJson` (see [Data models](../../logic/models.md)) that your queries use. It describes the structure only. A collection appears in Firestore when you add its first document.

1. Open the [**Files** panel](../../code/files.md) and open the **firebase** folder inside **lib**. The Firebase files have the Firebase icon.
2. Click `collections.dart`. A popup opens with **Add Main Collection** and the collection tree. In code mode the file opens as plain code instead, so switch code mode off.
3. Click **Add Main Collection**, type a name such as `orders` and click **Add**. The collection appears in the tree.
4. Click the collection. The editor opens it with the field list and, on the right, a details panel.
5. Click **+ Field** and type a name for the field. A new field starts as text (`String?`).
6. Click the field's type to pick another one.
7. Click a field to edit its details on the right, or to remove it.
8. For a sub collection, hover a collection in the popup, click **+** (**Add Sub Collection**), name it and click **Add**.

Double-click a field name to rename it later. The name you type for a collection is its name in Firestore, so it must match your database. Names must be unique. Right-click a collection and choose **Remove** to delete it and its sub collections. You can undo it.

{/* CAPTURE: id=integrations-firebase-firestore-2 | state: connected project; collections.dart popup open next to an open collection with a few fields | show: Add Main Collection, the collection tree, the "This table only represents the structure, not the data." line, the field list with + Field and the details panel | crop: whole editor window */}

## Build a query

Each query is a function of `FirestoreService`, in `lib/firebase/queries.dart`. You build it one step at a time.

1. In the **Files** panel, click `queries.dart`. A popup opens with **Add New Query**.
2. Click **Add New Query**, type a name in the **Function Name** dialog and click **Create**. The query appears in the list.
3. Click the query. The editor opens it. Under **Query**, the builder starts with `FirebaseFirestore.instance`.
4. Open **Select Collection** and pick a collection. It reads "No Collections" until you define one.
5. Open the dropdown that appears and pick the next step. Fill in its arguments: **Select Field**, **Select Operator** and **Select Value**.
6. Keep adding steps until the query ends in a step that reads or writes data. Click the backspace icon at the top right of the builder to remove the last step.
7. Check the icon at the lower right of the builder. A check mark (tooltip: "Query is Future or Stream, you can run it") means you can test the query. A warning icon (tooltip: "Query not Future or Stream, so you can't run it") means it isn't ready yet.

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

After the collection you can pick `add`, `doc`, `get`, `where`, `orderBy`, `count` or `snapshots`.

To make a query reusable, open a value dropdown and choose **Create New Param**. The parameter appears in the **Params** list on the right, and you pass a value each time you use the query. **Enter Value** types a fixed value instead.

The builder has no `update` or `limit` step.

## Test a query

1. In **Test**, set a value for each parameter under **Parameters**. Parameters you leave alone use their defaults.
2. Click **Run Test**. The result appears under **Preview**.
3. For a stream, the button becomes **Restart** and the preview updates as the data changes.

{/* CAPTURE: id=integrations-firebase-firestore-1 | state: connected project with an orders collection; a query built as collection → where → orderBy → snapshots; Run Test clicked on a throwaway database | show: the Queries view with the query builder row, the status check mark, the Test section with Parameters and Preview, and the Params list on the right | crop: whole editor window */}

The preview shows your documents as JSON, "Data was added successfully" after an `add`, "No Data was found." for an empty result, or **Error:** with the message if the query fails.

:::warning
Test runs against your real database. `add`, `set` and `delete` change real data, so test them on a throwaway project.
:::

On the Windows desktop app, a message covers the **Test** section: "Testing Firestore Queries isn't possible on Windows version". See [Firebase on Windows](../../troubleshooting/known-issues.md#firebase-on-windows) for ways around it.

## Use a query in your app

**Show the results.** Wrap the widget that should show them, such as a **List View**, in a [Data Builder](../show-data.md).

1. Select the widget, click **Add Wrapper** and choose **Data Builder**.
2. In **Details**, set **Source** to **Firestore**.
3. Next to **Query**, click the button and pick your query in **Select Firestore Query**. Fill in its parameters below, if it has any.
4. Inside the Data Builder, `data` holds the result. For a list, `data.docs` has one entry per document, and each entry's `data()` holds your fields.

On the board, Nowa doesn't call Firestore. A list shows three placeholder documents built from your collection's fields, and text reads like `[title]`. Click **Play** on the screen, or run the app, to see your real documents. In the Windows desktop app, run the app on a simulator instead.

**Run it from an event.** In [Circuit](../../logic/circuit.md#add-a-node), add a node from the **FIREBASE** category and pick your query. Set its parameters. A query that ends in `get`, `add`, `set` or `delete` returns a Future, so use **Future Options** for what happens next. For `add` and `set`, pass a model object.

:::tip
Prefer to describe it? Ask Nowa AI in **Agent** mode, for example: "Show the documents from my orders query in a list on the Orders screen."
:::

## Next steps

- [Show data in your UI](../show-data.md)
- [Sign users in with Firebase](auth.md)
- [Send push notifications](notifications.md)
