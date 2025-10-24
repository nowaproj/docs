---
sidebar_position: 4
title: Running on a simulator/physical device
description: How to test your Nowa project on an actual simulator or a real device
---

# Running on a simulator/physical device

In this guide, we’ll walk you through step by step the different ways to test your project and make use of Flutter’s  **Hot Reload**.

---

## Setting Up Local Projects for Testing

Before you begin, make sure your app is set up as a **local Flutter project**.  

You can easily do this inside Nowa, check out the [guide on creating local projects](./createlocalproject.md) if you haven’t yet.  

Once that’s ready, you’ll be able to run your app on different simulators or even directly on your phone.

---

## 1. Instant Preview with Nowa

The quickest way to see your app in action is by using the **Play** button inside Nowa.

- When you click Play, your app instantly appears inside a preview frame.  
- You can choose from different devices such as iPhone, iPad, Android Pixel, Samsung tablets, or even a desktop screen.  

This is perfect for a quick look at your design and layout.  

However, keep in mind that the previewer has some limitations.  

For example, you can test flows like **Firebase Authentication**, but you won’t actually be signed in.  
For testing real functionality, you’ll need to use a simulator or a physical device.

<video width="600" controls>
  <source src="/videos/simulator/builtinsimulator.webm" type="video/mp4" />
</video>

---

## 2. Running the App on a Simulator

To go beyond preview, you can run your app directly on a simulator.

:::warning
Only **local projects** can be run on simulators or real devices.  
Make sure you’re not working in the web version of Nowa.
:::

At the top right of Nowa Desktop, you’ll notice a menu. This shows you the simulators currently available on your machine. Depending on your setup, you might see:

- Chrome  
- macOS (if you’re on a Mac)  
- Windows (if you’re on Windows)  

For Android and iOS simulators, you may need to start them first.

Once the simulator is running, simply select it from the list and press Run.  
Your app will launch, and the `Logs` tab at the bottom will show you what’s happening behind the scenes.

You can stop the app anytime with the Stop button.  
And if you make changes, use **Hot Reload** to see them instantly without closing everything down.

<video width="600" controls>
  <source src="/videos/simulator/simulator.webm" type="video/mp4" />
</video>

---

## 3. Managing Simulators

If you don’t see the simulator you want, don’t worry—it just means it isn’t running yet.

- On Mac, open the **Simulator** app to start an iOS simulator. [Learn more here.](https://developer.apple.com/documentation/safari-developer-tools/installing-xcode-and-simulators)  
- On Windows or Mac, start an Android emulator from **VS Code** or **Android Studio**. [Learn more here.](https://developer.android.com/studio/run/emulator)  

After starting, go back to Nowa and reopen the simulator list.  

It may take a few seconds, but your new simulator will appear.

---

## 4. Running the App on a Real Device

Testing on a real phone is often the most real environment. Here’s how:

1. Connect your smartphone with a USB cable.  
   On Android, you may need to enable **USB debugging** for it to be detected.  

2. Once connected, your phone will appear in the Nowa device list.  
   Select it, press **Run**, and your app will launch directly on your phone.  

:::note
Since your project is a local Flutter project,  
you can also open it in an IDE like VS Code or Android Studio and run it there.  
Any changes made in Nowa will always stay in sync with your local project.
:::

---
