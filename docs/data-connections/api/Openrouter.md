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
Next, we set up a **parameter** (for example: `textinput`).  
This is a placeholder that changes based on what the user types. ✍️  

Instead of hardcoding a value, your app will send whatever the user enters.  

<video src="/videos/api2/post/5.webm" controls width="100%" />

---

## 6️. Insert Parameter into Request Body
Inside the body of the request, we add the parameter:  

```
${textinput}
```  

This means: “Take whatever the user typed and send it here.”  
It’s how we make the request dynamic.  

<video src="/videos/api2/post/6.webm" controls width="100%" />

---

## 7️. Test the Request
Now it’s time to test. ✅  
Hit **Send** and check if you get a valid response.  

This step helps confirm that everything is wired up correctly before we move on.  

<video src="/videos/api2/post/7.webm" controls width="100%" />

---

## 8️. Build the Model
The response usually contains a lot of data.  
We don’t need all of it — just the parts that matter.  

Here we create a **model**, mapping only the values we want to use in the app. 🎯  

<video src="/videos/api2/post/8.webm" controls width="100%" />

---

## 9️. Create UI Elements (TextField & Button)
Now comes the fun part — building the interface!  

- Add a **TextField** for the user to type in.  
- Add a **Button** to trigger the request.  

This is where your app starts to feel alive. 🎨  

<video src="/videos/api2/post/9.webm" controls width="100%" />

---

## 10. Connect Button to API Call
When the user taps the Button, we want the request to run.  
So, we connect the Button’s action directly to the API call.  

This links your UI with the backend service.  

<video src="/videos/api2/post/10.webm" controls width="100%" />

---

## 1️1️. Show API Result in Alert Dialog
The API sends back data. Let’s show it to the user!  

We’ll display the result in an **Alert Dialog** using this expression:  

```
value.choices!.first?.content
```  

This makes sure the right piece of information is shown. 🪄  

<video src="/videos/api2/post/11.webm" controls width="100%" />

---

## 1️2️. Review the Final Result
Time for the full test:  

1. Type something into the TextField.  
2. Tap the Button.  
3. Watch the API’s response appear in the Alert Dialog.  

🎉 Congratulations — you’ve just built your first POST API flow in Nowa!  

<video src="/videos/api2/post/12.webm" controls width="100%" />

---