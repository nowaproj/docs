# Database + RLS📝

## 🔑 Overview
- **Goal:** Build a simple Todo app backend 💡
- **Auth:** 🔒 RLS ensures users only see their own todos
- **Realtime:** ⚡ Trigger notifies changes

---

## 🛠 Step 1: Create the table & security policies

Paste this SQL in Supabase SQL Editor 🖥️:

```sql
CREATE TABLE todos (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now() NOT NULL,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  task text NOT NULL,
  is_complete boolean DEFAULT false NOT NULL
);

ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own todos." ON todos
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own todos." ON todos
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own todos." ON todos
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own todos." ON todos
  FOR DELETE USING (auth.uid() = user_id);
```

<video controls width="850">
  <source src="/videos/supabase/db/create.webm" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

## 🔒 What is RLS?
RLS stands for **Row Level Security**. 🛡️

- It ensures each user can only access **their own rows** in a table.
- Supabase uses `auth.uid()` (the logged-in user’s ID) to check which rows they can `SELECT`, `INSERT`, `UPDATE`, or `DELETE`. 👤
- Without RLS, everyone could see everyone’s todos 🙈. With RLS, privacy and safety are guaranteed ✅.

Example:  
> If Alice is logged in, `auth.uid()` = Alice’s UUID → she can only work with rows where `user_id = Alice`.

---

## 🤖 Step 2: Generate a query with Nowa AI
This is the ✨ magic ✨.

You can:  
1. Let **AI** do it for you 🪄  
2. Paste SQL yourself 📋  

**Example prompt:**  
> “Generate a query to add a task for a user.”

No need to type column names — Nowa already knows! 🧠

⚠️ Remember: You must be **signed in** 👤 to run queries (because RLS checks `auth.uid()`).

<video controls width="850">
  <source src="/videos/supabase/db/ai.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

## 💻 Step 3: Tweak in the Code Editor
Want to:  
- Rename inputs ✏️  
- Add defaults 🔄  
- Return only what you need 🎯  

You can do all that in the **Code Editor**. 🛠️

![](/img/supabase/editcode.png)

---

## ▶️ Step 4: Try out the query — Add Task
Run the query with:  
- Task: *“Buy milk”* 🥛  

👉 Check Supabase — you’ll see the row appear instantly ✅

<video controls width="850">
  <source src="/videos/supabase/db/addtask.webm" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

## ⚡ Step 5: Generate multiple queries at once
Why stop at one? 😎

Ask AI:  
> “Create queries for updating a task, marking as done, and deleting.”

🔥 Boom! All three appear at once.

<video controls width="850">
  <source src="/videos/supabase/db/multiquery.webm" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

## 📝 Step 6: Test Update
Grab a Task ID 🆔 → run Update → type a new name ✍️ → Supabase updates instantly ✅

<video controls width="850">
  <source src="/videos/supabase/db/updatequery.webm" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

## 🐞 Troubleshooting
- ❌ Empty results? → Not signed in  
- ❌ Permission errors? → Check RLS  
- ❌ Wrong DB? → Check Nowa connection settings ⚙️  

---

## 🎉 You’re all set!
With just a bit of SQL + Nowa AI 🧠, you can:  
- Add ✅  
- Update ✏️  
- Complete ✔️  
- Delete 🗑️  

…all securely 🔒 and instantly ⚡.

👉 Go build something awesome! 🚀💻✨
