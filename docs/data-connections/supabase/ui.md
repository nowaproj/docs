---
sidebar_position: 4
---

# Connect Queries to UI

In this guide, you’ll learn how to connect **Supabase Queries** to the **UI**.

You can set it up **yourself**, or let **Nowa AI** do it for you.

This guide focuses on the **do-it-yourself** approach.

If you’d like to see how to use **Nowa AI** instead, [click here to learn more](./auth.md#%F0%9F%85%B0%EF%B8%8F-ai-does-it-for-you).

---

# 1. Add Listview

If you don’t know what ListView is, [click here](../../ui/widgets/widget-desc/listview).

You need click on **Widget**s, then select **ListView**.

<video controls width="850">
  <source src="\videos\supabase\ui\listview.webm" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

# 2. Bind Query to listview

Click add **wrapper**,
select **Databuilder**,
change the source from **custom** to **Supabase**,
then change **Query** to your **prefered query**.

<video controls width="850">
  <source src="\videos\supabase\ui\databuilder.webm" type="video/mp4" />
  Your browser does not support the video tag.
</video>

# 3: Bind Query Item to Text widget

Select the **Text** widget from your widget tree (by default, it’s called *Placeholder*). Then, in the widget properties panel on the right, click on **Text** and choose **Custom Expression**.

```dart
data[index]['task']
```

You’re using this because **your data** is tied to the **DataBuilder**, so it always starts with `data`.  

The `index` shows **your current item** in **your list**, and `['task']` pulls the **task field** from **your table**.  

It’s basically how you tell the app:  
> “Hey, show me the task for this specific item in my list.”

After entering the expression, you can click the **Eval** button to evaluate it.

Finally, click the **Play** button to preview the results.

<video controls width="850">
  <source src="\videos\supabase\ui\item.webm" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---