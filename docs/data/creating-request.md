---
sidebar_position: 1
title: Create an API request
---

# Setting Up an API Request in Nowa

APIs (Application Programming Interfaces) are the backbone of communication on the internet. By using simple HTTP protocols, you can integrate with countless services around the world. 

Learning how to use APIs correctly empowers you to build powerful and dynamic apps. Nowa provides a robust way to integrate any API into your Flutter applications visually and effortlessly.

In this guide, we'll walk through the basics of setting up an API request in Nowa. We'll cover:

- Creating a collection
- Adding common data like base URLs and headers
- Creating a GET request
- Testing the request and viewing the response

Want to continue reading? then let's get started!

## 1. Creating a Collection

A **collection** in Nowa is a group of API requests that share the same base URL and headers. This is useful when you're integrating with a service like WordPress, where multiple endpoints share common settings.

To create a new API collection in Nowa, follow these steps:

1. Open the **Files** panel from the left sidebar.
    
2. Next to the `Lib` folder, click on the **`+`** icon.
    
3. Select **New API Collection**.
    
4. Enter a name for your collection and click **Create**.
    
5. A new file will be created inside the `api` folder. Open the folder and click on the collection file to open the **Collection Editor**.
    

#### Notes

:::note[Class name and File path for Collections]
When creating a collection, when naming it, you will see the **generated class name** and the **path**
    
    - **Class name**: This is the name of the Dart class that will be generated in code. It acts as the interface to access requests from this collection inside Circuit. (You will see the class name under API section inside Circuit, and using that class name you will be able to call the request you need)
        
    - **Path**: This is simply the file path where the collection file will be stored.       
:::

:::info[Eveything is a Dart file]     
In Nowa, **everything is a Dart file**—whether it's a screen, component, or API collection. This consistency makes it easier to manage and understand different parts of your app, especially when combining visual and code-based development.
:::  

📹 In the video below, you'll see a step-by-step guide to creating a collection.

<video controls width="850">
<source src="/img/api/create_collection.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>


**Why use a collection?**

- **Organization:** Keep all related requests together.
- **Efficiency:** Set common data like base URLs and headers once for all requests in the collection.

## Importing API Collections

Nowa makes it easy to import existing API collections from popular tools like Swagger, Postman, and Xano. This saves you time by automatically converting your existing API definitions into Nowa collections.

### Importing from Swagger

You can import Swagger/OpenAPI definitions in three ways:

1. **Paste a Swagger URL**
   - Click on the **Import** button in your collection
   - Select "Import from Swagger"
   - Paste your Swagger URL
   - Click Import

   **How to get the Swagger URL:**
   - Open your Swagger/OpenAPI documentation in a browser
   - Look for the URL that ends with `/swagger.json` or `/openapi.json`
   - Copy the entire URL
   - Example: `https://petstore.swagger.io/v2/swagger.json`

2. **Paste Swagger JSON**
   - Click on the **Import** button in your collection
   - Select "Import from Swagger"
   - Paste your Swagger JSON directly
   - Click Import

   **How to get the Swagger JSON:**
   - Open your Swagger/OpenAPI documentation in a browser
   - Click on the JSON link (usually labeled as "swagger.json" or "openapi.json")
   - Copy the entire JSON content from the opened page
   - Alternatively, you can export the JSON from your API management tool

3. **Upload Swagger JSON File**
   - Click on the **Import** button in your collection
   - Select "Import from Swagger"
   - Click "Upload File" and select your Swagger JSON file
   - Click Import

   **How to get the Swagger JSON file:**
   - Copy the JSON content from the Swagger documentation
   - Create a new file and save it with a `.json` extension
   - Paste the JSON content into the file

📹 Watch how to import from Swagger using a URL:

<video controls width="850">
  <source src="img/import-from/swagger-url.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

📹 Watch how to import from Swagger using JSON:

<video controls width="850">
  <source src="img/import-from/swagger-json.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

### Importing from Postman

You can import Postman collections in two ways:

1. **Paste Postman JSON**
   - Click on the **Import** button in your collection
   - Select "Import from Postman"
   - Paste your Postman collection JSON
   - Click Import

   **How to get the Postman JSON:**
   - Open your Postman collection
   - Click the three dots (...) next to your collection
   - Select "More"
   - Click "Export"
   - Choose the format you prefer
   - Select where to save the file (it will automatically save as .json)

2. **Upload Postman JSON File**
   - Click on the **Import** button in your collection
   - Select "Import from Postman"
   - Click "Upload File" and select your Postman collection JSON file
   - Click Import

📹 Watch how to import from Postman:

<video controls width="850">
  <source src="img/import-from/postman-json.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

### Importing from Xano

To import from Xano:

1. Get your Xano API token from your Xano dashboard
2. Click on the **Import** button in your collection
3. Select "Import from Xano"
4. Paste your Xano API token
5. Click Import

**How to get your Xano API token:**
1. Go to your Xano dashboard
2. Click on the settings for your instance
3. Select "Metadata API"
4. Click on "Manage Access Token"
5. Click "Create New Token"
6. Copy the generated token
7. Make sure to save it somewhere safe as you won't be able to see it again

📹 Watch how to import from Xano:

<video controls width="850">
  <source src="img/import-from/xano-token.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

## 2. Adding Common Data

After creating your collection, you can add data that is common to all requests within it.

**Steps:**

1. Within your newly created collection, locate the settings for common data.
2. Add the **Base URL** (e.g., `https://public-api.wordpress.com/wp/v2/sites/nowablogapp.wordpress.com/`).
3. Add any common **headers** that all requests will use.

## 3. Adding a Request

Now that your collection is set up with common data, you can add your first API request.

**Steps:**

1. Click on **Add Request** within your collection.
2. Choose the **request type**: `GET`, `POST`, `PUT`, `DELETE`, `PATCH`, `HEAD`, or `DOWNLOAD`.
3. Enter the **endpoint** for the request (without the base URL). For example, to get all posts, use `posts`.
4. Specify any additional **parameters**, **headers**, or **body content** specific to this request.

## 4. Creating a GET Request Example

Let's walk through creating a `GET` request to retrieve all posts from a WordPress blog.

**Steps:**

1. **Request Type:** Select `GET`.
2. **Endpoint:** Enter `posts`.
3. **Test the Request:** Click on **Run Test** to execute the request.

Here's the full example of creating the `Wordpress` collection, then the `getAllPosts` request

![](./img/create-requests/getallposts.gif)


**What happens next?**

- **Response Body:** You'll see the data returned from the API in the body section.
- **Response Headers:** View metadata about the response.
- **Full URI:** Verify the complete URL used for the request, which combines the base URL and endpoint.

![](./img/create-requests/getbodyheaders.gif)


## 5. Testing and Verifying the Response

Testing your API requests ensures that they work as expected before integrating them into your app.

**Steps:**

1. After running the test, review the **response body** to understand the data structure.
2. Check the **status code** to ensure the request was successful (e.g., `200 OK`).
3. Examine the **headers** for additional information like content type and caching policies.

## Next Steps

Now that you've set up a basic API request and tested it, you're ready to generate models from the response data and add mock data for design-time testing.

👉 **Head to the next section to learn how to generate a model from the response.**


Happy building!