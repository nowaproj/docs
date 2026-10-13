# P15 media review: M03 (Desktop app, local projects, devices)

Batch: 36 items (m120 to m129 from the old `getting-started/install.md`, m148 to m173 from `local-project-simulator/*`). I looked at every image and every video frame sheet. I compared Nowa screens with the 3.13 captures (`static/img/docs/**`) and the 3.13 code (`/home/user/nowa-master`, `3cb32031c`).

## Items

| id | old page | what it shows (one line) | verdict | why (one line) | where added / what covers it |
|---|---|---|---|---|---|
| m120 | getting-started/install.md | Sign-in page: WELCOME BACK, Sign in, Forget password?, Google only | OUTDATED | 3.13 shows **Welcome back!**, **Log In**, **Forgot Password?** and **Continue with Apple** | — |
| m121 | getting-started/install.md | Email sign-up form (Create account, Create Account button, no Apple) | COVERED | create-account.md already has the current form | `/img/docs/get-started/get-started-create-account-1.png` |
| m122 | getting-started/install.md | Email Confirmation page with Resend the link, Logout and Refresh | OUTDATED | 3.13 confirms the email with a 6-digit code on **Confirm your email**, not a link | — |
| m123 | getting-started/install.md | Gmail welcome email with the verify-account link | PRIVACY | Readable verification token in the link URL, plus the addressee's first name. The link flow is also outdated (3.13 uses a code) | — |
| m124 | getting-started/install.md | Google's "Sign in to Nowa" consent screen with Continue | PRIVACY | The name and Gmail address are only lightly blurred and can be partly guessed, and there's an avatar dot | — (see Open questions) |
| m125 | getting-started/install.md | "Sign up with google" form: names, two boxes, Create Account | OUTDATED | 3.13 shows **Complete your account** after Google sign-in | — |
| m126 | getting-started/install.md | v3.0.4 dashboard with the "Welcome! Let's get started" dialog | OUTDATED | 3.13 asks four questions (**Question 1 of 4**), and the dashboard (Cloud Projects / Local Projects sidebar) has changed | — |
| m127 | getting-started/install.md | v3.0.6 dashboard: Cloud Projects, New Cloud Project | OUTDATED | 3.13 dashboard has **New project**, **On this device** and **Download Desktop App** | — |
| m128 | getting-started/install.md | Video: Create Workspace dialog on the v3.0 dashboard | OUTDATED | Every frame shows the 3.0 dashboard and sidebar | — |
| m129 | getting-started/install.md | Video: New Cloud Project → Create Cloud Project → 3.0 BETA editor | OUTDATED | 3.13 uses the **New project** dialog, and the editor has changed | — |
| m148 | local-project-simulator/createlocalproject.md | Video: Download for Desktop with a Macos/Windows flyout | OUTDATED | 3.13 has **Download Desktop App** and a **Download Nowa** dialog with MacOS, Windows and Linux (already shown in `get-started-desktop-app-1.png`) | — |
| m149 | local-project-simulator/createlocalproject.md | Local Setup page: Automatic setup / Set up automatically, Flutter SDK Path, Default Projects Path, VS code Path | ADD (cropped) | The panel matches 3.13 (`local_setup.dart`). I cropped out the settings sidebar, whose Plan / AI Usage / Credits are now **Billing** / **Usage** | docs/get-started/desktop-app.md:64 (`/img/nowadesktop/autosetup/local-setup-panel.png`) |
| m150 | local-project-simulator/createlocalproject.md | Set up local environment, Flutter step: Install location, license box empty, Install | COVERED | Same step as the current capture | `/img/docs/get-started/get-started-desktop-app-2.png` (desktop-app.md:91) |
| m151 | local-project-simulator/createlocalproject.md | Flutter step while downloading (Downloading Flutter 3.44.3…, 54%) | NOT USEFUL | A progress state. Step 4 already says to keep Nowa open, and that step already has its picture. It also shows a home-folder path `/Users/nowan/` | — |
| m152 | local-project-simulator/createlocalproject.md | Verify step with a "Running flutter doctor…" spinner | NOT USEFUL | A loading state with nothing to act on | — |
| m153 | local-project-simulator/createlocalproject.md | Verify step: flutter doctor results, Devices list, Android isn't set up / Download, Re-run checks | PRIVACY | The device list shows a person's name: "Ziad's iPhone" | — (see Open questions) |
| m154 | local-project-simulator/createlocalproject.md | Android screen: license ticked, Android toolchain Install, Android emulator locked, Skip for now | ADD (cropped) | Matches 3.13 `environment_setup_dialog.dart` and step 7. I cropped it to the dialog to drop the old settings sidebar behind it | docs/get-started/desktop-app.md:90 (`/img/nowadesktop/autosetup/android-toolchain.png`) |
| m155 | local-project-simulator/createlocalproject.md | Same Android screen after install: Ready · Managed by Nowa, Virtual device ready, Done | NOT USEFUL | The same screen as m154, one step later. The "You should see" paragraph already describes it, and a third image in this section would stack | — |
| m156 | local-project-simulator/createlocalproject.md | v3.0.4 dashboard with Settings highlighted | OUTDATED | Old dashboard and sidebar | — |
| m157 | local-project-simulator/createlocalproject.md | Old Environment page: no Automatic setup; sidebar Plan / AI Credits | OUTDATED | 3.13 adds the Automatic setup box, and the sidebar has changed. It also shows a partly blurred Windows user path | — |
| m158 | local-project-simulator/createlocalproject.md | v3.0.4 dashboard, Local Projects highlighted | OUTDATED | The Local Projects tab is gone. 3.13 lists local projects under **On this device** | — |
| m159 | local-project-simulator/createlocalproject.md | Local Projects page, New Local Project button | OUTDATED | 3.13 creates local projects from **New project** → **Advanced** → **Local-only project** | — |
| m160 | local-project-simulator/createlocalproject.md | New Local Project dropdown (New Local Project / Open) | OUTDATED | Same as m159. Opening an existing folder is now **Import project** | — |
| m161 | local-project-simulator/createlocalproject.md | "Create Local Project" dialog: name, Package name, Path, Browse | OUTDATED | 3.13 uses the **New project** dialog with the Local-only card (already shown in `code-local-projects-1.png`) | — |
| m162 | local-project-simulator/createlocalproject.md | Windows "Select project folder" picker in Hungarian | NOT USEFUL | The operating system's own folder picker, in Hungarian, so it doesn't help the reader | — |
| m163 | local-project-simulator/createlocalproject.md | Create Local Project dialog with the path filled in | PRIVACY | Readable Windows username `gellert234` in the path. The dialog is outdated as well | — |
| m164 | local-project-simulator/createlocalproject.md | New local project open in the v3.0.4-beta editor | OUTDATED | The 3.0 BETA editor (Upgrade button, old panels) | — |
| m165 | local-project-simulator/openexisting.md | Local Projects → New Local Project → Open | OUTDATED | 3.13 uses **Import project** from the arrow next to **New project** | — |
| m166 | local-project-simulator/simulator.md | Video: Play / Play Settings with device sizes in the 3.0 editor | OUTDATED | Every frame shows the 3.0 BETA editor. 3.13 Instant Play has a different UI (see `test-instant-play-video.mp4`) | — |
| m167 | local-project-simulator/simulator.md | Video: Build settings device picker running on an Android emulator, 3.0 editor | OUTDATED | 3.13 uses the **Run on** menu with DEVICES / START AN EMULATOR (see `test-devices-1.png`) | — |
| m168 | local-project-simulator/sync.md | YouTube "Nowa 3 Full Walkthrough" | OUTDATED | The thumbnail shows the Nowa 3.0 editor (old outline panel, BETA-era layout) | — |
| m169 | local-project-simulator/sync.md | Video: cloud card ⋮ → Sync… → Clone Project → Clone to Local, v3.1 dashboard | OUTDATED | 3.13 has no **Sync…** item. The flow is **Settings** → **Project Sync** or **Upload to cloud**, and the dashboard has changed | — |
| m170 | local-project-simulator/sync.md | Video: local card ⋮ → Sync… → Clone to Cloud, v3.1 dashboard | OUTDATED | Same as m169 | — |
| m171 | local-project-simulator/sync.md | Video: Project Sync modal, Sync from Cloud, Sync Warning, Proceed with Sync | OUTDATED | Opened from the old dashboard's **Sync…** as a modal. In 3.13 it's a settings page (see `code-local-projects-2.png`), and no frame shows that flow | — |
| m172 | local-project-simulator/sync.md | Video: Unlink Project confirmation, then Clone Project | OUTDATED | Same old modal and dashboard as m171 | — |
| m173 | local-project-simulator/whylocalproject.md | v3.0.4 sidebar Cloud Projects / Local Projects highlighted | OUTDATED | 3.13 shows local projects under **On this device**, tagged **LOCAL-ONLY** | — |

