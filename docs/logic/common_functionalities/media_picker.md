---
sidebar_position: 2
title: Media Picker
description: How to build media picker functionality
---

# Using the Media Picker

In this guide, you’ll learn how to use the **Media Picker** in Nowa to let users pick an **image or video** and upload it into your app.

We’ll walk through a simple example where the user selects an **image**, and it’s **instantly displayed** in the app.

---

## 📸 Step-by-Step: Pick an Image and Display It

### 1. Add an Image Widget

- Drag and drop an **Image** widget onto your screen.
- In the properties panel, set the **Source** to `bytes`.
- You’ll see a `Bytes` field. Click **Create Variable**.
- This creates a variable that stores the image in **bytes format**.

<video controls width="720">
  <source src="/img/circuit/common_functionalities/media_picker/set_image_bytes.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

  
:::info[The variable type will be `Uint8List`]
**What does that mean?**  
`Uint8List` stands for *Unsigned Integer 8-bit List*, which is just a way of storing raw binary data like images.
:::



---

### 2. Add a Button to Trigger the Media Picker

- Drop a **Button** widget and open the logic of "OnPressed" in circuit.
- Add the **Show Media Picker** node from "nowa" category

#### Configure the Media Picker:

- **Allow multiple selection**: Toggle ON or OFF depending on your use case.
- **Media type**: Choose `image`, `video`, or `both`.
- **Source type**: Choose `gallery`, `camera`, or `both`.
- **Preferred camera** (if source includes camera): Pick `rear` or `front`.

> The media picker needs permissions to access the gallery or camera.  
> When prompted, click **Hot fix** to auto-add all required dependencies.

- Toggle **Await** so the flow waits until the user finishes selecting a file.
- Enable **Store result** and choose **New variable**.

Let’s name this variable `var1`.

> The result will be stored as a **list of type `XFile`**.  
> **What is `XFile`?**  
> `XFile` is a cross-platform file representation from the `image_picker` package. It contains metadata like path, name, and functions like `readAsBytes()` to read the file’s data.

This video shows the enire steps of building the logic
<video controls width="720">
  <source src="/img/circuit/common_functionalities/media_picker/build_logic.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>


---

### 3. Extract the Image File from the XFile List

Even when selecting one image, the result is still a list. So now:

- Click the `+` button to add a new **expression node**.
- Go to **Locals**, pick `var1` (the variable that holds the result of the picker).
- On the right side, click `+` to build an expression:
  - Select **first** → this gets the first file in the list.
  - Then click `+` again to call **readAsBytes()** on the file.

> The expression should now look like:  
> `var1.first.readAsBytes()`

---

### 4. Store the Bytes and Update the Image

- Choose **Store result**, and create a new variable (we named it `imageBytes`).
- This variable is of type `Uint8List`, which is exactly what your Image widget needs.

Now, go back to the image variable you created earlier (we called it `image` in the video):

- Set it equal to `imageBytes`.

This connects the picked image data to the UI.

---

### 5. Refresh the Screen

- Add a **Refresh** node after updating the variable to make sure the UI updates and displays the new image.

---

### 6. Test It!

- Select the screen and hit **Play**.
- Try picking an image.
- The image should instantly appear inside the Image widget 🎉

<video controls width="720">
  <source src="/img/circuit/common_functionalities/media_picker/final_result.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

## ✅ Recap

Here’s a summary of what we did:

- Used the **Media Picker** to let the user pick a file.
- Retrieved the **first item** from the result list (`XFile`).
- Used **`readAsBytes()`** to convert it to displayable format.
- Stored the result in a `Uint8List` variable.
- Connected it to the Image widget.
- Called **Refresh** to show the image.

You can extend the same flow for videos or multi-file selection as well!

Let us know what you build with it 👇


