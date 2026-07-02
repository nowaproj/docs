---
sidebar_position: 1
title: Create a local project
description: How to download, set up, and create local projects in Nowa Desktop
---

# Create a local project

Nowa isn’t only available in your browser — you can also use **Nowa Desktop**, a dedicated app for macOS and Windows.  

With **Nowa Desktop**, you can create and manage your **local Flutter projects** right on your computer. 

This guide will walk you through downloading Nowa, setting up Flutter, and starting your first local project.

---

## Downloading Nowa Desktop

I’ll show you how to download Nowa Desktop.

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

To run local projects, Nowa Desktop needs the Flutter SDK installed on your computer. You can let Nowa install everything for you **automatically**, or point it to an existing Flutter install **manually**.

### macOS: Install Xcode first {#macos-install-xcode}

On **macOS**, Flutter needs **Xcode** to run. If it's missing, setup fails with an error like *"Flutter failed to initialize: xcode-select: No developer tools were found."*

**To install Xcode:**

1. Open the **App Store** on your Mac.
2. Search for **Xcode** and click **Get / Install** (it's a large download, so it may take a while).
3. Once installed, open Xcode at least once so it can finish setting up its components.
4. Return to Nowa Desktop and run the Flutter setup again.

:::note
Xcode is required to build and run your apps on macOS — including **iOS**, which Nowa fully supports.
:::


### Install Flutter automatically (recommended)

Nowa can download and configure Flutter and the Android toolchain for you — no terminal required.

1. **Open Local Setup**  
   In Nowa Desktop, click the **⚙️ Settings** icon, then go to the **Local Setup** tab. Under **Automatic setup**, click **Set up automatically**.  
   ![](/img/nowadesktop/autosetup/1.png)

2. **Download Flutter**  
   Optionally choose an install location, or leave it as is to let Nowa use its own default folder (the path must not contain spaces). Then accept the licenses and click **Install** next to **Flutter**. The Flutter SDK is about 1 GB to download and installs the tools (about 10 GB) into the chosen folder.  
   ![](/img/nowadesktop/autosetup/2.png)

3. **Wait for the download to finish**  
   Nowa downloads and unpacks the Flutter SDK. You can follow the progress in the dialog.  
   ![](/img/nowadesktop/autosetup/3.png)

4. **Verify the setup**  
   Once Flutter is installed, Nowa moves to the **Verify** step and runs `flutter doctor` to check your environment.  
   ![](/img/nowadesktop/autosetup/4.png)

   When it finishes, you'll see what `flutter doctor` reports and which devices you can run on (for example iOS, macOS, and Chrome).  
   ![](/img/nowadesktop/autosetup/5.png)

5. **(Optional) Install the Android toolchain**  
   The Android toolchain is only needed to build Android apps, and the emulator is optional too. Click **Install** to add them, or **Skip for now** if you only target web or desktop — you can always add them later from **Settings → Environment**.  
   ![](/img/nowadesktop/autosetup/6.png)

   Once they're installed, the toolchain and emulator show as **Ready · Managed by Nowa**. Click **Done** to finish.  
   ![](/img/nowadesktop/autosetup/7.png)

:::note  
Nowa downloads these tools from Google and the Eclipse Foundation. By installing, you agree to their licenses and acknowledge their privacy policies.  
:::

### Set up Flutter manually

If you already have Flutter installed, you can point Nowa to it instead.

1. **Install Flutter SDK**  
   Download it from the [official Flutter website](https://flutter.dev/docs/get-started/install) and follow the steps to install.

   :::tip
   On **macOS**, make sure **Xcode** is installed too. See [macOS: Install Xcode first](#macos-install-xcode) above.
   :::

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
