"use strict";(self.webpackChunknowa_docs=self.webpackChunknowa_docs||[]).push([[8618],{3905:(e,t,r)=>{r.d(t,{Zo:()=>d,kt:()=>k});var a=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},i=Object.keys(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var s=a.createContext({}),u=function(e){var t=a.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},d=function(e){var t=u(e.components);return a.createElement(s.Provider,{value:t},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,i=e.originalType,s=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),p=u(r),c=n,k=p["".concat(s,".").concat(c)]||p[c]||m[c]||i;return r?a.createElement(k,l(l({ref:t},d),{},{components:r})):a.createElement(k,l({ref:t},d))}));function k(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=r.length,l=new Array(i);l[0]=c;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o[p]="string"==typeof e?e:n,l[1]=o;for(var u=2;u<i;u++)l[u]=r[u];return a.createElement.apply(null,l)}return a.createElement.apply(null,r)}c.displayName="MDXCreateElement"},319:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>m,frontMatter:()=>i,metadata:()=>o,toc:()=>u});var a=r(7462),n=(r(7294),r(3905));const i={sidebar_position:2,description:"release notes"},l="Release notes",o={unversionedId:"release_notes",id:"release_notes",title:"Release notes",description:"release notes",source:"@site/docs/release_notes.md",sourceDirName:".",slug:"/release_notes",permalink:"/release_notes",draft:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,description:"release notes"},sidebar:"tutorialSidebar",previous:{title:"Intro",permalink:"/"},next:{title:"Getting started",permalink:"/getting_started"}},s={},u=[{value:"v1.1.7",id:"v117",level:2},{value:"New \u2728",id:"new-",level:4},{value:"Fixes \ud83e\ude79",id:"fixes-",level:4},{value:"v1.0.x",id:"v10x",level:2},{value:"New \u2728",id:"new--1",level:4},{value:"Fixes \ud83e\ude79",id:"fixes--1",level:4},{value:"0.3.6",id:"036",level:2},{value:"New \u2728",id:"new--2",level:4},{value:"Fixes",id:"fixes",level:4},{value:"0.3.5",id:"035",level:2},{value:"New \u2728",id:"new--3",level:4},{value:"Fixes",id:"fixes-1",level:4}],d={toc:u},p="wrapper";function m(e){let{components:t,...r}=e;return(0,n.kt)(p,(0,a.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"release-notes"},"Release notes"),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},"Here you will find all released features and bug fixes done for each version ")),(0,n.kt)("hr",null),(0,n.kt)("h2",{id:"v117"},"v1.1.7"),(0,n.kt)("h4",{id:"new-"},"New \u2728"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Markdown widget"),(0,n.kt)("li",{parentName:"ul"},"Webview widget"),(0,n.kt)("li",{parentName:"ul"},"Html Widget"),(0,n.kt)("li",{parentName:"ul"},"Added Desktop version for Mac and Windows"),(0,n.kt)("li",{parentName:"ul"},"Added safe area wrapper"),(0,n.kt)("li",{parentName:"ul"},"Added header to get request"),(0,n.kt)("li",{parentName:"ul"},"Added template preview"),(0,n.kt)("li",{parentName:"ul"},"Ability to change app icon"),(0,n.kt)("li",{parentName:"ul"},"API request response presented in a pretty format")),(0,n.kt)("h4",{id:"fixes-"},"Fixes \ud83e\ude79"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Fix: Parameter names use proper names instead of p0, p1..."),(0,n.kt)("li",{parentName:"ul"},"Fix: Supabase crashing the project"),(0,n.kt)("li",{parentName:"ul"},"Fix: Adding nodes with default values break the code"),(0,n.kt)("li",{parentName:"ul"},"Fix: Drag and drop drawer and FAB into the screen puts it in place"),(0,n.kt)("li",{parentName:"ul"},"Fix: Adding pop up message when importation fails")),(0,n.kt)("h2",{id:"v10x"},"v1.0.x"),(0,n.kt)("h4",{id:"new--1"},"New \u2728"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Adding cut action")),(0,n.kt)("h4",{id:"fixes--1"},"Fixes \ud83e\ude79"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Fix: Undo in files panel"),(0,n.kt)("li",{parentName:"ul"},"Fix: font not saving"),(0,n.kt)("li",{parentName:"ul"},"Fix: reset password issue some password does not work"),(0,n.kt)("li",{parentName:"ul"},"Fix: login issue and making it more secure"),(0,n.kt)("li",{parentName:"ul"},"Fix: Some emails are not valid"),(0,n.kt)("li",{parentName:"ul"},"Fix: Android build produces apk"),(0,n.kt)("li",{parentName:"ul"},"Fix: Building web not working"),(0,n.kt)("li",{parentName:"ul"},"Fix: Download code button not working"),(0,n.kt)("li",{parentName:"ul"},"Fix: Sharing for gives users the same plan as the owner")),(0,n.kt)("h2",{id:"036"},"0.3.6"),(0,n.kt)("h4",{id:"new--2"},"New \u2728"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"New widgets: Bottom navigation bar, Drawer, ListTile, ListView, InkWell, Material"),(0,n.kt)("li",{parentName:"ul"},"Changed the default sizes for new widgets to be more accurate"),(0,n.kt)("li",{parentName:"ul"},"Adding text with the text tool now directly modifies the text"),(0,n.kt)("li",{parentName:"ul"},"Fullscreen mode when simulate"),(0,n.kt)("li",{parentName:"ul"},"Added refresh button to simulate"),(0,n.kt)("li",{parentName:"ul"},"Changed default board color white"),(0,n.kt)("li",{parentName:"ul"},"Added arrows shortcut to move objects on the board")),(0,n.kt)("h4",{id:"fixes"},"Fixes"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Fix: Copying maintains layout"),(0,n.kt)("li",{parentName:"ul"},"Fix: Drag and drop in the outline"),(0,n.kt)("li",{parentName:"ul"},"Fix: Some web images did not work"),(0,n.kt)("li",{parentName:"ul"},"Fix: Problem of the placeholder widget in a group being removed after connecting to a variable"),(0,n.kt)("li",{parentName:"ul"},"Fix: default value of variables not being set to the old data of the details proberty "),(0,n.kt)("li",{parentName:"ul"},"Fix: some undo/redo problems ")),(0,n.kt)("h2",{id:"035"},"0.3.5"),(0,n.kt)("h4",{id:"new--3"},"New \u2728"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Added spacing to row/columns"),(0,n.kt)("li",{parentName:"ul"},"Added ungroup option"),(0,n.kt)("li",{parentName:"ul"},"Added menus on the menu bar"),(0,n.kt)("li",{parentName:"ul"},"Added paste option to the board context menu"),(0,n.kt)("li",{parentName:"ul"},"If the widget is corrupted an error widget will appear on the board"),(0,n.kt)("li",{parentName:"ul"},"Status bar shows if there are unsaved changes or all saved"),(0,n.kt)("li",{parentName:"ul"},"Auto detects spacing & order when converting from stack to column/row")),(0,n.kt)("h4",{id:"fixes-1"},"Fixes"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Fix: Reordering wrappers"),(0,n.kt)("li",{parentName:"ul"},"Fix: Add widget button"),(0,n.kt)("li",{parentName:"ul"},"Fix: Creating a group matches the parent group options"),(0,n.kt)("li",{parentName:"ul"},"Fix: Shortcuts stick"),(0,n.kt)("li",{parentName:"ul"},"Fix: Ability to modify layout for multiple widgets in the same time"),(0,n.kt)("li",{parentName:"ul"},"Fix: Constraints work with drag and drop with all different"),(0,n.kt)("li",{parentName:"ul"},"Fix: resizing one axis doesn't break the layout of the other axis")))}m.isMDXComponent=!0}}]);