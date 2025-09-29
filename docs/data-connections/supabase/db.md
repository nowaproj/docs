---
sidebar_position: 3
---

# Queries

In this guide, we’ll walk through how to set up the database and configure Row Level Security. 

:::note What is Row Level Security (RLS)?

RLS is used to enforce policies that determine who can view, add, edit, or delete records in a table. 

:::

:::note What is Queries?

Queries are database requests, and the main types are: SELECT (retrieve data), INSERT (add data), UPDATE (modify data), and DELETE (remove data).

:::

:::note SELECT – retrieve data
You can use **SELECT** when you want to **get information** from one or more tables.  
```sql
-- You want to show all students in your class 10A
SELECT id, name, class
FROM students
WHERE class = '10A';
```

:::

:::note INSERT – add data
You can use **INSERT** when you need to **add new records** into your table.  
```sql
-- You want to add a new student record
INSERT INTO students (name, class, phone)
VALUES ('Ada Lovelace', '10A', '555-0100');
```

:::

:::note UPDATE – modify data
You can use **UPDATE** when you want to **change values** that are already in your table.  
```sql
-- You want to fix a student’s phone number
UPDATE students
SET phone = '555-0199'
WHERE id = 42;
```

:::

:::note DELETE – remove data
You can use **DELETE** when you want to **remove rows** from your table.  
```sql
-- You want to Delete a student once you no longer need their record
DELETE FROM students
WHERE id = 42;
```

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

:::note
You don’t always have to write SQL queries — you can also create tables visually or even let Supabase AI help you out!

Supabase AI:

<video controls width="850">
  <source src="/videos/supabase/db/supabaseai.webm" type="video/mp4" />
  Your browser does not support the video tag.
</video>

Create table visually:

<video controls width="850">
  <source src="/videos/supabase/db/visual.webm" type="video/mp4" />
  Your browser does not support the video tag.
</video>
:::

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

You can see an icon next to the query name that shows the type of query

![](/img/supabase/queries.png)

:::note Modify generated code

Nowa also gives you control to fine-tune your queries.  

You can **manually edit the code**, or you can **ask AI to modify it for you** if you want.

![](/img/supabase/editcode.png)

:::

---

## Step 3: Run your first query

You can try out your query.

Click on your generated query, add a value to the required field, and then click on the **Play** button.   

Check your Supabase table — you’ll see the new row in the table editor.

<video controls width="850">
  <source src="/videos/supabase/db/addtask.webm" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

## Step 4: Generate multiple queries 

You can generate multiple queries with one prompt.

**Example prompt:**  
> “Create queries for updating a task, marking it as done, and deleting.”  

<video controls width="850">
  <source src="/videos/supabase/db/multiquery.webm" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

## Step 5: Update a task

You can change a task, here’s how:  

Click on the `updateTask` query, copy the `taskID` from the Supabase table, add the new task, and then click the **Play** button.

<video controls width="850">
  <source src="/videos/supabase/db/updatequery.webm" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---