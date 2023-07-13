---
sidebar_position: 1
title: Deploy to Web
description: How to deploy your app to run on the web
---

*In this guide you will learn:*

```
1. Deploy your app as a Web App 
2. How to run your Web App locally 
```




With Nowa, you've created a fantastic app. You've put your ideas into action and watched them come to life. Now, you're ready to share your creation with the world! In this guide, we'll show you how to publish your app to the web. Let's jump right in!

## Deploying for the Web

Getting your app ready for the web is simple with Nowa. Just follow these steps:

1. Navigate to **Settings** in the Nowa interface.
    
2. Find the **Web Build** section and click on **Build**. This will start the build process.
    

The build process averages around 5 minutes, but the duration may vary depending on server demand. Please be patient :)

![](./img/web_build.gif)


## Downloading Your Web App

Once the build is complete, a zip file named **web.zip** will appear. This file is your web app, ready to go!

Click on **web.zip** to download the file to your local system. After downloading, use any extraction software to unzip the contents of the file.

## Deploying Your Web App

Now that you have the files for your web app, you have a world of possibilities at your fingertips. You're free to deploy your app in any way that suits you best.

You can host your app online and link it to a custom domain. There are numerous free hosting services you can utilize to bring your web app to life online for free. You might need to do this specially in the beginning while you testing your app with closed group of your users.

You can also run the web app locally on your localhost to test it yourself. A convenient method of doing this is by using the Node package **Serve**.

:::caution
Clicking on `index.html` to run your web app locally won't work, more on that in the end of this page 
:::

Here's how you can set it up:

1. First, install Node JS from [https://nodejs.org/](https://nodejs.org/).
    
2. Next, install the Serve package globally with the command:
    
```bash
npm install --global serve
```
    
3. Open the command prompt and navigate to the folder where your web app files are located using the `cd` command. You can also open the terminal directly from the folder by choosing "Open from Terminal".
    
4. Finally, run the command `serve` to launch the web app on your localhost on port 5000. If this port is in use, Serve will automatically choose the next available one.

![](./img/web_local_run.gif)


If you'd like to specify a different port, use the command `serve -l [port number]` and replace `[port number]` with your desired port.

That's it! You're all set to share your web app with the world. Whether you're hosting it online or running it locally, you've taken your app from concept to reality, and it's time to enjoy the results! 

### Why simply clicking on index.html won't work 

When you're developing a web app, you might wonder why you can't just open the `index.html` file in a browser to run your app. The reason is that modern web apps often rely on various resources, scripts, and services that aren't included directly in the HTML file.

By simply opening `index.html` in a web browser, the browser tries to load it as a standalone file without the necessary context of a web server. This can lead to issues with loading resources, executing scripts, or performing operations that expect a server-side environment.

That's why it's recommended to use a local server to simulate a real web environment for your app. This can be achieved easily using tools like the `serve` package in Node.js, which was described in the earlier parts. This approach ensures that your web app behaves exactly as it would in a live, server-served scenario.