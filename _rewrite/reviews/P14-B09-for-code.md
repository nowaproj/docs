# P14-B09 for-code: facts moved off the Firebase and Stripe pages

Each bullet is copied unchanged from the page it came from (pages as they were before P14), grouped by the anchor of
`docs/code/generated-code.md` it belongs under. Bullets under "Added (new, verified)" are not moved text: they are new
code-level facts found while rewriting, with their code refs, for the orchestrator to use if wanted.

## #firebase

From `integrations/firebase/connect.md` ("What Nowa adds to your project" table, moved whole):

- | `android/app/google-services.json` and `ios/Runner/GoogleService-Info.plist` | Firebase config for your Android and iOS apps. |
- | `lib/firebase_options.dart` | Connection options for Android, iOS and web. macOS apps use the iOS options. Other platforms get none. |
- | `lib/firebase/firebase.dart` | `FirebaseService`, the class that holds your Firebase functions, such as sign-in. |
- | `lib/firebase/collections.dart` and `lib/firebase/queries.dart` | Your Cloud Firestore collections and queries. They start with no collections and no queries. In Nowa 3.13 the designer has no button for adding either: see [Use Cloud Firestore](firestore.md#add-collections-and-queries). |
- | `lib/main.dart` | A line that starts Firebase when the app launches. |
- | Packages and build files | `firebase_core` and `cloud_firestore` (added even if you only use sign-in), the Android build files updated for Firebase, and an iOS minimum version of at least 15.0 (set by `cloud_firestore`). |

From `integrations/firebase/connect.md` (other sections):

- Note: "Nowa AI can't connect Firebase for you. It can't add `firebase_core`, and points you to **Settings** → **Integrations** → **Firebase** instead, so the configuration is set up correctly."
- Connect your project, P155 paragraph: "Then the Firebase files are gone, `lib/main.dart` points at a missing `firebase_options.dart` and the **Firebase** page asks for your project again."
- Refresh: "Click **Refresh/Update apps and config files**, next to **Project ID**, to download the config files again and rebuild `lib/firebase_options.dart`."
- Disconnect: "**Keep Files** keeps `collections.dart` and `queries.dart` so you can reuse them with another project. Your queries show errors until you connect again."
- Disconnect: "Either way, Nowa removes `FirebaseService`, the config files, the sign-in functions and notification code, the Firebase packages and the start-up line in `main.dart`."

From `integrations/firebase/auth.md`:

- Functions Nowa adds: "Nowa puts the functions in `FirebaseService`, in `lib/firebase/firebase.dart`."
- Table row: "| `signInWithGoogle()` | **Google** | Signs in with a Google account. It opens a popup on web and uses the `google_sign_in` package everywhere else. |"
- "**Google** and **Phone** also add the iOS settings they need, a URL scheme in `Info.plist`."
- Note: "Currently, **Google** writes `signInWithGoogle()` for an older version of the `google_sign_in` package than the 7.x version Nowa installs. If your build reports errors about `GoogleSignIn` in `lib/firebase/firebase.dart`, this is the cause. Turning **Google** off removes the function and the package."
- Turn Authentication off: "Turn off **Authentication** to remove every function in the table above except `sendPasswordResetEmail()`, which stays in `FirebaseService`. Delete it in [code mode](../../code/code-mode.md) if you don't need it. Nowa also switches the providers off and removes the `firebase_auth` package."

From `integrations/firebase/firestore.md`:

- Intro: "In Nowa, your collections and queries are Dart files that Nowa writes for you."
- Before you start: "A project connected to Firebase. See [Connect Firebase](connect.md). Connecting creates the collections and queries files."
- Add collections and queries in Nowa 3.13: "In code mode, open `lib/firebase/collections.dart` or `lib/firebase/queries.dart` from **Files** and edit the Dart code yourself. Then click **Refresh/Update apps and config files** so Nowa's lists match your file."
- Add collections and queries in Nowa 3.13: "To add, set or delete documents, write the function in `lib/firebase/queries.dart` yourself, without `withConverter`. In Nowa 3.13 the builder's `add` and `doc` steps don't work: the step shows as **func** and **Problems** reports an error such as "The function 'add' isn't defined.""
- Define your collections: "In Nowa, each collection is a model with `fromJson` and `toJson` (see [Data models](../../logic/models.md)) that your queries use."
- Define your collections: "Nowa keeps your collections in `lib/firebase/collections.dart`."
- Build a query: "Each query is a function of `FirestoreService`, in `lib/firebase/queries.dart`."

Added (new, verified; not moved text):

- Every class in `lib/firebase/collections.dart` is a collection; a main collection carries `@NowaGenerated({'fbCollectionType': 'fbMainCollection'})` and a sub collection `fbSubCollection` plus `fbParent` (`packages/data/lib/src/firebase/firestore/collections_manager.dart:16-26,70-79`, `packages/data/lib/src/firebase/models/firestore_collection.dart:14-16`). **Select Collection** in the query builder lists main collections only (`packages/data/lib/src/firebase/firestore/queries_builder/ui/lists_widgets.dart:61-63`), so a collection class written by hand (or by Nowa AI) without that metadata doesn't show there.
- **Select Firestore Query** and the Circuit **FIREBASE** category list every function of `FirestoreService` except constructors (`packages/data/lib/src/firebase/firestore/queries_builder/provider/query_builder_manager.dart:24-33`, `packages/data/lib/src/firebase/firebase_field.dart:70-76`, `packages/data/lib/src/firebase/firebase_plugin.dart:133-144`), after **Refresh/Update apps and config files** (P49).
- A collection model's `fromJson`/`toJson` use each field's name as the document key (`packages/core/lib/src/interpreter/generators/json_generator.dart:104`), and a `DateTime` field is read with `DateTime.tryParse` (`:152-157`) and written with `toIso8601String()` (`:230-231`), so it expects text dates, not Firestore `Timestamp` values (code reading, not run).

From `integrations/firebase/notifications.md`:

- Turn on push notifications: "Nowa shows the Xcode reminder under the switch. In the macOS desktop app it also has an **Open Xcode Workspace** link. It opens `ios/Runner.xcworkspace` from the project's folder, so it works for [local projects](../../code/local-projects.md)."
- What Nowa adds: "The `firebase_messaging` and `flutter_local_notifications` packages."
- What Nowa adds: "`lib/firebase/notification_service.dart`, a `NotificationService` that `main()` starts when the app launches."
- Platform table, iOS row: "Add the Push Notifications capability in Xcode, as above. Nowa adds the `fetch` and `remote-notification` background modes. Firebase also needs your Apple push (APNs) credentials, which the [Firebase documentation](https://firebase.google.com/docs/cloud-messaging) explains."
- Platform table, Android row: "Nowa turns on the Android build setting (desugaring) that the notification libraries need."
- Turn push notifications off: "Turn off **Push Notifications (FCM)** to remove `lib/firebase/notification_service.dart` and the two packages."

Added (new, verified; not moved text):

- Nowa writes no `aps-environment` entitlement for push (no match for `aps-environment` in `lib/` or `packages/`); the Push Notifications capability has to be added to the Runner target (Xcode's **Signing & Capabilities**, as the in-app note says, `packages/data/lib/src/firebase/setup/views/notification_settings.dart:98`).
