"use strict";(self.webpackChunknowa_docs=self.webpackChunknowa_docs||[]).push([[3621],{7219:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>r,metadata:()=>a,toc:()=>d});var t=i(5893),s=i(1151);const r={sidebar_position:2,title:"Screen properties",description:"Deal with screen settings and add screen-level widgets"},o=void 0,a={id:"ui/screens/screen_properties",title:"Screen properties",description:"Deal with screen settings and add screen-level widgets",source:"@site/docs/ui/screens/screen_properties.md",sourceDirName:"ui/screens",slug:"/ui/screens/screen_properties",permalink:"/ui/screens/screen_properties",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,title:"Screen properties",description:"Deal with screen settings and add screen-level widgets"},sidebar:"tutorialSidebar",previous:{title:"Create a screen",permalink:"/ui/screens/create_screens"},next:{title:"Boards",permalink:"/ui/boards"}},c={},d=[{value:"Accessing Screen Properties",id:"accessing-screen-properties",level:2},{value:"Screen Name and Circuit Logics",id:"screen-name-and-circuit-logics",level:2},{value:"Layout Settings",id:"layout-settings",level:2},{value:"Group and Main Layout Structure",id:"group-and-main-layout-structure",level:2},{value:"Scaffold Settings",id:"scaffold-settings",level:2},{value:"Adding and Modifying Widgets",id:"adding-and-modifying-widgets",level:3},{value:"Adding AppBar example",id:"adding-appbar-example",level:4},{value:"Setting up a Home screen",id:"setting-up-a-home-screen",level:2},{value:"Variables Section",id:"variables-section",level:2}];function l(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h2:"h2",h3:"h3",h4:"h4",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.p,{children:(0,t.jsx)(n.em,{children:"On this page, you will learn:"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"1. Accessing screen properties\n2. Adding and modifying screen-level widgets\n3. Defining the layout for the entire screen\n4. Making a screen the home screen of the app\n5. Adding variables to the screen level\n"})}),"\n",(0,t.jsx)(n.p,{children:"After adding your first screen, you will want to do some setup for the screen before jumping on designing, doing so will make your design process much more efficient. Let's see what screen details you can play around with (here's a hint: eveything \ud83d\ude09)."}),"\n",(0,t.jsx)(n.h2,{id:"accessing-screen-properties",children:"Accessing Screen Properties"}),"\n",(0,t.jsxs)(n.p,{children:["After adding a screen, you should familiarize yourself with the special properties available for screen customization. To access these properties, simply ",(0,t.jsx)(n.strong,{children:"select the screen"})," and the ",(0,t.jsx)(n.strong,{children:"details panel"})," on the right will display them."]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{src:i(5234).Z+"",width:"2880",height:"1692"})}),"\n",(0,t.jsx)(n.h2,{id:"screen-name-and-circuit-logics",children:"Screen Name and Circuit Logics"}),"\n",(0,t.jsxs)(n.p,{children:["At the top of the details panel, you can ",(0,t.jsx)(n.strong,{children:"change the screen name"}),", as well as view ",(0,t.jsx)(n.strong,{children:"all the logic"})," that is implemented in that screen using ",(0,t.jsx)(n.strong,{children:"Circuit"}),". For more information, check out the ",(0,t.jsx)(n.a,{href:"/circuit/circuit_intro",children:"Introduction to Circuit"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"layout-settings",children:"Layout Settings"}),"\n",(0,t.jsxs)(n.p,{children:["In the layout section, you will find the ",(0,t.jsx)(n.strong,{children:"X and Y positions"})," of the screen on the board and the ",(0,t.jsx)(n.strong,{children:"width and height"})," of the screen. By default, the width and height will be set according to the screen device you choose when creating a screen, but you can modify them as needed."]}),"\n",(0,t.jsx)(n.h2,{id:"group-and-main-layout-structure",children:"Group and Main Layout Structure"}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.strong,{children:"Group"})," section that comes next displays the main layout structure of the screen. There are three options:"]}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Stack"})," (default option, identified by the star logo) - Widgets inside the screen have their free positions, with specific X and Y coordinates. You can drag and drop them to the desired location."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Row"})," (\u27a1\ufe0f) - Widgets are ordered next to each other."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Column"})," (\u2b07\ufe0f) - Widgets are ordered above one another."]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["For more details, check out ",(0,t.jsx)(n.a,{href:"/ui/layout/groups",children:"Groups"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"scaffold-settings",children:"Scaffold Settings"}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.strong,{children:"Scaffold"})," section, visible only when selecting a screen, allows you to control screen-level details and widgets, such as:"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Changing screen background color"}),"\n",(0,t.jsx)(n.li,{children:"Adding widgets such as AppBar, floating Action, bottomNavigationBar, and more"}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"adding-and-modifying-widgets",children:"Adding and Modifying Widgets"}),"\n",(0,t.jsxs)(n.p,{children:["To add screen-level widgets, either ",(0,t.jsx)(n.strong,{children:"drag and drop them"})," from the widgets panel like any other widget (they will automatically be placed in the correct location) or ",(0,t.jsx)(n.strong,{children:'click on "null"'})," in the Scaffold section in the details panel beside the widget you want to assign, and then choose the widget from the popup that shows."]}),"\n",(0,t.jsxs)(n.p,{children:["After adding a widget, click on the ",(0,t.jsx)(n.strong,{children:"brush icon"})," next to the widget in the Scaffold section to modify its properties."]}),"\n",(0,t.jsx)(n.p,{children:'To remove a widget, right-click on the widget name next to the brush and choose "reset to default."'}),"\n",(0,t.jsx)(n.p,{children:"The brush icon will also take you to the inner widget properties. For example, when clicking on the brush next to the AppBar widget, you can access AppBar details, where you can change the AppBar background color, add a leading widget, and more."}),"\n",(0,t.jsx)(n.admonition,{type:"tip",children:(0,t.jsx)(n.p,{children:"the brush icon lets you zoom in on that widget and modify its details. For any child widget, you will see this brush next to it in the details panel. Another option to access those child widgets is just by double-clicking on them on the board"})}),"\n",(0,t.jsx)(n.h4,{id:"adding-appbar-example",children:"Adding AppBar example"}),"\n",(0,t.jsxs)(n.p,{children:["In the following example, we added an ",(0,t.jsx)(n.strong,{children:"AppBar"})," widget from the widget panel, then we could access it by double-clicking on the widget itself, or by selecting the screen and then scrolling down to ",(0,t.jsx)(n.strong,{children:"Scaffold"})," section in the ",(0,t.jsx)(n.strong,{children:"details panel"})," and clicking on the ",(0,t.jsx)(n.strong,{children:"brush icon"})," next to the AppBar."]}),"\n",(0,t.jsxs)(n.p,{children:["Afterward, we did change the icon of the 3rd option in the BottomNavBar widget by opening its properties by clicking on the brush icon next to the widget name in ",(0,t.jsx)(n.strong,{children:"scaffold"})," section, and then opening the icon widget details by also clicking on the brush, and then choose another icon."]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{src:i(1946).Z+"",width:"2864",height:"1682"})}),"\n",(0,t.jsx)(n.h2,{id:"setting-up-a-home-screen",children:"Setting up a Home screen"}),"\n",(0,t.jsxs)(n.p,{children:["Set a screen as the ",(0,t.jsx)(n.strong,{children:"home screen"})," in the Scaffold section to make it the main screen when the user opens the app. When pressing play, the app will start from that screen as well."]}),"\n",(0,t.jsx)(n.h2,{id:"variables-section",children:"Variables Section"}),"\n",(0,t.jsxs)(n.p,{children:["In the ",(0,t.jsx)(n.strong,{children:"Variables"})," section of the details panel, which is the last section, you can view and add variables to the screen. These variables can be accessed by any widget or component inside the screen. For more info, check out ",(0,t.jsx)(n.a,{href:"/variables/create_variables",children:"Creating variables"})]})]})}function h(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(l,{...e})}):l(e)}},1946:(e,n,i)=>{i.d(n,{Z:()=>t});const t=i.p+"assets/images/add_appbar-bd1f6264ae826519cd0b2d9d4591d74a.gif"},5234:(e,n,i)=>{i.d(n,{Z:()=>t});const t=i.p+"assets/images/screen_properties-321dd5c6606934b6edf736b88ad7484c.png"},1151:(e,n,i)=>{i.d(n,{Z:()=>a,a:()=>o});var t=i(7294);const s={},r=t.createContext(s);function o(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);