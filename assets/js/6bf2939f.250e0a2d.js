"use strict";(self.webpackChunknowa_docs=self.webpackChunknowa_docs||[]).push([[4854],{3133:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>d,contentTitle:()=>s,default:()=>h,frontMatter:()=>r,metadata:()=>a,toc:()=>l});var i=o(5893),t=o(1151);const r={sidebar_position:3,title:"Deploy to Android",description:"How to deploy your app for Android devices and publish it in the Play store"},s=void 0,a={id:"deployment/android_deploy",title:"Deploy to Android",description:"How to deploy your app for Android devices and publish it in the Play store",source:"@site/docs/deployment/android_deploy.md",sourceDirName:"deployment",slug:"/deployment/android_deploy",permalink:"/deployment/android_deploy",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3,title:"Deploy to Android",description:"How to deploy your app for Android devices and publish it in the Play store"},sidebar:"tutorialSidebar",previous:{title:"Deploy to iOS",permalink:"/deployment/ios_deploy"},next:{title:"Keyboard shortcuts",permalink:"/shortcuts"}},d={},l=[{value:"Understanding the Signing Key",id:"understanding-the-signing-key",level:2},{value:"Using an Existing Key",id:"using-an-existing-key",level:3},{value:"Generating a New Key",id:"generating-a-new-key",level:3},{value:"Building Your App",id:"building-your-app",level:2},{value:"Choosing Between APK and AAB",id:"choosing-between-apk-and-aab",level:2},{value:"Updating Your App",id:"updating-your-app",level:2}];function u(e){const n={admonition:"admonition",code:"code",em:"em",h2:"h2",h3:"h3",img:"img",p:"p",pre:"pre",strong:"strong",...(0,t.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.p,{children:(0,i.jsx)(n.em,{children:"In this guide you will learn:"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"1. How to deploy your app to Android platform\n2. How to sign your app with a new signing key, or by using your existing one\n3. The difference between APK and AAB app formats \n"})}),"\n",(0,i.jsx)(n.p,{children:"After building your fantastic app with Nowa, it's time to bring your creation to the world of Android users. Let's walk you through how to publish your app on Android devices."}),"\n",(0,i.jsx)(n.h2,{id:"understanding-the-signing-key",children:"Understanding the Signing Key"}),"\n",(0,i.jsxs)(n.p,{children:["Before we start, it's important to understand the concept of a ",(0,i.jsx)(n.strong,{children:"signing key"}),"."]}),"\n",(0,i.jsx)(n.p,{children:"When publishing an Android app, you need to digitally sign your app with a private key. This key is unique to you and acts as a fingerprint, ensuring that future updates come from the original author and guarding against unauthorized modifications to your app."}),"\n",(0,i.jsx)(n.p,{children:"This is a crucial security measure in Android app development. You can either use an existing key or generate a new one with Nowa."}),"\n",(0,i.jsx)(n.h3,{id:"using-an-existing-key",children:"Using an Existing Key"}),"\n",(0,i.jsxs)(n.p,{children:["First of all, go to ",(0,i.jsx)(n.strong,{children:"Settings (by clickong on the Settings icon on bottom left) > Android build"}),". You will see two options for submitting the signing key, either by Generating a new one or upload an existing one."]}),"\n",(0,i.jsxs)(n.p,{children:["If you already have a signing key, choose ",(0,i.jsx)(n.strong,{children:"Upload existing key"}),".  Enter the ",(0,i.jsx)(n.strong,{children:"keystore password"}),", the ",(0,i.jsx)(n.strong,{children:"key alias"}),", and the ",(0,i.jsx)(n.strong,{children:"key password"}),", then select ",(0,i.jsx)(n.strong,{children:"Attach a key file"})," to upload your key file. The file should be in either ",(0,i.jsx)(n.code,{children:".jks"})," or ",(0,i.jsx)(n.code,{children:".keystore"})," format."]}),"\n",(0,i.jsx)(n.h3,{id:"generating-a-new-key",children:"Generating a New Key"}),"\n",(0,i.jsxs)(n.p,{children:["If you don't have a key already, choose ",(0,i.jsx)(n.strong,{children:"Generate a key"})," then click on ",(0,i.jsx)(n.strong,{children:"Generate a new key"}),". Nowa will generate a new key with random keystore password, key alias, and key password."]}),"\n",(0,i.jsx)(n.p,{children:"You can then download this key to use it to sign other apps as well. When you click on the download icon to download the signing key, a zip file will be downloaded, which contains the key file itself along with a text file containing the keystore password, key alias, and key password."}),"\n",(0,i.jsxs)(n.admonition,{type:"info",children:[(0,i.jsx)(n.p,{children:"Remember, it's recommended to use a single key to sign all your apps. Always use the same key to release future updates. If you use a new key for an update, the Play Store will reject it."}),(0,i.jsx)(n.p,{children:"Therefore if you didn't have a key before and you just generated one, then download it and use the same key for signing your other Android apps as well"})]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{src:o(6244).Z+"",width:"1600",height:"1002"})}),"\n",(0,i.jsx)(n.h2,{id:"building-your-app",children:"Building Your App"}),"\n",(0,i.jsxs)(n.p,{children:["Once you've selected or generated your key, you're ready to build your app! Click on ",(0,i.jsx)(n.strong,{children:"Build"}),". The process will go through various stages: preparing, fetching, and building."]}),"\n",(0,i.jsx)(n.p,{children:"The time it takes depends on server demand; on average, it's about 6 minutes but may be longer during peak times."}),"\n",(0,i.jsx)(n.p,{children:"After the build completes, you'll see several files. Your app will be provided in two formats: APK and AAB. Click on any of the files to download it."}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{src:o(1488).Z+"",width:"1600",height:"998"})}),"\n",(0,i.jsx)(n.h2,{id:"choosing-between-apk-and-aab",children:"Choosing Between APK and AAB"}),"\n",(0,i.jsx)(n.p,{children:"Here's where you decide how to distribute your app. Both APK and AAB are file formats for Android apps, but they're used in different scenarios."}),"\n",(0,i.jsxs)(n.p,{children:["Use the ",(0,i.jsx)(n.strong,{children:"AAB format"})," if you're submitting your app to the Google Play Store. The Play Store requires this format as it allows Google to optimize the app delivery based on the user's device configuration."]}),"\n",(0,i.jsxs)(n.p,{children:["Use the ",(0,i.jsx)(n.strong,{children:"APK format"})," if you're sending the file directly to a phone for installation, or if you're submitting the app to a store other than the Google Play Store."]}),"\n",(0,i.jsx)(n.h2,{id:"updating-your-app",children:"Updating Your App"}),"\n",(0,i.jsx)(n.p,{children:"So, you've released your app and users are loving it! Now you want to add new features, change the design, or fix bugs. Updating your app with Nowa is a breeze."}),"\n",(0,i.jsxs)(n.p,{children:["First, go to the ",(0,i.jsx)(n.strong,{children:"General"})," tab in the ",(0,i.jsx)(n.strong,{children:"Settings"})," page to update your build version and number."]}),"\n",(0,i.jsx)(n.p,{children:"The version number is what users see as the version of your app , such as 1.0.0 for your first release. For the build number, it is not shown for users but it is used internally by the store itself to distinguish the older versions from the new ones."}),"\n",(0,i.jsx)(n.p,{children:"You can't submit an app to the store with the same build number as an already uploaded version, so it's mandatory to increase the build number with each update, but changing the version number is optional."}),"\n",(0,i.jsx)(n.p,{children:"As a rule of thumb, you always increate the build number by 1 with each release, but for the build version, if you releasing a big update then you increase one of the big digits, like going from 1.5.1 to 2.0.0, but for minor updates you increase one of the small digits, like going from 1.5.1 to 1.5.2 or even not increase the version number at all but just the build number."}),"\n",(0,i.jsxs)(n.p,{children:["After updating the build version and number, head back to the ",(0,i.jsx)(n.strong,{children:"Android Build"})," tab and click on ",(0,i.jsx)(n.strong,{children:"Build"}),". Ensure you're using the same key you used before. If you already generated or uploaded a key to Nowa before, it will be used to build the new version so you don't need to do anything about it."]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Congrats! now you know how to build your app to Android and even submit new updates to your users! Go out and make the world see what you have built \ud83d\udd25 Happy app development!"})})]})}function h(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(u,{...e})}):u(e)}},1488:(e,n,o)=>{o.d(n,{Z:()=>i});const i=o.p+"assets/images/android_afterbuild-5ea60d0d4b5595728a97a5a8ce541fea.png"},6244:(e,n,o)=>{o.d(n,{Z:()=>i});const i=o.p+"assets/images/android_generate_key-89c0666eeb897a6aca9991b4b06eb2d2.png"},1151:(e,n,o)=>{o.d(n,{Z:()=>a,a:()=>s});var i=o(7294);const t={},r=i.createContext(t);function s(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:s(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);