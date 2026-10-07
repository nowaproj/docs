---
title: Connect a REST API
description: Create an API collection, add and test requests, turn responses into models, and use them in your screens.
sidebar_label: REST API
keywords: [REST API, API, HTTP, request, collection, API collection, endpoint, base URL, headers, bearer token, auth key, GET, POST, JSON, model, data source, Api panel, OpenRouter]
---

Connect any service that speaks HTTP: your own backend, a public API, or a tool like Xano. In Nowa you group requests into collections that share a base URL, headers and a sign-in token. You test each request on the spot and turn its response into a model your widgets can use.

Already have a Swagger, Postman or cURL description of your API? [Import it](./import.md) instead of building requests by hand.

## Create a collection

A collection holds the requests for one API. Nowa saves it as a Dart file, for example `lib/api/cats.api.dart` for a collection named Cats.

1. Click **Api** in the left sidebar. The **Collections** panel opens.
2. Click **+** (**Add Collection**), then **New Collection**.
3. In the **Create New Collection** dialog, type a name. Nowa shows the **Class name** and **Path** it will use.
4. Click **Submit**. The collection appears in the panel.

{/* CAPTURE: id=integrations-rest-api-1 | state: playground starter open, Api panel open, collection Cats with a GET and a POST request, Add Collection menu open | show: the Collections panel with method badges and the Add Collection menu | crop: left panel */}

You can also use **API Collection...** in the Files panel's **Add to library** menu.

## Set the base URL, headers and sign-in

Hover the collection and click the gear icon. Whatever you set here applies to every request in the collection.

| Setting | What it does |
|---|---|
| **Name** | Renames the collection and its file. |
| **Base URL** | The start of every address, for example `https://api.example.com`. Requests then only need the path. |
| **Auth Key** | The name of the Shared Preferences entry that holds your user's token. Leave it empty if the API needs no token. |
| **Headers** | Click **Add header** for headers every request needs. |

Changes save when you leave a field. Click **Close** when you're done.

With an **Auth Key**, every request sends `Authorization: Bearer` followed by the token your app saved under that name. Save the token after sign-in with the **SHARED PREFERENCES** → **set** action in Circuit, using the same **Key** and the **Type** `string`. See [Save values on the device](../../logic/actions.md#save-values-on-the-device).

:::warning
Headers, the base URL and tokens you type here are saved in your project's code and ship inside your app. Never put a server secret in them.
:::

## Add a request

1. Hover the collection, click **+**, then **New Request**.
2. Type a name and click **Create**. Nowa turns the name into a function name such as `getCats`. The request appears under the collection.
3. Click the request. It opens in a panel at the bottom of the editor.
4. Pick the method, such as **GET**, **POST**, **PUT**, **DELETE**, **PATCH** or **HEAD**, and type the endpoint. With a base URL set, you only type the path, for example `/v1/items`.
5. To send headers for this request only, open the **Headers** tab and click **Add header**. Headers from the collection are listed there too, read-only.
6. To send data, open the **Body** tab and choose a body type.

| Body type | Use it for |
|---|---|
| **none** | Requests without a body, such as most GET requests. |
| **JSON** | Data as JSON. The status icon in the corner says **Valid JSON** or **Invalid JSON** when you hover it. Nowa only saves the body while it is valid. |
| **raw** | Plain text, XML or HTTP text. Pick **Text**, **XML** or **HTTP** next to it. |
| **form-data** | Form fields and files. Click **Add +** for each field. |
| **x-www-form-urlencoded** | Sets the content type for classic web forms. You write the body in the same editor as **JSON**, with the same validity check. |

Choosing a body type also sets the request's content type. It replaces the current body with a fresh starting body for that type, and undo brings the old one back.

### Send values that change

Use a parameter for anything that changes between calls, such as a search word.

1. In the right panel, click **+** next to **Params**. A new text parameter named `param` appears. Click it to rename it or change its type under **Edit parameter**.
2. In the address, type `$` and pick the parameter. For a query string, write it in the address, for example `/search?q=${query}`.
3. In a JSON body, drag the parameter's chip from **Pass Parameters in Body** onto a value, or type `${query}` yourself.

**Params** are your request's inputs, not query-string parameters. There is no separate query tab.

```json
{
  "title": "${title}",
  "done": false
}
```

## Test a request

1. Click **Test** next to the address. The panel switches to the test view. Nothing is sent yet.
2. Fill in **Testing values** for each parameter. If the collection has an **Auth Key**, paste your token in **Auth token value**. Nowa keeps that token for testing only, not in your app.
3. Click **Run Test**.
4. Check the result. The header shows the full address and the status, such as `200`. Under **Body**, switch between **Json** (the raw answer) and **Object** (the parsed result). **Headers** lists the response headers.

Click **Back to Request** to return to the editor. To test faster, hover a request in the **Collections** panel and click the play icon (**Run Query**): it opens the test view and sends the request at once.

{/* CAPTURE: id=integrations-rest-api-2 | state: same project, getFact opened, Test then Run Test done | show: header with API URL and Status 200, Json body, right panel with Testing values, Generate Model and Run Test | crop: bottom panel */}

If a test works in the desktop app but fails in the web app, see [API requests blocked in the browser](../../troubleshooting/known-issues.md#api-requests-blocked-in-the-browser).

## Turn the response into a model

A model gives the response named fields, so your widgets can use `title` or `price` instead of raw JSON. It also lets the board show placeholder values shaped like your data.

1. Run a successful test, then click **Generate Model** in the right panel. The response is already in the **Content** step. Click **Next**.
2. In **Select Data**, untick the fields you don't need. Click **Next**.
3. In **Generated Models**, check the **Name** and the **Path**. Models go in `lib/models` by default. Click **Save**.

The request now returns the model. Click **Back to Request**: the **Model** row in the right panel shows its name. **Generate Model** is hidden when the last test failed.

Click the button next to **Model** for more choices:

- **Generate from Schema**: paste JSON yourself and build a model from it, without a test.
- **Select Model**: pick an existing model or a basic type.
- **Return as Response Object**: go back to the plain response.

## Use a request in your app

- **Show it on a screen:** wrap a widget in a **Data Builder** and choose the source **API Request**. See [Show data in your UI](../show-data.md).
- **Call it from logic:** in **Details**, click the button next to an event such as **On Pressed**. Circuit opens. Hover the dot under the top node and click the **+** that appears. Open your app's own category (named after your package, for example **PACKAGE:MY_APP**), click your collection, and pick the request under **Members**. See [Respond to taps and other events](../../logic/events.md) and [Build logic in Circuit](../../logic/circuit.md).

:::tip[Or ask Nowa AI]
In **Agent** mode, Nowa AI can create a collection and request from a cURL command, test it and build the response model. Try: "Add an API request for this cURL command and show the results in a list: curl https://api.example.com/items".
:::

## Next steps

- [Import an API](./import.md) from Swagger, Postman, Xano or cURL
- [Show data in your UI](../show-data.md)
- [Keys and constants](../constants.md)
