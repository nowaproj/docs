"use strict";(self.webpackChunknowa_docs=self.webpackChunknowa_docs||[]).push([[1003],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>w});var o=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=o.createContext({}),u=function(e){var t=o.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=u(e.components);return o.createElement(l.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},f=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),c=u(n),f=r,w=c["".concat(l,".").concat(f)]||c[f]||d[f]||a;return n?o.createElement(w,i(i({ref:t},p),{},{components:n})):o.createElement(w,i({ref:t},p))}));function w(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=f;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[c]="string"==typeof e?e:r,i[1]=s;for(var u=2;u<a;u++)i[u]=n[u];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}f.displayName="MDXCreateElement"},8462:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>d,frontMatter:()=>a,metadata:()=>s,toc:()=>u});var o=n(7462),r=(n(7294),n(3905));const a={sidebar_position:1,title:"News app"},i="How to build a News app with Nowa",s={unversionedId:"use-cases/news_app",id:"use-cases/news_app",title:"News app",description:"In this tutorial you will learn",source:"@site/docs/use-cases/news_app.md",sourceDirName:"use-cases",slug:"/use-cases/news_app",permalink:"/use-cases/news_app",draft:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,title:"News app"},sidebar:"tutorialSidebar",previous:{title:"Real-World examples",permalink:"/use-cases"},next:{title:"Integrations",permalink:"/integrations"}},l={},u=[{value:"If you are a video type of person, watch the full tutotial on Youtube.",id:"if-you-are-a-video-type-of-person-watch-the-full-tutotial-on-youtube",level:3},{value:"In case you like to read it, then go for our article on Medium.",id:"in-case-you-like-to-read-it-then-go-for-our-article-on-medium",level:3}],p={toc:u},c="wrapper";function d(e){let{components:t,...n}=e;return(0,r.kt)(c,(0,o.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"how-to-build-a-news-app-with-nowa"},"How to build a News app with Nowa"),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"In this tutorial you will learn")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"1. How to create API get requests\n2. How to show the data in the UI with a loading indicator\n3. How to create a vertical and horizatnal lists that loads the data from external API\n4. How to use components to design the news tile\n5. How to implement the logic of opening the full details of the news after clicking on one\n")),(0,r.kt)("h3",{id:"if-you-are-a-video-type-of-person-watch-the-full-tutotial-on-youtube"},(0,r.kt)("a",{parentName:"h3",href:"https://www.youtube.com/watch?v=UnnskF9AIi4"},"If you are a video type of person, watch the full tutotial on Youtube"),"."),(0,r.kt)("h3",{id:"in-case-you-like-to-read-it-then-go-for-our-article-on-medium"},(0,r.kt)("a",{parentName:"h3",href:"https://medium.com/@nowa.dev/how-to-build-your-flutter-news-app-without-coding-in-10-minutes-using-nowa-256a014d52de"},"In case you like to read it, then go for our article on Medium"),"."),(0,r.kt)("img",{src:"../../img/gifs/news_app.gif",width:"80%"}),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"If you built a real use-case with Nowa and want to publish it under your name, feel free to contact us on ",(0,r.kt)("inlineCode",{parentName:"p"},"info@nowa.dev")," or use our ",(0,r.kt)("a",{parentName:"p",href:"https://discord.com/invite/ByKfn3H7gX"},"discord server")," or ",(0,r.kt)("a",{parentName:"p",href:"https://instagram.com/nowa.dev"},"Instagram page"),".")))}d.isMDXComponent=!0}}]);