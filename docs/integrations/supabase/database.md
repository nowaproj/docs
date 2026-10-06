---
title: Read and write Supabase data
description: Generate ready-made Supabase queries from templates, test them in the editor, edit their code and show the results in your app.
sidebar_label: Read and write data
keywords: [Supabase database, Query Templates, Generate a Query, CRUD, getAll, getById, create, update, delete, select, insert, stream, realtime, RPC, Other Functions, Edit Code, Query Source Code, Testing values, RLS, row level security, model, Data Builder, Supabase queries]
---

Query Templates turn a Supabase table into ready-made functions that list, find, add, change and delete rows. Pick a template and a table, and Nowa writes the function and a matching data model, so you can test it right away and use it in your screens.

## Before you start

- [Connect Supabase](connect.md).
- A table in Supabase. Nowa has no table editor, so create the table in Supabase, or ask Nowa AI to create it with the Supabase connector.
- If your table uses Row Level Security (RLS), which decides which rows each user can read or change, a test user to sign in with. See [Sign users in with Supabase](auth.md).

## Add a query from a template

1. In the **Supabase** panel, click **+** next to **Generate a Query**. The **Add Supabase Function** dialog opens.
2. Click **Query Templates** ("CRUD operations": create, read, update and delete). If you see **No Tables Found**, click **Fetch Tables**. Created a table after you connected? Open ⋮, then **Tables**, which refreshes the list.
3. Click a template from the table below.
4. Click the table you want. You can search the list.
5. Choose a model. Click **Create new model class** (Nowa suggests a name such as `TodosModel`) or pick one under **Use Existing Model**. Nothing is selected until you click.
6. Click **Generate Function**. The message `Function "getAllTodos" generated successfully!` appears, and the function shows up under **Queries**.

{/* CAPTURE: id=integrations-supabase-database-1 | state: signed-in cloud project connected to Supabase with a todos table, Generate a Query + clicked, Query Templates, Get All Records and the todos table picked, on the Choose Model step | show: the Choose Model For "todos" step with Create new model class selected (name filled in) and the Generate Function button | crop: the Supabase Templates dialog */}

| Template | What it does | Function for a table called `todos` |
|---|---|---|
| **Get All Records** | Fetches all records from a table | `getAllTodos()` returns a list of your model |
| **Get Record by ID** | Fetches a single record by its ID | `getByIdTodos(id)` returns one model, or nothing if no row matches |
| **Create Record** | Creates a new record in the table | `createTodos(data)` returns the new row |
| **Update Record** | Updates an existing record by ID | `updateTodos(id, data)` returns the updated row |
| **Delete Record** | Deletes a record by ID | `deleteTodos(id)` |

Each function is named after its action and the table. The ID templates look for a column named `id`, and its type decides whether `id` is a number or text. The templates don't filter, sort or page the results: change that with **Edit Code**, or ask Nowa AI. Generating the same template for the same table again replaces the earlier function.

A model is a class with one field per column, so your screens can use `title` or `done` directly. A new model is saved in `lib/models/`, for example `lib/models/todos_model.dart`. Nowa maps string, integer and boolean columns to `String`, `int` and `bool`. Any other type becomes `dynamic`, and every field can be empty. **Use Existing Model** lists the models in your project's `models` folders. See [Data models](../../logic/models.md).

:::tip
Or ask Nowa AI. In **Agent** mode with the Supabase connector on, try: "Create a todos table where each user only sees their own rows, then add a function that lists them." See [Connect Figma and Supabase to Nowa AI](../../ai/connectors.md).
:::

## Test a function {#test-a-function}

1. Click a function in the **Supabase** panel. A panel opens at the bottom of the editor, titled with the function's name, for example **Testing getAllTodos**.
2. Under **Testing values**, fill in one field for each input of the function.
3. Click **Run**. Until then the result area says "Run test to see result".

{/* CAPTURE: id=integrations-supabase-database-2 | state: signed-in cloud project connected to Supabase, getAllTodos generated and clicked, Run clicked once | show: the bottom test panel titled Testing getAllTodos with the result on the left, and Testing values, Run and Edit Code on the right | crop: bottom test panel */}

What the result area can show:

| You see | What it means |
|---|---|
| The result | The data your function returned. |
| **Error:** and a message | Supabase or the function returned an error. |
| **RLS Policy Error** | A Row Level Security policy blocked the query. Follow the steps shown, or click **Open Supabase Dashboard**. Sign in first if the policy needs a user. |
| **Empty Result - Possible RLS Filtering** | The query returned an empty list. If the table has rows, RLS may be hiding them: click **Check RLS Policies**. If the table is empty, you can ignore it. |
| **Streaming** over a colored border | A live query. See [Live queries](#live-queries). |

:::warning
Tests run against your real Supabase project. Running a create, update or delete function changes real data.
:::

## Change a function's code {#edit-code}

A generated function is ordinary Dart code that you can change. To add a filter or an order, click **Edit Code** in the test panel.

1. Change the code in **Query Source Code**. **Discard** and **Save** appear once you change something.
2. Click **Save**.
3. Click **Test Function** to go back to the test view and run it.

If you rename the function in the code, the new name replaces the old function. If Nowa can't find the function's name in your code, it shows "Could not parse function name from the code".

## Live queries {#live-queries}

A live query returns a `Stream`, so it updates whenever the data changes in Supabase. It shows a STREAM badge under **Queries**. No template creates one.

1. Turn on Realtime for the table in Supabase. See the [Supabase Realtime docs](https://supabase.com/docs/guides/realtime).
2. Ask Nowa AI for a live query, or rewrite a generated function in **Edit Code**. Here is a minimal one:

   ```dart
   Stream<List<Map<String, dynamic>>> streamTodos() {
     return Supabase.instance.client.from('todos').stream(primaryKey: ['id']);
   }
   ```

3. Click the function and click **Run**. The panel shows **Streaming** and updates as rows change. It keeps listening until you run it again or close the panel.

## RPC and other functions

Two sections fill up from code, not from templates:

- **RPC** lists functions that call a database function in your Supabase project.
- **Other Functions** lists functions that call a Supabase Edge Function.

Ask Nowa AI to create them with the Supabase connector. You test them and use them in your app like any other function.

## Show the results in your app

A **Data Builder** shows a function's result in your UI. The steps below are the Supabase part. See [Show data in your UI](../show-data.md) for the rest.

1. Select the widget that should show the rows, often a **List View**. Click **Add Wrapper** and choose **Data Builder**.
2. Set **Source** to **Supabase**. Click **Query** and pick your function in **Select Supabase Functions**. Fill in its inputs, if it has any.
3. Inside the builder, link widgets to `data`. For `getAllTodos`, `data` is a list of `TodosModel`.

On the board, you see placeholder values built from your model. Click **Play** on the screen, or run the app, to see real data: see [Play your app on the board](../../test/instant-play.md). Only functions that return a Future or a Stream can be picked.

To change data, call the function from an event, such as a button's **On Pressed**. [Sign users in with Supabase](auth.md#login-screen) shows the same steps with `signIn`.

## Next steps

- [Store files in Supabase](storage.md)
- [Manage your Supabase backend](backend.md)
- [Show data in your UI](../show-data.md)
