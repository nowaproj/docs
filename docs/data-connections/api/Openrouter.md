---
sidebar_position: 3
---

# POST API Request

Welcome! In this guide, you walk through how to set up a **POST API request** in **Nowa**.

---

## 1️. Create the API Request
You can begin by creating a new **API Request** inside **Nowa**
.
#### Here’s how:

    1. Click the **Plus** icon. 
    2. Select **New request**.
    3. Give it a name.
    4. Click on **Create**.
    5. Click on the created request.

<video controls playsInline preload="metadata" width="100%">
  <source src="/videos/api2/post/1.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

## 2️. Configure the URL & Method

If you want to send data, you need to change the request to the **POST** method.

#### Here’s how:

1. Click on **GET** and change it to **POST** from the list.  
2. Paste the **URL** into the field.  

<video controls playsInline preload="metadata" width="100%">
  <source src="/videos/api2/post/2.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

## 3. Adding Headers

In the previous page, we wrote about headers. if you're not familiar with them. [Click here](./createapi.md#3-configure-the-headers) 

### 3️.1 Add Authorization Header

Most APIs need proof that you’re allowed to use them, so you need to add the line `Authorization: Bearer <your_token>` to the request header in this case — but this depends on which API you use.

:::note
Most of the time, the text **before the colon** is the **key**, and the text **after the colon** is the **value**.
:::

Click Add header +, then set the key to `Authorization` and the value to `Bearer <your_token>`.
<video controls playsInline preload="metadata" width="100%">
  <source src="/videos/api2/post/3.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

### 3.2 Add Content-Type Header

The **backend** need to know the **format** of the data you need.

:::note Common API Content Types:

The following list gives you an overview of the most commonly used formats.

`application/json`  
`application/xml`  
`application/x-www-form-urlencoded`  
`multipart/form-data`  
`text/plain`  
`application/yaml` (or `text/yaml`)  
`application/protobuf`  
`application/graphql`  
:::

In this example we show you how to use **Json**.

Click Add header +, then set the key to `Content-Type` and the value to `application/json`.

<video controls playsInline preload="metadata" width="100%">
  <source src="/videos/api2/post/4.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

## 4. Create Input Parameter

You can set up a **parameter** (e.g., `textinput`) that updates with whatever the user types instead of using a fixed value.

Switch to Body (since parameters go in the request body), click the plus icon, and give parameter a name.

<video controls playsInline preload="metadata" width="100%">
  <source src="/videos/api2/post/5.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

## 5. Insert Parameter into Request Body
Inside the **body** of the request, you need to add **parameter**:  

You can take the example from the API provider and simply update it by adding **your parameter names** inside `${}` wherever you need them.


Example:

```
{
  "model": "deepseek/deepseek-chat-v3.1:free",
  "messages": [
    {
      "role": "user",
      "content":"${textinput}"
    }
  ]
}
```  

Click Json, insert your json.

<video controls playsInline preload="metadata" width="100%">
  <source src="/videos/api2/post/6.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

## 6. You can check out how it works

Click Test, enter a value for the parameter, and run the test.

<video controls playsInline preload="metadata" width="100%">
  <source src="/videos/api2/post/7.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

## 7. Build the Model
The response often contains a lot of data, but you only need the parts that matter, so here you can create a model that maps just the values you want to use in your app.

#### Steps:
    1. Click **Generate Model**  
    2. Click **Next**  
    3. Select what you need from the **Response**  
    4. Click **Next**  
    5. Click **Save**


<video controls playsInline preload="metadata" width="100%">
  <source src="/videos/api2/post/8.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

## 8. Create UI Elements (TextField & Button)
You need two elements: a text field where you can type your request, and a button that sends it.

    1. Close the API request window  
    2. Open **Widgets**  
    3. Add **TextField** from list  
    4. Open **Widgets** again  
    5. Add **Button**  

<video controls playsInline preload="metadata" width="100%">
  <source src="/videos/api2/post/9.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

## 9. Connect Button to API Call
In this section, you will learn how to connect logic to the button.

#### How you can do it

  1. Click on the **Edit** button next to the text **"On Pressed"**.  
  2. Click the **+** icon.  
  3. In the **API** section, search for your API (e.g., `"deepseek"`).  
  4. Add a value to the `TextInput` variable from the **TextField**:  
  5. Select the **Text Controller**  
  6. Then select the **Text** property inside the controller  


<video controls playsInline preload="metadata" width="100%">
  <source src="/videos/api2/post/10.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

## 10. Show API Result in Alert Dialog

The API sends back data, and you can show it in your application, for example in an Alert Dialog.

:::note
You can use a custom expression, and that’s why it starts with value — because the generated return value defaults to value in the data model. 

Since you know how the data model is built, you know exactly which part is required. 

![](/img/api2/post/model.jpg)

![](/img/api2/post/value.jpg)

:::

  ```
  value.choices!.first?.content
  ```  

 #### How you can do it

  1. Click on the **Edit** button next to the text **"On value"**.  
  2. Click the **+** icon.  
  3. In the **API** section, search for **Showdialog**.  
  4. Click the **edit Alertdialog**.  
  5. Click the **🖌️**.  
  6. Click the **text**.  
  7. Click **Custom Expression**.  
  8. Add your **Custom expression**.  
  9. Click on **Eval**.  
  10. Close opened windows.  

<video controls playsInline preload="metadata" width="100%">
  <source src="/videos/api2/post/11.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

## 11. Review the Final Result

Time for the full test:  

You can click the Play button, write something you want in the Textfield, and then you can click the Button. 

:::note
**Eval** means *evaluate* — it checks your expression, and if it’s correct, adds it for visual editing.
:::

<video controls playsInline preload="metadata" width="100%">
  <source src="/videos/api2/post/12.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---