---
sidebar_position: 2
---

# Authentication

In general, before your users can truly enjoy your app, they need a way to **sign up, log in, and log out safely**. Let’s go through it with you step by step.

When creating an **Authentication page**, you can attach `SupabaseService` to your prompt and let the AI generate a **custom login/signup screen**, instead of building it from scratch.

---

## 🅰️ AI does it for you

You click on the **chat panel icon** on the left, write a prompt, attach by selecting **SupabaseService** from the list, and then click the **send icon**.

To try it out, you click on the **widget icon** on the **left side**, go to the **login page**, and then click on the **Play** button.

<video controls width="850">
  <source src="/videos/supabase/auth/ai.webm" type="video/mp4" />
  Your browser does not support the video tag.
</video>

## 🅱️ Use templates

### 1️. Registration 

First, you can test the registration process to confirm everything works correctly with **Supabase**.

If you’d like to try it out, simply click the **signUp** button.
Next, enter your test email and password in the fields we provided for you.
When you’re ready, just click the **Run** button

:::note
 **Supabase** will send you a verification email. Make sure to **click the link** inside, or you won’t be able to log in.
:::

<video controls width="850">
  <source src="/videos/supabase/auth/register.webm" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

### 2️. UI Design for Login Page

Now, let’s design the login page together. It will include:::  
- Email field  
- Password field  
- Login button  

<!--
:::info
Here’s where **controllers** come in handy:  
- They let you read what the user types,  
- Change the text programmatically,  
- Listen for changes,  
- And rename them for clarity (for example: `text` → `username`).  
:::
-->


#### 1. Add an **Email Text Field**
- Open the **Widgets panel**.  
- Drag a **TextField** onto your screen.  
- Adjust the **size** so it looks comfortable.  
- Move it to the right **position** where you want the email input to be.  
- Rename its **controller** to something clear, like `username`.  

:::note
In this case, the username and email are the same, since in Supabase the username defaults to the user’s email address.
:::

#### 2. Add a **Password Text Field**
- Go back to the **Widgets panel**.  
- Drag another **TextField** onto your the screen.  
- Resize it and position it nicely under the email field.  
- Rename its **controller** to `password`.  

#### 3. Add a **Login Button**
- From the **Widgets panel**, drag a **Button** onto the screen.  
- Place it below the password field.  
- Adjust the **size** and **position** as you needed.  

<video controls width="850">
  <source src="/videos/supabase/auth/ui.webm" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

### 3️. Logged-In Page 

This is the page your users see when they logged in.

1. **Add a new screen**
   - Click on the **Screens** icon.
   - Choose **Empty Screen**.
   - Give your new screen a name, for example: `loggedin`.
   - Click **Submit** to create it.

2. **Add a text widget**
   - Go to the **Widgets** panel.
   - Drag and drop a **Text** widget onto your new screen.

3. **Customize your text**
   - Select the Text widget.
   - In the **Properties** window:
     - Change the text to whatever you’d like.
     - Open the **Color Picker** and choose a new text color.


<video controls width="850">
  <source src="/videos/supabase/auth/ui2.webm" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

### 4️. Add Sign-In Inputs

I show how you can provide data to the **sign-in action**.

1. Click on **Edit** next to `OnPressed`.
2. Click on **+**.
3. Select **SignIn**.
4. Click on **Email**.
   - Here you select **username** from **Locals** (this is your username controller).
   - Don’t forget to select the **text**.
5. Click on **Password**.
   - Here you select **password** from **Locals** (this is your password controller).
   - Don’t forget to select the **text**.

<video controls width="850">
  <source src="/videos/supabase/auth/signin1.webm" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

### 5. Add Sign-In Success Logic

I show you how can you build an action that takes the user straight to the logged-in page after a successful login.

How can you do it:
1. Click on **+** next to **OnValue**.
2. Click on **Edit** button.
3. Click on **+**.
4. Search **navigator** then click on it.
5. Click on **null** next to **"To"**. 
6. Select **loggedin page**.
7. Close the opened window.


<video controls width="850">
  <source src="/videos/supabase/auth/signin2.webm" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

### 6. Add Sign-In Error Logic

I show you how you can display an error notification if the login fails.

How can you do it:
1. Click on **+** next to **OnError**. 
2. Click on **Edit** button.
3. Click on **+**.
4. Search **showDialog** then click on it.
5. Click on **🖌️** next to **Builder**.
6. Click on **🖌️** next to **Title Hello World**.
7. You can change the text in this case **Error**.
8. Close the opened windows.

<video controls width="850">
  <source src="/videos/supabase/auth/signin3.webm" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

### 7. Add Sign-Out Logic

Finally, you can give your app users an easy way to **log out**.

Steps, how can you do:

1. You need to go to the widgets, search for a button, and add button to the **Logged In** page.
2. Click the **Edit** button next to `onPressed`.
3. Click the **+** icon.
4. Select **SignOut** from the list.
5. Click **+** next to `onValue`, then **Edit**.
6. Click **+** and select **Navigator**.
7. Click on **null** next to `To`.
8. Select **Homepage**.
9. Close the window.


<video controls width="850">
  <source src="/videos/supabase/auth/logout.webm" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

### 8. Try out

You built a fully functional **Supabase Authentication** in **Nowa**.

Click on play mode and try out your app.

<video controls width="850">
  <source src="/videos/supabase/auth/try.webm" type="video/mp4" />
  Your browser does not support the video tag.
</video>
