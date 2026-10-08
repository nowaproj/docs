---
title: Store files in Supabase
description: Add ready-made upload, download and delete functions for Supabase Storage, test them in the editor and use them with the media picker.
sidebar_label: Store files
keywords: [Supabase storage, bucket, Storage Templates, upload file, download file, delete file, uploadFile, downloadFile, deleteFile, images, photos, media picker, showMediaPicker, file upload]
---

Supabase Storage keeps your app's files, such as profile photos and documents, in buckets. Storage Templates give you three ready-made functions to upload, download and delete files. Test them in the editor, then call them from your screens.

## Before you start

- [Connect Supabase](connect.md).
- A bucket in Supabase. Create one in the Supabase dashboard (open **Storage**), or ask Nowa AI to create it with the Supabase connector. The templates don't create buckets or policies.
- If your bucket's policies need a signed-in user, sign in first. See [Sign users in with Supabase](auth.md).

## Add the storage functions

1. In the **Supabase** panel, click **+** next to **Generate a Query**.
2. Click **Storage Templates** ("File operations").
3. Click a template. Nowa generates the function straight away, shows `Function "uploadFile" generated successfully!` and closes the dialog. The function appears under **Storage**.

{/* CAPTURE: id=integrations-supabase-storage-1 | state: signed-in cloud project connected to Supabase, Generate a Query + clicked, Storage Templates clicked | show: the Supabase Templates dialog with Storage Templates and its three cards (Upload File, Download File, Delete File) with their parameter chips | crop: the Supabase Templates dialog */}

| Template | Function | Inputs | Returns |
|---|---|---|---|
| **Upload File** | `uploadFile` | **Bucket Name**, **File Name**, **File Data** | Nothing |
| **Download File** | `downloadFile` | **Bucket Name**, **File Path** | The file's data |
| **Delete File** | `deleteFile` | **Bucket Name**, **File Name** | Nothing |

The names are fixed, so you get one of each, and generating a template again replaces the earlier function. No template covers public links, listing, moving or copying files. Change a function with **Edit Code**, or ask Nowa AI. See [Change a function's code](database.md#edit-code).

## Test the functions

1. Click `uploadFile` under **Storage**. The test panel opens at the bottom of the editor.
2. Type a **Bucket Name** and a **File Name**. The file name can include folders, such as `images/photo.png`.
3. Click **File Data** and pick an image from your device. The field then shows the file's name.
4. Click **Run**.
5. Click `downloadFile`.
6. Type the same **Bucket Name**. For **File Path**, type the name you uploaded under.
7. Click **Run**.

{/* CAPTURE: id=integrations-supabase-storage-2 | state: same project, uploadFile run with a small PNG, then downloadFile run for it | show: the bottom test panel titled Testing downloadFile with the image preview, the download icon beside it, and Testing values, Run and Edit Code on the right | crop: bottom test panel */}

A downloaded image (JPG, PNG, GIF or WebP) shows as a preview, with a download icon (tooltip **Download image**) to save it. Any other file shows **File downloaded successfully**, its type and size, and **Save File to Disk**.

The generated `uploadFile` doesn't replace existing files, so use a new **File Name** each time. To remove a file, click `deleteFile`, fill in **Bucket Name** and **File Name**, and click **Run**.

If a test fails with **RLS Policy Error**, your bucket needs a Row Level Security policy that allows that action. Add one in Supabase, or ask Nowa AI. See [Read and write Supabase data](database.md#test-a-function).

:::warning
Tests run against your real Supabase project. `uploadFile` adds a file to your bucket and `deleteFile` removes one for good.
:::

## Use the functions in your app

Both flows below run from an event, such as a button's **On Pressed**. See [Build logic in Circuit](../../logic/circuit.md).

### Upload a picked image

1. Add `showMediaPicker`. **Source Type** starts as `camera`: choose `gallery` to pick from the photo library. If Nowa lists missing packages or permissions under **Dependencies**, click **Hot Fix**. See [Show dialogs, sheets, snackbars and pickers](../../logic/popups.md).
2. Turn on **await**, then use **Store result** → **New Variable**. The variable holds a list of the files the person picked.
3. Add a node and pick that variable from **LOCALS**. Click **+**, choose `first`, then `readAsBytes`. Turn on **await** and store the result in a new variable. This is the file's data.
4. Add `SupabaseService` → `uploadFile`. Type the **Bucket Name** and **File Name**, and link **File Data** to the variable from step 3.

### Show a downloaded image

1. Select the **Image** widget. In its source field, open the **Bytes** tab, click the **Bytes** label and choose **Create Variable...**. Nowa adds a screen variable for the file's data and links it. See [Images, videos and other files](../../design/assets.md).
2. In the Circuit of your event, add `SupabaseService` → `downloadFile` and fill in **Bucket Name** and **File Path**.
3. Turn on **await**. Set **Store result** to **Pick Variable**, click the **Variable** label and choose the variable from step 1.
4. Add **refresh** from **LOCALS**, so the screen redraws when the data arrives.

To show many images, such as a photo feed, a public bucket is simpler. Files in a public bucket have web addresses, so an **Image** can load them from its **Network** tab. See the [Supabase Storage docs](https://supabase.com/docs/guides/storage).

:::tip
Or ask Nowa AI. In **Agent** mode with the Supabase connector on, try: "Create a public avatars bucket that lets signed-in users upload, then add a button on my profile screen that picks a photo and uploads it."
:::

## Next steps

- [Sign users in with Supabase](auth.md)
- [Read and write Supabase data](database.md)
- [Manage your Supabase backend](backend.md)
