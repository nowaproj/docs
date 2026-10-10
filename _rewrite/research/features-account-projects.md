# Features: Account, dashboard and projects

Source: /home/user/nowa-master (v3.12.5). Researcher: features-account-projects (research subagent). 2026-10-06.

Scope: sign up / sign in, onboarding, the dashboard (`/`), creating and importing projects, cloud vs local
projects, the playground and guest mode, project settings (App Settings → Project Details, Sharing,
Permissions, Constants), account settings (Account Details, Billing, Usage), workspaces and collaboration,
support, notifications, update prompts and system screens.

Cross-area notes (one line each, covered elsewhere): the editor top bar, side panels and mobile shell →
editor-layout researcher; AI modes/tiers inside a project → AI researcher; Run / App Run / Share preview
popup / Deploy / Cloud Build / code download → code/shipping researcher; Git panel, Git settings and
"Connect GitHub" → Git researcher; integration settings (Google Maps, Stripe, RevenueCat, Firebase,
Supabase…) and Packages → data/code researchers.

Conventions in this file: "UI path" uses the exact labels. "Desktop app" = the native macOS/Windows build
(`!kIsWeb`). "Mobile shell" = native iOS/Android or a narrow browser window
(`packages/nowa_ui/lib/src/globals/responsive_utils.dart:63-68`). Nowa ships one dark theme only (no
light/dark switch, see "Theme" at the end).

## Summary

- **Create your account** (sign-up page): email + password sign-up with first/last name, terms and newsletter checkboxes.
- **Welcome back!** (sign-in page): email + password sign-in; deep links survive the sign-in round trip.
- **Continue with Google**: Google sign-in/sign-up; first-time Google users complete a **Complete your account** step.
- **Continue with Apple**: Apple sign-in. (Web and iOS only)
- **Confirm your email**: 6-digit code verification after email sign-up, with resend and log out.
- **Reset your password** / **Set a new password**: email reset link flow.
- **Onboarding survey** ("Question 1 of 4"): four one-tap questions shown once per account after sign-up.
- **Logout**: from the dashboard sidebar, the editor account menu, the verify step or the upgrade page.
- **AppSumo sign-in link** (`/auth/appsumo`): email-only sign-in/up that lands on the plans page. (Partner link)
- **Dashboard** (`/`): left sidebar + projects area + floating **?** support button.
- **What do you want to build?**: prompt box that creates a new cloud project and sends the prompt to the AI (also reachable as a `/prompt-to-app?prompt=…` link).
- **Projects** list: count, **Search...**, **Sort by** (Updated / Created / Name), grid/list toggle, **Load More**.
- **On this device** (LOCAL-ONLY section): local projects listed separately. (Desktop app only)
- **Project menu (⋮)**: **Open in safe mode**, **Move to workspace...** (cloud), **Upload to cloud** (local), **Remove from list** (local), **Delete**.
- **RECENTS**: five most recently edited projects in the sidebar.
- **Workspace switcher**: **Personal** + your workspaces + **Create workspace**; per-workspace settings.
- **Notifications** bell and announcement banners.
- **Invite a Friend**: personal referral link and progress.
- **Hire an Expert**: book a consultation / become an expert.
- **Learning Resources**: opens docs.nowa.dev.
- **Download Desktop App** → **Download Nowa** dialog (MacOS, Windows). (Web only)
- **Upgrade your plan** and the plan badge next to your name. (Hidden on iOS/Android)
- **Dashboard pop-ups**: update available, survey, feedback rating, ticket deep link, upgrade offer.
- **New project** dialog: name + (desktop) **Advanced → Local-only project** with a folder path.
- **Clone from GitHub**: pick a repository, clone to the cloud or (desktop) **Local-only**. (Plan: `github` entitlement)
- **Import project**: bring an existing Flutter folder in, to the cloud or local-only; monorepo package picker. (Desktop app only)
- **Project names, package name and bundle ID**: validation rules and what a new project contains.
- **Cloud projects vs Local-only projects**: what differs and which features are cloud-only / local-only.
- **Desktop app** (Nowa Desktop): macOS and Windows downloads, plan gate, auto-update. (Desktop app only)
- **Local Setup** (Editor Settings): Flutter SDK, default projects folder, VS Code path, **Set up automatically** wizard. (Desktop app only)
- **Project Sync**: clone a project to the other side, then **Sync from Cloud/Local**, **Unlink Project**. (Desktop app only)
- **Project not found**: relocate or remove a local project whose folder moved.
- **Playground** (`/playground`): try the editor without an account; work kept in the browser.
- **Starting-point picker** (Playgrounds / Templates): switch starter apps or open a public template.
- **Save** / **Save to keep changes** → **Save your app**: sign in, name it, pick a workspace, save to your account.
- **Public projects opened as a guest**: anyone with the link can open and edit a copy in memory, then save it.
- **App Settings** window: Settings sidebar grouped into General / Integrations.
- **Project Details**: Project Name, Package Name, App Name, Bundle Identifier, Build info, App Icon, Shared Preferences, Experimental flags.
- **Sharing**: **Cover** image and **Public project** switch with link options. (Public project: Cloud projects only)
- **Experimental flags**: **load packages** and **New UX** toggles. (Experimental)
- **Permissions**: iOS and Android permission toggles. (Not in playground/guest)
- **Constants**: secret keys for integrations + **Custom Constants**.
- **Project info popup**: project name and copyable Project ID from the status bar.
- **Account Settings** window: Account Details, Billing, Usage; Editor Settings: Local Setup, Git.
- **Account Details**: first/last name, profile photo, email, password, delete account, connected accounts.
- **Change Email**: new email + OTP verification.
- **Change Password** / **Set New Password**.
- **Delete Account**: reason, password, server check, final confirmation.
- **Connected Accounts** (Figma): **Connect** / **Disconnect**.
- **Billing**: current plan, **Adjust Plan**, Extra AI Usage, **Invoices**. (Hidden on iOS/Android)
- **Usage**: **Plan Usage Limits** bars + **Extra AI Usage** balance. (Hidden on iOS/Android)
- **Extra AI Usage** (buy credits) page. (Plan: `top_up_credits` entitlement)
- **Time to level up** upgrade prompt and **Premium** badge (plan-gated features).
- **Workspace settings**: rename/recolor, **Members**, **Invite** by email with a role (Owner, Editor, View Only; Pending invitations), **Delete workspace** / **Leave workspace**.
- **Accept invitation** page.
- **View Only** access: read-only editor.
- (No comments, real-time co-editing, project duplicate or transfer exist in 3.12.5.)
- **Support panel** (the **?** icon): **Chat with support**, **Report an issue** with project snapshot, ticket list.
- **New-project tour**: **Welcome to Nowa!** → 7-step tour → **You're all set!** → optional extended tour.
- **Feedback rating** dialog: "How much would you rate Nowa?".
- **Update prompts**: desktop auto-update, web reload, "Version out of date" screen.
- **System screens**: No Internet Connection, We'll Be Right Back, Maintenance in Progress, Preview Not Available, Payment Successful/Failed.
- **Version label**: `v3.12.5` in the dashboard sidebar and editor status bar.
- **Theme (dark only)**: no light/dark or language preference exists in 3.12.5.

## Features

### Create your account (sign up)
- **What it does:** Creates a Nowa account with email and password (or Google/Apple, see below). Email
  accounts must then confirm their email with a 6-digit code.
