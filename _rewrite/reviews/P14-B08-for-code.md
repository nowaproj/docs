# P14-B08 for-code hand-off

Code-only facts moved off the B08 pages (`docs/integrations/...`), grouped by the anchors of
`docs/code/generated-code.md`. Each bullet is copied unchanged from the page named in brackets (it was verified there;
code refs in the earlier writer notes W14 and W17). Relative links in the copied text are relative to the source page.

## #revenuecat

- [revenuecat.md] Turn on **Enabled**. Nowa adds the `purchases_flutter` package.
- [revenuecat.md] Generates `lib/integrations/revenuecat_service.dart` with a `RevenuecatService` class.
- [revenuecat.md] Adds `await RevenuecatService().configureRevenuecat();` to `main()`, so RevenueCat is ready when the app starts.
- [revenuecat.md] Saves your keys as constants in `lib/globals/app_constants.dart`. They also appear under **Constants** (**Settings** → **General**). They're public keys, so shipping them inside the app is expected.
- [revenuecat.md] Makes sure the iOS minimum version is at least 14.0 and switches the Android `MainActivity` to a `FlutterFragmentActivity`.
- [revenuecat.md] If Nowa shows **Add Missing Dependencies**, click **Add**. The paywall also needs the `purchases_ui_flutter` package.
- [revenuecat.md] Besides `configureRevenuecat()`, `RevenuecatService` has two methods:

  | Method | What it does |
  |---|---|
  | `fetchOfferings()` | Returns your RevenueCat offerings, or nothing if the request fails. |
  | `purchasePackage(...)` | Buys a package from an offering. |

- [revenuecat.md] These work with RevenueCat's own types, so for purchase flows beyond the paywall, ask Nowa AI or write the code yourself ([Write your own code](../code/custom-code.md)).
- [revenuecat.md] Turn **Enabled** off to remove the package, `lib/integrations/revenuecat_service.dart` and the `main()` line. Your keys stay in **Constants**. Remove any logic that calls `RevenuecatService`, and any **RevenueCat Paywall** widgets, first.

## #rest-api

- [rest-api/index.md] A collection holds the requests for one API. Nowa saves it as a Dart file, for example `lib/api/cats.api.dart` for a collection named Cats.
- [rest-api/index.md] **Name**: Renames the collection and its file.
- [rest-api/index.md] The **Base URL** and the headers you add, on the collection or on a single request, are written into the collection's Dart file. They ship inside your app, even a token you paste into a header value.
- [rest-api/index.md] If the body has a file field (**MultipartFile**), the right panel also shows **Upload File**. Pick the file to test with. For the test only, Nowa puts its bytes into the request's `Uint8List` or `List<int>` parameters.
- [rest-api/index.md] In **Generated Models**, check the **Name** and the **Path**. Models go in `lib/models` by default. Click **Save**.
- [rest-api/import.md] **Invalid Postman collection format**: Export the collection again as a JSON file. It needs both an `info` and an `item` section.

## #constants

- [constants.md] Behind the scenes, every constant is a text value in the `AppConstants` class in `lib/globals/app_constants.dart`.
- [constants.md] Keys that Nowa writes into your Android, iOS or web project files aren't listed here. Google Maps, AdMob, Deep Links and the Google Sign-In **iOS Client ID** live on their own pages under **Settings** → **Integrations**.

## #admob

- [admob.md] Turn on **Enabled**. Nowa adds the `nowa_mobile_ads` package and `await MobileAds.instance.initialize();` to `main()`.
- [admob.md] Nowa writes the Android App ID into the Android manifest and the iOS App ID into `Info.plist`, together with Google's SKAdNetwork identifiers.
- [admob.md] Turn **Enabled** off to remove the package, your App IDs and the `main()` line. Remove your banners and `loadAndShowInterstitialAd` calls first.

## #google-maps

- [google-maps.md] Turn on **Enabled**. Nowa adds the `google_maps_flutter` package and makes sure the iOS minimum version is at least 14.0.
- [google-maps.md] Nowa puts each key where its platform needs it:

  | Key | Where Nowa writes it |
  |---|---|
  | **Android API Key** | The Android manifest, as the `com.google.android.geo.API_KEY` setting. |
  | **iOS API Key** | The iOS `AppDelegate`, as `GMSServices.provideAPIKey`, with `import GoogleMaps`. |
  | **Web API Key** | A Google Maps script tag in the web `index.html`. |

- [google-maps.md] Turn **Enabled** off to remove the package, your keys and their platform entries.

## #google-sign-in

- [google-sign-in.md] Turn on **Enabled**. Nowa adds the `google_sign_in` package.
- [google-sign-in.md] What Nowa does with each field:

  | Field | Used for | What Nowa does with it |
  |---|---|---|
  | **iOS Client ID** | Required for Google sign-in without Firebase. | Writes it to the iOS `Info.plist` as `GIDClientID` and adds the reversed ID as an iOS URL scheme. |
  | **Web Client ID** | Also used as the server client ID on Android. | Saves it as the constant `AppConstants.webClientId` and lists it under **Constants**. It is not written to any platform file, and Nowa does not pass it to Google for you: your sign-in code reads it. |

- [google-sign-in.md] If you also set a **URL Scheme** under [Deep links](./deep-links.md), check `Info.plist` as described there: both write a URL type to it.
- [google-sign-in.md] Turn **Enabled** off to remove the package and the iOS entries Nowa added. The **Web Client ID** value stays in **Constants**, under **Custom Constants** as `webClientId`.
