---
sidebar_position: 4
title: Platform check
description: Checking the platform where the app is running
---

# Platform Check

The **checkPlatform** node helps you customize your app's behavior based on the platform it's currently running on.

## Why it’s useful

You can build your app once and deploy it across all platforms—Web, Android, iOS, macOS, Windows, Linux, and Desktop. But sometimes, you want your app to behave differently depending on where it’s running. For example:

- On Web, open a browser-specific dialog
- On Android, access native storage
- On Desktop, use keyboard shortcuts

That’s exactly what **checkPlatform** helps you do.

Sure! Here's the polished version with your addition included at the end of the **How to use the node** section:

---

## How to use the node

1. **Open the Circuit** in your project.  
2. From the **nodes menu**, go to **Globals**.  
3. Choose the `checkPlatform` node.  
4. It will drop with `isWeb` selected by default.  
5. Click on it to select a different platform check from the list.

Each option is a boolean (either `true` or `false`) depending on the current platform.

> Use it inside an `if` statement to run specific logic only for a certain platform.

In the video below, we show how to add `checkPlatform` inside an `if` statement, and then use a **custom expression** to check if the platform is both **Web** and **Android** at the same time.  
This is a great example of combining platform checks—more on that in the next section.

<video controls width="850">
<source src="/img/circuit/common_functionalities/others/checkPlatform.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>


## Available platform checks

When you use `checkPlatform`, you can choose from the following booleans:

```
isAndroid   // true if the app is running on Android
isDesktop   // true if on any desktop platform
isIOS       // true if the app is on iOS
isLinux     // true if running on Linux
isMacOS     // true if on macOS
isWeb       // true if it's a Web app
isWindows   // true if on Windows
```


## Combining platform checks

Sometimes, you want to check for more than one platform. You can combine conditions using logical operators like **and** (`&&`) or **or** (`||`).

There are two ways to do this:

### 1. Using **Custom Expression**

- Click on the `condition` field of an `if` node.
- Then choose **Custom Expression**.
- Write your expression directly, e.g.:
  ```
  NPlatform.isWeb && NPlatform.isAndroid
  ```
  This returns `true` only if the app is both Web and Android (which rarely happens, but it's just an example!).

### 2. Using **Expression Builder**

- Click on the `condition` field of an `if` node.
- Choose **Expression Builder**.
- From the menu, go to **Operators**, then select `logicalAnd`, `logicalOr`, or others.
- Set the **left side** and **right side** values:
  - For each side, choose the `checkPlatform` node.
  - Click on the default `isWeb` and change it to the desired platform check.

:::tip[View the resulted expression]
After using Expression Builder, you can click the same field again and switch to **Custom Expression**. This shows the resulting code, and you can even edit it manually for more advanced use.
:::

---

With **checkPlatform**, your app can respond intelligently to the device it's on—making it feel native and tailored on every platform.