- **Where:** `app.nowa.dev/signup`, or **Sign Up** link on the sign-in page ("Don't have an account?
  Sign Up"). Visiting any signed-in page while signed out redirects to `/signin`.
- **Labels:** title "Create your account", subtitle "Enter your details to start building with Nowa";
  fields **First name** (hint "Jane"), **Last name** ("Doe"), **Email** ("you@company.com"), **Password**
  ("At least 8 characters"), **Repeat password** ("Re-enter your password"); checkboxes "I accept the
  terms & conditions" (link to nowa.dev/terms-and-conditions) and "I want to receive emails on latest
  updates and features"; button **Create account**; divider "Or"; **Continue with Google**, **Continue
  with Apple** (web/iOS); footer "Already have an account? Sign in"; footer "Want to look around first?
  Build an app, no account needed" (goes to `/playground`).
- **How to use:** 1. Fill in all fields. 2. Tick "I accept the terms & conditions". 3. Click **Create
  account**. 4. Enter the 6-digit code from your email ("Confirm your email"). 5. Answer the four survey
  questions. 6. You land on the dashboard.
- **Options:** Newsletter checkbox is **on** by default; terms checkbox is off.
- **Limits and rules:** Errors: "This field is required", "Email is required", "Email is not valid",
  "Password is required", "Password must be at least 8 characters", "Please make sure the passwords
  match", "Accepting terms and conditions is required". Email is lower-cased before sending. Server
  errors show in a red banner under the form (closable). On wide windows (≥ 900 px) a showcase image fills
  the left half.
- **Gating:** none found. A `?ref=` referral code in the URL is stored and sent with the sign-up
  (`lib/router.dart:57-60`, `packages/core/lib/src/providers/user_provider.dart:87-99`).
- **Code refs:** `lib/router.dart:191-195`, `lib/auth/auth_view.dart:446-549`,
  `lib/auth/auth_widgets.dart:10-35`, `lib/auth/auth_widgets.dart:39,56`.
- **Old docs:** `getting-started/install.md` "Signup" — partly outdated (says "full name"; now First/Last
  name, Repeat password, newsletter box; verification is a 6-digit code, not only a link; no "Welcome
  Screen / Let's Get Started" any more).
- **Screenshot value:** high — the sign-up form (playground-capturable: it's public).

### Welcome back! (sign in)
- **What it does:** Signs in with email and password. After sign-in you return to the page you were
  trying to open (deep links such as `/project/<id>` or `/prompt-to-app?...` are remembered across the
  sign-in, email round trip and reloads).
- **Where:** `/signin` (`/login` redirects there). Opening any protected page while signed out.
- **Labels:** title "Welcome back!", subtitle "Enter your credentials to access your account"; **Email**
  (hint "eg. johnfrans@gmail.com"), **Password** ("Enter your password"); link "Forgot Password?"; button
  **Log In**; "Or"; **Continue with Google**; **Continue with Apple** (web/iOS); footer "Don't have an
  account? Sign Up".
- **How to use:** 1. Enter email and password. 2. Click **Log In** (or press Enter in the password field).
  3. If the account isn't verified yet, the "Confirm your email" step appears inline.
- **Options:** Works with password-manager autofill.
- **Limits and rules:** Same email/password validators as sign-up (8+ characters). If a link carries
  `?email=` for a different account than the one signed in, Nowa signs you out and asks you to sign in
  with that email (field locked) (`lib/router.dart:70-74`).
- **Gating:** Desktop app only: after sign-in the account must have desktop access, otherwise `/upgrade`
  (see "Desktop app").
- **Code refs:** `lib/router.dart:28-44` (AuthRedirectManager), `lib/router.dart:46-114`,
  `lib/router.dart:185-190`, `lib/auth/auth_view.dart:219-339`.
- **Old docs:** none (install.md covers sign-up only) — missing.
- **Screenshot value:** medium — sign-in form.

### Continue with Google
- **What it does:** Signs in or signs up with a Google account. If the Google account has no Nowa account
  yet, Nowa shows **Complete your account** to collect the name and terms acceptance.
- **Where:** Button on the sign-in and sign-up pages (and in the playground's sign-in dialog).
- **Labels:** **Continue with Google**; follow-up page "Complete your account", subtitle "Add your name to
  finish setting up your Nowa account."; **First name**, **Last name** (prefilled from Google); "I accept
  the terms & conditions"; "I want to receive emails on latest updates and features"; **Create account**;
  "Back to sign in".
- **How to use:** 1. Click **Continue with Google** and pick your account. 2. First time only: check the
  name, tick the terms box, click **Create account**.
- **Options:** Newsletter on by default.
- **Limits and rules:** "Accepting terms and conditions is required"; names required. Google accounts show
  "Google SignedIn" instead of **Change Email** in Account Details and may have no password (then
  **Set Password**).
- **Gating:** none found (all platforms).
- **Code refs:** `lib/auth/auth_widgets.dart:541-580`, `lib/auth/google_signup.dart:35-127`,
  `lib/router.dart:197-209`.
- **Old docs:** `getting-started/install.md` "Google Sign-Up" — mostly accurate.
- **Screenshot value:** low.

### Continue with Apple
- **What it does:** Signs in with an Apple ID.
- **Where:** Sign-in and sign-up pages, under the Google button.
- **Labels:** **Continue with Apple**.
- **How to use:** Click it and approve in Apple's flow.
- **Options:** none.
- **Limits and rules:** —
- **Gating:** Web and iOS only (`kAppleSignInSupported => NPlatform.isIOS || NPlatform.isWeb`); not in
  the macOS/Windows desktop app.
- **Code refs:** `lib/auth/auth_widgets.dart:512-539`, `lib/auth/auth_view.dart:323-330,531-538`.
- **Old docs:** missing (What's New 3.12.0 mentions it).
- **Screenshot value:** low.

### Confirm your email (email verification)
- **What it does:** Verifies a new email account with a 6-digit code before the dashboard opens.
- **Where:** Appears right after **Create account** (or after signing in with an unverified account);
  standalone at `/auth/verify`. A link route `/auth/verify-account?token=` also verifies and goes to `/`.
- **Labels:** title "Confirm your email"; "We sent a 6-digit code to <email>. Enter it below to verify your
  account."; six code boxes; **Verify**; "Haven't received the code? Resend the code" (changes to
  "Sent!"); "Log out".
- **How to use:** 1. Type or paste the 6-digit code (it submits automatically when complete). 2. On the
  standalone pages the onboarding survey follows, then the dashboard.
- **Options:** —
- **Limits and rules:** Digits only; exactly 6. A wrong code clears the boxes and shows the server error.
- **Gating:** none found.
- **Code refs:** `lib/auth/auth_view.dart:661-811`, `lib/router.dart:75,210-244`, `lib/auth/verify_page.dart:1-11`.
- **Old docs:** `getting-started/install.md` "Email Sign-Up" — outdated (describes clicking a link in the
  email; the UI asks for a 6-digit code).
- **Screenshot value:** medium — the code entry step.

### Reset your password / Set a new password
- **What it does:** Sends a reset link by email, then lets you choose a new password.
- **Where:** "Forgot Password?" on the sign-in page (`/auth/request-reset-password`); also "Forgot your
  Password? Restore Password" in Account Settings → Change Password. The email link opens
  `/auth/reset-password?token=…`.
- **Labels:** "Back to sign in"; title "Reset your password", subtitle "Enter the email linked to your
  account and we’ll send you a secure link to choose a new one."; **Email** ("you@company.com"); **Send
  reset link**; then "Check your email" + "We sent a reset link to <email>. Follow it to choose a new
  password." Reset page: "Set a new password", "Choose a new password for your account. Make it at least 8
  characters."; **New password**, **Repeat new password**; **Reset password**; results "Password changed"
  ("Your password has been updated. Sign in to access your account.") or "Invalid link" ("This reset link
  is missing or has expired. Request a new one from the sign in screen.").
- **How to use:** 1. Click "Forgot Password?". 2. Enter your email → **Send reset link**. 3. Open the email
  link. 4. Enter and repeat the new password → **Reset password**. 5. **Back to sign in**.
- **Options:** —
- **Limits and rules:** Password ≥ 8 characters; both fields must match ("Please make sure the passwords
  match").
- **Gating:** none found.
- **Code refs:** `lib/auth/auth_view.dart:557-659`, `lib/auth/reset_password_page.dart:54-98`,
  `lib/router.dart:215-228`.
- **Old docs:** missing.
- **Screenshot value:** low.

### Onboarding survey ("Question 1 of 4")
- **What it does:** Four quick questions shown once per account, full screen, before you can use the
  dashboard. Answers go to Nowa.
- **Where:** Right after email verification on the standalone pages, or on the first dashboard load for
  any account that hasn't answered (e.g. Google sign-ups). It can't be dismissed.
- **Labels:** "Question N of 4"; Q1 "What do you want to build first?" ("Pick the closest — nothing is
  locked in.") — A business app, A client project, An internal tool, A marketplace, A social app, Not sure
  yet; Q2 "What best describes you?" — Founder, Designer, Developer, Manager, Hobbyist, Other (follow-up
  field "What describes you best?"); Q3 "Have you used another app builder?" — Yes ("Which ones?
  (Optional)") / No; Q4 "Where did you hear about Nowa?" ("Last one, promise.") — Friend or coworker,
  YouTube, Social media, Search, Article or newsletter, Other. Footer "Back", "Selecting advances
  automatically", "Continue" (follow-up fields), "Submitting…".
- **How to use:** Click an option; it advances automatically. For "Other"/"Yes" with a follow-up, type and
  click **Continue**.
- **Options:** —
- **Limits and rules:** Error snackbar "Something went wrong please try again, error …".
- **Gating:** none found.
- **Code refs:** `lib/dashboard/overlays/survey_overlay.dart:31-77,144-166,183,244,267,282,287`,
  `lib/dashboard/dashboard_provider.dart:53-70`, `lib/auth/auth_view.dart:737`.
- **Old docs:** missing.
- **Screenshot value:** low.

### Logout
- **What it does:** Signs out and returns to `/signin`.
- **Where:** Dashboard sidebar, icon button next to your name (tooltip "Logout"); in a project, click your
  avatar in the top bar → **Logout**; "Log out" on the verify step; **Logout** on the `/upgrade` page.
- **Labels:** "Logout", "Log out".
- **How to use:** Click it.
- **Options:** —
- **Limits and rules:** —
- **Gating:** none found.
- **Code refs:** `packages/nowa_ui/lib/dashboard/dashboard_side_bar.dart:236-246`,
  `lib/dashboard/dashboard_page.dart:199-203`, `packages/nowa_ui/lib/top_bar/top_bar_view.dart:677-685`,
  `lib/auth/auth_view.dart:801-806`, `lib/upgrade_page.dart:54-61`.
- **Old docs:** missing.
- **Screenshot value:** low.

### AppSumo sign-in link (`/auth/appsumo`)
- **What it does:** Partner link for AppSumo customers: opens sign-in (if `hasAccount=true`) or sign-up
  with the email locked and Google hidden, then lands on Settings → Billing → Adjust Plan.
- **Where:** URL `/auth/appsumo?email=…&hasAccount=true|false` (from AppSumo).
- **Labels:** same as sign-in/sign-up without the Google/Apple buttons.
- **How to use:** Open the link from AppSumo and sign in or sign up.
- **Options:** —
- **Limits and rules:** —
- **Gating:** AppSumo plans show the **Upgrade your plan** offer (`lib/dashboard/dashboard_mapper.dart:44-45`).
- **Code refs:** `lib/integrations/appsumo.dart:12-26`, `lib/router.dart:196,314-322`.
- **Old docs:** missing.
- **Screenshot value:** low. (Consider a one-line mention only.)

### Dashboard (home)
- **What it does:** Your home screen after sign-in: create projects, open existing ones, switch
  workspaces, reach settings, help and account actions.
- **Where:** `app.nowa.dev/` (route `/`). The Nowa logo in the editor top bar returns here (with an
  "Unsaved changes will be lost" prompt — **Cancel** / **Close** / **Save and close** — if files are
  unsaved).
- **Labels:** Left sidebar (top to bottom): Nowa logo, version "v3.12.5", **Notifications** bell;
  workspace switcher (default **Personal**); **RECENTS**; then **Upgrade your plan** (when offered),
  **Invite a Friend**, **Download Desktop App** (web only), **Hire an Expert**, **Learning Resources**,
  **Settings**, your avatar + first name + plan badge + email, logout icon (tooltip "Logout"). Main area:
  "What do you want to build?" prompt box, then the pinned **Projects** header and the project grid/list.
  Bottom-right: floating **?** support button (red badge with unread replies) and announcement banners.
- **How to use:** See the individual features below.
- **Options:** In the mobile shell the sidebar becomes a drawer behind an app bar with the Nowa logo.
- **Limits and rules:** Error snackbar "Unable to load projects". "User not found" shows if the profile
  can't load.
- **Gating:** **Download Desktop App** web only; **Upgrade your plan** and plan badge hidden on iOS/Android
  (`kShowPurchaseUi`).
- **Code refs:** `lib/dashboard/dashboard_page.dart:25-215`, `packages/nowa_ui/lib/dashboard/dashboard_view.dart:22-58`,
  `packages/nowa_ui/lib/dashboard/dashboard_side_bar.dart:57-254`, `packages/core/lib/src/dialogs/unsaved_dialog.dart:35-88`.
- **Old docs:** `getting-started/install.md` "Dashboard" — partly outdated (lists "Templates" and
  "Learning resources" shortcuts and a top-right "new project button"; no prompt box, no Invite/Hire/Download
  entries; Learning Resources now just opens the docs site).
- **Screenshot value:** high — full dashboard with a few projects (needs a signed-in capture).

### What do you want to build? (prompt box / prompt to app)
- **What it does:** Describe an app in plain words; Nowa names it, creates a new **cloud** project and opens
  it with your prompt already sent to the AI in the mode and thinking level you picked.
- **Where:** Top of the dashboard (centered "hero" when you have no projects yet).
- **Labels:** heading "What do you want to build?"; field hint animates example ideas ("A habit tracker
  with streaks and reminders...", "A booking app for my salon...", "A CRM to manage my clients...", "A
  reservations app with a booking calendar...") and reads "Describe the app you want to build..." when
  focused; mode chip (tooltip "Switch mode"): **Design** (badge "Start here", "Design the look and flow
  before making it functional"), **Plan** ("For planning complex tasks before building"), **Agent** ("For
  everything, from design to functionality"); thinking chip (tooltip "Switch thinking level"):
  **Thinking** ("Balanced. Great for most tasks."), **Deep Thinking** ("Extra reasoning. Great for complex
  tasks."); send button tooltip "Build it"; "Or try an example prompt" + refresh button (tooltip "Refresh
  prompts") + three example chips (e.g. "Habit Streak Tracker", "Shared Grocery List", "Split the Bill").
  While creating: "Setting things up…", "Naming your app…", "Creating your project…".
- **How to use:** 1. Type your idea (or click an example chip to fill the box, then edit). 2. Pick a mode
  and thinking level. 3. Click the send button. 4. Wait for the project to open; the AI starts on your
  prompt.
- **Options:** Mode default **Design**; tier default **Thinking**; **Instant** is not offered here. The
  chosen tier is set on the new project only.
- **Limits and rules:** Empty prompts do nothing. The app name comes from the AI, cleaned to letters,
  digits, spaces, `_` and `-`, max 40 characters; fallback = first three words of the prompt, then "My App".
  Errors: "No prompt provided.", "Something went wrong" + **Back to dashboard**; "Failed to run flutter
  command. Please ensure that Flutter SDK is correctly set up.". The project is always created as a cloud
  project with no workspace in the request (see Open questions). A direct link
  `/prompt-to-app?prompt=…&mode=design|plan|agent&tier=thinking|deepThinking` does the same (sign-in
  required; legacy `plan=true` still means Plan).
- **Gating:** none in the client (AI usage is metered by the server — AI researcher).
- **Code refs:** `packages/nowa_ui/lib/dashboard/describe_app_panel.dart:35-40,346,424-431,467-479,555-561,593,603-666`,
  `lib/dashboard/dashboard_page.dart:48-51,209-232`, `lib/dashboard/create_new_project/prompt_to_app_page.dart:38-118,146-151`,
  `lib/router.dart:277-292`, `packages/ai/lib/src/ui/chat_field/mode_selector.dart:37-41`,
  `packages/ai/lib/src/ui/chat_field/tier_selector.dart:21-34`, `packages/ai/lib/src/agent/agent.dart:21-28,52`.
- **Old docs:** missing (quickstart.md creates a blank cloud project then chats).
- **Screenshot value:** high — prompt box with chips and the mode menu open.

### Projects list (search, sort, view)
- **What it does:** Lists your projects in the selected workspace: cloud projects first (paged), then (desktop
  app, Personal only) local projects under **On this device**.
- **Where:** Dashboard main area, header pinned under the prompt box.
- **Labels:** "Projects" + count; search field "Search..."; sort button (tooltip "Sort: Updated") opening
  menu "Sort by" → **Updated**, **Created**, **Name**; grid/list toggle; **New project** split button (label
  "New" in compact layouts); **Load More**; empty search: "No projects found" / "Try a different search
  term.". Cards: cover image (or the project's initial), name, folder name (when different; hover shows
  "Edited …"), ⋮ menu. List rows: initial, name, "Cloud"/"Local" badge, "Edited …", ⋮ menu. Edited labels:
  "Edited just now", "Edited 5m ago", "Edited 3h ago", "Edited yesterday", "Edited 4 days ago", "Edited 2w
  ago", or a date.
- **How to use:** Click a card/row to open the project. Type in **Search...** to filter. Use **Sort by**
  and the grid/list toggle.
- **Options:** Sort default **Updated**; the chosen workspace and sort order are remembered on this device.
  Cloud list defaults to grid, local list to list view (not remembered).
- **Limits and rules:** The count is the server's total for cloud projects matching the search. Cloud
  search runs on the server; local projects are fuzzy-matched on display name and folder name. Sort applies
  to cloud projects; local projects are always newest-edited first. The cover is a board screenshot taken
  on save unless you set a custom **Cover** (Project Details → Sharing).
- **Gating:** local section desktop app only (macOS, Windows, Linux builds) and only in **Personal**.
- **Code refs:** `packages/nowa_ui/lib/dashboard/projects_view.dart:11-15,59-154,171-172,212-280,421-464,537-553`,
  `packages/nowa_ui/lib/dashboard/projects_grid.dart:9-260`, `packages/core/lib/src/providers/projects_view_provider.dart:28-30,64-65,120-187,234-269`,
  `lib/dashboard/dashboard_mapper.dart:83-104`, `lib/dashboard/dashboard_page.dart:105-109`.
- **Old docs:** `getting-started/install.md` — partly outdated (no sort/view/load-more; "search bar and new
  project button" in top-right only).
- **Screenshot value:** high — header with sort menu open; grid vs list.

### On this device (local projects section)
- **What it does:** Shows projects stored only on this computer, separate from cloud projects.
- **Where:** Dashboard, below the cloud projects, when **Personal** is selected in the desktop app.
- **Labels:** "On this device", badge "LOCAL-ONLY", "N project(s)", caption "Opted out of the cloud — no
  Cloud Build, sharing or backups.", its own grid/list toggle.
- **How to use:** Click a project to open it; use its ⋮ menu for **Upload to cloud** or **Remove from list**.
- **Options:** —
- **Limits and rules:** The local project list is stored on this computer only (not in your account), so
  local projects don't appear on other devices or on the web.
- **Gating:** Desktop app only; hidden when a workspace (not Personal) is selected.
- **Code refs:** `packages/nowa_ui/lib/dashboard/projects_view.dart:138-150,466-534`,
  `packages/core/lib/src/providers/projects_view_provider.dart:28-30,64-65,162-166`,
  `packages/core/lib/src/services/local_project_service.dart:35-55`.
- **Old docs:** `local-project-simulator/createlocalproject.md` ("Your Projects → Local Projects") — wrong UI path.
- **Screenshot value:** medium.

### Project menu (⋮) on a project card
- **What it does:** Per-project actions from the dashboard.
- **Where:** ⋮ on a project card or row.
- **Labels:** **Open in safe mode**; **Move to workspace...** (cloud projects); **Upload to cloud** (local
  projects); **Remove from list** (local projects); **Delete**. Delete confirmation for cloud and normal
  local projects: "Are you sure you want to delete "<name>"?" / "This action cannot be reversed." /
  **Cancel** / **Delete Project**. For a local project found inside a Git repository: "Remove "<name>" from
  Nowa?" / "The files stay on disk." / **Remove**. Move dialog: "Move <name> to...", list **Personal**
  ("Projects not in a workspace") + "WORKSPACES", **Cancel** / **Move**.
- **How to use:** Open in safe mode = open the project with no editor tabs restored (use it when a file
  makes the editor misbehave); also `?safe=true` on the project URL. Move to workspace... = pick the target,
  **Move**; the dashboard switches to that workspace. Upload to cloud = see "Project Sync". Remove from list
  = drop a local project from Nowa, files stay. Delete = confirm.
- **Options:** —
- **Limits and rules:** **Delete on a local project deletes its folder from disk.** The only exception is a
  project Nowa found inside a larger Git repository (repository root above the project folder): then Delete
  only removes it from the list ("The files stay on disk."). A project whose own folder is the repository root
  is deleted from disk like any other. Use **Remove from list** to keep the files. **Move** is disabled while the target is
  the workspace the dashboard is showing. There is no rename or duplicate here (rename: App Settings →
  Project Details → **Project Name**).
- **Gating:** Move to workspace... Cloud projects only; Upload to cloud / Remove from list Local projects only.
- **Code refs:** `packages/nowa_ui/lib/dashboard/projects_grid.dart:289-331`, `lib/dashboard/dashboard_page.dart:155-167,253-303`,
  `packages/core/lib/src/services/local_project_service.dart:88`, `packages/core/lib/src/models/project.dart:187-192`,
  `lib/dashboard/projects_view/move_project_dialog.dart:31-65`, `packages/core/lib/src/providers/projects_view_provider.dart:95-114,278-289`,
  `packages/core/lib/src/providers/editor_provider.dart:166-171`, `lib/router.dart:254-258`.
- **Old docs:** missing.
- **Screenshot value:** high — the open ⋮ menu on a cloud card and a local row.

### RECENTS
- **What it does:** Quick links to the five most recently edited projects (cloud and local).
- **Where:** Dashboard sidebar under the workspace switcher.
- **Labels:** "RECENTS"; each entry shows the project's initial, name, "Edited …", and a cloud or computer
  icon.
- **How to use:** Click an entry.
- **Options:** —
- **Limits and rules:** Five entries; never-saved projects sort last.
- **Gating:** none found.
- **Code refs:** `lib/dashboard/dashboard_mapper.dart:7,72-82`, `packages/nowa_ui/lib/dashboard/dashboard_side_bar.dart:369-465`.
- **Old docs:** missing.
- **Screenshot value:** low.

### Workspace switcher and Create Workspace
- **What it does:** Workspaces group cloud projects and share them with members. **Personal** holds projects
  that aren't in a workspace.
- **Where:** Dashboard sidebar, the box under the logo (shows the current workspace).
- **Labels:** menu entries **Personal** ("Projects not in a workspace"), each workspace (with a settings
  gear), **Create workspace**. Create dialog: "Create Workspace", "Create a new workspace to organize your
  projects.", color swatch, field hint "Workspace Name", **Create**.
- **How to use:** 1. Click the switcher → **Create workspace**. 2. Pick a color (random by default) and type
  a name. 3. **Create** — the new workspace becomes selected. Switch workspaces from the same menu; click a
  workspace's gear for **Workspace settings**.
- **Options:** Color.
- **Limits and rules:** "Name cannot be empty". The selected workspace is remembered on this device. Local
  projects only show under Personal.
- **Gating:** none found in the client.
- **Code refs:** `packages/nowa_ui/lib/dashboard/dashboard_side_bar.dart:518-613`, `lib/dashboard/side_bar/workspace_widgets.dart:10-103`,
  `lib/dashboard/dashboard_page.dart:175-191`, `packages/core/lib/src/providers/projects_view_provider.dart:195-232`.
- **Old docs:** `getting-started/install.md` "Creating a Workspace" — outdated ("click the + button").
- **Screenshot value:** medium — open switcher menu.

### Workspace settings (members, roles, delete or leave)
- **What it does:** Rename/recolor a workspace, invite people by email with a role, change roles, remove
  members, cancel/resend invitations, delete the workspace (owner) or leave it (member).
- **Where:** Dashboard sidebar → workspace switcher → gear next to a workspace.
- **Labels:** "Workspace settings" + workspace name; "Workspace name" (color + name field); "Members" +
  "N person/people"; invite row (owner only): email field "teammate@company.com", role dropdown
  (**Editor**, **View Only**), **Invite**; member rows with "(You)" and a role badge (**Owner**, **Editor**,
  **View Only**, or **Pending** for invitations); badge menu: "Remove member", "Make Owner" / "Make Editor"
  / "Make View Only"; invitation menu: "Cancel invitation", "Resend invitation"; danger zone **Delete
  workspace** ("Projects move to your Personal space. Members lose access.") or **Leave workspace** ("You
  will lose access to this workspace and its projects."); buttons **Cancel**, **Save changes** (owner).
- **How to use:** Invite: type an email, choose a role, **Invite**. Change a role: click the member's role
  badge → "Make …". Delete/leave: click the red button and confirm ("Are you sure you want to delete this
  workspace? Projects move to your Personal space and members lose access." / "Are you sure you want to
  leave <name> ? You will lose access to the workspace.").
- **Options:** Default invite role **Editor**.
- **Limits and rules:** "Please enter a valid email address". Owners can't be invited as Owner (only
  promoted). Name/color edits and **Save changes** are owner-only. Changing your own role asks "Are you sure
  you want to change your role to …? By doing this you will lose access to some settings.". Removing asks
  "Are you sure you want to remove … from project? They will lose access to the project." (sic, says
  project). Server errors show as a snackbar.
- **Gating:** none found in the client (seat limits, if any, are server-side; see Open questions).
- **Code refs:** `lib/dashboard/side_bar/workspace_widgets.dart:105-512`, `packages/core/lib/src/settings/member_settings.dart:7-103,214-421`,
  `packages/core/lib/src/models/project.dart:7-38`, `packages/core/lib/src/services/workspace_service.dart:93-168`.
- **Old docs:** missing (What's New 3.10.5 mentions "Improved Workspace Experience").
- **Screenshot value:** high — Workspace settings with members and the invite row.

### Accept invitation
- **What it does:** Joins the workspace you were invited to.
- **Where:** The link in the invitation email (`/accept-invitation?invitation=…`); requires sign-in with the
  invited account.
- **Labels:** spinner, then "Invitation accepted!" (or the error), **Ok** → dashboard.
- **How to use:** Open the email link, sign in if asked, click **Ok**.
- **Options:** —
- **Limits and rules:** If the link includes `email=` for another account, you're signed out first.
- **Gating:** none found.
- **Code refs:** `lib/router.dart:304-313`, `lib/invitation_page.dart:23-46`, `packages/core/lib/src/services/workspace_service.dart:163,240`.
- **Old docs:** missing.
- **Screenshot value:** low.

### View Only access (read-only projects)
- **What it does:** A project opened with the View Only role is read-only.
- **Where:** Any project whose role for you is View Only (e.g. workspace members with that role — mapping
  is server-side).
- **Labels:** —
- **How to use:** —
- **Options:** —
- **Limits and rules:** No Save button in the status bar; the designer uses a view-only controller; code
  editor read-only; file context menu limited to "Copy as path" / "View in folder"; Assets import disabled;
  Project Details hides Sharing.
- **Gating:** role-based.
- **Code refs:** `packages/core/lib/src/providers/project_provider.dart:573`, `lib/status_bar.dart:42`,
  `packages/designer/lib/src/design/designer.dart:25`, `packages/core/lib/src/widgets/code_editor/nowa_code_editor.dart:59,181`,
  `lib/project/panels/files_panel/file_context_menu.dart:36-56`, `packages/core/lib/src/settings/project_detail_settings.dart:87`.
- **Old docs:** missing.
- **Screenshot value:** low.

### Notifications (bell) and announcement banners
- **What it does:** In-app news from Nowa (tutorials, updates, tips). Banners appear bottom-right; the bell
  lists notifications.
- **Where:** Bell next to the version in the dashboard sidebar; bell in the editor top bar (next to your
  avatar). Banners float bottom-right on the dashboard and in the editor (inline at the top of the list in
  the mobile shell).
- **Labels:** tooltip "Notifications"; red badge (9+); panel "Notifications", "N new", "No notifications";
  banner label "Announcement", close tooltip "Dismiss announcement", optional action button.
- **How to use:** Click the bell; opening it marks everything read. Click a notification to open its link.
  Dismiss a banner with its close button.
- **Options:** —
- **Limits and rules:** Refreshes every minute. Dismissed banners stay dismissed.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/announcements/announcement_provider.dart:6-84`,
  `packages/nowa_ui/lib/src/components/notification_bell.dart:79,116-128`, `packages/core/lib/src/announcements/widgets/notification_banner.dart:46,76`,
  `packages/core/lib/src/announcements/widgets/notification_action_handler.dart:7-36`, `lib/dashboard/dashboard_page.dart:361-377`,
  `lib/project/banners/nowa_banner_host.dart:5-17`.
- **Old docs:** missing (What's New 3.7 "In-App Notifications").
- **Screenshot value:** medium — bell panel open.

### Invite a Friend (referral)
- **What it does:** Shows your personal invite link; you and your friend both get credits when they sign up
  and verify their email (amount comes from the server — don't state numbers, D3).
- **Where:** Dashboard sidebar → **Invite a Friend** (also offered in the AI chat).
- **Labels:** "Invite a friend, earn credits"; "You'll both get <n> credits when your friend signs up and
  verifies their email."; "Your invite link" + copy (tooltip "Copy link"); progress "<x> of <max> friends
  joined" / "All <max> invites rewarded", "<earned> / <max> credits", "<n> pending email verification";
  error "Could not load your invite link. Please try again."; close (tooltip "Close").
- **How to use:** Copy the link (`https://app.nowa.dev/?ref=<code>`) and share it.
- **Options:** —
- **Limits and rules:** Rewards are capped (cap from the server).
- **Gating:** none found.
- **Code refs:** `packages/ai/lib/src/ui/referral_invite_dialog.dart:9-221`, `packages/ai/lib/src/models/credits_models.dart:117`,
  `packages/nowa_ui/lib/dashboard/dashboard_side_bar.dart:159-179`, `lib/router.dart:160-163`.
- **Old docs:** missing (What's New 3.9 mentions it with a number — not for docs).
- **Screenshot value:** medium.

### Hire an Expert
- **What it does:** Links to booking a consultation with a certified Nowa expert, or applying to become one.
- **Where:** Dashboard sidebar → **Hire an Expert**; support panel → **Hire an Expert**.
- **Labels:** "Hire an Expert", "Get hands-on help from certified Nowa experts.", **Book a Free
  Consultation**, "Become an expert", close (tooltip "Close"). (The dialog also shows an hourly price — omit
  per D3.)
- **How to use:** Click **Book a Free Consultation** (opens a booking page) or "Become an expert" (opens a form).
- **Options:** —
- **Limits and rules:** —
- **Gating:** none found.
- **Code refs:** `packages/nowa_ui/lib/hire_expert_dialog.dart:8-9,58-106`, `packages/nowa_ui/lib/dashboard/dashboard_side_bar.dart:188-195`.
- **Old docs:** missing.
- **Screenshot value:** low.

### Learning Resources
- **What it does:** Opens the documentation site.
- **Where:** Dashboard sidebar → **Learning Resources**.
- **Labels:** "Learning Resources".
- **How to use:** Click it; docs.nowa.dev opens in the browser.
- **Options:** —
- **Limits and rules:** —
- **Gating:** none found.
- **Code refs:** `packages/nowa_ui/lib/dashboard/dashboard_side_bar.dart:197-204`, `lib/dashboard/dashboard_page.dart:197`.
- **Old docs:** `getting-started/install.md` implies an in-app learning resources area — outdated.
- **Screenshot value:** low.

### Download Desktop App → Download Nowa
- **What it does:** Downloads the Nowa desktop app installer.
- **Where:** Dashboard sidebar → **Download Desktop App** (web only); also **Download desktop app** in the New
  project dialog on the web, "Download Desktop App" in some "not available on web" notices, and
  **Download** on the "Version out of date" screen.
- **Labels:** dialog "Download Nowa"; buttons **MacOS**, **Windows**; "Download Nowa version: <version>";
  "No download available at the moment".
- **How to use:** Click **MacOS** (DMG) or **Windows** (installer); install as usual.
- **Options:** —
- **Limits and rules:** No Linux button in 3.12.5 (the code has local-project support on Linux, but there is
  no download link). A button is disabled if the server sends no link for that OS.
- **Gating:** Sidebar button web only. Using the desktop app needs desktop access on your plan (see
  "Desktop app").
- **Code refs:** `packages/core/lib/src/dialogs/download_nowa_dialog.dart:7-79`, `packages/core/lib/src/services/version_service.dart:30-32`,
  `packages/nowa_ui/lib/dashboard/dashboard_side_bar.dart:181-186`.
- **Old docs:** `local-project-simulator/createlocalproject.md` "Downloading Nowa Desktop" — partly
  outdated (button was "Download for Desktop"; now **Download Desktop App** → **Download Nowa** → MacOS /
  Windows).
- **3.13 (dev) changes:** a **Linux** button exists but is hidden (`_showLinuxDownload = false`, "Hidden
  until the Linux build has been tested on real machines.") (`/home/user/nowa/packages/core/lib/src/dialogs/download_nowa_dialog.dart:7-8,79-90`).
- **Screenshot value:** medium.

### Upgrade your plan and the plan badge
- **What it does:** Shows your plan name next to your name and offers an upgrade path.
- **Where:** Dashboard sidebar (badge beside your first name; **Upgrade your plan** highlighted row); in a
  project: **Upgrade** button in the top bar and the plan badge in the avatar menu.
- **Labels:** "Upgrade your plan"; "Upgrade"; badge = your plan name (falls back to "Starter" when the
  account has no subscription; highlighted for paid Stripe plans).
- **How to use:** Click it → Account Settings → **Billing** → **Adjust Plan** ("Plans that grow with you").
  `/plans` opens the same page.
- **Options:** —
- **Limits and rules:** Sidebar offer shows for no subscription, the free plan, the `launch` tier and
  AppSumo plans; the top-bar **Upgrade** only for no subscription / free plan. When the offer is hidden,
  **Invite a Friend** takes the highlighted style.
- **Gating:** Hidden on iOS/Android (`kShowPurchaseUi = !iOS && !Android`).
- **Code refs:** `lib/dashboard/dashboard_mapper.dart:42-53`, `lib/project/top_bar_mapper.dart:109-120`,
  `packages/nowa_ui/lib/dashboard/dashboard_side_bar.dart:146-179,227-233`, `packages/nowa_ui/lib/top_bar/top_bar_view.dart:583-605`,
  `packages/core/lib/src/billing/billing_models.dart:4,44-50`, `lib/router.dart:314-322`.
- **Old docs:** `getting-started/introduction.md` "Plans" — contains plan contents/limits (drop per D3).
- **Screenshot value:** low.

### Dashboard pop-ups (automatic dialogs)
- **What it does:** Dialogs the dashboard may show on load, in this order: update available, onboarding
  survey, feedback rating, a support ticket from an email link, upgrade offer.
- **Where:** Dashboard, on load.
- **Labels:** update: "A new version of Nowa is available" (see "Update prompts"); survey (see above);
  feedback: "How much would you rate Nowa?"; ticket link error: "This support conversation isn't accessible
  with your current account."; upgrade offer: plan cards headed "Unlock more now!".
- **How to use:** —
- **Options:** —
- **Limits and rules:** Update prompt: once per app session, not on iOS/Android. Feedback: from the second
  dashboard visit, 2 minutes after load, until you submit it. Ticket: `/?ticketId=<id>` opens the support
  panel on that ticket. Upgrade offer: 15 minutes after load on the free plan (or no subscription).
- **Gating:** upgrade offer hidden on iOS/Android.
- **Code refs:** `lib/dashboard/dashboard_provider.dart:10-135`, `lib/dashboard/dashboard_page.dart:119-144`,
  `lib/router.dart:179-183`, `packages/core/lib/src/billing/widgets/upgrade_plan_dialog.dart:89`.
- **Old docs:** missing.
- **Screenshot value:** low.

### New project (dialog)
- **What it does:** Creates a blank project from Nowa's starter app (routing, theme, a home page and a
  board). Cloud by default; in the desktop app you can make it a local-only project on disk.
- **Where:** Dashboard → **New project** (left part of the split button), or the arrow → **New project**.
- **Labels:** title "New project", subtitle "Name it and choose where it lives."; label "Project name",
  hint "My awesome app"; collapsible **Advanced** → card "Local-only project" + tag "PRIVATE" + "Stored only
  on this device. No Cloud Build or backups."; when local is ticked: path field (hint "Path", picker title
  "Select project folder") with **Browse**; "Flutter SDK not found" + **Setup flutter SDK** (opens Local
  Setup) if no SDK is configured; on the web: "Local projects are only available in the desktop app." +
  **Download desktop app**; footer help "Your project lives in the cloud — run it on simulators and devices
  anytime." or "Local-only projects stay on this device and can't use cloud features."; **Create project**.
- **How to use:** Cloud: 1. Type a name. 2. **Create project** (or Enter). The editor opens with the new
  project (first-time users get the tour). Local (desktop app): 1. Type a name. 2. Expand **Advanced**,
  click **Local-only project**. 3. Check the folder (prefilled from **Default Projects Path**) or **Browse**.
  4. **Create project**.
- **Options:** Location: cloud (default) / local-only (desktop app).
- **Limits and rules:** Name rules — see "Project names, package name and bundle ID". Path errors: "Path
  cannot be empty", "Path is invalid". Local creation errors: "Folder with this name <name> already exists";
  "Failed to run flutter command. Please ensure that Flutter SDK is correctly set up.". No workspace picker:
  the request carries no workspace (see Open questions). No template choice here (no "start from template"
  on the dashboard in 3.12.5).
- **Gating:** **Advanced** hidden on iOS/Android; local option disabled on the web; local-only = Desktop
  app only.
- **Code refs:** `lib/dashboard/create_new_project/new_project_dialog.dart:39-103,133-139,154-316`,
  `lib/dashboard/create_new_project/creation_dialog_widgets.dart:50-152`, `packages/nowa_ui/lib/dashboard/projects_view.dart:283-350`,
  `packages/core/lib/src/providers/projects_view_provider.dart:80-87,273-276`, `packages/core/lib/src/services/local_project_service.dart:19-44`.
- **Old docs:** `getting-started/install.md` + `quickstart.md` ("yellow New Cloud Project button" → "New
  Cloud Project") — wrong; `local-project-simulator/createlocalproject.md` "Creating your first local
  project" ("New Local Project", "package name is created automatically") — wrong UI path.
- **Screenshot value:** high — dialog with Advanced expanded and Local-only selected (desktop) and the web
  notice.

### Project names, package name and bundle ID (rules and defaults)
- **What it does:** Explains how Nowa validates a project name and derives the Flutter package name and
  bundle ID.
- **Where:** New project, Save your app, AI prompt naming; later editable in Project Details.
- **Labels:** errors "App name cannot be empty", "App name should only contain letters, numbers,
  underscores, hyphens, and spaces", "App name cannot be a reserved keyword".
- **How to use:** —
- **Options:** —
- **Limits and rules:** Allowed characters: letters, digits, `_`, `-`, space; not a Dart reserved word
  (e.g. `class`, `import`). Package name (local projects, cloud imports): lower-cased, spaces → `_`, a
  leading digit is spelled out (`1project` → `one_project`). For local projects the display name (**Project
  Name**) keeps what you typed. Default bundle ID: `com.example.<name without spaces/_/->` + the first 6 characters
  of the project ID. New projects contain `boards/first.board`, `lib/main.dart` with GoRouter routing,
  theme files, app state, `lib/globals/app_constants.dart`, a home page and platform files.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/file_system/naming.dart:176-266`, `packages/core/lib/src/file_system/templates/project_bundles/default_bundles.dart:43-69,85-120`,
  `packages/core/lib/src/services/local_project_service.dart:25-28`.
- **Old docs:** createlocalproject.md "The package name is created automatically" — accurate but thin.
- **Screenshot value:** low.

### Clone from GitHub
- **What it does:** Creates a project from one of your GitHub repositories, cloned to the cloud or (desktop
  app) to a local folder.
- **Where:** Dashboard → arrow on **New project** → **Clone from GitHub**.
- **Labels:** title "Clone from GitHub", subtitle "Pick a repository to import."; workspace chip (default:
  the workspace shown on the dashboard, or **Personal**); repository list with "Search repositories" and
  footer "Can't find your repository? Manage your connected repositories."; label "Project name" (hint
  "my-app", prefilled with the repo name); progress "Cloning <time>"; checkbox **Local-only** (desktop app);
  **Cancel**; **Clone project**; error box with **Fix**.
- **How to use:** 1. (First time) connect GitHub: Settings → Editor Settings → **Git** → "GitHub
  Integration" → **Connect GitHub** (Git researcher). 2. Open **Clone from GitHub**. 3. Pick a repository,
  adjust the name. 4. Optional: choose a workspace, or tick **Local-only**. 5. **Clone project**. The
  project opens when done. Monorepos cloned locally ask which package to open ("Open <name>", "This
  workspace holds several packages. You can switch later.", **Open**).
- **Options:** Workspace (cloud); Local-only (desktop app) — clones into the **Default Projects Path**.
- **Limits and rules:** Errors: "Set a default projects folder in settings to clone locally." (**Fix** opens
  Local Setup); "You need to add your credentials to access the remote repository" and "You don't have access
  to this repository, please check your credentials" (**Fix** opens Git settings). The repository list is
  empty until GitHub is connected (there is no connect button in this dialog).
- **Gating:** Plan — requires the `github` entitlement; otherwise the "Time to level up" upgrade prompt
  appears (`lib/dashboard/dashboard_page.dart:305-312`). Local-only Desktop app only.
- **Code refs:** `lib/dashboard/create_new_project/github_clone_dialog.dart:91-142,192-320`,
  `lib/dashboard/create_new_project/start_project_provider.dart:58-105`, `lib/dashboard/create_new_project/package_picker.dart:107-158`,
  `packages/core/lib/src/settings/github_integration_settings.dart:153-316`, `packages/git_nowa/lib/src/git_service.dart:109-124`.
- **Old docs:** git pages (Git researcher); none in getting-started — missing here.
- **Screenshot value:** high — dialog with repo list.

### Import project
- **What it does:** Brings an existing Flutter project folder (built anywhere, including FlutterFlow
  exports) into Nowa — uploaded as a cloud project, or kept in place as a local-only project. Workspaces /
  monorepos let you pick the package to edit.
- **Where:** Dashboard → arrow on **New project** → **Import project** (desktop app).
- **Labels:** title "Import project", subtitle "Bring an existing Flutter project into Nowa."; workspace chip
  (cloud); "Project folder" + path field (hint "Select the project folder", picker title "Select a project")
  + **Browse**; "Package to open" + package picker (hints "Has boards", "Workspace root", "App", "Library")
  for monorepos; warning "No pubspec.yaml here — Nowa can browse and edit the files, but not design them.";
  **Advanced** → "Local-only project"; footer help "Imported to the cloud — run, share and build from
  anywhere." / "Imported locally — stays on this device, no cloud features." / "Imported locally — git and
  the other packages stay reachable."; **Cancel**; **Import project**.
- **How to use:** 1. **Browse** to the folder (or paste a path and press Enter). 2. If asked, choose the
  package to open. 3. Optional: workspace chip (cloud) or **Advanced → Local-only project**. 4. **Import
  project**; the project opens.
- **Options:** Cloud (default) or local-only; workspace for cloud imports.
- **Limits and rules:** "Choose a project folder first."; "Chosen folder is not a nowa project or a flutter
  project" (needs a `pubspec.yaml`). Monorepos and folders inside a bigger Git repository are forced to
  local-only (the toggle locks). A cloud import uploads only the chosen package. Local imports open the folder
  in place (Nowa doesn't copy it).
- **Gating:** Desktop app only (`NPlatform.isDesktop`).
- **Code refs:** `lib/dashboard/create_new_project/import_project_dialog.dart:30-278`, `lib/dashboard/create_new_project/start_project_provider.dart:23-51`,
  `packages/core/lib/src/services/local_project_service.dart:73-106`, `packages/nowa_ui/lib/dashboard/projects_view.dart:330-335`,
  `packages/core/lib/src/project/owned/package_scan.dart:110-151,168-186`.
- **Old docs:** `local-project-simulator/openexisting.md` ("dropdown next to New Local Project → Open") —
  wrong UI path; missing cloud import and package picker.
- **Screenshot value:** high — Import dialog with package picker.

### Cloud projects vs Local-only projects
- **What it does:** Every project is either **Cloud** (stored in your Nowa account) or **Local** (a normal
  Flutter folder on this computer, listed only in this desktop app).
- **Where:** Chosen in New project / Import project / Clone from GitHub; badges "Cloud" / "Local" in the
  project list; "On this device" section.
- **Labels:** "Cloud", "Local", "LOCAL-ONLY", "Local-only project", "Opted out of the cloud — no Cloud
  Build, sharing or backups.".
- **How to use:** Create a local project from the desktop app (New project → Advanced → Local-only project)
  or turn one into the other with Project Sync / Upload to cloud.
- **Options:** —
- **Limits and rules (from code):**
  - Local projects: desktop app only (macOS/Windows/Linux builds); not on web; listed only under Personal;
    stored on this computer; Delete removes the folder (except projects inside a larger Git repository).
  - Cloud only: **Deploy** button (hidden for local projects), Cloud Build ("Cloud build is not available on
    local projects" + **Sync to cloud**), Share preview ("Share preview is not available on local projects"),
    **Public project** switch, **Move to workspace...**, code download (**Compress Project**), workspaces.
  - Local only: **Upload to cloud**, **Remove from list**, "View in folder" in file menus, **Open in VS Code**
    (code button), Local Git credentials.
  - Both: editing, AI (local and cloud checkpoint stores), Run (cloud projects can also run locally in the
    desktop app — run researcher), Figma.
- **Gating:** as above.
- **Code refs:** `packages/core/lib/src/models/project.dart:108-114,136-138`, `lib/project/run/deploy_button.dart:21`,
  `packages/core/lib/src/settings/deployment_settings.dart:198-210,293-303`, `packages/core/lib/src/cloud_build_v2/ui/cloud_build_v2_settings.dart:72-77`,
  `packages/designer/lib/src/play_mode/play_mode.dart:44-55`, `packages/core/lib/src/settings/sharing_settings.dart:31`,
  `lib/dashboard/dashboard_mapper.dart:66-68`, `lib/project/download_code_button.dart:27-37,146-160`,
  `lib/project/panels/files_panel/file_context_menu.dart:47-55,75-81`, `packages/ai/lib/src/ai_plugin.dart:14-18`,
  `packages/core/lib/src/settings/project_sync_settings.dart:483-541`.
- **Old docs:** `local-project-simulator/whylocalproject.md` — partly outdated (says cloud projects can't
  run on devices; since 3.10 they can); `sync.md` intro — partly outdated.
- **Screenshot value:** medium — list with both badges.

### Desktop app (Nowa Desktop)
- **What it does:** Native app for macOS and Windows; needed for local projects, Import project, Project
  Sync and Local Setup. Updates itself.
- **Where:** Download from the web dashboard (see "Download Desktop App").
- **Labels:** blocked state page: "Upgrade to unlock desktop version, or use on web at app.nowa.dev" (with the
  Billing page embedded), **Logout**, **Refresh**; on iOS/Android builds: "This account doesn't have access to
  this app.".
- **How to use:** Install, sign in (Google or email; Apple isn't available on desktop).
- **Options:** —
- **Limits and rules:** After sign-in the app checks that your plan includes desktop access; if not it shows
  the page above. Auto-update: see "Update prompts". "No Internet Connection" screen when offline.
- **Gating:** Plan — `desktop` entitlement required for every non-web build (macOS, Windows and the native
  mobile app) (`lib/router.dart:76-82`). Which plans include it is not in the code.
- **Code refs:** `lib/router.dart:76-82,323-329`, `lib/upgrade_page.dart:8-71`, `packages/core/lib/src/billing/entitlement_keys.dart:5`.
- **Old docs:** `createlocalproject.md` "Why use Nowa Desktop?" — says "available for all users — no premium
  plan required"; the code gates it by entitlement (needs confirmation, see Open questions).
- **Screenshot value:** low.

### Local Setup (Editor Settings → Local Setup)
- **What it does:** Configures the desktop app's local toolchain: Flutter SDK path, default folder for new
  local projects, VS Code path, and an automatic installer for Flutter and the Android toolchain.
- **Where:** Dashboard → **Settings** → "Editor Settings" → **Local Setup** (page header reads
  "Environment"). Also **Setup flutter SDK** in New project and **Fix** in Clone from GitHub.
- **Labels:** "Automatic setup", "Let Nowa download and configure Flutter and the Android toolchain for
  you.", **Set up automatically** (or **Update Flutter SDK** + "Flutter SDK is outdated"); **Flutter SDK
  Path**, **Default Projects Path**, **VS code Path** (each with **Browse**). Wizard "Set up local
  environment" with steps **Flutter** → **Verify** (→ **Android**): "Download the Flutter SDK (~1 GB) so Nowa
  can build and run your apps.", "Required: Xcode must be installed on macOS before setting up Flutter.",
  "Install location" ("Choose where Nowa installs the tools (about 10 GB). The path must not contain
  spaces."), license notice, flutter doctor results and "Devices", **Re-run checks**, Android toolchain
  (~0.7 GB, optional) and emulator, **Skip for now**, **Done**.
- **How to use:** Click **Set up automatically** and follow the steps, or fill **Flutter SDK Path**
  manually. Set **Default Projects Path** so new local projects and local clones go there.
- **Options:** as listed.
- **Limits and rules:** "Flutter SDK path cannot be empty", "Invalid Flutter SDK path". On the web the tab
  shows "Not available on web". Not shown in the mobile shell's settings.
- **Gating:** Desktop app only.
- **Code refs:** `packages/core/lib/src/settings/editor_settings/local_setup.dart:65-256`,
  `packages/core/lib/src/settings/account_editor_settings/account_editor_settings.dart:32-35`,
  `packages/core/lib/src/environment/environment_setup_dialog.dart:300-320,405-460,536-560,700-800`.
- **Old docs:** `createlocalproject.md` "Setting up Flutter SDK" — mostly accurate (automatic steps match);
  "Settings icon in the bottom-left corner" — outdated path (now dashboard sidebar **Settings** → Local Setup).
- **Screenshot value:** medium — Local Setup page; wizard step 1 (shared with run researcher).

### Project Sync (link a cloud and a local copy)
- **What it does:** Clones a project to the other side (cloud → local folder, or local → cloud) and links the
  two, then lets you push all files one way on demand.
- **Where:** In a project: top-bar **Settings** (gear) → **Project Sync**. From the dashboard: local
  project ⋮ → **Upload to cloud** (dialog titled "Clone Project", or "Project Sync" once linked).
- **Labels:** header "Project Sync" + "Upload your project to the cloud to enjoy features like Cloud Build.";
  unlinked: "Clone this cloud project to your local machine. Your original cloud project will remain
  unchanged and a link will be created between both projects." (path field + **Browse**, **Clone to
  Local**) or "Clone this local project to the cloud. …" ("Select Workspace" dropdown whose first entry is
  "Cloud Projects", **Clone to Cloud**); progress "<stage>, This process may take a few moments."; "Project
  cloned successfully!, opening project...". Linked: two cards "Cloud Project" / "Local Project" with
  "Current", "Open Project", **Sync from Cloud** / **Sync from Local** ("Syncing..."), link icon (tooltip
  "Unlink Project"). Warning dialog "Sync Warning": "This action will overwrite any existing data in the
  destination project. Please ensure that you have backed up any important data before proceeding." +
  **Cancel** / **Proceed with Sync**. Unlink: "Are you sure you want to unlink "<name>"?" … **Unlink
  Project**. Dashboard dialog: **Close**.
- **How to use:** 1. Open Project Sync. 2. Choose the folder (cloud→local) or workspace (local→cloud) and
  clone; the new copy opens. 3. Later, on the card you want to update, click **Sync from …** → **Proceed with
  Sync**.
- **Options:** Target folder or workspace.
- **Limits and rules:** Sync overwrites the destination completely (one direction at a time, manual).
  Errors "Clone already in progress", "Failed to clone project: …", "Failed to load linked projects: …" +
  **Remove link**.
- **Gating:** Desktop app only (hidden on web); not in playground/guest sessions.
- **Code refs:** `packages/core/lib/src/settings/project_sync_settings.dart:10-760`, `packages/core/lib/src/providers/project_sync_provider.dart:40-180`,
  `packages/core/lib/src/settings/project_settings.dart:29`, `lib/dashboard/projects_view/sync_project_dialog.dart:55-70`,
  `lib/dashboard/dashboard_page.dart:158-165`.
- **Old docs:** `local-project-simulator/sync.md` — mostly accurate (labels Clone to Local/Cloud, Proceed
  with Sync, Unlink Project match); missing the dashboard **Upload to cloud** entry; "click Sync" wording
  outdated (buttons are **Sync from Cloud/Local**).
- **Screenshot value:** high — linked state with both cards; Sync Warning.

### Project not found (missing local folder)
- **What it does:** When a local project's folder was moved/renamed/deleted, offers to point Nowa at it again.
- **Where:** Opening a local project whose folder is gone.
- **Labels:** "Project not found", the old path, suggested buttons "Use <folder>", **Back to dashboard**,
  **Remove from projects**, **Locate folder** (picker "Locate <name>"); for cloud projects **Try again**.
- **How to use:** Click a suggestion or **Locate folder** and pick the new folder.
- **Options:** —
- **Limits and rules:** The picked folder must contain `pubspec.yaml`.
- **Gating:** Local projects only (relocation).
- **Code refs:** `lib/project/missing_project_folder.dart:11-133`, `packages/core/lib/src/services/local_project_service.dart:108-157`.
- **Old docs:** missing.
- **Screenshot value:** low.

### Playground (`/playground`)
- **What it does:** The full editor on a throwaway app, no account needed. Your work is kept in this
  browser between visits; **Save** moves it into an account.
- **Where:** `app.nowa.dev/playground`; sign-up page link "Build an app, no account needed".
- **Labels:** top bar: starting-point chip (shows e.g. "Starter app"), **Save** (cloud-upload icon) instead of
  Run/Deploy; app display name "My App".
- **How to use:** 1. Open `/playground`. 2. Design freely. 3. Sending an AI message asks you to sign in (the
  assistant needs an account, not a project). 4. Click **Save** to keep it (see "Save your app").
- **Options:** Starting point (see picker). URL options `?mode=code&preview=play&panel=assistant&file=…`
  open the editor pre-arranged.
- **Limits and rules:** Saved automatically to browser storage on each save; very large playgrounds (encoded
  bundle over ~3 MB) aren't kept. Not available: Run/App Run, Deploy, Git panel, Deployment / Permissions /
  Git / Project Sync settings, Sharing, AI checkpoints.
- **Gating:** none (no auth gate).
- **Code refs:** `lib/router.dart:266-276`, `lib/playground/playground_page.dart:9-35`, `packages/core/lib/src/playground/playground_manager.dart:10-67`,
  `packages/core/lib/src/providers/project_provider.dart:946-960`, `lib/project/top_bar.dart:330-334`,
  `lib/project/side_bar.dart:55-61`, `packages/core/lib/src/settings/project_settings.dart:21-31`,
  `packages/nowa_run/lib/src/nowa_run_plugin.dart:12`, `packages/ai/lib/src/ai_plugin.dart:19-21`,
  `packages/ai/lib/src/chat_session.dart:260-264`, `lib/auth/auth_view.dart:542-549`.
- **Old docs:** missing.
- **Screenshot value:** high — playground editor with the Save button and chip (public, capturable now).

### Starting-point picker (Playgrounds / Templates)
- **What it does:** In the playground or a guest session, switch to another starter app or open a public
  template project.
- **Where:** Top bar chip next to the Nowa logo (playground and guest sessions only).
- **Labels:** group "Playgrounds": **Starter app** ("Routing, theme and a home page"), **Simple app** ("A
  single page, no routing"), **Empty app** ("A blank canvas for the assistant to fill"); group "Templates"
  (public sample projects, showing name and author; "No templates to show"); footer "See all projects"
  (disabled). Discard prompt: "Discard this app?" / "It was never saved to an account, so opening another one
  loses it." / **Cancel** / **Discard**.
- **How to use:** Click the chip, pick a starter or template, confirm **Discard** if you have unsaved work.
- **Options:** —
- **Limits and rules:** The Templates group lists up to five samples that have a source project; opening one
  opens that public project as a guest.
- **Gating:** sandbox sessions only.
- **Code refs:** `lib/sandbox/sandbox_picker.dart:20-117`, `packages/core/lib/src/playground/playground_starter.dart:8-23`,
  `lib/project/top_bar.dart:155-157,294-311`.
- **Old docs:** missing (old "Marketplace" from the dashboard no longer exists).
- **Screenshot value:** high — chip menu open.

### Save / Save to keep changes → Save your app
- **What it does:** Turns a playground or guest session into a cloud project in your account (signing you in
  first), carrying over the AI conversation.
- **Where:** Top bar **Save** in the playground; **Save to keep changes** in a guest session with edits.
- **Labels:** sign-in dialog (the sign-up form in a dialog; Google sign-in may leave the page and return);
  "Save your app", "Keep this app in your Nowa account.", workspace chip (**Personal** first), name field
  (hint "My awesome app"), **Cancel**, **Save**; error "Could not save the project: …".
- **How to use:** 1. Click **Save**. 2. Sign in or create an account if asked (verify the code if new). 3.
  Name the app, pick a workspace, **Save**. 4. The new project opens.
- **Options:** Workspace (Personal default).
- **Limits and rules:** Name follows the app-name rules. Playground saves: the name becomes the app's display
  name and the dashboard name; the Flutter package name stays `my_app`. Guest saves copy the public project on
  the server and replay your changes.
- **Gating:** requires a verified account.
- **Code refs:** `lib/sandbox/sandbox_save.dart:11-131`, `lib/auth/save_prompts.dart:21-233`, `lib/playground/playground_save.dart:10-35`,
  `lib/guest/guest_save.dart:8-50`, `packages/core/lib/src/project/sandbox_session.dart:26,35-58`.
- **Old docs:** missing.
- **Screenshot value:** medium — Save your app dialog.

### Public projects opened as a guest
- **What it does:** A project made public can be opened by anyone with its link (signed in or not, not a
  member). The editor opens on a private in-memory copy; nothing changes the owner's project. **Save to keep
  changes** copies it into your account.
- **Where:** Open `app.nowa.dev/project/<id>` of a public project.
- **Labels:** chip shows the project name; **Save** / **Save to keep changes**.
- **How to use:** Open the link, explore and edit, then **Save to keep changes** → sign in → "Save your app".
- **Options:** Link options set by the owner (see Sharing).
- **Limits and rules:** Edits are lost when you close the tab unless saved. Same unavailable features as the
  playground.
- **Gating:** project must be public (owner's **Public project** switch or Share preview → Public).
- **Code refs:** `lib/router.dart:116-135`, `packages/core/lib/src/models/project.dart:148-162`,
  `packages/core/lib/src/providers/project_provider.dart:962-979`, `packages/core/lib/src/guest/guest_manager.dart:9-32`,
  `lib/project/project_page.dart:53-54,370`.
- **Old docs:** `deployment/share.md` (deprecated page) — partly related; missing the copy/guest behavior.
- **Screenshot value:** medium.

### App Settings (project settings window)
- **What it does:** Project-level settings, inside a project.
- **Where:** In a project, top-bar gear (tooltip "Settings", shortcut ⌘/Ctrl + ,). The top bar then shows a
  back arrow.
- **Labels:** sidebar header "Settings"; group "General": **Project Details**, **Deployment**,
  **Permissions**, **Packages**, **Git**, **Project Sync** (desktop), **Constants** (+ plugin pages); group
  "Integrations": Google Maps, Nowa Mobile Ads, RevenueCat, App Links, Google Sign-In, Stripe (labels from each
  package config — data researcher).
- **How to use:** Click a page in the sidebar.
- **Options:** —
- **Limits and rules:** Playground/guest sessions hide Deployment, Permissions, Git and Project Sync.
- **Gating:** Project Sync desktop app only.
- **Code refs:** `packages/core/lib/src/settings/project_settings.dart:18-98`, `packages/core/lib/src/settings/settings.dart:6,106,118`,
  `packages/nowa_ui/lib/top_bar/top_bar_view.dart:745-760`.
- **Old docs:** various (What's New 3.9 "New settings page").
- **Screenshot value:** medium — the settings sidebar.

### Project Details
- **What it does:** Names, identifiers, version, app icon and a few project tools.
- **Where:** App Settings → **Project Details** (first page).
- **Labels and options:**
  - **Project Name** — "The name of the project as it appears in the Nowa dashboard. It has no effect on the
    app itself." (press Enter to save; check mark on success).
  - **Package Name** (read-only) — "The package name is tied to Flutter which is used for development
    purposes. It is not visible to your end user. This can't be changed".
  - **App Name** — "The name of the app as it appears on the user's device. This is the name that will be
    displayed under the app icon."
  - **Bundle Identifier** — "The unique identifier for the app. …" Error "Invalid package name".
  - "Build info": **Build version** (error "Please enter a valid version name (e.g., 1.3.4)"), **Build
    number** ("Please enter a valid number"); saved to `pubspec.yaml`.
  - "App Icon" — "The app icon is the image that represents your app on the user's device. You can change
    the app icon for each platform or change all at once." Tiles **Change all**, **Android**, **iOS**,
    **Web**, **macOS**; hover "Change Icon".
  - **Shared Preferences** — "Shared preferences are used to store small amounts of data that can be accessed
    across app sessions. You can clear the shared preferences to reset any stored data." **Clear**.
  - **Experimental flags** — **Edit** (see below).
  - Sharing section (see "Sharing").
- **How to use:** Edit a field and press Enter; for the icon, click a tile and pick an image.
- **Limits and rules:** Bundle ID must match `^[a-zA-Z][a-zA-Z0-9]*(\.[a-zA-Z0-9]+)+[0-9a-zA-Z]$` (start with
  a letter, at least two dot-separated parts, letters/digits only). Icon images must be 1024×1024 or smaller
  ("Icon must be 1024x1024 or smaller"); **Change all** also generates Windows icons. There is no splash-screen
  setting and no platform picker in project settings.
- **Gating:** Sharing hidden for View Only members and sandbox sessions.
- **Code refs:** `packages/core/lib/src/settings/project_detail_settings.dart:12-338`, `packages/core/lib/src/settings/app_icon_settings.dart:10-210`,
  `packages/core/lib/src/settings/app_icon_manager.dart:9-35,95-175`, `packages/core/lib/src/fields/nowa_fields.dart:1150-1260`.
- **Old docs:** none found — missing.
- **Screenshot value:** high — Project Details page top half.

### Sharing (Cover and Public project)
- **What it does:** Sets the image shown on your project card and, for cloud projects, makes the project
  public so anyone with the link can open it and save their own copy.
- **Where:** App Settings → Project Details → "Sharing" section.
- **Labels:** "Sharing" — "A public project can be opened by anyone with the link. They edit their own copy of
  it, so your project is never changed by a visitor."; **Cover** — "The image shown wherever the project is
  listed. Taken from your board on every save unless you pick one of your own." (click the preview; tooltips
  "Upload a cover" / "Change the cover"; **Use my board** resets); **Public project** switch — "Anyone with
  the link can open a public project and save their own copy of it, source code included."; when on: link
  field + "Copy link" + "Open in a new tab" + "Link options" (checkboxes **Code mode**, **Preview** (needs Code
  mode), **Assistant**; "Opened file" → file search "Search for a file", entry "Default" — "The file the editor
  would open on its own"). Confirmation dialog "Make this project public?": "Your project becomes open source,
  anyone with the link can read every file and save their own copy of it."; warning "Making the project public
  would expose any API keys, tokens and any other secrets."; checkbox "I checked, there are no secrets in this
  project"; **Cancel** / **Make public**.
- **How to use:** 1. Toggle **Public project**. 2. Tick the checkbox, **Make public**. 3. Copy the link,
  optionally set **Link options** first.
- **Options:** Link options (add `mode=code`, `preview=play`, `panel=Assistant`, `file=…` to the link).
- **Limits and rules:** Errors "Could not change who can open this project: …", "Could not set the cover:
  …". The same public flag is used by Share preview → Public (shipping researcher), so a public preview also
  makes the project openable/copyable.
- **Gating:** Public project Cloud projects only; section hidden for View Only and sandbox sessions.
- **Code refs:** `packages/core/lib/src/settings/sharing_settings.dart:13-501`, `packages/designer/lib/src/play_mode/play_mode.dart:588-611,646,664-745`.
- **Old docs:** `deployment/share.md` — deprecated page; missing the public-project semantics.
- **Screenshot value:** high — Sharing section with public on, and the "Make this project public?" dialog.

### Experimental flags
- **What it does:** Turns on experimental project behaviors; the project restarts to apply.
- **Where:** App Settings → Project Details → **Experimental flags** → **Edit**.
- **Labels:** "EXPERIMENTAL", "Restart the project for changes to take effect."; **load packages** — "Load
  packages from pubspec.yaml file automatically, need to restart the project, this will increase loading times
  when loading the project."; **New UX** — "New UX for handling libraries (library panel) and (debug panel), as
  well as new way to edit classes."; "*Project will be restarted to apply changes."; **Apply** / **Cancel**.
  With New UX on, the top bar shows a "NEW UX" badge.
- **How to use:** Toggle, then **Apply**.
- **Options:** both default off.
- **Limits and rules:** —
- **Gating:** Experimental.
- **Code refs:** `packages/core/lib/src/settings/experimental_flags_dialog.dart:7-108`, `packages/core/lib/src/settings/project_detail_settings.dart:69-84`,
  `lib/project/top_bar_mapper.dart:43-48`.
- **Old docs:** none (What's New 3.7.2 mentions it).
- **Screenshot value:** low.

### Permissions
- **What it does:** Adds or removes iOS and Android permissions in the platform files (Info.plist /
  AndroidManifest), with editable iOS usage descriptions.
- **Where:** App Settings → **Permissions**.
- **Labels:** "iOS:" — Camera, Microphone, Photo Library, Photo Library Add, Location When In Use, Location
  Always, Location Always and When In Use, Speech Recognition, User Tracking; "Android:" — Camera,
  Microphone, Read Storage, Write Storage, Boot Completed, Fine Location, Coarse Location. Each row: name, key
  (e.g. `NSCameraUsageDescription`), switch; enabled iOS rows show the description text field.
- **How to use:** Flip a switch; for iOS, edit the message users see in the permission prompt.
- **Options:** iOS defaults e.g. "Camera permission is required to take photos and videos.".
- **Limits and rules:** Permissions already present in the platform files show as enabled.
- **Gating:** hidden in playground/guest sessions.
- **Code refs:** `packages/core/lib/src/settings/permissions/permission_settings.dart:8-151`, `packages/core/lib/src/services/permissions_service.dart:103-213`.
- **Old docs:** none found — missing.
- **Screenshot value:** medium.

### Constants
- **What it does:** One place for the secret keys used by integrations, plus your own named constants, stored
  in `lib/globals/app_constants.dart`.
- **Where:** App Settings → **Constants**.
- **Labels:** "Constants" — "Manage all Secret keys for your integrations in one place. Changes here are
  reflected in individual integration panels and vice versa."; per-integration sections; "Custom Constants" +
  add (tooltip "Add custom constant"), "No custom constants defined. Click + to add one.", fields "Name" /
  "Value", tooltips "Confirm", "Cancel", "Remove".
- **How to use:** Fill integration keys (Enter to save) or click + to add a custom constant.
- **Options:** —
- **Limits and rules:** Errors from the name check show under the add row.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/settings/constants_settings.dart:9-284`, `packages/core/lib/src/interpreter/packages/package_config/app_constants_service.dart:13`.
- **Old docs:** none found — missing (overlaps data researcher).
- **Screenshot value:** low.

### Project info popup (status bar)
- **What it does:** Shows the project name and lets you copy the project ID (useful for support).
- **Where:** In a project, click the project name at the left of the bottom status bar (next to the version).
- **Labels:** "Project Name:", "Project ID:" chip (click to copy → "Copied").
- **How to use:** Click the name, click the ID chip.
- **Options:** —
- **Limits and rules:** —
- **Gating:** none found.
- **Code refs:** `lib/status_bar.dart:26-29,251-266`, `lib/widgets/project_details_popup.dart:6-120`.
- **Old docs:** missing.
- **Screenshot value:** low.

### Account Settings (window)
- **What it does:** Your account, plan and usage, plus desktop editor settings.
- **Where:** Dashboard sidebar → **Settings**; in a project: avatar → **General Settings**. In the mobile shell
  it opens as a full page "Settings" with only the account tabs.
- **Labels:** sidebar "Account Settings": **Account Details**, **Billing**, **Usage**; "Editor Settings":
  **Local Setup**, **Git**.
- **How to use:** Click a tab.
- **Options:** —
- **Limits and rules:** —
- **Gating:** **Billing** and **Usage** hidden on iOS/Android; Local Setup desktop only (web shows "Not
  available on web"); **Git** needs the `github` entitlement ("Your plan does not support git integration").
- **Code refs:** `packages/core/lib/src/settings/account_editor_settings/account_editor_settings.dart:19-200`,
  `packages/core/lib/src/settings/account_editor_settings/mobile_settings_page.dart:7-110`, `packages/core/lib/src/settings/git_settings.dart:545-588`.
- **Old docs:** missing (What's New 2.x "Account Management").
- **Screenshot value:** high — Account Settings on Account Details.

### Account Details
- **What it does:** Edit your name and photo, see your email, change email/password, delete the account,
  manage connected accounts.
- **Where:** Account Settings → **Account Details**.
- **Labels:** **First Name**, **Last Name** (save on Enter), avatar (click to pick a photo from your files),
  **Email** (read-only) + **Change Email** or "Google SignedIn"; "Password" → **Change Password** / **Set
  Password**; "Delete Account" → **Delete Account**; "Connected Accounts" (Figma). Status line top-right:
  "Updating...", "Profile updated", "Profile picture updated", or the error.
- **How to use:** Edit and press Enter; click buttons to open the sub-pages (back arrow returns).
- **Options:** —
- **Limits and rules:** Empty names aren't saved.
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/settings/account_editor_settings/account_details/account_details.dart:11-100`,
  `packages/core/lib/src/settings/account_editor_settings/account_details/main_info_section.dart:8-171`,
  `packages/core/lib/src/providers/user_provider.dart:167-196`.
- **Old docs:** missing.
- **Screenshot value:** high.

### Change Email
- **What it does:** Changes your sign-in email after verifying the new address with a code.
- **Where:** Account Details → **Change Email** (email accounts only).
- **Labels:** "Change Email"; **New Email** (hint "example@gmail.com"); **Verify Email**; then **OTP Code**
  (hint "XXXXXX") + **Verify OTP**; status "OTP Code Sent on <email>", "Email verified".
- **How to use:** 1. Enter the new email → **Verify Email**. 2. Enter the code from that inbox → **Verify OTP**.
- **Options:** —
- **Limits and rules:** "This field is required".
- **Gating:** hidden for Google sign-ins.
- **Code refs:** `packages/core/lib/src/settings/account_editor_settings/account_details/change_email.dart:36-106`,
  `packages/core/lib/src/providers/user_provider.dart:167-186`.
- **Old docs:** missing.
- **Screenshot value:** low.

### Change Password / Set New Password
- **What it does:** Changes your password, or sets one if your account has none (e.g. Google sign-up).
- **Where:** Account Details → **Change Password** / **Set Password**.
- **Labels:** header "Change Password" / "Set New Password"; **Current Password** (only if you have one),
  **New Password**, **Repeat New Password**; "Forgot your Password? Restore Password"; **Submit**; status
  "Password updated".
- **How to use:** Fill the fields, **Submit**.
- **Options:** —
- **Limits and rules:** "This field is required", "Please make sure the passwords match". (No length check in
  this form; sign-up/reset require 8+.)
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/settings/account_editor_settings/account_details/change_password.dart:30-110`.
- **Old docs:** missing.
- **Screenshot value:** low.

### Delete Account
- **What it does:** Permanently deletes your account after a server check that lists what will be removed.
- **Where:** Account Details → **Delete Account**.
- **Labels:** "Delete Account"; warning "Warning: This action can not be reversed! After deleting your account
  you will lose it permanently."; "Reason for deleting (optional)" (hint "Input..."); "Enter you password"
  (sic; only for accounts with a password); **Cancel** / **Delete Account**. Next page "Account Deletion
  Details": either "You can't delete your account, contact support for more information." + "Reasons:" list,
  or "Are you sure to delete your account ?, if you remove your account you All resources will be deleted
  permanently." + "Resource Deletions:" table (Name, Type) + **Delete Account**. Status "Verify account
  deletion...", "Account deletion verified", "Deleting account...", "Account deleted".
- **How to use:** 1. Optional reason, enter password. 2. **Delete Account**. 3. Review the details page. 4.
  **Delete Account** again; you're signed out.
- **Options:** —
- **Limits and rules:** "Password is required" (password accounts).
- **Gating:** server may block deletion (reasons listed).
- **Code refs:** `packages/core/lib/src/settings/account_editor_settings/account_details/delete_account.dart:10-293`,
  `packages/core/lib/src/providers/user_provider.dart:206-221`.
- **Old docs:** missing.
- **Screenshot value:** low.

### Connected Accounts (Figma)
- **What it does:** Connects or disconnects your Figma account (used by the AI's Figma tools).
- **Where:** Account Details → "Connected Accounts".
- **Labels:** "Figma" (or your Figma name + email), **Connect** / **Disconnect**; confirm "You will need to
  reconnect to Figma if you want to use Figma features again.".
- **How to use:** **Connect** → approve in the browser window. **Disconnect** → confirm.
- **Options:** —
- **Limits and rules:** —
- **Gating:** `FigmaIntegration.enabled` is `true` in 3.12.5 (shown to everyone).
- **Code refs:** `packages/core/lib/src/settings/account_editor_settings/account_details/account_details.dart:89-93`,
  `packages/core/lib/src/figma/figma_settings_section.dart:7-97`, `packages/core/lib/src/figma/figma_oauth_manager.dart:5-7`.
- **Old docs:** missing (What's New 3.12.3 describes it — accurate).
- **Screenshot value:** low.

### Billing
- **What it does:** Shows your current plan, renewal or payment problems, extra AI balance and invoices; leads
  to plan changes.
- **Where:** Account Settings → **Billing** (also **Upgrade your plan**, **Upgrade**, `/plans`).
- **Labels:** plan name + "Your subscription will auto-renew on <date>" or "Your last payment failed. Update
  payment method"; **Adjust Plan** (with a discount tag when offered); "Extra AI Usage" block (see Usage);
  "Invoices" table (Date, Status, Reason, Total, "x of y" paging). **Adjust Plan** page: "Plans that grow with
  you", Monthly/Annual toggle, plan cards (name, "Current", "Free", "/ month", "billed …", included features with
  "Show"/"Hide"), **Subscribe** / **Manage** (opens checkout or the billing portal in the browser). Checkout
  returns to "Payment Successful!" / "Payment Failed" ("You can now close this tab.", desktop **Close Tab**).
- **How to use:** **Adjust Plan** → choose period → **Subscribe** (or **Manage** for your current plan).
- **Options:** Monthly / Annual.
- **Limits and rules:** Plan names, prices and features come from the server — link to nowa.dev/pricing (D3).
- **Gating:** Hidden on iOS/Android.
- **Code refs:** `packages/core/lib/src/billing/widgets/billing_settings_page.dart:8-57`, `packages/core/lib/src/billing/widgets/current_plan_view.dart:9-135`,
  `packages/core/lib/src/billing/widgets/adjust_plan_page.dart:77-200,300-370,470-495`, `packages/core/lib/src/billing/widgets/invoices_settings_page.dart:53-208`,
  `lib/billing_status_page.dart:28-51`, `lib/router.dart:330-344`.
- **Old docs:** `ai/price.md` — contains prices and credit numbers (not allowed, D3).
- **Screenshot value:** medium (blur amounts).

### Usage
- **What it does:** Shows how much of each metered plan feature you've used this period and your extra AI
  balance.
- **Where:** Account Settings → **Usage**.
- **Labels:** "Plan Usage Limits" + plan badge; one row per metered feature with a progress bar, "Resets in
  …", "N% used"; "Extra AI Usage" — "Top up your account to continue using Nowa AI if you hit a limit.",
  "Current balance", **Buy credits**.
- **How to use:** Read the bars; click **Buy credits** to top up.
- **Options:** —
- **Limits and rules:** Feature names and limits come from the server (don't list numbers, D3).
- **Gating:** Hidden on iOS/Android.
- **Code refs:** `packages/core/lib/src/billing/widgets/usage_settings_page.dart:10-317`.
- **Old docs:** `ai/howtouseai.mdx` "Usage & Credits" ("Global Usage") — AI researcher; likely outdated.
- **Screenshot value:** medium.

### Extra AI Usage (buy credits)
- **What it does:** Buys additional AI credits.
- **Where:** Usage or Billing → **Buy credits**.
- **Labels:** "Extra AI Usage", "Need more usage?", preset amount buttons, "Other" ("Let me decide") with
  "Enter custom amount", summary ("Credits", "Discount", "Subtotal"), **Checkout**; locked state: "Your current
  plan doesn't support buying additional credits. Upgrade to a higher tier plan to unlock this feature." +
  **Upgrade Plan**.
- **How to use:** Pick an amount → **Checkout** (opens payment in the browser).
- **Options:** presets / custom.
- **Limits and rules:** amounts/prices not for docs (D3).
- **Gating:** Plan — `top_up_credits` entitlement.
- **Code refs:** `packages/core/lib/src/billing/widgets/buy_credits_page.dart:52-200`.
- **Old docs:** missing.
- **Screenshot value:** low.

### Time to level up (upgrade prompt) and Premium badge
- **What it does:** Appears when you try a plan-gated feature (e.g. Clone from GitHub, code download beyond
  your plan).
- **Where:** Various.
- **Labels:** "Time to level up" — "Looks like you used all your available usage for this feature. Upgrade your
  plan to unlock more power" + **Upgrade** (opens Billing); on iOS/Android "Feature unavailable" / "This feature is
  not available on your account."; inline pill **Premium** ("Unavailable" on iOS/Android).
- **How to use:** **Upgrade** → Billing.
- **Options:** —
- **Limits and rules:** —
- **Gating:** entitlement-based.
- **Code refs:** `packages/core/lib/src/widgets/nowa_dialogs.dart:89-180`.
- **Old docs:** missing.
- **Screenshot value:** low.

### Support panel (the ? icon)
- **What it does:** In-app chat with the Nowa team: ask questions, report issues with an optional project
  snapshot, attach images, follow ticket status.
- **Where:** Floating **?** button bottom-right on the dashboard and in the editor (red badge = unread
  replies). Some error views also open it prefilled ("Report", "Report issue").
- **Labels:** "Hey There", "Let’s help you build a great app!"; "Your tickets" (status "New", "In Progress",
  "Resolving", "Resolved" · age; "Show all N tickets" / "Show fewer"); **Report an issue** ("Let us know if
  something is broken"; disabled with "Open a project to report an issue" outside a project); **Chat with
  support** ("Have a question? We are here to help"); **Documentation**, **YouTube Channel**, **Hire an
  Expert**. Chat view: "Nowa Team Support", "Start a conversation, and our support team will get back to you as
  soon as possible.", checkbox "Include a snapshot of the current project" (new bug reports only, on by default),
  image button, message hint "Type a detailed message...", send.
- **How to use:** Click **?** → **Chat with support** or **Report an issue** → type → send. Click a ticket to
  reopen its thread.
- **Options:** snapshot checkbox; image attachments.
- **Limits and rules:** Local projects upload the snapshot as `snapshot.zip`. Replies are polled every few
  seconds. Email links `/?ticketId=…` open a ticket directly.
- **Gating:** none found.
- **Code refs:** `packages/nowa_ui/lib/support_icon_button.dart:9-42`, `packages/nowa_ui/lib/src/components/nicons.dart:11`,
  `packages/nowa_ui/lib/components/support_dialog.dart:184-206,307-308,340,404,473-540`, `packages/core/lib/src/tickets/ticket_provider.dart:91-113,203,243`,
  `packages/core/lib/src/tickets/ticket_service.dart:76-99`, `packages/core/lib/src/tickets/ticket_models.dart:48-51`,
  `packages/core/lib/src/tickets/widgets/support_panel.dart:76-84`, `lib/project/project_page.dart:137`.
- **Old docs:** missing (What's New refers to "Click the ? icon to chat with us").
- **Screenshot value:** high — panel home view (needs sign-in).

### New-project tour (Welcome to Nowa!)
- **What it does:** A guided tour the first time you open a newly created project.
- **Where:** Opens automatically on a new project if you haven't finished it before (not in the mobile shell).
- **Labels:** "Welcome to Nowa!", "Let's get you building in under a minute.", **Take the quick tour**, **Watch a
  3-min quick guide on YouTube**, **Close**. Tour steps: "The Design Board", "Create Screen", "Widget Palette",
  "AI Agent", "Run your app", "Data Sources", "Screens & Components" — buttons **Skip**, **Back**, **Next** /
  **Got it!**. Then "You're all set!" — "We're here to help! Join our community, reach out at team@nowa.dev, or use
  the Report button if you run into anything." + **Explore more features** (steps "Git", "Project Settings",
  "Themes") / **Start building**; links "Documentation", "YouTube", "Discord Community". (A discount line may
  appear — omit numbers, D3.)
- **How to use:** Follow **Next**; **Skip** or **Close** ends it.
- **Options:** —
- **Limits and rules:** Steps whose target isn't on screen are skipped. Finishing or skipping marks it done for
  your account.
- **Gating:** none found.
- **Code refs:** `lib/project/onboarding/welcome_dialog.dart:13-79`, `lib/project/onboarding/onboarding_step.dart:47-134`,
  `lib/project/onboarding/completion_dialog.dart:18-97`, `lib/project/onboarding/onboarding_tooltip.dart:86-102`,
  `lib/project/onboarding/onboarding_controller.dart:110-116`, `lib/project/project_page.dart:620-630`.
- **Old docs:** missing (What's New 3.6 "Onboarding for New Projects").
- **Screenshot value:** medium — welcome dialog; one tour tooltip.

### Feedback rating ("How much would you rate Nowa?")
- **What it does:** Asks for a star rating and optional comment.
- **Where:** Dashboard, automatically (see Dashboard pop-ups).
- **Labels:** "How much would you rate Nowa?", "Help us improve Nowa by letting us know your experience!", rating
  bar, "Tell us more about it (optional)" (hint "Write something..."), **Cancel**, **Submit Feedback**.
- **How to use:** Pick a rating, optionally write, **Submit Feedback**.
- **Options:** —
- **Limits and rules:** "Please select a rating before submitting.".
- **Gating:** none found.
- **Code refs:** `packages/core/lib/src/dialogs/feedback_dialogs.dart:8-57`, `packages/core/lib/src/dialogs/content_dialogs.dart:23-52`,
  `packages/core/lib/src/dialogs/dialog_controller.dart:88`, `lib/dashboard/dashboard_provider.dart:72-101`.
- **Old docs:** missing.
- **Screenshot value:** low.

### Update prompts and "Version out of date"
- **What it does:** Tells you when a newer Nowa is available; the desktop app downloads and installs it.
- **Where:** Dashboard on load (desktop and web); full-screen when the server requires an update.
- **Labels:** "A new version of Nowa is available", "Current v<x>, new v<y>". Desktop: **Update to v<y>**, "Or
  download manually", **Skip**; "Downloading update..." (percent and size); "Download complete!", "Nowa will close and
  relaunch with the new version.", **Install & Restart**, **Later**; "Installing update...", "The app will restart
  shortly."; "Update failed" + **Retry**, "Download manually instead", **Skip** (friendly error texts). Web:
  **Update** (reloads). Required update: "Version out of date", web "Please clear your browser cache and refresh the
  page to use the newer version" + **Refresh**; desktop "Please download the newer version to continue using Nowa" /
  web "Or download Nowa Desktop for automatic updates" + **Download**.
- **How to use:** Click **Update to v…** then **Install & Restart** (desktop) or **Update** (web).
- **Options:** —
- **Limits and rules:** Not shown on iOS/Android builds.
- **Gating:** none found.
- **Code refs:** `lib/dashboard/overlays/update_overlay.dart:16-259`, `lib/dashboard/overlays/update_overlay_web.dart:7-29`,
  `lib/dashboard/dashboard_provider.dart:30-51`, `lib/update_required_screen.dart:6-74`, `packages/core/lib/src/services/version_service.dart:84-90`.
- **Old docs:** missing.
- **Screenshot value:** low.

### System screens
- **What it does:** Full-page messages for connection and server problems.
- **Where:** Anywhere the app can't reach the server.
- **Labels:** "No Internet Connection" ("Please check your internet connection and try again.", desktop only);
  "We'll Be Right Back" (server error); "Maintenance in Progress" (server message); "Preview Not Available" ("This
  project preview cannot be accessed. It may be private, deleted, or the URL is incorrect. …" + **Sign In**).
- **How to use:** —
- **Options:** —
- **Limits and rules:** —
- **Gating:** none found.
- **Code refs:** `lib/router.dart:87-105,345-417`, `lib/system_error_handler.dart:1-62`.
- **Old docs:** missing.
- **Screenshot value:** low.

### Version label
- **What it does:** Shows the running Nowa version.
- **Where:** Dashboard sidebar next to the logo ("v3.12.5"); editor status bar next to the project name.
- **Labels:** "v<version>".
- **How to use:** —
- **Options:** —
- **Limits and rules:** —
- **Gating:** none found.
- **Code refs:** `packages/nowa_ui/lib/dashboard/dashboard_side_bar.dart:82-88`, `lib/status_bar.dart:29`, `pubspec.yaml:6`.
- **Old docs:** missing.
- **Screenshot value:** low.

### Theme (dark only) and app preferences
- **What it does:** Nowa's own UI uses a single dark theme; there is no light/dark switch or language setting.
  The only stored "preferences" are internal (tour done, feedback state) and per-device (selected workspace, sort).
- **Where:** —
- **Labels:** —
- **How to use:** —
- **Options:** —
- **Limits and rules:** `ThemeProvider` defaults to `darkTheme` and `updateTheme` is never called.
- **Gating:** —
- **Code refs:** `packages/nowa_ui/lib/src/globals/theme_provider.dart:12-24`, `lib/main.dart:112`,
  `packages/core/lib/src/providers/projects_view_provider.dart:253-269`.
- **Old docs:** none.
- **Screenshot value:** none. (Mention in a FAQ line only.)

## Not user-facing (leave out)
| Thing | Code ref | Why (internal / debug / dev-only / hidden flag / unreleased) |
|---|---|---|
| "Learn how Nowa works" / "Start from Scratch" cards under "More ways to start", "Guided Walkthrough" banner | `lib/dashboard/dashboard_page.dart:242,314-344`, `packages/core/lib/src/walkthrough/walkthrough_engine.dart:11`, `packages/core/lib/src/announcements/announcement_provider.dart:27-45` | hidden flag (`WalkthroughEngine.isEnabled = false`) |
| Dashboard debug buttons "Open mock project", "Open public project", "Test prompt to app" | `lib/dashboard/dashboard_page.dart:243,346-358` | debug (`kDebugMode`) |
| Marketplace / sample-app browser (MarketplaceView, SampleAppDetails, AddProjectDialog) | `lib/dashboard/market_place/*` | dead code, not referenced anywhere |
| Learning resources view | `lib/dashboard/learning_resources/learning_resources_view.dart` | dead code |
| Dashboard top banner | `lib/dashboard/projects_view/top_banner.dart` | dead code |
| Old help "?" menu (Tutorials, Documentation, Community, Shortcuts, Report an issue, Share feedback) | `lib/widgets/help_icon.dart` | dead code (replaced by the support panel) |
| Package Name rename on the backend | `packages/core/lib/src/settings/project_detail_settings.dart:152-219` | debug build only |
| MainSettings, PlatformFilesDebugSettings pages | `packages/core/lib/src/settings/project_settings.dart:27-28` | debug only |
| AiAssistantUsageSettings / AiAssistantUsageHistory, CreditsSettings / TopUpCreditsView | `packages/core/lib/src/settings/ai_assistant_usage_settings.dart`, `packages/core/lib/src/settings/credits_settings.dart` | unreferenced (replaced by Billing/Usage) |
| Project-level members UI (AddMemberView, ProjectMemberService invites) | `packages/core/lib/src/settings/member_settings.dart:105-212`, `packages/core/lib/src/services/workspace_service.dart:170` | unreferenced (only accept-invitation uses the service) |
| RequestTemplateDialog | `packages/core/lib/src/dialogs/feedback_dialogs.dart:59-74` | unreferenced |
| "What's New" status-bar button | `lib/status_bar.dart:30-31,290-312` | commented out |
| "FUTURE" top-bar badge | `lib/project/top_bar_mapper.dart:43-48` | internal build channel (`isFuture`) |
| `/redirect-to-playground`, `/redirect-to-project/:id` | `lib/router.dart:418-438` | internal redirects |
| Google Ads attribution params (`gclid` etc.) | `lib/router.dart:164-171` | analytics, internal |
| Welcome-discount text in tour/billing ("40% off", "Expires in 5 days") | `lib/project/onboarding/welcome_dialog.dart:53-77`, `lib/project/onboarding/completion_dialog.dart:38-57` | pricing detail, excluded by D3 (feature itself is user-visible) |
| Linux desktop download | `/home/user/nowa/packages/core/lib/src/dialogs/download_nowa_dialog.dart:7-8` | unreleased (dev only, hidden) |
| Project ID–based mock projects (`/project/mock…`) | `lib/project/project_page.dart:300-301,345-356` | debug only |

## Open questions
- **Workspace of new projects:** The **New project** dialog and the AI prompt flow send no workspace
  (`lib/dashboard/create_new_project/new_project_dialog.dart:84`, `prompt_to_app_page.dart:61`,
  `packages/core/lib/src/models/project.dart:223`), while Import/Clone/Save default to the selected workspace. Do
  dashboard-created projects always land in **Personal** even when a workspace is selected? (Code suggests yes.)
- **Plan gates:** which plans include desktop access (`desktop`), Git/GitHub (`github`), code download
  (`code_download`), buying credits (`top_up_credits`)? Not in the code; docs should link to nowa.dev/pricing.
  Old docs claim "Nowa Desktop is available for all users — no premium plan required" — still true?
- **Free plan name:** the badge shows the server's plan name; "Starter" is only a fallback when there's no
  subscription. What does a free account actually display?
- **Workspace roles in projects:** which project permissions do Editor and View Only members get? The client only
  makes the editor read-only when the project role is View Only; the mapping is server-side.
- **Role menu for non-owners:** `MemberItem` ignores `canEdit`, so non-owners can open "Make …"/"Remove member" on
  role badges (`packages/core/lib/src/settings/member_settings.dart:265-301`). Does the server reject these? Should
  docs say only owners manage members?
- **Seat limits:** an analytics event `seat_limit_reached` exists but no client UI; is there a member/seat limit per
  plan, and what message do users see?
- **Email verification:** the UI asks for a 6-digit code; `/auth/verify-account?token=` also exists. Does the email
  contain both a code and a link?
- **Import without pubspec.yaml:** the dialog warns "Nowa can browse and edit the files, but not design them", but
  import calls `checkIfValidProject`, which throws "Chosen folder is not a nowa project or a flutter project". Can
  such folders be imported at all?
- **Linux desktop app:** local projects support Linux in code (`projects_view_provider.dart:64-65`) and dev hides a
  Linux download; is any Linux build available to users today? (Assume no for 3.12.5.)
- **Native mobile app (Nowa GO):** the desktop entitlement check applies to all non-web builds; does Nowa GO require
  a plan with desktop access? Is Nowa GO publicly available (What's New says private beta)?
- **Clone from GitHub without a GitHub connection:** the repository list renders nothing and the dialog has no
  connect button. Is "Settings → Git → Connect GitHub first" the intended guidance?
- **Playground storage cap:** mention the ~3 MB limit for keeping a playground across reloads, or just say "very
  large playgrounds aren't kept"?
- **Guest sessions and closing the tab:** is there a browser warning before losing unsaved guest edits? (Not found
  in the code reviewed.)
- **Deleting imported local projects:** Delete removes the folder from disk for any local project not found inside
  a *larger* Git repository — including an imported repo whose root is the project folder
  (`packages/core/lib/src/providers/projects_view_provider.dart:278-289`, `local_project_service.dart:88`). Intended?
  Docs should at least warn and recommend **Remove from list**.
- **Account deletion reasons:** which conditions block deletion (e.g. active subscription, workspace ownership)? The
  reasons come from the server.
