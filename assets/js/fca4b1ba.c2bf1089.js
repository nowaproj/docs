"use strict";(self.webpackChunknowa_docs=self.webpackChunknowa_docs||[]).push([[8807],{2232:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var i=a(5893),t=a(1151);const o={sidebar_position:2,title:"Using Variables",description:"Learn how to connect Variables to UI and use them"},r=void 0,s={id:"variables/local_variables/using_vars",title:"Using Variables",description:"Learn how to connect Variables to UI and use them",source:"@site/docs/variables/local_variables/using_vars.md",sourceDirName:"variables/local_variables",slug:"/variables/local_variables/using_vars",permalink:"/variables/local_variables/using_vars",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,title:"Using Variables",description:"Learn how to connect Variables to UI and use them"},sidebar:"tutorialSidebar",previous:{title:"Variables vs Parameters",permalink:"/variables/local_variables/var_vs_param"},next:{title:"Using Parameters",permalink:"/variables/local_variables/using_params"}},c={},l=[{value:"Connecting a Variable to UI",id:"connecting-a-variable-to-ui",level:2},{value:"Steps to Connect a Variable to UI Property:",id:"steps-to-connect-a-variable-to-ui-property",level:3},{value:"Quick Variable Creation and Connection:",id:"quick-variable-creation-and-connection",level:3},{value:"Updating UI Dynamically",id:"updating-ui-dynamically",level:2},{value:"Changing the Variable Value:",id:"changing-the-variable-value",level:3},{value:"Conclusion",id:"conclusion",level:2}];function d(e){const n={admonition:"admonition",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,t.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.p,{children:"After understanding how to create variables in Nowa, let's explore how to effectively utilize them to make your apps interactive and dynamic. Continuing with the example of a meditation app that plays sounds for relaxation, we'll delve into connecting a variable to a UI property and changing its value to update the UI dynamically."}),"\n",(0,i.jsx)(n.h2,{id:"connecting-a-variable-to-ui",children:"Connecting a Variable to UI"}),"\n",(0,i.jsxs)(n.p,{children:["In our meditation app example, we have already created a variable named ",(0,i.jsx)(n.code,{children:"icon"}),". Now, we aim to connect this ",(0,i.jsx)(n.code,{children:"icon"})," variable to the ",(0,i.jsx)(n.code,{children:"icon"})," property of an Icon widget to make our UI interactive."]}),"\n",(0,i.jsx)(n.h3,{id:"steps-to-connect-a-variable-to-ui-property",children:"Steps to Connect a Variable to UI Property:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Select the UI Property"}),": Click on the ",(0,i.jsx)(n.code,{children:"icon"})," property of the Icon widget. A popup will appear listing all available variables."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Choose the Variable"}),': Open the "Local" section to display variables and parameters created within that screen. Select the ',(0,i.jsx)(n.code,{children:"icon"})," variable."]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{src:a(4956).Z+"",width:"1200",height:"691"})}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Ensure Type Compatibility"}),": The variable type must match the property's expected type. In this case, our ",(0,i.jsx)(n.code,{children:"icon"})," variable is of type ",(0,i.jsx)(n.code,{children:"IconData"}),", which is compatible with the Icon widget\u2019s ",(0,i.jsx)(n.code,{children:"icon"})," property."]}),"\n",(0,i.jsxs)(n.admonition,{type:"tip",children:[(0,i.jsx)(n.p,{children:"You can know the type required from each property by hovering over it with the mouse"}),(0,i.jsx)("img",{src:a(3068).Z,width:"350"})]}),"\n",(0,i.jsxs)(n.admonition,{type:"tip",children:[(0,i.jsx)(n.h3,{id:"quick-variable-creation-and-connection",children:"Quick Variable Creation and Connection:"}),(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Fast Track Method"}),': Click directly on the UI property you wish to connect a variable to and select "Create variable". This action creates a variable matching the property\'s required type and connects it automatically. The variable will have a default name (like "var1"), which you can rename in the variables section.']}),"\n"]}),(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{src:a(8251).Z+"",width:"1200",height:"691"})})]}),"\n",(0,i.jsx)(n.h2,{id:"updating-ui-dynamically",children:"Updating UI Dynamically"}),"\n",(0,i.jsx)(n.p,{children:"The purpose of connecting a variable to a UI widget property is to allow dynamic updates to the UI based on changes to the variable's value. This interaction is key to creating a responsive and engaging user interface."}),"\n",(0,i.jsx)(n.h3,{id:"changing-the-variable-value",children:"Changing the Variable Value:"}),"\n",(0,i.jsx)(n.p,{children:"In our app, we want the play icon to change to a pause icon when the user taps it. Here\u2019s how to achieve this:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Add Interaction"}),": Wrap the Icon widget with a ",(0,i.jsx)(n.code,{children:"GestureDetector"})," to detect taps."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Set Up Logic for Tapping"}),': In the "On Tap" logic, use the Circuit editor to add a node for changing the variable\'s value.',"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:'Add a node by clicking "+" in the event of tapping.'}),"\n",(0,i.jsxs)(n.li,{children:['Navigate to the "Locals" category and select our ',(0,i.jsx)(n.code,{children:"icon"}),' variable, then choose "Set" to change its value.']}),"\n",(0,i.jsx)(n.li,{children:"When setting the new value, an icon picker appears. Choose the pause icon."}),"\n",(0,i.jsx)(n.li,{children:'Connect a "Refresh" node to update the screen and reflect the new icon value.'}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.li,{children:"When you run the app and tap on the icon, you'll notice the icon dynamically changes from play to pause. This demonstrates how variables connected to UI properties can significantly enhance interactivity and responsiveness in your Nowa apps."}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{src:a(2132).Z+"",width:"1200",height:"691"})}),"\n",(0,i.jsx)(n.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,i.jsx)(n.p,{children:"By connecting variables to UI properties and adeptly changing their values, you can create highly interactive and dynamic interfaces in your Nowa apps."})]})}function h(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},3068:(e,n,a)=>{a.d(n,{Z:()=>i});const i=a.p+"assets/images/type_hint-29047b992abd02af6be63f8acdeaf354.png"},2132:(e,n,a)=>{a.d(n,{Z:()=>i});const i=a.p+"assets/images/change_var-a1947d9fe8e3d60057725ecb9c09a9b4.gif"},4956:(e,n,a)=>{a.d(n,{Z:()=>i});const i=a.p+"assets/images/connect_var-9ac7fd3a2d0c310b9a702fc022800a99.gif"},8251:(e,n,a)=>{a.d(n,{Z:()=>i});const i=a.p+"assets/images/quick_create_var-d1d900c814f44cb26d6e22361a7af90c.gif"},1151:(e,n,a)=>{a.d(n,{Z:()=>s,a:()=>r});var i=a(7294);const t={},o=i.createContext(t);function r(e){const n=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),i.createElement(o.Provider,{value:n},e.children)}}}]);