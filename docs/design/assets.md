---
title: Images, videos and other files
description: Import images, SVGs, videos, audio and animations into your project, then use them in your widgets.
sidebar_label: Assets
keywords: [assets, images, import asset, upload image, pick image, SVG, Lottie, Rive, video, audio, logo, paste image, pubspec, files panel]
---

Assets are the files your app ships with: images, SVGs, videos, sounds and animations. Import a file once, then pick it in any widget that needs it.

## Import files

1. Click **Files** in the left sidebar and find the **assets** row.
2. Click the upload icon (**Import asset**) on that row and choose one or more files. They are added to your project's `assets/` folder.
3. Click a file to see a preview. Double-click it to open it.

When you import a file, Nowa updates `pubspec.yaml` for you: every folder under `assets/` that has files is listed under `flutter:` → `assets:`, and fonts are listed under `fonts:`. You don't need to edit it.

{/* CAPTURE: id=design-assets-1 | state: playground starter open, Files panel open with the assets row visible | show: the assets row with the Import asset icon (hover tooltip) next to the lib and boards rows | crop: left panel */}

Nowa recognizes these file types:

| Kind | Extensions |
|---|---|
| Images | `.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`, `.bmp`, `.wbmp` |
| SVG | `.svg` |
| Lottie animations | `.json` |
| Rive animations | `.riv` |
| Video | `.mp4`, `.mov` |
| Audio | `.mp3`, `.wav` |
| Fonts | `.ttf`, `.otf` (see [Fonts and icons](fonts-icons.md)) |

Any other file type is read as plain text, so stick to the types above for images, media and fonts. You can drag files between folders inside **assets** to move them.

:::note
In the playground, large files can stop your app from being saved in the browser. See [Try Nowa without an account](../get-started/playground.md).
:::

## Use an asset in a widget

1. Select an Image widget, or add one with the **Widget** tool.
2. In **Details**, open the **Asset** tab of the image field.
3. Click **Pick Image**. Choose a file from the list, or search for it. To add a new file, click **Upload Image** and choose it from your computer. It is saved in `assets/`.

The same picker works for other kinds of files. Open the **Asset** tab and click the matching button.

| Widget or property | Button |
|---|---|
| Image widget, and the **Image** of a Container's decoration | **Pick Image** |
| SVG widget | **Pick SVG** |
| Lottie widget | **Pick Lottie** |
| Rive widget | **Pick Rive** |
| Video Player widget | **Pick Video** |
| An audio player's source, for example in the **Audio Player** template | **Pick Audio** |

Each list shows only files of the matching kind. An asset audio file plays only on Android and iOS.

## Paste an image onto the board

Copy an image, point at the board and press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>V</kbd>, or right-click the board and choose **Paste**. Nowa saves the image in `assets/` as `pasted_image_<id>` and places an Image widget where your pointer is. In the desktop app you can also copy image files in your file manager and paste them.

## Drag an asset onto the board

Drag a file from **assets** onto the board or into a screen. Nowa creates the matching widget.

| File | Widget |
|---|---|
| Image | Image, at one sixth of the image's pixel size |
| SVG | SVG |
| Rive | Rive |
| Video | Video Player |
| Font | Text, set in that font |
| Text file, such as `.txt` | Text, with the file's content |

Lottie and audio files don't create a widget. Dropping files from your computer onto the board doesn't import them: import them first, then drag them from **assets**.

## Rename, remove and find files

Right-click a file in **assets**. Select several files first to act on all of them, except **Rename**, which needs a single file.

| Menu item | What it does |
|---|---|
| **Rename** | Type a new name and press <kbd>Enter</kbd>. Widgets that already use the file keep its old path, so pick the file again in them. |
| **Remove file** | Deletes the file after you confirm with **Yes**. <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Z</kbd> undoes it. With several files selected, it reads **Remove N files**. |
| **Copy as path** | Copies the file's path. |
| **View in folder** | Opens the file's folder on your computer. <Badge type="local" /> |
| **Show file content** | Opens the file's content in a tab. |

Removing an Image widget doesn't delete its file. Remove the file from **assets** when you no longer need it.

:::tip
Or ask Nowa AI: "Add the logo I attached to the login screen." Attach the image to the chat first. See [Give Nowa AI context](../ai/context.md).
:::

## Next steps

- [Change widget properties](properties.md).
- [Fonts and icons](fonts-icons.md).
- [Manage project files](../code/files.md).
