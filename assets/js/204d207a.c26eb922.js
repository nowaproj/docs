"use strict";(self.webpackChunknowa_docs=self.webpackChunknowa_docs||[]).push([[5271],{1094:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>p,frontMatter:()=>i,metadata:()=>r,toc:()=>d});var n=a(5893),s=a(1151);const i={sidebar_position:2,title:"Display data from Supabase",description:"How to load a table from Supabase and display it in your app"},o=void 0,r={id:"integrations/supabase/display_data",title:"Display data from Supabase",description:"How to load a table from Supabase and display it in your app",source:"@site/docs/integrations/supabase/display_data.md",sourceDirName:"integrations/supabase",slug:"/integrations/supabase/display_data",permalink:"/integrations/supabase/display_data",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,title:"Display data from Supabase",description:"How to load a table from Supabase and display it in your app"},sidebar:"tutorialSidebar",previous:{title:"Connect Supabase",permalink:"/integrations/supabase/connect_supabase"},next:{title:"Deployment \ud83d\udcf2",permalink:"/deployment"}},l={},d=[{value:"Displaying data from a Supabase table",id:"displaying-data-from-a-supabase-table",level:2}];function c(e){const t={a:"a",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",strong:"strong",...(0,s.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.p,{children:"This section will guide you through the steps to display a list of book titles from a Supabase table on your Nowa screen."}),"\n",(0,n.jsx)(t.h2,{id:"displaying-data-from-a-supabase-table",children:"Displaying data from a Supabase table"}),"\n",(0,n.jsxs)(t.p,{children:["Before starting this process make sure you connected your Nowa project to a Supabase project (check ",(0,n.jsx)(t.a,{href:"/integrations/supabase/connect_supabase",children:"Connect Supabase"}),")."]}),"\n",(0,n.jsx)(t.p,{children:"Step 1: Add a text widget"}),"\n",(0,n.jsxs)(t.ol,{children:["\n",(0,n.jsxs)(t.li,{children:["Click the ",(0,n.jsx)(t.strong,{children:"Widget"})," button in the Nowa toolbar."]}),"\n",(0,n.jsxs)(t.li,{children:["Scroll or search to find the ",(0,n.jsx)(t.strong,{children:"Text Widget"})," and click to add it to your screen."]}),"\n",(0,n.jsx)(t.li,{children:"Insert this widget inside a column (check how to it here: [[Columns and Rows]])"}),"\n"]}),"\n",(0,n.jsxs)(t.p,{children:["Step 2: Add Data Builder\nThe next step is to wrap the column containing the text widget with the ",(0,n.jsx)(t.strong,{children:"Data Builder"})," wrapper."]}),"\n",(0,n.jsxs)(t.ol,{children:["\n",(0,n.jsx)(t.li,{children:"Select the column with the text widget."}),"\n",(0,n.jsxs)(t.li,{children:["Click on the ",(0,n.jsx)(t.strong,{children:"Add Wrapper"})," button in the details panel."]}),"\n",(0,n.jsxs)(t.li,{children:["In the menu that appears, select ",(0,n.jsx)(t.strong,{children:"Data Builder"}),"."]}),"\n"]}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.img,{src:a(920).Z+"",width:"10932",height:"3548"})}),"\n",(0,n.jsxs)(t.p,{children:["Step 3: Configure the Source\nWe need to configure the data builder to fetch data from Supabase..\n2. From the details panel of the wrapper, under the ",(0,n.jsx)(t.strong,{children:"Source"})," property, select ",(0,n.jsx)(t.strong,{children:"Supabase"}),".\n3. In the ",(0,n.jsx)(t.strong,{children:"Table"}),' property that appears, select the table that you want to display from the drop down, in this case "books".']}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.img,{src:a(5701).Z+"",width:"10932",height:"3548"})}),"\n",(0,n.jsx)(t.p,{children:"Step 4: Link the Children to the Data\nNext, we need to link the children of the column to the data variable coming from the data builder."}),"\n",(0,n.jsxs)(t.ol,{children:["\n",(0,n.jsx)(t.li,{children:"Select the column."}),"\n",(0,n.jsxs)(t.li,{children:["Click on the ",(0,n.jsx)(t.strong,{children:"Children"})," property."]}),"\n",(0,n.jsx)(t.li,{children:"In the menu that opens, select the corresponding data variable from the data builder."}),"\n"]}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.img,{src:a(3458).Z+"",width:"10932",height:"5668"})}),"\n",(0,n.jsx)(t.p,{children:"Step 5: Link the Text Property to the Data\nThe last step is to display the book titles from the data builder in the text widget."}),"\n",(0,n.jsxs)(t.ol,{children:["\n",(0,n.jsx)(t.li,{children:"From the outline, select the Text Widget that you added in step 1."}),"\n",(0,n.jsxs)(t.li,{children:["Click on the ",(0,n.jsx)(t.strong,{children:"Text"})," property in the widget's details panel."]}),"\n",(0,n.jsx)(t.li,{children:"In the menu select the data variable corresponding to the book title."}),"\n"]}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.img,{src:a(4781).Z+"",width:"1528",height:"1022"})}),"\n",(0,n.jsx)(t.p,{children:"Congratulations! You've successfully set up your Nowa screen to display a list of book titles from your Supabase data source. Each time you open your screen, the data builder will fetch the most recent list of books from Supabase, ensuring that your data is always up to date."})]})}function p(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(c,{...e})}):c(e)}},4781:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/Screen_Recording_2023-05-28_at_15.41.06-0a548c3d60bbc94fb9fb5fa0a4cf9915.gif"},3458:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/documentationlinkchildrentodata_1-6f1217ea00aa50596a6d91fa127b2875.png"},920:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/supabase_tableadddatabuilder-f272148b7394684354bb690131ed5f6a.png"},5701:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/supabase_tabledatabuilderwidgets-0a583fed311e4f7249fc5ad714cc69af.png"},1151:(e,t,a)=>{a.d(t,{Z:()=>r,a:()=>o});var n=a(7294);const s={},i=n.createContext(s);function o(e){const t=n.useContext(i);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),n.createElement(i.Provider,{value:t},e.children)}}}]);