# Why local projects
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
