"use strict";(self.webpackChunknowa_docs=self.webpackChunknowa_docs||[]).push([[652],{6309:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>o,contentTitle:()=>r,default:()=>b,frontMatter:()=>s,metadata:()=>n,toc:()=>c});var l=t(5893),i=t(1151);const s={sidebar_position:1,title:"Create Global Variables",description:"What are global variables and how to create them inside your app"},r=void 0,n={id:"variables/global_variables/create_global_vars",title:"Create Global Variables",description:"What are global variables and how to create them inside your app",source:"@site/docs/variables/global_variables/create_global_vars.md",sourceDirName:"variables/global_variables",slug:"/variables/global_variables/create_global_vars",permalink:"/variables/global_variables/create_global_vars",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,title:"Create Global Variables",description:"What are global variables and how to create them inside your app"},sidebar:"tutorialSidebar",previous:{title:"Global Variables \ud83c\udf0e",permalink:"/global_variables"},next:{title:"Connect Global Variables to UI",permalink:"/variables/global_variables/connect_global_vars"}},o={},c=[{value:"What Are Global Variables?",id:"what-are-global-variables",level:2},{value:"Characteristics:",id:"characteristics",level:3},{value:"How to Create Global Variables",id:"how-to-create-global-variables",level:2},{value:"Step 1: Creating a Global State",id:"step-1-creating-a-global-state",level:3},{value:"Step 2: Adding Variables to Your Global State",id:"step-2-adding-variables-to-your-global-state",level:3},{value:"Managing Your Global States",id:"managing-your-global-states",level:3},{value:"Practical Use of Global Variables",id:"practical-use-of-global-variables",level:2},{value:"Summary",id:"summary",level:2}];function d(e){const a={h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,i.a)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(a.p,{children:"Global variables are a key feature in Nowa that allows you to share data across the entire app. This guide will walk you through how to set up and utilize global variables, making your app more dynamic and interconnected."}),"\n",(0,l.jsx)(a.h2,{id:"what-are-global-variables",children:"What Are Global Variables?"}),"\n",(0,l.jsx)(a.p,{children:"Global variables are variables that can be accessed and modified from anywhere in your app. Unlike local variables that are confined to a particular screen or component, global variables are accessible app-wide."}),"\n",(0,l.jsx)(a.h3,{id:"characteristics",children:"Characteristics:"}),"\n",(0,l.jsxs)(a.ul,{children:["\n",(0,l.jsxs)(a.li,{children:[(0,l.jsx)(a.strong,{children:"App-Wide Access"}),": These variables can be used and changed on any screen or component throughout the app."]}),"\n",(0,l.jsxs)(a.li,{children:[(0,l.jsx)(a.strong,{children:"Created Outside Screens/Components"}),": They are set up independently of any specific screen or component."]}),"\n",(0,l.jsxs)(a.li,{children:[(0,l.jsx)(a.strong,{children:"Organized in Global States"}),': Global variables are grouped within "Global State" objects, acting as containers for related variables, such as user information (username, profile picture, etc.).']}),"\n"]}),"\n",(0,l.jsx)(a.h2,{id:"how-to-create-global-variables",children:"How to Create Global Variables"}),"\n",(0,l.jsx)(a.p,{children:"Creating global variables involves setting up a Global State and then adding variables to it. Here\u2019s how:"}),"\n",(0,l.jsx)(a.h3,{id:"step-1-creating-a-global-state",children:"Step 1: Creating a Global State"}),"\n",(0,l.jsxs)(a.ol,{children:["\n",(0,l.jsxs)(a.li,{children:[(0,l.jsx)(a.strong,{children:"Start Neutral"}),": Make sure no specific screen or component is selected by clicking on a neutral space."]}),"\n",(0,l.jsxs)(a.li,{children:[(0,l.jsx)(a.strong,{children:"Go to Variables Section"}),': Look for the "Variables" section on the right side of your screen.']}),"\n",(0,l.jsxs)(a.li,{children:[(0,l.jsx)(a.strong,{children:"Initiate Global State"}),": Click on 'create global state'. This is where you'll house your global variables. Name it something indicative of its contents, like \"UserState\" for user-related data."]}),"\n"]}),"\n",(0,l.jsx)(a.h3,{id:"step-2-adding-variables-to-your-global-state",children:"Step 2: Adding Variables to Your Global State"}),"\n",(0,l.jsxs)(a.ol,{children:["\n",(0,l.jsxs)(a.li,{children:[(0,l.jsx)(a.strong,{children:"Add a Variable"}),": Click on the + sign next to your newly created Global State to introduce a new variable."]}),"\n",(0,l.jsxs)(a.li,{children:[(0,l.jsx)(a.strong,{children:"Name Your Variable"}),': Give it a name, for example, "username".']}),"\n",(0,l.jsxs)(a.li,{children:[(0,l.jsx)(a.strong,{children:"Select Variable Type"}),": By default, it's set as a String, but you can change this by clicking on the icon next to the name."]}),"\n",(0,l.jsxs)(a.li,{children:[(0,l.jsx)(a.strong,{children:"Edit Details"}),": Use the editor icon to the right of the variable name to adjust its name, type, or default value."]}),"\n"]}),"\n",(0,l.jsx)(a.p,{children:(0,l.jsx)(a.img,{src:t(7515).Z+"",width:"1200",height:"691"})}),"\n",(0,l.jsx)(a.h3,{id:"managing-your-global-states",children:"Managing Your Global States"}),"\n",(0,l.jsxs)(a.ul,{children:["\n",(0,l.jsxs)(a.li,{children:[(0,l.jsx)(a.strong,{children:"Detaching a Global State"}),': If you need to temporarily remove a global state from your app, you can "Detach" it. This doesn\u2019t delete the global state; it just hides it from the current app view.']}),"\n",(0,l.jsxs)(a.li,{children:[(0,l.jsx)(a.strong,{children:"Reattaching Global States"}),': To bring a global state back into your app, use the "Pick global state" option to select and reattach any previously detached global state.']}),"\n"]}),"\n",(0,l.jsx)(a.h2,{id:"practical-use-of-global-variables",children:"Practical Use of Global Variables"}),"\n",(0,l.jsx)(a.p,{children:"Global variables are incredibly useful for managing data that needs to be consistent or accessible across different parts of your app, like user settings, session data, or any shared configurations."}),"\n",(0,l.jsx)(a.h2,{id:"summary",children:"Summary"}),"\n",(0,l.jsx)(a.p,{children:"Setting up global variables in Nowa is a straightforward process that opens up numerous possibilities for data sharing and management across your app. By organizing these variables into Global States, you ensure that your app remains organized and efficient, facilitating a smoother development process."}),"\n",(0,l.jsx)(a.p,{children:"In the next steps, you will learn how to use the global variables across the app, and even create and use global functions, so let's keep moving ;)"})]})}function b(e={}){const{wrapper:a}={...(0,i.a)(),...e.components};return a?(0,l.jsx)(a,{...e,children:(0,l.jsx)(d,{...e})}):d(e)}},7515:(e,a,t)=>{t.d(a,{Z:()=>l});const l=t.p+"assets/images/global_create_state-a6a87dafa4cb8b2e34593826297b50ad.gif"},1151:(e,a,t)=>{t.d(a,{Z:()=>n,a:()=>r});var l=t(7294);const i={},s=l.createContext(i);function r(e){const a=l.useContext(s);return l.useMemo((function(){return"function"==typeof e?e(a):{...a,...e}}),[a,e])}function n(e){let a;return a=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),l.createElement(s.Provider,{value:a},e.children)}}}]);