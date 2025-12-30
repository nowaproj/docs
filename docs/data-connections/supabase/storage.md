---
sidebar_position: 6
---

# Storage

In this section, we’ll explore how **Supabase Storage** lets your app get and serve files such as images, videos, and documents securely — all integrated within your **Supabase** project.

---

## What is Bucket?

A **Supabase Bucket** is a storage container in **Supabase** where you can upload, organize, and manage files such as images, videos, or documents.

---

## Create Bucket 

First, go to the **Storage** section from the Supabase dashboard sidebar.  
Click **new bucket**, then give your bucket a name (e.g. `user-uploads`) and choose whether it should be **Public** or **Private**, click **Create**.

<video controls width="850">
  <source src="/videos/supabase/storage/createbucket.webm" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

## Most Frequently Used Storage Queries

### Upload – add files
Use **Upload** when you want to **add new files** to your storage bucket.  
You might upload a profile picture, a document, or an image that users can later access.

### Download – retrieve files
Use **Download** when you need to **get a file** from your storage.  
This is useful when displaying images, downloading PDFs, or letting users access stored content.

### Get Public URL – share files
Use **Get Public URL** when you want to **generate a link** so others can view or download a file without needing authentication.  
It’s perfect for public profile pictures or shared media.


### List Files – view stored content
Use **List Files** when you need to **see what files exist** in a bucket or folder.  
This helps you show available uploads, manage user files, or display file galleries.

### Move or Copy – organize files
Use **Move** to **rename or relocate** a file within your storage, and **Copy** to make duplicates.  
These are handy when reorganizing folders or when users update filenames.

### Delete – remove files
Use **Delete** when you want to **remove files** you no longer need.  
This helps keep your storage clean and free of outdated content.

---

## Generate multiple storage queries

You can generate one or multiple queries at the same time.

You can use it similarly to database queries — just click the +, type what you want to do with storage, then click Generate. 

<video controls width="850">
  <source src="/videos/supabase/storage/createqueries.webm" type="video/mp4" />
  Your browser does not support the video tag.
</video>

You can view your generated Supabase storage queries in the left panel under the Storage section.

![](/img/supabase/storage.jpg)

---

## Test your Storage query

You can try out your Storage query.

Click on your generated query, add a value to the required field, and then click on the **Play** button.   

To view your uploaded file, just click the **downloadFile** query, type the filename into the text field, and hit the **Play** button!

Now you can see the file’s content!

<video controls width="850">
  <source src="/videos/supabase/storage/example.webm" type="video/mp4" />
  Your browser does not support the video tag.
</video>