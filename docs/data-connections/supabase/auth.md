# Supabase Authentication

## 1️⃣ Registration (Quick Check Only) 📝
We just **test registration** to see how it works in Supabase ✅  
👉 No fancy UI here — only a quick check.  

Since registration looks 👯‍♂️ *almost identical* to login in design, we skip building a page for it.  
Later, when we design the **login page**, you’ll instantly recognize how registration would look too 🔑✨  

<video controls width="850">
  <source src="/videos/supabase/auth/register.webm" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

## 2️⃣ UI Design for Login Page 🔐
Now we design our **login page** 🎉  
It’s simple but powerful ⚡:  
- 📧 Email field,  
- 🔑 Password field,  
- 🎯 Login button.  
That’s it! 🚀 

:::info
Here we introduce **controllers** in Flutter 🕹️:  
- They let us **read** what the user types 👀,  
- **Change** the text programmatically ✏️,  
- **Listen** for changes 🔊,  
- And we can **rename** them for clarity (e.g., `text` → `username`) 🏷️.  
:::
Super flexible 💪 and makes the UI easy to customize 🎨✨  

<video controls width="850">
  <source src="/videos/supabase/auth/ui.webm" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

## 3️⃣ UI Design for Logged-In Page 🏡

Once the user successfully logs in, they land on the **Logged-In Page**.  
This page should be simple and welcoming, with a clear option to log out.

<video controls width="850">
  <source src="/videos/supabase/auth/ui2.webm" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

## 4️⃣ Add Sign-In Logic 🧠⚙️
Here comes the magic 🪄:  
- ❌ If login fails → show an **error message** 🚨,  
- ✅ If login succeeds → navigate straight to the **logged-in page** 🎉🎉  

Smooth & seamless ✨  

<video controls width="850">
  <source src="/videos/supabase/auth/signin.webm" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

## 5️⃣ Add Sign-Out Logic 🚪👋
On the **logged-in page** 🏡 we add a button:  
- One tap → clears the session 🗑️  
- User is sent back to the **login page** ↩️  

Easy, clean, and secure 🔒  

<video controls width="850">
  <source src="/videos/supabase/auth/logout.webm" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

## 🎯 End Result 🎉🔥
With just:  
- A login page 📱,  
- A logged-in page 🏡,  
- And a sign-out button 🚪…  

<video controls width="850">
  <source src="/videos/supabase/auth/try.webm" type="video/mp4" />
  Your browser does not support the video tag.
</video>

👉 You’ve built a **complete authentication flow** with Supabase 🎊💻  

No extra backend headaches 😵, no heavy setup ⛔… just pure Flutter magic 🪄💙  
