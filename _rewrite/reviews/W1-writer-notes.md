# W1 writer notes (Home + Get started)

Writer: batch W1 (Sonnet). Code refs are relative to `/home/user/nowa-master` (v3.12.5). Research files: `_rewrite/research/features-*.md`.
Status per page is appended below as each page is saved.

## docs/get-started/first-app.md

Research: features-account-projects "What do you want to build?", "Welcome to Nowa tour"; features-ai "Switch mode", "Instant / Thinking / Deep Thinking", "Your app design is complete / Make it real", "Questions", "Send / Abort", "Restore Checkpoint", "Fix with AI"; features-designer-core "Play (Instant Play)", "Selecting"; features-code-ship "Run button", "Embedded preview", "Share Preview"; features-editor-shell "Save options".

Code checked directly:
- Dashboard prompt box labels, example prompts (50, 3 shown at a time, refresh button tooltip "Refresh prompts"), send tooltip "Build it": `packages/nowa_ui/lib/dashboard/describe_app_panel.dart:35-346,424,468,555-561,593`.
- Defaults Design / Thinking, Design description, link built for prompt-to-app: `lib/dashboard/dashboard_page.dart:48-51,209-232`.
- "Start here" badge is shown in the open mode menu next to Design (not on the chip): `packages/nowa_ui/lib/src/components/option_chip.dart:100-190`.
- Loading texts "Setting things up…", "Naming your app…", "Creating your project…"; project always created as a cloud project; prompt sent after load and Assistant panel opened: `lib/dashboard/create_new_project/prompt_to_app_page.dart:46-95`, `lib/project/project_page.dart:186,203-232`.
- Welcome dialog "Welcome to Nowa!" / "Take the quick tour" / "Close" shown 800 ms after a new project loads when the tour was never finished: `lib/project/onboarding/welcome_dialog.dart`, `lib/project/onboarding/onboarding_overlay.dart:48-53`, `lib/project/project_page.dart:625-629,652`.
- Make it real card texts ("Your app design is complete", "Pick what to make work first:", "Make it real", "Switched to Agent mode"): `packages/ai/lib/src/ui/guided_inline_views.dart:36-128`.
- Run toolbar labels: **Back to board**, **Hot Restart** (cloud), **Open on Mobile** (cloud, QR icon, enabled only when the app is ready): `lib/project/top_bar_mapper.dart:127-146`, `packages/nowa_ui/lib/top_bar/top_bar_view.dart:765-865`. Save-triggered restart: `packages/nowa_run/lib/src/nowa_run_manager.dart:150-170` (comment).
- Floating Details/Variables hidden below 600 px board width: `packages/designer/lib/src/designer_setup.dart:166-175`. Mobile shell below 840 px: `packages/nowa_ui/lib/src/globals/responsive_utils.dart:40-68`.

Assumptions / open questions:
- "About 15 minutes" is an editorial estimate (pages.md asks to state the time); it is not from code. The AI build time is not known. Adjust after a real walkthrough (the capture run could time it).
- The example prompt (habit tracker) is mine; it is only an example and no output is promised.
- "Public" warning text is a paraphrase of the app's own dialog ("Your project becomes open source, anyone with the link can read every file and save their own copy of it." / "Making the project public would expose any API keys, tokens and any other secrets."): `packages/designer/lib/src/play_mode/play_mode.dart:588-611`.
- Step 6 says the preview restarts when you save after going back to the board; per research ("updating every time you save") and the manager comment, but not tested in the product.
- Not covered on purpose: Approval Required cards (connectors only), Plan mode details (link to modes page), Deploy (linked in next steps).

## docs/get-started/welcome.md

Research: `research/positioning.md` §1, §3, §5 (one-liner, audience, vocabulary); `glossary.md` (terms); features-account-projects "Desktop app", "Import project", "Playground"; features-code-ship "Deploy button and menu", "Run on devices and emulators"; features-editor-shell "Mobile layout".

Code checked directly:
- Paid-plan gating strings for web and mobile deploy: `lib/project/run/deploy_button.dart:188,287,302` ("Publishing to a live web URL is available on paid plans." / "Mobile deployment is available on paid plans.").
- Import project is desktop-only: `lib/dashboard/create_new_project/import_project_dialog.dart` (research `NPlatform.isDesktop`).

Assumptions / open questions:
- "Desktop: run your app on desktop targets from the desktop app" rests on the research line "desktop targets via your Flutter SDK" (features-code-ship "Run on devices and emulators") and the in-app tour text "run it locally on iOS, Android, Chrome, macOS and more" (`lib/project/onboarding/onboarding_step.dart:~95`). No claim about publishing desktop installers (macOS deploy tab is debug-only).
- Did not name the AI model, plan names or prices (D3).
- "No Flutter knowledge needed" is the positioning from BRIEF.md and nowa.dev, not a code fact.

## docs/get-started/create-account.md

Research: features-account-projects "Create your account", "Welcome back!", "Continue with Google", "Continue with Apple", "Confirm your email", "Reset your password", "Onboarding survey", "Logout".

Code checked directly:
- Sign-in and sign-up labels and hints, errors, footer links: `lib/auth/auth_view.dart:286-351,446-549,602-653`.
- 6-digit code step ("Confirm your email", auto-verify on 6th digit via `onCompleted`, **Verify**, "Resend the code" → "Sent!", "Log out"): `lib/auth/auth_view.dart:745-806`.
- Reset flow ("Set a new password", **New password**, **Repeat new password**, **Reset password**, "Password changed", "Invalid link"): `lib/auth/reset_password_page.dart:46-100`.
- Survey ("Question N of 4", five/six options, follow-up for Other/Yes, not dismissible, shown while `user.didSurvey` is false): `lib/dashboard/overlays/survey_overlay.dart:31-77,183`, `lib/dashboard/dashboard_provider.dart:53-70`.
- Playground link on the sign-up page ("Want to look around first?" / "Build an app, no account needed"): `lib/auth/auth_view.dart:542-549`.
- Apple sign-in only on web and iOS: research `lib/auth/auth_widgets.dart:512-539` (`kAppleSignInSupported`).

Left out / open questions:
- AppSumo link (`/auth/appsumo`) is a partner link; not documented. Referral `?ref=` code not documented.
- Whether Google accounts must also confirm an email code is not visible in the client; the page says nothing about it.
- Whether the verification email contains a link as well as the code is unknown (research open question); the page only says "6-digit code".
- The survey is shown on first dashboard load for accounts that have not answered; after email sign-up it follows the code step. The page describes both as "the first time you reach the dashboard".
