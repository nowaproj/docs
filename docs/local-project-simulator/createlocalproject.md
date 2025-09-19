---
sidebar_position: 1
title: Create a local project
description: How to download, set up, and create local projects in Nowa Desktop
---

# Create a local project

Nowa isn’t only available in your browser — you can also use **Nowa Desktop**, a dedicated app for macOS and Windows.  

With **Nowa Desktop**, you can create and manage **local Flutter projects** right on your computer. 

This guide will walk you through downloading Nowa, setting up Flutter, and starting your first local project.

---

## Downloading Nowa Desktop

Getting started is quick and easy:

1. **Log in on the Web**  
   Go to [app.nowa.dev](https://app.nowa.dev) in your browser and log in to your Nowa account.

2. **Download the App**  
   Click on **Download for Desktop** and choose the version that matches your system (macOS or Windows).

3. **Install**  
   Once downloaded, follow the installation instructions for your operating system.

<video width="600" controls>
  <source src="/videos/desktopversion/Download.webm" type="video/mp4" />
</video>

---

## Setting up Flutter SDK

To run local projects, Nowa Desktop needs the Flutter SDK installed on your computer.

1. **Install Flutter SDK**  
   Download it from the [official Flutter website](https://flutter.dev/docs/get-started/install) and follow the steps to install.

2. **Connect Flutter to Nowa Desktop**  
   - Open Nowa Desktop and log in.  
   - Click the **⚙️ Settings** icon in the bottom-left corner.  
   - Go to the **Local Setup** tab.  
   - Point Nowa to your Flutter SDK folder (the one containing `bin`).  
   - *(Optional)* Choose a default folder where your projects will be saved.  
   - *(Optional)* Add your VS Code path if you want smooth integration.  

![](/img/nowadesktop/1.png)  
![](/img/nowadesktop/2.png)

---

## Why use Nowa Desktop?

Nowa Desktop gives you extra power compared to the web version:

- **Better performance** — runs natively on your computer.  
- **Local projects** — your apps are standard Flutter projects, so you can use VS Code, GitHub, Copilot, and other tools with them.  
- **Cross-platform testing** — run your app on Android, iOS, Web, or Desktop simulators.  
- **Offline mode** — build and edit even without internet access.  

:::note  
**Good to know:** Nowa Desktop is available for all users — no premium plan required.  
:::

---

## Creating your first local project

Once Nowa Desktop is set up, you can start creating your first local project.

1. In the sidebar, go to **Your Projects → Local Projects**.  
   ![](/img/nowadesktop/createlocalproject/1.png)

2. Click **New Local Project**.  
   ![](/img/nowadesktop/createlocalproject/2.png)

3. Choose **New Local Project** from the dropdown.  
   ![](/img/nowadesktop/createlocalproject/3.png)

4. Fill in your project details:  
   - Give your project a name.  
   - The package name is created automatically.  
   - Browse and select where you want to save the project.  
   ![](/img/nowadesktop/createlocalproject/4.png)

5. Confirm the folder and click **Create**.  
   ![](/img/nowadesktop/createlocalproject/5.png)  
   ![](/img/nowadesktop/createlocalproject/6.png)

Nowa will generate a ready-to-use Flutter project with all the files you need.  
![](/img/nowadesktop/createlocalproject/7.png)

---