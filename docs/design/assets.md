---
title: Images, videos and other files
description: Import images, SVGs, videos, audio and animations into your project, then use them in your widgets.
sidebar_label: Assets
keywords: [assets, images, import asset, upload assets, upload image, pick image, SVG, Lottie, Rive, video, audio, logo, paste image, pubspec, library]
---

Assets are the files your app ships with: images, SVGs, videos, sounds and animations. Import a file once, then pick it in any widget that needs it.

## Import files

1. Open the [Library](library.md) in the left sidebar, or press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>2</kbd>.
2. Click **Add** (+) in its header and choose **Upload Assets...**. Pick one or more files. They are added to your project's `assets/` folder, or to the folder of the asset you clicked last.
3. Turn on the **Assets** chip to see your files. Click a file to see a preview. Double-click it, or press <kbd>Enter</kbd>, to open it.

To upload straight into a folder inside `assets/`, right-click that folder and choose **Upload assets...**.

When you import a file, Nowa updates `pubspec.yaml` for you: every folder under `assets/` that has files is listed under `flutter:` → `assets:`, and fonts are listed under `fonts:`. You don't need to edit it.

![The Library with the Assets chip on and the Add menu open from the + button in its header (highlighted): New Widget..., New Folder..., New Model..., New Global State..., Generate Models From Json..., API Collection..., Import Dart code... and Upload Assets... (highlighted), with the folders and files of assets/ listed below the chips.](/img/docs/design/design-assets-1.png)

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

Turn on the **Assets** chip in the [Library](library.md), then drag a file onto the board or into a screen. Nowa creates the matching widget.

| File | Widget |
|---|---|
| Image | Image, at one sixth of the image's pixel size |
| SVG | SVG |
| Rive | Rive |
| Video | Video Player |
| Font | Text, set in that font |
| Text file, such as `.txt` | Text, with the file's content |

Lottie and audio files don't create a widget. Dropping files from your computer onto the board doesn't import them: import them first, then drag them from the Library.

## Rename, remove and find files

To find a file by name, type in the Library's search. It looks in your assets even when the **Assets** chip is off.

To change a file, right-click it in the Library. The Library works on one file at a time.

| Menu item | What it does |
|---|---|
| **Open** | Opens the file in a tab. Key: <kbd>Enter</kbd>. |
| **Rename** | Edits the name in place. Type a new name and press <kbd>Enter</kbd>. Key: <kbd>F2</kbd>. Widgets that already use the file keep its old path, so pick the file again in them. |
| **Delete** | Deletes the file after you confirm with **Yes**. <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Z</kbd> undoes it while the Library has focus. |
| **Show in code** | Switches to code mode and opens the file. |
| **Upload assets...** | On a folder: adds files to it. |

To move a file, drag its row onto another folder in `assets/`. The Delete key doesn't act on Library rows, so use the menu.

**Copy as path**, **View in folder** <Badge type="local" /> and **Show file content** are in code mode's **Files** tree, next to **Remove file**, **Cut** and **Paste**. See [Manage project files](../code/files.md).

Removing an Image widget doesn't delete its file. Delete the file in the Library when you no longer need it.

:::tip
Or ask Nowa AI: "Add the logo I attached to the login screen." Attach the image to the chat first. See [Give Nowa AI context](../ai/context.md).
:::

## Next steps

- [Images, video and web content](../reference/widgets/media.md): show your files with the right widget.
- [Change widget properties](properties.md).
- [Fonts and icons](fonts-icons.md).
- [Manage project files](../code/files.md).
