---
title: Install the desktop app
description: Download Nowa for macOS, Windows or Linux, sign in, and set up Flutter so you can use local projects and run your app on devices and emulators.
sidebar_label: Install the desktop app
keywords: [Nowa Desktop, download, install, macOS, Windows, Linux, tar.gz, install.sh, Flutter SDK, Xcode, Local Setup, Set up automatically, auto update, desktop app, simulator, emulator]
---

The Nowa desktop app is the same editor in its own window, for macOS, Windows and Linux. It adds local projects, importing existing Flutter projects, and running your app on real devices and emulators. On macOS and Windows it also installs updates from inside the app.

<Badge type="desktop" />

## Download and install

1. Sign in at [app.nowa.dev](https://app.nowa.dev) in your browser.
2. In the dashboard sidebar, click **Download Desktop App**.
3. In the **Download Nowa** dialog, click **MacOS**, **Windows** or **Linux**. The dialog also shows the version you are getting. A button is greyed out when there is no download for that system.
4. On macOS and Windows, open the downloaded installer and follow the steps for your system. On Linux, follow [Install on Linux](#install-on-linux).

{/* CAPTURE: id=get-started-desktop-app-1 | state: signed in on the web dashboard, Download Desktop App clicked | show: the Download Nowa dialog with the MacOS, Windows and Linux buttons and the version line | crop: the dialog */}

:::note
When you sign in, the desktop app checks that your account has desktop access. If it doesn't, Nowa shows "Upgrade to unlock desktop version, or use on web at app.nowa.dev" with your billing options. You can upgrade there or keep using the web app. See [pricing](https://nowa.dev/pricing).
:::

## Install on Linux {#install-on-linux}

The Linux download is a 64-bit archive named like `Nowa-v<version>-linux-x64.tar.gz`, made on Ubuntu 24.04.

1. Extract the archive. You get a folder named `nowa`.
2. Open a terminal in that folder and run `./install.sh`.
3. Start **Nowa** from your applications menu.

The script copies Nowa to `~/.local/share/nowa` (or to a `nowa` folder inside `XDG_DATA_HOME`, if you set it), adds the icon and adds **Nowa** to the applications menu. To reinstall, run the script again. It replaces the old copy.

The in-app preview isn't available on Linux yet. When you run your app in the editor, the preview pane says "Your app is running" and offers **Open in Browser**, with the address of your app. See [Run your app](../test/run.md).

## Sign in and stay up to date

Open Nowa and sign in with your email and password or with Google. **Continue with Apple** isn't available in the desktop app. Once you have a local project, the dashboard lists it under **On this device**.

When a new version is out, Nowa shows **A new version of Nowa is available**. On macOS and Windows, click **Update to v…** (the button names the new version) to download it, then click **Install & Restart**. Click **Skip** or **Later** to wait, or **Or download manually** to get the installer yourself.

On Linux, Nowa doesn't update itself. The message offers **Download v…** and **Skip**. Download the new archive, then run `install.sh` again.

If Nowa says **Version out of date**, the update is required. Click **Download**, choose your system in the **Download Nowa** dialog, and install the newer version.

## Set up Flutter {#setting-up-flutter-sdk}

Local projects, and running your app on devices and emulators, need the Flutter SDK. Let Nowa install it for you, or point Nowa to a copy you already have. Start in **Local Setup**:

1. Click **Settings** in the dashboard sidebar. Inside a project, click your avatar in the top bar, then **General Settings**.
2. Under **Editor Settings**, click **Local Setup**.

Nowa also sends you here from **Setup flutter SDK** in the **New project** dialog, from **Fix** in the **Clone from GitHub** dialog, and from **Local environment settings** in the **Run** menu.

### macOS: install Xcode first {#macos-install-xcode}

On a Mac, Flutter needs Xcode, which also builds iOS apps. The setup dialog warns you: "Xcode must be installed on macOS before setting up Flutter."

1. Open the App Store, search for Xcode, and install it.
2. Open Xcode once and finish its first-launch setup. Agree to the license and let it install its components.
3. Return to Nowa and run the Flutter setup again.

### Let Nowa install Flutter

This is the quickest route.

1. In **Local Setup**, under **Automatic setup**, click **Set up automatically**. The **Set up local environment** dialog opens. If Flutter is already installed and up to date, it starts on the **Verify** step: skip to step 6.
2. On the **Flutter** step, check the **Install location**. Nowa installs about 10 GB of tools there, and the path must not contain spaces. The Flutter SDK download itself is about 1 GB.
3. Tick the box that accepts the licenses. Nowa downloads these tools from Google and the Eclipse Foundation.
4. Click **Install** next to **Flutter**. Keep Nowa open while it downloads.
5. When the row says **Ready**, click **Next**.
6. On the **Verify** step, Nowa runs `flutter doctor` and lists the devices you can run on. Fix anything it reports, then click **Re-run checks**.
7. To build for Android, click **Download** next to "Android isn't set up". The next screen lists **Android toolchain** and an optional **Android emulator**: click **Install** next to each one you want. Click **Skip for now** if you only target web or desktop. You can add them later from **Local Setup**.
8. Click **Done**.

{/* CAPTURE: id=get-started-desktop-app-2 | state: desktop app, Local Setup page open, Set up automatically clicked, Flutter step showing | show: the Set up local environment dialog on the Flutter step with Install location, the license checkbox and the Install button | crop: the dialog */}

**You should see:** each tool you installed with a **Ready** status. If Flutter is installed but old, the button reads **Update Flutter SDK** next to "Flutter SDK is outdated".

### Use a Flutter SDK you already have

1. Install Flutter with the official [Flutter install guide](https://docs.flutter.dev/get-started/install).
2. In **Local Setup**, click **Browse** next to **Flutter SDK Path** and pick the Flutter folder, the one that contains `bin/flutter` (`bin\flutter.bat` on Windows). If Nowa says **Invalid Flutter SDK path**, that isn't the Flutter folder: pick another one.
3. Optional: set **Default Projects Path**. New local projects start with this folder, and local clones are saved in it.
4. Optional: set **VS code Path** if **Open in VS Code** can't find VS Code. It starts with the usual install location.

## Next steps

- [Work with local projects](../code/local-projects.md): create or import one.
- [Run on a device or emulator](../test/devices.md): hot reload on your phone or simulator.
- [Use Nowa with VS Code](../code/vs-code.md): edit the same folder in both.
