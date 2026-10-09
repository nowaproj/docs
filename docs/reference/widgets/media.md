---
title: Images, video, animations and web content
description: Show pictures, video, YouTube, Lottie and Rive animations, web pages, HTML and Markdown, and see which ones need a package or a real device to preview.
sidebar_label: Images, video and web content
keywords: [image, svg, video player, youtube player, lottie, rive, web view, webview, html, markdown, pick image, upload image, asset, network image, animation, play video, flutter_svg]
---

Add pictures, videos, animations and web content from the [Library](../../design/library.md) (<kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd>). Most take a web address or a file from your project's assets. A few need a package, and a few show a placeholder on the board until you run your app.

| Widget | Shows | Source | Needs a package |
|---|---|---|---|
| **Image** | A picture | **Network**, **Asset** or **Bytes** | No |
| **SVG** | A vector image | **Network** or **Asset** | `flutter_svg` |
| **Video Player** | A video file | **Network** or **Asset** | No |
| **YouTube Player** | A YouTube video | A video ID | `youtube_player_flutter` |
| **Lottie** | An animation (`.json`) | **Network** or **Asset** | `lottie` |
| **Rive** | An animation (`.riv`) | **Network** or **Asset** | `rive` |
| **Web View** | A web page | An address | No |
| **Html** | Text written in HTML | What you type | `flutter_html`, added by you |
| **Markdown** | Text written in Markdown | What you type | No |

When a widget needs a package your project doesn't have yet, Nowa opens **Add Missing Dependencies** as you pick it. Click **Add** and Nowa installs the package and places the widget. See [Add a widget that needs a package](../../design/add-widgets.md#add-a-widget-that-needs-a-package).

## Add an image {#image}

