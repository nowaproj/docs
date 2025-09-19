---
sidebar_position: 3
---

# Database + RLS

In this guide, we’ll walk through how to set up the database and configure Row Level Security. 

:::note What is Row Level Security (RLS)?

RLS is used to enforce policies that determine who can view, add, edit, or delete records in a table. 

:::

---

## Step 1: Create the table & security policies

You need to create a table that will store todos.  

We created an example for you that builds a table with automatic IDs and timestamps, and sets up security so every user can only manage their own todos.

Open your **Supabase project**, then click on **SQL Editor** and paste this **SQL snippet**.

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

## Step 2: Generate a query with Nowa AI

We built Nowa AI to understand your database structure, so you don’t need to write SQL queries or remember column names, just use plain English, and Nowa will handle it for you.

**Example prompt:**  
> “Generate a query to add a task for a user.”

:::warning Important
You need to be **signed in** to run queries (because RLS checks your identity).  
:::

Click the **+** icon, enter **your prompt**, then click **Generate**.

<video controls width="850">
  <source src="/videos/supabase/db/ai.webm" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

## Step 3: Modify generated code

Nowa also gives you control to fine-tune your queries.  

You can **manually edit the code** or **ask AI to modify the code for you**.

![](/img/supabase/editcode.png)

---

## Step 4: Run your first query

You can try out your query.

Click on your generated query, add a value to the required field, and then click on the **Play** button.   

Check your Supabase table — you’ll see the new row in the table editor.

<video controls width="850">
  <source src="/videos/supabase/db/addtask.webm" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

## Step 5: Generate multiple queries 

You can generate multiple queries with one prompt.

**Example prompt:**  
> “Create queries for updating a task, marking it as done, and deleting.”  

<video controls width="850">
  <source src="/videos/supabase/db/multiquery.webm" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

## Step 6: Update a task

You can change a task, here’s how:  

Click on the `updateTask` query, copy the `taskID` from the Supabase table, add the new task, and then click the **Play** button.

<video controls width="850">
  <source src="/videos/supabase/db/updatequery.webm" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---