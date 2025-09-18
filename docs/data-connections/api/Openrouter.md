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

<video src="/videos/api2/post/1.webm" controls width="100%" />

---

## 2️. Configure the URL & Method

If you want to send data, you need to change the request to the **POST** method.

#### Here’s how:

1. Click on **GET** and change it to **POST** from the list.  
2. Paste the **URL** into the field.  

<video src="/videos/api2/post/2.webm" controls width="100%" />

---

## 3️. Add Authorization Header

Most APIs need proof that you’re allowed to use them, so you need to add the line `Authorization: Bearer <your_token>` to the request header in this case — but this depends on which API you use.

:::note
Most of the time, the text **before the colon** is the **key**, and the text **after the colon** is the **value**.
:::

Click Add header +, then set the key to `Authorization` and the value to `Bearer <your_token>`.
<video src="/videos/api2/post/3.webm" controls width="100%" />

---

## 4️. Set Content-Type to JSON
The backend need to know the *format* of the data you need.   

Click Add header +, then set the key to `Content-Type` and the value to `application/json`.

<video src="/videos/api2/post/4.webm" controls width="100%" />

---

## 5️. Create Input Parameter

You can set up a **parameter** (e.g., `textinput`) that updates with whatever the user types instead of using a fixed value.

Switch to Body (since parameters go in the request body), click the plus icon, and give parameter a name.

<video src="/videos/api2/post/5.webm" controls width="100%" />

---

## 6️. Insert Parameter into Request Body
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

<video src="/videos/api2/post/6.webm" controls width="100%" />

---

## 7️. You can check out how it works

Click Test, enter a value for the parameter, and run the test.

<video src="/videos/api2/post/7.webm" controls width="100%" />

---

## 8️. Build the Model
The response often contains a lot of data, but you only need the parts that matter, so here you can create a model that maps just the values you want to use in your app.

#### Steps:
    1. Click **Generate Model**  
    2. Click **Next**  
    3. Select what you need from the **Response**  
    4. Click **Next**  
    5. Click **Save**


<video src="/videos/api2/post/8.webm" controls width="100%" />

---

## 9️. Create UI Elements (TextField & Button)
You need two elements: a text field where you can type your request, and a button that sends it.

    1. Close the API request window  
    2. Open **Widgets**  
    3. Add **TextField** from list  
    4. Open **Widgets** again  
    5. Add **Button**  

<video src="/videos/api2/post/9.webm" controls width="100%" />

---

## 10. Connect Button to API Call
In this section, you will learn how to connect logic to the button.

#### How you can do it

  1. Click on the **Edit** button next to the text **"OnValue"**.  
  2. Click the **+** icon.  
  3. In the **API** section, search for your API (e.g., `"deepseek"`).  
  4. Add a value to the `TextInput` variable from the **TextField**:  
  5. Select the **Text Controller**  
  6. Then select the **Text** property inside the controller  


<video src="/videos/api2/post/10.webm" controls width="100%" />

---

## 1️1️. Show API Result in Alert Dialog

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

  1. Click on the **Edit** button next to the text **"On pressed"**.  
  2. Click the **+** icon.  
  3. In the **API** section, search for **Showdialog**.  
  4. Click the **edit Alertdialog**.  
  5. Click the **🖌️**.  
  6. Click the **text**.  
  7. Click **Custom Expression**.  
  8. Add your **Custom expression**.  
  9. Click on **Eval**.  
  10. Close opened windows.  

<video src="/videos/api2/post/11.webm" controls width="100%" />

---

## 1️2️. Review the Final Result

Time for the full test:  

You can click the Play button, write something you want in the Textfield, and then you can click the Button. 

:::note
**Eval** means *evaluate* — it checks your expression, and if it’s correct, adds it for visual editing.
:::

<video src="/videos/api2/post/12.webm" controls width="100%" />

---