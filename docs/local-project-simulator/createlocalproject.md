---
sidebar_position: 1
title: Create a local project
description: How to download, set up, and create local projects in Nowa Desktop
---

# Create a local project

Nowa is not just a web-based platform; it also offers a powerful Desktop application available for both macOS and Windows.  

This guide will help you download and install the Nowa Desktop version, set up the Flutter SDK, and create or open local projects.

---

## Downloading Nowa Desktop

To download the Nowa Desktop application, follow these steps:

1. **Log in to Nowa on the Web:** Open your web browser and log in to your Nowa account at [app.nowa.dev](https://app.nowa.dev).
2. **Select Your Platform:** Click on the `Download for Desktop` button and choose the appropriate version for your operating system (macOS or Windows).
3. **Install Nowa Desktop:** After downloading, follow the installation instructions specific to your operating system to complete the setup.

<video width="600" controls>
  <source src="/videos/desktopversion/download.mp4" type="video/mp4" />
</video>

---

## Setting Up Flutter SDK for Nowa Desktop

To use Nowa Desktop, you must have Flutter SDK installed on your device.

1. **Install Flutter SDK:**  
   Download and install the Flutter SDK from the [official Flutter website](https://flutter.dev/docs/get-started/install).

2. **Configure Local Setup in Nowa:**
   - After installing Nowa Desktop, open the app and log in.
   - Click on the **⚙️ Settings** icon in the **bottom-left corner** of the window.
   - In the pop-up window, navigate to the **Local Setup** tab.

![](/img/nowadesktop/1.png)

   - Set the path to your **Flutter SDK** (the folder containing subfolders like `bin`).
   - *(Optional)* Set a **Default Project Path** for storing projects.
   - *(Optional)* Set your **VS Code Path** for seamless integration with VS Code.

![](/img/nowadesktop/2.png)

---

## Why Use Nowa Desktop?

Using the Nowa Desktop version comes with several advantages:

### 1. Enhanced Performance
- **Native Execution:** Runs natively on your device for better performance compared to the web app.

### 2. Local Flutter Projects
- **Local Project Creation:** Create local Flutter projects stored directly on your device.
- **Workflow Compatibility:** Continue using VS Code, GitHub, Copilot, and other tools — Nowa projects are just standard Flutter projects.

[Learn how to create a GitHub repo from a Nowa local project](../../version-cont-deploy/git/git-local.md).

### 3. Simulators and Platforms
Use simulators for Android, iOS, Web, and Desktop to test in real-time across platforms.

### 4. Offline Capability
Build and edit projects offline without interruption.

:::note  
**Available for Everyone:** The Nowa Desktop version is available for all users. No premium subscription is required.  
:::

---

## Creating Local Projects in Nowa Desktop

After installing Nowa Desktop, you can easily create local projects.

### Steps to Create a Local Project

1. **Open Local Projects:**  
   In the sidebar, go to **Your Projects → Local Projects**.  
   ![](/img/nowadesktop/createlocalproject/1.png)

2. **Start a New Local Project:**  
   Click on the **New Local Project** button.  
   ![](/img/nowadesktop/createlocalproject/2.png)

3. **Choose Project Type:**  
   From the dropdown, select **New Local Project**.  
   ![](/img/nowadesktop/createlocalproject/3.png)

4. **Enter Project Details:**  
   - Provide a **Project Name**.  
   - The **Package Name** is generated automatically.  
   - Click **Browse** to set the folder path where the project will be saved.  
   ![](/img/nowadesktop/createlocalproject/4.png)

5. **Select a Folder:**  
   Choose your desired folder and click **Select Folder**.  
   ![](/img/nowadesktop/createlocalproject/5.png)

6. **Create the Project:**  
   Confirm the path and click **Create**.  
   ![](/img/nowadesktop/createlocalproject/6.png)

Nowa will create a local Flutter project with all necessary files and folders.  
![](/img/nowadesktop/createlocalproject/7.png)

---