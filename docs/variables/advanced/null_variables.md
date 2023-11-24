---
sidebar_position: 5
title: Adding null
description: How to add null to properties 
---

*In this page you will see why you need to use `null` sometimes and how to do it*

## Why Null Variables are Needed

Null variables are essential in handling properties of widgets like `TextField`, especially for properties that behave differently with empty fields. For example:

- **`errorText` in `TextField`**: Initially null, but if text is added and then removed, `errorText` becomes an empty string instead of null. This keeps the error line visible. To disable the error line, set `errorText` back to null.

## How to Add Null Variables

### In Details Panel
1. **Right-Click on Property Field**: Find the field you want to set to null.
2. **Select 'Set to Null'**: Right-click and choose 'Set to Null' from the menu.

 ![](./img/nulldetailspanel.png)


### In Circuit
1. **Use a Node with Value Input**: To set a null, the node should accept a `value`` input.
2. **Add Null Variable**: Click the '+' next to the value input, select 'Null' under 'General', or search for 'null'.

 ![](./img/nullcircuit.png)


:::info
`null` option won't appear except when clicking on '+' next to inputs that accept null
:::






