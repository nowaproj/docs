# POST API Request 🚀

This guide walks you through **12 steps** of setting up an API request, handling inputs/outputs, and connecting the result to your UI. Each step is explained in detail, so you understand **what** you’re doing and **why**.  

---

## 1️⃣ Create the API Request
We start by creating a new **API Request** in Nowa. This is the backbone of our integration: without it, we cannot communicate with external services. 🌐  

<video src="/videos/api2/post/1.webm" controls width="100%" />


---

## 2️⃣ Configure the URL & Method
Next, set the **endpoint URL** and change the request type to **POST**.  
- **Why POST?** Because we are sending data (input parameters) to the server, not just reading information. 📤  

<video src="/videos/api2/post/2.webm" controls width="100%" />

---

## 3️⃣ Add Authorization Header
We add an **Authorization header** with the format:  
```
Authorization: Bearer <your_token>
```  
🔑 **What is Bearer?**  
“Bearer” is a **token-based authentication method**. It tells the server:  
👉 “Here is my access token, I’m authorized to make this request.”  
Without this header, the request would fail.  

<video src="/videos/api2/post/3.webm" controls width="100%" />

---

## 4️⃣ Set Content-Type to JSON
We set `Content-Type: application/json`.  
- This tells the API that our request body will be structured as JSON. 🧩  
- If we don’t set this, the server may not understand the format of our data.  

<video src="/videos/api2/post/4.webm" controls width="100%" />

---

## 5️⃣ Create Input Parameter
We define a **parameter** (for example: `textinput`) that will serve as **user input**. This parameter is dynamic, so the request changes depending on what the user enters. ✍️  

<video src="/videos/api2/post/5.webm" controls width="100%" />

---

## 6️⃣ Insert Parameter into Request Body
Inside the request body, we insert the parameter using the syntax:  
```
${textinput}
```  
💡 This means: “Take the value from the UI field and send it here.”  

<video src="/videos/api2/post/6.webm" controls width="100%" />

---

## 7️⃣ Test the Request
We test the API request to check if it returns valid results. ✅  
- This helps us verify that the setup is correct.  
- We can already see the structure of the **response data** here.  

<video src="/videos/api2/post/7.webm" controls width="100%" />

---

## 8️⃣ Build the Model
We create a **model** from the API response.  
- Important: **only map the values we actually need.** 🎯  
- This makes the app more efficient and keeps the UI clean.  

<video src="/videos/api2/post/8.webm" controls width="100%" />

---

## 9️⃣ Create UI Elements (TextField & Button)
Now we add two UI components:  
- **TextField** → where the user types input.  
- **Button** → to trigger the API request.  
🎨 This is where the app becomes interactive!  

<video src="/videos/api2/post/9.webm" controls width="100%" />

---

## 🔟 Connect Button to API Call
We configure the **Button Action** so that when it’s pressed, the API request runs.  
- This links the UI to the backend.  
- Without this, the user input would never reach the API.  

<video src="/videos/api2/post/10.webm" controls width="100%" />

---

## 1️⃣1️⃣ Show API Result in Alert Dialog
When the API returns data successfully, we display it in an **Alert Dialog**.  
- Use this **custom expression**:  
  ```
  value.choices!.first?.content
  ```  
- Here, `value` is the **default return object**.  
- This makes sure we display the **right content** to the user. 🪄  

<video src="/videos/api2/post/11.webm" controls width="100%" />

---

## 1️⃣2️⃣ Review the Final Result
Finally, test the full flow:  
1. Enter text in the TextField.  
2. Tap the Button.  
3. Watch the API response appear in the Alert Dialog.  
🎉 Congratulations — the integration works!  

<video src="/videos/api2/post/12.webm" controls width="100%" />

---

# ✅ Why This Flow is Powerful
- 🔒 **Secure** → Using Bearer tokens keeps the API safe.  
- 📦 **Flexible** → Parameters make the request dynamic.  
- 🎯 **Efficient** → Filtering response ensures we only use what we need.  
- 🤝 **User-Friendly** → Clear UI with input + button + feedback.  
