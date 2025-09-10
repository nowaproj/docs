# API Call & Data Model Setup

# Creating an API Collection  

Welcome! In this guide, we’ll explore how to set up and configure an API collection using the **lovely Cat API** 🐾. Don’t worry—it’s simple! By the end, you’ll be able to send requests and receive adorable cat pictures 😻.  

We’ll go step by step: create the collection, set the base URL, add your API key, and finally make sure we always get responses in JSON format.  

---

#### Notes

:::note[Class name and File path for Collections]
When creating a collection, when naming it, you will see the **generated class name** and the **path**
    
    - **Class name**: This is the name of the Dart class that will be generated in code. It acts as the interface to access requests from this collection inside Circuit. (You will see the class name under API section inside Circuit, and using that class name you will be able to call the request you need)
        
    - **Path**: This is simply the file path where the collection file will be stored.       
:::

:::info[Eveything is a Dart file]     
In Nowa, **everything is a Dart file**—whether it's a screen, component, or API collection. This consistency makes it easier to manage and understand different parts of your app, especially when combining visual and code-based development.
:::  

## 📝 Steps  

### 1️⃣ Create the Collection  
Start by creating a new API collection in **Nowa**.  

:::tip

✨ As soon as you create it, Nowa will automatically generate a **Dart file** that contains your API setup. This means your collection is not just a visual setup—it’s already connected to real code you can build upon.  

:::

<video src="/videos/api2/collection/create.webm" controls width="100%" />

**💡 Why this is good:**  
- 📂 Keeps all your cat-related requests neatly in one place.  
- ⚡ Automatically generates a Dart file, keeping the UI and codebase perfectly in sync.  

---

### 2️⃣ Set the Base URL  
Add the **Base URL** for all your requests:  

```http
https://api.thecatapi.com/
```  
<video src="/videos/api2/collection/url.webm" controls width="100%" />

**💡 Why this is good:**  
- 🔗 You only need to write the common part of the API once.  
- ✨ Makes new requests shorter, reduces errors, and allows quick updates.  

---

### 3️⃣ Add the API Key  
Go to the **Authorization** section.  
Here, simply type in your API key 🔑 in the Nowa interface.  

<video src="/videos/api2/collection/auth.webm" controls width="100%" />


**💡 Why this is good:**  
- 🔐 Once entered, every request will automatically include your key.  
- 🙌 No more copy-paste—it’s handled for you.  

---

### 4️⃣ Configure the Headers  
Tell the API you want responses in **JSON format**:  

```http
Accept: application/json
```  

👉 Remember:  
- The part **before the colon (`Accept`)** goes into the **Key** field.  
- The part **after the colon (`application/json`)** goes into the **Value** field.  

<video src="/videos/api2/collection/header.webm" controls width="100%" />

**💡 Why this is good:**  
- 📊 JSON is structured, clean, and easy to work with.  
- 🛠️ Perfect for integrations and application development.  

---

## 🐾 Final Thoughts  

Just continue to study with this guide, we’ll learn how to create the API request with the model.

---

# API Call and Data Model Creation

In this section, I’ll show you how to connect an **API to the UI without writing any code**, yet still generate real working code behind the scenes. ✨  

---

## 1️⃣ Creating the API Call  
First, I create the **API call** in the project. This will be the foundation for displaying data.  

:::note

You don’t need to provide the entire URL, since it’s part of a **collection**. It’s enough to set only the required endpoint.  

:::

<video src="/videos/api2/request/1.webm" controls width="100%" />

:::info

**Benefit:** Keeps the setup clean and modular — easier to maintain and reuse later. 🧹  

:::


---

## 2️⃣ Setting the URL  
Next, I configure the **endpoint URL**, which defines where the data comes from. 🌐  

<video src="/videos/api2/request/2.webm" controls width="100%" />

:::info

**Benefit:** Ensures the app always points to the correct source of truth for your data. 📡  

:::

---

## 3️⃣ Adding the Authorization Key  
For security, add the required **Authorization key** 🔑.  
This ensures the system can communicate with the API in an authenticated way.  

<video src="/videos/api2/request/3.webm" controls width="100%" />

:::info

**Benefit:** Protects sensitive data and keeps the app secure while accessing APIs. 🛡️  

:::

---

## 4️⃣ Testing and Generating the Data Model  
Then comes the **test run** ▶️.  
From the returned **JSON** response, a **data model** is automatically generated, making each field easy to use. 🧩  

<video src="/videos/api2/request/4.webm" controls width="100%" />



:::info

**Benefit:** Saves time by automatically mapping fields — no manual parsing needed. ⚡  

:::

---

## 5️⃣ Binding the Data Model to the Image Element  
Finally, I visually **bind the data model** to the **image element**.  
This happens entirely without coding — while in the background, real code is generated. 🎨✨  

<video src="/videos/api2/request/5.webm" controls width="100%" />

:::info

**Benefit:** Brings dynamic content to life instantly, while staying completely no-code. 🎉 

:::

---

## 🌟 Summary  
From now on, you can send requests quickly, securely, and with consistent JSON responses—plus you’ll enjoy endless cat pictures to brighten your day 🐱💖.