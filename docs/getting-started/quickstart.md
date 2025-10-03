---
sidebar_position: 5
---

# Quickstart – Your First Project

In this guide, we’ll walk you through creating your very first app — a simple Stopwatch.

---

## Step 1: Create a New Cloud Project

To get started, you’ll create a fresh project in Nowa.

1. Click the yellow **New Cloud Project** button.  
2. From the options, select **New Cloud Project**.  
3. Give your project a **name** (anything you like).  
4. Click **Create** to confirm.  

That’s it — you’ve just created your first project!

<video src="/videos/qucikstart/1.webm" controls width="100%" />

---

## Step 2: Use Chat to Shape Your App

Now comes the fun part — telling Nowa what you want to build.  

With Chat, you simply describe your idea in plain English and let Nowa do the heavy lifting.

1. Click the **Chat** icon on the left.  
2. Type what you’d like your app to do.  
3. Press **Send** and watch your app take shape.  

Here’s exactly what we asked Nowa in this example:

```markdown
Create a simple stopwatch app ⏱ in Flutter. It should use only one button to control the stopwatch. The button behavior depends on the current state:

If the stopwatch is idle (0:00 and not running), the button shows 'Start' and starts the stopwatch.

If the stopwatch is running, the button shows 'Stop' and pauses the stopwatch.

If the stopwatch is paused (stopped but not at 0:00), the button shows 'Reset' and resets the stopwatch back to 0:00.
```

<video src="/videos/qucikstart/2.webm" controls width="100%" />

---

## Step 3: Change the Look (Visually)

Here’s how to change the color of the your stopwatch button:

1. Select the **Icon** widget from the widget tree.  
2. In the widget properties panel, find the **Color** property.  
3. Pick a new color from the theme.  

Your app instantly updates to match your choice!

<video src="/videos/qucikstart/3.webm" controls width="100%" />

---

## Step 4: Try It Out

Time to see your work in action!   

- ▶️ Press **Start** → the stopwatch begins running.  
- ⏹️ Press **Stop** → the stopwatch pauses.  
- 🔄 Press **Reset** → it resets back to 0:00.  

<video src="/videos/qucikstart/4.webm" controls width="100%" />

---