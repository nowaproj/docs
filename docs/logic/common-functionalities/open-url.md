---
sidebar_position: 3
title: Open Url
description: How to open URLs from your app
---

# Open Url 

The **OpenUrl** node is used to open a website or external link directly in the user's browser. This action will cause the user to temporarily leave your app, as the link opens outside the app environment.

This is useful when you want to redirect users to:
- A support page
- An external blog or documentation
- A payment or checkout link
- Any external resource on the web

---

## Want to open a website *inside* your app instead?

If you want users to stay inside your app and view the website without switching to a browser, use the **WebView widget** instead. This embeds the webpage within your app screen.

---

## How to use the OpenUrl node

Here’s how to set it up step by step:

1. **Open the function or event** where you want to add the OpenUrl logic (for example, a button press or a page load event).
2. Under the **Nowa** category in the logic panel, drag and drop the **OpenUrl** node.
3. Select the node, and on the right panel, you’ll see a field labeled **Url**.
4. Enter the full website link you want to open (e.g., `https://example.com`).

![](/img/circuit/common_functionalities/others/openurl.png)


---

### Dynamic URLs

Just like any other field in Nowa, you can make the **Url** field dynamic:
- Click on the `Url` field
- Use the **Linking menu** to connect it to a variable, function output, parameter, or expression

This is especially useful if:
- The URL depends on user data
- You want to open different links based on conditions

---

## What happens when it's triggered?

Once the function is called or the event is triggered:
- The app will pause in the background
- The user's default browser will open with the URL you provided

This is the standard behavior for external links on mobile and web platforms.

---

Use this node when you want to connect your app to the wider web, while keeping the user's experience simple and clear.