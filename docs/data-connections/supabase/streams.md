---
sidebar_position: 5
---

# Stream

In this section, we’ll look at how **Streams** let your app stay *live* by continuously listening for changes and updating automatically as the data evolves.

---

## 1. Enabling Stream in Supabase

First, you need to select the table you want in the **Table Editor**. Then, you can enable **Stream queries** by clicking **Enable Realtime**, and then clicking **Enable Realtime** again.

<video controls width="850">
  <source src="/videos/supabase/db/stream.webm" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

## 2. Nowa AI Stream Query

You can now use **Nowa AI** to create queries as a *Stream* — just include in your prompt that you want it to be a **stream query**. 

If you don't know how to make Supabase query [click here](./db.md#step-2-generate-a-query-with-nowa-ai).

---

## 3. See Result

On the left side, you can see different icons that indicate whether a query is a **Stream** or a **Select** query.

Click your **Stream query**, then **Run**.

<video controls width="850">
  <source src="/videos/supabase/db/stream2.webm" type="video/mp4" />
  Your browser does not support the video tag.
</video>

If your query is a **Stream query**, you’ll notice a yellow Stream word and yellow border lines.

![Supabase Stream](\img\supabase\stream2.png)

:::note
How non-Stream query looks like:

![Supabase Stream](\img\supabase\insert2.png)
:::

---