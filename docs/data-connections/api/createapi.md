---
sidebar_position: 2
---

# API Collection & API GET Call

Welcome, this guide shows you how to set up an **API Collection** in **Nowa**, **send request**, and **display real data** in your app.

---

### 1. Create the API Collection  

We created an API collection feature to help you organize.

:::info
Anything you set at the collection level will automatically apply to your APIs, so you don’t need to set it again for each one.
:::

:::note[Class name and File path for Collections]
When you name your collection, Nowa shows you two things:  

- **Class name**: The Dart class name that Nowa generates. Think of it as the “handle” you’ll use when working with this collection inside Circuit.  
- **Path**: The file path where the collection will be stored in your project.  
:::

You can create a new collection by clicking the “**+**” icon, choosing **New Collection** from the list, and then confirming with **Submit**.

<video src="/videos/api2/collection/create.webm" controls width="100%" />

---

### 2️. Set the Base URL  
If you add a Base URL for your API requests, you avoid typing mistakes by reusing the same URL across the collection.

```http
https://api.thecatapi.com/
```

You click on the **Settings** icon, and then simply type your **Base URL**.

<video src="/videos/api2/collection/url.webm" controls width="100%" />

---

### 3️. Add the API Key  
If you go to the **Authorization** section, pop in your **API key**, and set it at the **collection level** so the server knows it’s you and you avoid mix-ups.  

You simply put your **Authorization** key into.

<video src="/videos/api2/collection/auth.webm" controls width="100%" />

---

### 4️. Configure the Headers  
If you tell the **API** to return **JSON**, it will give the data in a **structured format** that’s **easy to read** and **use in your app**.

```http
Accept: application/json
```

Click **Add Header**, then type `Accept` as the **Key** and `application/json` as the **Value**.

<video src="/videos/api2/collection/header.webm" controls width="100%" />

---


## 5. Creating the API Call  
You can create a new **API call** inside your collection. This is how you’ll fetch data.  

:::note  
You don’t need the entire URL—just the specific endpoint. The base URL is already set in the collection.  
:::

### Here’s how:

    1. Click the **Plus** icon. 
    2. Select **New request**.
    3. Give it a name.
    4. Click on **Create**.
    5. Set the **URL**.
    6. Click on **Test** – This step is required before moving to the next step.

<video src="/videos/api2/request/1.webm" controls width="100%" />

---

## 6. Adding the Authorization Key  

:::warning
You don’t need to set the **Authorization key** if it’s already defined at the **collection level**, since **Nowa** recognizes it.
:::

If you want to set a different **Authorization key**, simply copy and paste the auth token value into the field.

<video src="/videos/api2/request/2.webm" controls width="100%" />

---

## 7. Testing and Generating the Data Model  

You can test the API and generate a data model from its output to use in your app.

#### How can you do it:

    1. Click **Run Test**.  
    2. Then click **Generate Model**. You will see the server’s JSON output.  
    3: Click **Next**. You can modify what you want from the JSON.
    4. Finally, click **Save**. At this step, you can also change the generated model’s name or choose where to save it

<video src="/videos/api2/request/3.webm" controls width="100%" />

---

## 8. Binding the Data Model to the UI  

Finally, you can bind the data model to a UI element, like an image.

#### Here’s how:

    1. Close the **API Request** window.  
    2. Click on the **Widgets** icon.  
    3. Add an **Image Widget**.  
    4. In the widget properties, wrap it with the **Data Builder**.  
    5. In the **Data Builder** source, select **API Request**.  
    6. From the list, choose **CatPhoto API**.  
    7. In the Image URL widget property:  
    7.1 Open the **Locals** menu.  
    7.2 Select **Data** (this refers to the Data Builder API response).  
     7.3 Choose **Get Data**.  
     7.4 Then select **URL**.  

<video src="/videos/api2/request/4.webm" controls width="100%" />

---

## 9. Trying Out
In this step, you can try it out.

1. Click on **Play** button.  
2. Click on **Refresh** button to see a new image each time.  


<video src="/videos/api2/request/5.webm" controls width="100%" />

---