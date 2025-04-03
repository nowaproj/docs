---
sidebar_position: 1
title: Intro to Hybrid Approach
description: Learn how to use Nowa Hybrid approach  
---

# Hybrid Approach

Nowa's Hybrid Approach seamlessly combines visual app-building and coding, giving you ultimate flexibility and control. It enables you to build powerful apps effortlessly by switching between visual development and coding in your preferred IDE—such as VS Code—on a local project, just as you would in standard Flutter development. Both environments stay perfectly in sync at all times.

## What is the Hybrid Approach?

The Hybrid Approach allows you to maintain a local Flutter project that can be simultaneously opened in Nowa, VS Code, a simulator, or other tools. This ensures a smooth workflow where you can switch between them seamlessly while keeping everything synchronized.

With the Hybrid Approach, you can:

- Build visually within Nowa while also writing and editing code in your preferred IDE.
- Instantly see changes made in either environment reflected everywhere.
- Freely switch between visual building and coding at any stage of development.


:::note[Requirements]

To use the Hybrid Approach, you need to work with local projects, a feature available in the desktop version and requiring a **Premium Plan**.

You can still write custom code in cloud projects. To do so, open the file where you want to write custom code inside, then click on `code` chip on the bottom left if it wasn't selected. You will then use Nowa light integrated IDE to write and modify code 
:::

## Setting Up the Hybrid Approach

Follow these steps to get started:

1. **Download and install Nowa Desktop.**
2. **Create a new local project in Nowa.**
3. **Open the same project in your preferred IDE (e.g., VS Code, Android Studio).**

You’re now ready to build visually while writing code side by side.

## Advantages of Local Projects

Using local projects in Nowa offers several key benefits:

- **Instant Syncing:** Changes made in Nowa or your IDE sync instantly.
- **Git Integration:**
  - Use Git repositories to manage versions effectively.
  - Commit, push, or discard changes as needed.
  - Work with branches in your local repo.
- **Simulator Testing:**
  - Instantly test your app on simulators or physical devices with **hot reload**.
  - Any changes made in Nowa or your IDE reflect in real time.
- **Custom Code Flexibility:**
  - Easily create and edit **custom functions, classes, and widgets**.
  - Use AI-powered coding tools in your IDE to assist in writing custom logic.

## Practical Examples of the Hybrid Approach

Here are some real-world use cases:

- **Custom Widgets:**
  - Use a **Flutter Map** widget from pub.dev as a custom widget and embed it within your screen.
- **Custom Functions:**
  - Implement a function using **Geolocator** to calculate the distance between two points and use it inside Nowa’s Circuit.
- **Custom Classes:**
  - Create a `Product` class with fields (`name`, `price`) and a method (`formattedPrice`). Then, instantiate objects in Nowa and display their formatted prices in the UI.


Head to the next section to see [how to use custom code](./custom_code.md).

:::tip[Practical guide on using the Hybrid Approach]
Check out this [Medium article](https://medium.com/@nowa.dev/nowas-hybrid-approach-boosting-flutter-productivity-with-visual-code-magic-sync-5d93b234ab9f) for a full practical guide on using hybrid approach.

You will learn:
- Setting up the Hybrid approach
- Real examples of using custom widgets, functions, classes and expressions
- Using simulators on the side with hot reload
- Using Git to commit, discard, etc
- Example on modifying the generated code 
:::

Nowa’s Hybrid Approach provides the best of both worlds—**visual simplicity and coding power**—allowing you to build apps with unmatched flexibility and efficiency.