## Added

2 items, both on `docs/get-started/desktop-app.md`:

- Line 64, after "Under **Editor Settings**, click **Local Setup**.": the Local Setup panel (m149).
- Line 90, inside step 7 of "Let Nowa install Flutter": the Android toolchain screen (m154).

New files (both are crops of in-repo originals, which I left untouched):

- `static/img/nowadesktop/autosetup/local-setup-panel.png`, cropped from `autosetup/1.png` (`crop=1516:690:500:50`). It removes the settings sidebar, whose labels changed in 3.13.
- `static/img/nowadesktop/autosetup/android-toolchain.png`, cropped from `autosetup/6.png` (`crop=1060:956:508:208`). It keeps only the dialog.

I didn't copy, cut or re-encode any video.

## Routed

None. m120 to m127 belong to `docs/get-started/create-account.md` (M04), but none of them is an ADD.

## Open questions

- **m124** (Google consent screen): it would fit create-account.md, after "Sign up with Google" step 1, if the name, email and avatar were blurred more heavily. The current blur leaves "G…t T…h" and "…@gmail.com" partly guessable. The orchestrator decides.
- **m153** (Verify step with flutter doctor results): a good picture for desktop-app.md step 6 if "Ziad's iPhone" in the Devices list were blurred. Not added.
- **m150 / m151** show the install path `/Users/nowan/.nowa/sdks`. "nowan" looks like a Nowa team machine account, not a person. Neither image was added, so this is only a note.
- Cropping in-repo images to remove an outdated sidebar is my own call. The brief only describes cutting videos. If you'd rather not keep derived files, drop the two images.
