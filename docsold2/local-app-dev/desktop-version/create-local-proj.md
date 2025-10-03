---
sidebar_position: 2
title: Creating Local Projects in Nowa Desktop
description: Create local Flutter projects 
---

After installing the Nowa Desktop application, you can easily create local projects. Follow these steps:

1. **Open Local Projects:**  In the sidebar, go to **Your Projects → Local Projects**.

![](/img/nowadesktop/createlocalproject/1.png)

2. **Start a New Local Project:**  Click on the **New Local Project** button.

![](/img/nowadesktop/createlocalproject/2.png)

3. **Choose Project Type:**   From the dropdown, select **New Local Project**.

![](/img/nowadesktop/createlocalproject/3.png)

4. **Enter Project Details:**  
   - Provide a **Project Name**.  
   - The **Package Name** is generated automatically.  
   - Click **Browse** to set the folder path where the project will be saved.

![](/img/nowadesktop/createlocalproject/4.png)

5. **Select a Folder:**   Choose your desired folder and click **Select Folder**.

![](/img/nowadesktop/createlocalproject/5.png)

6. **Create the Project:**   The selected path will appear in the form.   Click **Create** to finalize.  

![](/img/nowadesktop/createlocalproject/6.png)

Nowa will create a local Flutter project at your specified location, complete with the necessary Flutter files and folders.

![](/img/nowadesktop/createlocalproject/7.png)


## How to open an existing project locally
To open an existing local Flutter project in Nowa Desktop:

1. In the **main dashboard**, click on the dropdown next to **New Local Project**.  
2. From the options, select **Open**.  

![](/img/openexistinglocalproject.jpg)

3. Then, choose the folder path of your existing Flutter project and click **Choose**.  
   The folder should be a valid Flutter project folder.


### Converting Cloud projects to Local

You can convert cloud projects to local projects by:
1. Download the code for the local project. It will be downloaded as .zip folder
2. Extract the .zip folder
3. From Nowa destkop, click on "Open" as explained above and choose the folder that you just extracted

:::note
For now, you can convert a cloud project to a local one, but not the other way around.
:::

### Opening Existing Flutter projects
For now, it's recommended that when you open a local project that it was created within Nowa itself to avoid any problems in loading the project.

Since Nowa projects are Flutter project indeed, you can technically open existing Flutter project within Nowa. However, it might cause problems in case the project contains some code that Nowa can't analyze.  

## Cloud vs Local projects
The differences between local and cloud projects are as follows:
- With cloud projects you can use "Cloud run" to build your app online for Android, iOS or Web. For local ones, you will need to do the build manually using commands like 
  - `flutter build apk` For Android apk debug, `flutter build apk --release` for apk release, and `flutter build appbundle` for aab file.
  - `flutter build web` for Web.
  - `flutter build ios --release` for iOS.
- For local projects, beside using `Play` to preview the app, you can test the app on an [actual simulators / on real devices](./simulators.md). You can also use Hot restart to reload any change you do in Nowa to the simulator. For cloud projects, you can test the app by downloading the code first and then run it on a simulator or by building it already. For any change you do, you will need to download the code again to run it on a simulator or build again on the cloud


:::note

You can switch between local and cloud projects from the left sidebar. If you select Cloud Projects, all your projects will be stored online. If you select Local Projects, they will be saved directly on your computer.

![](/img/checkprojectlocalorcloud.jpg)


:::
   

## Benefits of Using Local Flutter Projects

Creating local Flutter projects in Nowa Desktop offers several advantages, particularly if you’re already familiar with Flutter development:

### 1. Maintain Your Original Workflow
- **Use Your Favorite Tools:** With a local Flutter project, you retain full access to your preferred development tools and workflows. This means you can continue using IDEs like VS Code, perform testing on simulators or real devices, and manage version control with Git.

- **Version Control:** You can easily [create a Git repository](../../version-cont-deploy/git/git-local.md) from the project folder, enabling you to maintain a local repository or push it to a remote repository on GitHub. This is particularly useful for collaborating with other developers or keeping your code backed up in the cloud.

### 2. Simultaneous Access in IDE and Nowa
- **Dual Access:** You can open your local project in your chosen IDE while simultaneously working on it in Nowa. This allows you to make direct modifications to the codebase in your IDE.
- **Reflecting Changes in Nowa:** If you modify the code directly within an IDE, those changes can be reflected in Nowa by reopening the project. This seamless integration ensures that you can work with both code and visual design without interruption.

Creating local projects in Nowa Desktop empowers you to leaverage the full power of building visually with Nowa, while maintaining your original development workflow.

Whether you’re a seasoned Flutter developer or just starting, Nowa Desktop provides a robust environment to build and manage your projects effectively.
