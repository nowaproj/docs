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