1. Add an **Image** from the Library. It starts with a sample photo from the web.
2. In **Details**, choose where the picture comes from:
   - **Network**: paste a web address that points straight at an image file.
   - **Asset**: click **Pick Image**, then choose a file from your project, or click **Upload Image** to add one from your computer. Nowa saves it in `assets/` and picks it. See [Images, videos and other files](../../design/assets.md).
   - **Bytes**: a picture held in memory, such as a photo the user picked in your app. Link it to a variable: see [Pick photos or videos](../../logic/popups.md#pick-photos-or-videos).
3. Set **Fit** to choose how the picture fills its box. `cover` fills it and may crop the edges, `contain` shows the whole picture, and `fill` stretches it.

![The Pick Image popup (highlighted) opened from a selected Image on the Asset tab: the Upload Image button, the Search box and the project images dusk.png, lake.png and sunrise.png with thumbnails. Next to it, Details for the Image with the Source tabs (Network, Asset) and the Pick Image button highlighted.](/img/docs/reference/reference-media-1.png)

**Color** and **Blendmode** tint the picture. **Error Builder** is what to show when it can't load. You can also paste an image onto the board or drag a file from **assets**, and Nowa creates the Image for you.

## Add an SVG {#svg}

An **SVG** is a vector image that stays sharp at any size.

1. Add an **SVG**. If Nowa shows **Add Missing Dependencies**, click **Add**.
2. Choose **Network** and paste a web address, or choose **Asset** and click **Pick SVG**. Only `.svg` files can be picked or uploaded.
3. Use **Color Filter** to recolor it, and **Fit** and **Alignment** to place it in its box.

An SVG on the **Asset** tab with no file picked shows "No path" on the board.

## Play a video {#video-player}

1. Add a **Video Player**. It starts with a sample video from the web.
2. On **Network**, paste a direct link to a video file, such as one that ends in `.mp4`. On **Asset**, click **Pick Video** or **Upload Video** to use a file from your project. A video in your assets ships inside your app, so a large file makes the app bigger.
3. **Auto Play** starts the video when the screen opens. **Show Controls Bar** shows the play, pause and seek controls. With both off, the video neither starts by itself nor shows a play button.

Instant Play doesn't play videos everywhere. In the desktop app, and for any video on the **Asset** tab, it shows "Platform not supported, only available on iOS and Android". To watch a video, run your app on a phone or an emulator. See [Run on a device or emulator](../../test/devices.md).

## Embed a YouTube video {#youtube-player}

1. Add a **YouTube Player**. If Nowa shows **Add Missing Dependencies**, click **Add**.
2. Under **Controller**, set **Initial Video Id** to the video's ID, the part after `v=` in its link. The starter uses `9Q2MZes5lt8`.
3. Under **Flags**, choose how it behaves:

| Flag | What it does |
|---|---|
| **Auto Play** | Starts the video when it loads. Off in the starter. |
| **Mute** | Starts with the sound off. On in the starter. |
| **Loop** | Plays the video again when it ends. |
| **Hide Controls** | Hides YouTube's controls. |
| **Start At**, **End At** | The second where playback starts and where it stops. |

## Add a Lottie animation {#lottie}

1. Add a **Lottie**. If Nowa shows **Add Missing Dependencies**, click **Add**. It starts with a sample animation.
2. On **Network**, paste a link to a Lottie `.json` file. On **Asset**, click **Pick Lottie** or **Upload Lottie**. Only `.json` files are accepted.
3. **Type** is **Loop**, the default, or **Once**. **Boomerang** plays the animation forward and then backward. **Fit** sets how it fills its box.

[LottieFiles](https://lottiefiles.com) has animations you can download.

## Add a Rive animation {#rive}

1. Add a **Rive**. If Nowa shows **Add Missing Dependencies**, click **Add**. It starts with a sample animation.
2. On **Network**, paste a link to a `.riv` file. On **Asset**, click **Pick Rive** or **Upload Rive**. Only `.riv` files are accepted.
3. After the file loads, choose an **Artboard**. If that artboard has state machines, a **State Machine** list appears too. The lists show what the file contains.

You make Rive animations in [Rive](https://rive.app).

## Show a web page {#web-view}

Add a **Web View** and type the address in **Url**. It starts at `https://nowa.dev`. If you leave out `http`, Nowa adds `https://`. Run your app to see the page.

## Show HTML {#html}

Add an **Html** widget and type or paste your HTML in **Data**. It starts as `<h1>Hello World</h1>`. **Shrink Wrap** makes the widget only as big as its content.

Html comes from the `flutter_html` package. Nowa doesn't show **Add Missing Dependencies** for it, so add the package yourself if your app needs it. See [Add packages](../../code/packages.md).

## Show Markdown {#markdown}

Add a **Markdown** widget and type or paste your Markdown in **Data**. It starts as `# Hello World`. People can select the text unless you turn off **Selectable**. **Style** sets the text style.

In both **Data** boxes, type `$` to put a variable into the text. See [Put a value inside text](../../logic/expressions.md#dollar). Double-click either widget on the board to edit its text in place.

## Know what the board shows

Most of these widgets show live on the board. Three show a stand-in until you run your app:

- **Video Player**: a black box that says "Designer mode".
- **YouTube Player**: the video's thumbnail and title, loaded from YouTube.
- **Web View**: a placeholder that says "Run to preview".

{/* CAPTURE: id=reference-media-2 | state: playground starter open, a Video Player, a YouTube Player and a Web View placed side by side on one screen (sample values) | show: the three board stand-ins: the black Designer mode box, the YouTube thumbnail with its title, and the Web View placeholder reading Run to preview | crop: the screen on the board */}

Press **Play** for a closer look, and [run your app](../../test/run.md) to check the real thing. See [What Nowa can show on the board](../../code/limitations.md).

:::tip Or ask Nowa AI
Try "Show the YouTube video from this link at the top of the lesson screen, muted and without autoplay." See [How Nowa AI works](../../ai/index.md).
:::

## Next steps

- [Images, videos and other files](../../design/assets.md) to import, rename and manage your assets.
- [Run on a device or emulator](../../test/devices.md) to see video and web content for real.
- [Widget catalog](./index.md) for every built-in widget.
