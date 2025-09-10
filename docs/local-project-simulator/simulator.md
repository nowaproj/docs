---
sidebar_position: 3
title: Running on a simulator/physical device 📱
description: 🔧 How to test your Nowa project on an actual simulator or a real device 🧪✨
---

# Running on a simulator/physical device 📱

One of the key advantages of using **Nowa Desktop** for your Flutter development 🐦 is the ability to test your app on actual emulators 🖥️📲 and real devices 🔌📱.  
This guide will walk you through 🧭 the steps to test your app effectively ✅ and take advantage of Flutter's powerful **hot reload** ⚡ feature.

---

## 🛠️ Setting Up Local Projects for Testing 🧑‍💻

As mentioned earlier, you can [📂 create a local Flutter project](./createlocalproject.md) using Nowa Desktop.  
This allows you to test your app on various simulators 🎮 or even on an actual smartphone 📱.  

Here’s how you can do it ⬇️:

---

### 1️⃣ Instant Preview with Nowa 👀

- **⚡ Quick Preview:** To get a quick preview of your app, click on the ▶️ **Play** button inside Nowa.  
  👉 This will provide an instant preview within any frame you choose (e.g., 📱 iPhone, 📱 iPad, 🤖 Android Pixel, 📟 Samsung tablets, 🖥️ Desktop, etc.).  

- **⚠️ Preview Limitations:** While the previewer is useful 🛠️, it has certain limitations.  
  For example, it allows you to test **Firebase Authentication** 🔑 features like signing in, but it doesn’t perform the actual sign-in or sign-up 🚫.  
  For full functionality testing ✅, you'll need to run the app on a real simulator 🖥️ or a physical device 📲.

<video width="600" controls>
  <source src="/videos/simulator/builtinsimulator.webm" type="video/mp4" />
</video>

---

### 2️⃣ Running the App on a Simulator 🖥️📱

To run your app on a simulator, follow these steps 🧭:

:::warning
1. **Ensure It's a Local Project 📂:**  
   Make sure you’re working with a local project.  
   🔑 Only local projects can be run on simulators or real devices directly from Nowa.
:::

:::tip
In the top right corner, you can see whether the **desktop** 🖥️ or **web** 🌐 version is opened.  

- In the **desktop version**, a ▶️ play icon is shown.  
  ![Desktop Version](\img\nowadesktop\diff\local.png)  

- In the **web version**, a 🌐 globe icon is displayed.  
  ![Web Version](\img\nowadesktop\diff\web.png)  

Here is an example view 👇:  
![Editor View](\img\nowadesktop\diff\base.png)
:::

1️⃣ **List of Simulators 📝:**  
At the top right of Nowa Desktop, you’ll see a menu 📑 that includes:  
This shows the simulators currently running on your machine 🖥️.  
You might see options like 🌐 Chrome, 🍎 macOS (if on Mac), or 🪟 Windows (if on Windows).  
For 🤖 Android or 🍏 iOS simulators, you might need to start them first ▶️.

<video width="600" controls>
<source src="/videos/simulator/simulator.webm" type="video/mp4" />
</video>

2️⃣ **Run Button ▶️:** Runs the app on the selected simulator 🎮. Logs 📜 will be displayed in the `Logs` tab at the bottom ⬇️ of Nowa once the app starts.

<video width="600" controls>
<source src="/videos/simulator/logs.webm" type="video/mp4" />
</video>

3️⃣ **Stopping the App 🛑:** After running the app, click the ⏹️ stop button to end the process.

<video width="600" controls>
<source src="/videos/simulator/stop.webm" type="video/mp4" />
</video>

4️⃣ **Hot Restart 🔄⚡:** If you make changes ✍️ while it’s running, you can click on the **Hot Restart** button 🔁 to quickly restart and apply changes.

<video width="600" controls>
<source src="/videos/simulator/hotreload.webm" type="video/mp4" />
</video>

---

### 3️⃣ Managing Simulators 🎛️

If you don't see the desired simulator ❌📱, it might not be running yet. Here’s how to fix it 🔧:

- **Starting Simulators ▶️:**  
  - 🍏 **iOS Simulators:** Run the **Simulator** app on your Mac. Want to know more? [Click here!](https://developer.apple.com/documentation/safari-developer-tools/installing-xcode-and-simulators)
  - 🤖 **Android Simulators:** Start the emulator from **VS Code** or **Android Studio**. Want to know more? [Click here!](https://developer.android.com/studio/run/emulator)

👉 Example: we can’t see the iOS simulator 👀, so we run it first ▶️.

- **Refreshing the List 🔄:** After starting, return to Nowa and reopen the simulator menu 📑.  
  ⏳ It might take a few seconds for the new simulator to appear. Keep checking until it shows up ✅.

---

### 4️⃣ Running the App on an Actual Smartphone 📱🔌

1. **Connect Your Smartphone 📲:** Plug in your device via USB 🔌.  
   You might need to enable **USB debugging 🐞** to be recognized.  

2. **Select Your Device ✅:** After connecting, your device should appear in the Nowa list 📝.  
   Select it and click ▶️ Run.  

:::note
Since your project is a **local Flutter project 📂🐦**,  
you can also open it in your IDE (💻 VS Code, 🛠️ Android Studio) and run it from there. Any changes in Nowa ✨ will be reflected in the local project 🔁.
:::