---
# sidebar_position: 3
title: Youtube Player 
description: How to display Youtube videos inside the app 
---


# YouTube Player

The **YouTube Player** widget lets you embed and play YouTube videos directly inside your app.  
You can control how the video looks, behaves, and interacts with your app through various properties.

---

## 🎬 Controller

**Initial Video ID**  
Provide either a YouTube video ID or the full link to the video you want to load first.  
For example, for the video `https://www.youtube.com/watch?v=9Q2MZes5lt8`, the ID is `9Q2MZes5lt8`.

---

## ⚙️ Flags

Flags control how the player behaves.  

- **Hide Controls** – Hides YouTube’s default controls (play, pause, progress bar, etc.).  
- **Controls Visible at Start** – Shows the controls when the video begins playing.  
- **Auto Play** – Automatically starts the video once the player loads.  
- **Mute** – Starts playback with sound muted.  
- **Is Live** – Enables live-stream playback mode.  
- **Hide Thumbnail** – Hides the thumbnail image before playback begins.  
- **Disable Drag Seek** – Prevents users from skipping forward or backward in the video.  
- **Enable Caption** – Turns on subtitles or closed captions.  
- **Caption Language** – Choose the preferred caption language (e.g. `en`, `es`, `fr`).  
- **Loop** – Replays the video automatically after it ends.  
- **Force HD** – Forces the video to play in high definition (if available).  
- **Start At** – Defines the time (in seconds) where playback should start.  
- **End At** – Defines when playback should stop.  
- **Use Hybrid Composition** – Improves performance and compatibility on web and Android by using hybrid composition rendering.

---

## 🖥️ Display

These settings control how the player appears in your app.

- **Show Live Fullscreen Button** – Displays a fullscreen button for live videos.  
- **Width** – Set a custom width for the player (leave empty for auto width).  
- **Aspect Ratio** – Defines the aspect ratio of the video. Default is `16:9` (≈ `1.7777`).  
- **Controls Timeout** – Time (in milliseconds) after which controls automatically fade out.  
- **Buffer Indicator** – Widget shown while buffering (e.g. a loading spinner).  
- **Progress Indicator Color** – Color of the progress bar while buffering or loading.  
- **Live UIColor** – Color for live indicators, like the red “LIVE” badge.  
- **Thumbnail** – Custom image to show before the video starts.  
- **Show Video Progress Indicator** – Displays a progress bar below the video.

---

## ⚡ Actions & Events

You can trigger actions or add widgets to respond to video events.

- **On Ready** – Triggered when the player is fully loaded and ready.  
- **On Ended** – Triggered when the video finishes playing.  
- **Top Actions** – Add custom actions or widgets above the player.  
- **Bottom Actions** – Add custom actions or widgets below the player.  
- **Actions Padding** – Set padding around the top and bottom action widgets.

---

## 📦 Dependencies

This widget uses the [`youtube_player_flutter`](https://pub.dev/packages/youtube_player_flutter) package,  
which handles embedding, controlling, and displaying YouTube videos in Flutter.

---
