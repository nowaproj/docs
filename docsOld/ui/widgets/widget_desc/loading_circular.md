---
sidebar_position: 8
title: Loading circular 
description: How to use button widget
---

# Loading Circular

The "Loading Circular" widget displays a spinning indicator to show that something is loading or processing. Here's what each property does:

- **Value:** Sets the current progress of the loading process. Leave it null for an indeterminate loader that spins continuously, or set a value between 0.0 and 1.0 for a determinate loader that shows the actual progress.

- **Background Color:** Changes the color behind the circular loading indicator. This is useful for making the loader stand out against different backgrounds.

- **Color:** Sets the color of the loader itself. Choose a color that fits with your app's theme or indicates a specific action (like red for an error).

- **Stroke Width:** Adjusts the thickness of the loader's line. A larger value makes the loader bolder and more noticeable.

- **Stroke Align:** Determines the alignment of the stroke within the loader's overall space. This can be set to 'inside', 'center', or 'outside', affecting how the loading circle appears within its allocated space.

- **Semantics Label:** Provides a text label for screen readers. This isn't visible on the screen but helps visually impaired users understand what the loader is for.

- **Semantics Value:** Offers a way to provide more detailed information for screen readers, like the actual progress percentage if the loader is determinate.


By customizing these properties, you can ensure the "Loading Circular" widget fits well with your app's design and provides a clear indication of loading or processing activities to users