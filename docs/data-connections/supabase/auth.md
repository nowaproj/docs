---
sidebar_position: 2
---

# Authentication

Building apps is exciting — but before your users can truly enjoy your app, they need a way to **sign up, log in, and log out safely**. Let’s go through it with you step by step.

---

## 1️. Registration 

First, you can test the registration process to confirm everything works correctly with **Supabase**.

If you’d like to try it out, simply click the signUp button.
Next, enter your test email and password in the fields we provided for you.
When you’re ready, just click the Run button

:::warning
 Supabase will send you a verification email. Make sure to click the link inside, or you won’t be able to log in.
:::

<video controls width="850">
  <source src="/videos/supabase/auth/register.webm" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

## 2️. UI Design for Login Page

Next, let’s design the **login page** together. We Keep it simple for you:  
- Email field  
- Password field  
- Login button  

:::info
Here’s where **controllers** come in handy:  
- They let you read what the user types,  
- Change the text programmatically,  
- Listen for changes,  
- And rename them for clarity (for example: `text` → `username`).  
:::

### 1. Add an **Email Text Field**
- Open the **Widgets panel**.  
- Drag a **TextField** onto your screen.  
- Adjust the **size** so it looks comfortable.  
- Move it to the right **position** where you want the email input to be.  
- Rename its **controller** to something clear, like `username`.  

### 2. Add a **Password Text Field**
- Go back to the **Widgets panel**.  
- Drag another **TextField** onto your the screen.  
- Resize it and position it nicely under the email field.  
- Rename its **controller** to `password`.  

### 3. Add a **Login Button**
- From the **Widgets panel**, drag a **Button** onto the screen.  
- Place it below the password field.  
- Adjust the **size** and **position** as you needed.  

<video controls width="850">
  <source src="/videos/supabase/auth/ui.webm" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

## 3️. Logged-In Page 

This is the page your users see when logged in.

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

## 4️. Add Sign-In Logic

Now comes the magic:  

- If login fails → show an error message,  
- If login succeeds → send the user straight to the logged-in page.  

Smooth, simple, and exactly what users expect.  

<video controls width="850">
  <source src="/videos/supabase/auth/signin.webm" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

## 5️. Add Sign-Out Logic

Finally, give users an easy way out.  
On the logged-in page, add a **sign-out button**:  

- One tap clears their session,  
- They’re redirected back to the login page.  

Easy, clean, and secure.  

<video controls width="850">
  <source src="/videos/supabase/auth/logout.webm" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

## End Result 

With just a:  
- Login page,  
- Logged-in page,  
- And a sign-out button…  

You’ve built a **complete authentication flow** with Supabase inside Nowa.  

No extra backend headaches, no heavy setup — just pure Flutter magic with a little help from Nowa.  

<video controls width="850">
  <source src="/videos/supabase/auth/try.webm" type="video/mp4" />
  Your browser does not support the video tag.
</video>
