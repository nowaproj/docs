---
sidebar_position: 1
title: Horizantal scrolling not working
description: Horizantal scrolling not working  
---

# Troubleshooting: Horizontal Scrolling Not Working

When developing your app with Nowa, you might encounter an issue where horizontal scrolling doesn't function as expected in preview mode. This problem can occur with widgets like ListView, GridView, or Row that are designed to support horizontal scrolling. Here's how to understand and resolve this issue:

## Problem Description

A common problem might occur when using horizontal scrolling, whether by ListView, GridView, or Row with horizontal scrolling. You might notice that the scrolling doesn't work when running the app in the preview.

## Cause

The primary reason for this issue is related to the input device you are using:

- **Mouse Users:** The scroll wheel on a standard mouse typically triggers only vertical scrolling. As a result, horizontal scrolling will not respond when using a standard mouse in preview mode.
- **Touchpad Users:** To trigger horizontal scrolling on a touchpad, you need to use a specific gesture, usually a two-finger swipe horizontally. Alternatively, using a mouse equipped with a horizontal scrolling wheel can solve the problem.

## Solution

### In Preview Mode

1. **Using a Mouse:** If you are using a standard mouse, its scroll wheel will only trigger vertical scrolling.
2. **Using a Touchpad:** If you have a touchpad, use a two-finger swipe gesture horizontally to activate horizontal scrolling.
3. **Using a Mouse with Horizontal Scrolling Wheel:** Some advanced mice come with a horizontal scrolling wheel that can be used to achieve the desired scrolling effect.

### When Deployed

No need to worry! When you deploy your app, the horizontal scrolling will work as expected across all devices, including those using touch screens or advanced mice with horizontal scrolling capabilities.

## Summary

- **Issue:** Horizontal scrolling not working in preview mode.
- **Cause:** Mouse scroll wheel triggers only vertical scrolling.
- **Solution:** Use a touchpad with horizontal swipe gestures or a mouse with a horizontal scrolling wheel.
- **Deployment:** Horizontal scrolling will function correctly in the deployed app.

By understanding the limitations of preview mode and the capabilities of your input devices, you can ensure that your app's horizontal scrolling features work as intended during development and after deployment.