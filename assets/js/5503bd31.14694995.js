"use strict";(self.webpackChunknowa_docs=self.webpackChunknowa_docs||[]).push([[5231],{6138:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>s,metadata:()=>r,toc:()=>l});var n=a(5893),i=a(1151);const s={sidebar_position:3,title:"Create Objects",description:"How to create objects and use them to encapsulate data"},o="Create Objects",r={id:"variables/create_objects",title:"Create Objects",description:"How to create objects and use them to encapsulate data",source:"@site/docs/variables/create_objects.md",sourceDirName:"variables",slug:"/variables/create_objects",permalink:"/variables/create_objects",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3,title:"Create Objects",description:"How to create objects and use them to encapsulate data"},sidebar:"tutorialSidebar",previous:{title:"Use Global Functions",permalink:"/variables/global_variables/use_global_func"},next:{title:"Create and display Lists",permalink:"/variables/lists"}},c={},l=[{value:"Understanding Objects:",id:"understanding-objects",level:2},{value:"Creating an Object:",id:"creating-an-object",level:2},{value:"Working with Objects in Circuits:",id:"working-with-objects-in-circuits",level:2},{value:"Example - To-Do List App:",id:"example---to-do-list-app",level:2}];function d(e){const t={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",...(0,i.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h1,{id:"create-objects",children:"Create Objects"}),"\n",(0,n.jsx)(t.p,{children:"On this page, you will learn:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{children:"1. What are objects\n2. How to create objects\n3. Use cases for needing to use objects\n"})}),"\n",(0,n.jsx)(t.p,{children:"Objects play a crucial role in organizing and managing your data interaction inside your app. Let's see how to create them, use them, and see their practical application in some app scenarios."}),"\n",(0,n.jsx)(t.h2,{id:"understanding-objects",children:"Understanding Objects:"}),"\n",(0,n.jsx)(t.p,{children:"Objects in Nowa can be thought of as envelopes that hold data under a single name. For example, a news object is an envelope that holds data related to a news item such as the title, date, image link, and content."}),"\n",(0,n.jsx)(t.p,{children:"This makes it much easier to group your data into a single object and pass it between screens in your app or between your app and an API."}),"\n",(0,n.jsx)(t.p,{children:"After creating an object, you can add data to it, and the receiver can then extract the required data from that object."}),"\n",(0,n.jsx)(t.admonition,{type:"info",children:(0,n.jsx)(t.p,{children:"Check the example below for a To-Do list app to see exactly how creating objects is done"})}),"\n",(0,n.jsx)(t.h2,{id:"creating-an-object",children:"Creating an Object:"}),"\n",(0,n.jsxs)(t.ol,{children:["\n",(0,n.jsx)(t.li,{children:"Navigate to the Files section in Nowa."}),"\n",(0,n.jsx)(t.li,{children:"Click on 'Add', then select 'New Object'."}),"\n",(0,n.jsx)(t.li,{children:"Enter a name for the object."}),"\n",(0,n.jsxs)(t.li,{children:["Define variables inside that object, which will define the structure for that object from now on. (Check out ",(0,n.jsx)(t.a,{href:"/variables/local_variables/var_vs_param",children:"Crating Variables"})," for more information)."]}),"\n",(0,n.jsx)(t.li,{children:"Now, you have created an object blueprint with its variables inside. Now when you create an instance from that object, it will have this pre-defined structure (the names and types of variables inside it)"}),"\n"]}),"\n",(0,n.jsx)(t.h2,{id:"working-with-objects-in-circuits",children:"Working with Objects in Circuits:"}),"\n",(0,n.jsx)(t.p,{children:"In Nowa's circuits, you can do operations on objects, such as creating instances, filling them with data, and passing them between screens or sending them via APIs. You can also add an instance of an object to a list of that object."}),"\n",(0,n.jsx)(t.h2,{id:"example---to-do-list-app",children:"Example - To-Do List App:"}),"\n",(0,n.jsx)(t.p,{children:'Consider creating a simple to-do list app where each task is an instance from an object called "task" with two variables: a string to hold the task name called "name" and a boolean to indicate if the task is completed or not called "isdone".'}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.img,{src:a(2387).Z+"",width:"2864",height:"1682"})}),"\n",(0,n.jsx)(t.p,{children:"The logic will be as follows:"}),"\n",(0,n.jsxs)(t.ol,{children:["\n",(0,n.jsxs)(t.li,{children:["When the user clicks on the 'Add Task' button, a new instance of the 'task' object is created with the text from the input field and a default value of ",(0,n.jsx)(t.code,{children:"false"}),' for the variable "isdone" .']}),"\n",(0,n.jsxs)(t.li,{children:["The new task object is then added to a list of tasks and the main screen UI will be updated with the recent tasks that will be displayed in a horizontal group(Raw). Check ",(0,n.jsx)(t.a,{href:"/ui/layout/groups",children:"Groups"})," for more details."]}),"\n",(0,n.jsx)(t.li,{children:"As users add more tasks, the list of task objects grows, making it easy to manage and display the tasks within the app. The user can also add logic to a button inside each task to remove that task from the list."}),"\n"]}),"\n",(0,n.jsx)(t.p,{children:"In summary, objects in Nowa are a powerful way to organize and manage data within your app, enabling seamless interaction between screens and external APIs. By understanding how to create and work with objects, you can build a powerful structure that scales smoothly and make it easy to build advanced functionalities and organize the flow of data inside the app."})]})}function h(e={}){const{wrapper:t}={...(0,i.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},2387:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/create_object-87ee6e3cfa80a9856ce3d9c6f7da2728.gif"},1151:(e,t,a)=>{a.d(t,{Z:()=>r,a:()=>o});var n=a(7294);const i={},s=n.createContext(i);function o(e){const t=n.useContext(s);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),n.createElement(s.Provider,{value:t},e.children)}}}]);