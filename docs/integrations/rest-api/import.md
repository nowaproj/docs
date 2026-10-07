---
title: Import an API
description: Create a whole API collection from a Swagger (OpenAPI) file, a Postman collection or a Xano workspace, or add one request from a cURL command.
sidebar_label: Import an API
keywords: [import API, importing from, Swagger, OpenAPI, Postman, Xano, cURL, curl, import collection, import requests]
---

Skip typing requests by hand. Give Nowa your Swagger file, your Postman collection or your Xano workspace and it builds a collection with every endpoint, method, header and body. Need only one request? Paste its cURL command.

Imports build on the [REST API](./index.md) tools, so you can test and edit everything afterwards.

## Import a whole collection

1. Click **Api** in the left sidebar.
2. Click **+** (**Add Collection**), then **Import from Swagger**, **Import from Postman** or **Import from Xano**. The **Import From** dialog opens with that source selected. You can switch sources with the **Swagger**, **Postman** and **Xano** options at the top.
3. Follow the steps for your source below.

![The Import From dialog with Swagger selected and a Swagger JSON URL typed in the text field (highlighted), the OR line, the Select / Drop your JSON file area, and the Cancel and Import buttons.](/img/docs/integrations/integrations-import-1.png)

Every import creates a new collection. It never adds to one you already have. Nowa names the collection after the API (its title in Swagger, its name in Postman), sets the **Base URL** when it can work one out from the file or the address you pasted, and adds one request per endpoint. A path part such as `{id}` (Swagger) or `:id` (Postman) becomes a parameter, and the address uses it as `${id}`.

Imported requests return the plain response. Run a test and use **Generate Model** to get a model. See [Turn the response into a model](./index.md#turn-the-response-into-a-model).

### From Swagger (OpenAPI)

Nowa reads JSON descriptions in Swagger 2.0 and OpenAPI 3 format.

1. Choose **Import from Swagger**.
2. Paste the web address of the JSON file, or the JSON text itself, then click **Import**.
3. Or click the box **Select / Drop your JSON file**, or drop a `.json` file on it. The import starts as soon as the file is chosen, so there is no need to click **Import**.

If the address doesn't load, for example because it needs a login, paste the JSON text or choose the file instead. YAML files aren't read: convert them to JSON first.

### From Postman

1. In Postman, export your collection as a JSON file.
2. In Nowa, choose **Import from Postman**.
3. Paste the JSON text and click **Import**, or select or drop the file.

Folders in your Postman collection are flattened into one list of requests.

### From Xano

You need an access token for the Xano Metadata API. Create one in your Xano dashboard (see Xano's documentation for the current steps).

1. Choose **Import from Xano** and paste the token into **Enter Xano Bearer Token...**. Nowa loads your instances by itself.
2. Under **Select an Instance**, click your instance.
3. Under **Select a Workspace**, click your workspace.
4. Under **Select an API Group**, click a group, or its **+**, to import it. A check mark shows it's done.

Each API group becomes its own collection. The dialog closes once every group is imported. Click **Cancel** to stop earlier.

## Add one request from a cURL command

1. In the **Collections** panel, hover the collection and click **+**, then **Import from curl**.
2. Type a **Function Name**. Nowa turns it into a function name and shows it under the field.
3. Paste the command into **cURL Command** and click **Create**.

The request is added to that collection with the method, address, headers and body from the command.

If the collection has a **Base URL**, the address in the command must start with it. Nowa then keeps only the rest of the path. A command that can't be read shows **Invalid curl**.

:::tip[Or ask Nowa AI]
In **Agent** mode, paste a cURL command into the chat and ask Nowa AI to add it as an API request. See [Connect a REST API](./index.md#use-a-request-in-your-app).
:::

## If an import fails

| Message | What to try |
|---|---|
| **Failed to import from swagger** | Check that the address returns the JSON file itself, or paste the JSON text. |
| **Invalid Postman collection format** | Export the collection again as a JSON file. It needs both an `info` and an `item` section. |
| **Invalid token**, **Failed to fetch instances** | Paste a new Xano token. |
| **Failed to select instance**, **Failed to select workspace**, **Failed to import from Xano** | Click the item again, or start the import over. |
| **The curl URL … does not match the provided base URL …** | Use a command whose address starts with the collection's **Base URL**. |

## Next steps

- [Connect a REST API](./index.md): set the base URL, headers and sign-in, then test your requests
- [Show data in your UI](../show-data.md)
