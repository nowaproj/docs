"use strict";(self.webpackChunknowa_docs=self.webpackChunknowa_docs||[]).push([[271],{3905:(e,t,a)=>{a.d(t,{Zo:()=>d,kt:()=>h});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=n.createContext({}),p=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},d=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},u="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},b=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),u=p(a),b=r,h=u["".concat(s,".").concat(b)]||u[b]||c[b]||o;return a?n.createElement(h,i(i({ref:t},d),{},{components:a})):n.createElement(h,i({ref:t},d))}));function h(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=a.length,i=new Array(o);i[0]=b;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[u]="string"==typeof e?e:r,i[1]=l;for(var p=2;p<o;p++)i[p]=a[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}b.displayName="MDXCreateElement"},804:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>c,frontMatter:()=>o,metadata:()=>l,toc:()=>p});var n=a(7462),r=(a(7294),a(3905));const o={sidebar_position:2,title:"Display data from Supabase",description:"How to load a table from Supabase and display it in your app"},i=void 0,l={unversionedId:"integrations/supabase/display_data",id:"integrations/supabase/display_data",title:"Display data from Supabase",description:"How to load a table from Supabase and display it in your app",source:"@site/docs/integrations/supabase/display_data.md",sourceDirName:"integrations/supabase",slug:"/integrations/supabase/display_data",permalink:"/integrations/supabase/display_data",draft:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,title:"Display data from Supabase",description:"How to load a table from Supabase and display it in your app"},sidebar:"tutorialSidebar",previous:{title:"Connect Supabase",permalink:"/integrations/supabase/connect_supabase"}},s={},p=[{value:"Displaying data from a Supabase table",id:"displaying-data-from-a-supabase-table",level:2}],d={toc:p},u="wrapper";function c(e){let{components:t,...o}=e;return(0,r.kt)(u,(0,n.Z)({},d,o,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"This section will guide you through the steps to display a list of book titles from a Supabase table on your Nowa screen."),(0,r.kt)("h2",{id:"displaying-data-from-a-supabase-table"},"Displaying data from a Supabase table"),(0,r.kt)("p",null,"Before starting this process make sure you connected your Nowa project to a Supabase project (check [","[Connect Supabase]","])."),(0,r.kt)("p",null,"Step 1: Add a text widget"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Click the ",(0,r.kt)("strong",{parentName:"li"},"Widget")," button in the Nowa toolbar."),(0,r.kt)("li",{parentName:"ol"},"Scroll or search to find the ",(0,r.kt)("strong",{parentName:"li"},"Text Widget")," and click to add it to your screen."),(0,r.kt)("li",{parentName:"ol"},"Insert this widget inside a column (check how to it here: [","[Columns and Rows]","])")),(0,r.kt)("p",null,"Step 2: Add Data Builder\nThe next step is to wrap the column containing the text widget with the ",(0,r.kt)("strong",{parentName:"p"},"Data Builder")," wrapper."),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Select the column with the text widget."),(0,r.kt)("li",{parentName:"ol"},"Click on the ",(0,r.kt)("strong",{parentName:"li"},"Add Wrapper")," button in the details panel."),(0,r.kt)("li",{parentName:"ol"},"In the menu that appears, select ",(0,r.kt)("strong",{parentName:"li"},"Data Builder"),".")),(0,r.kt)("p",null,(0,r.kt)("img",{src:a(920).Z,width:"10932",height:"3548"})),(0,r.kt)("p",null,"Step 3: Configure the Source\nWe need to configure the data builder to fetch data from Supabase..\n2. From the details panel of the wrapper, under the ",(0,r.kt)("strong",{parentName:"p"},"Source")," property, select ",(0,r.kt)("strong",{parentName:"p"},"Supabase"),".\n3. In the ",(0,r.kt)("strong",{parentName:"p"},"Table"),' property that appears, select the table that you want to display from the drop down, in this case "books".'),(0,r.kt)("p",null,(0,r.kt)("img",{src:a(5701).Z,width:"10932",height:"3548"})),(0,r.kt)("p",null,"Step 4: Link the Children to the Data\nNext, we need to link the children of the column to the data variable coming from the data builder."),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Select the column."),(0,r.kt)("li",{parentName:"ol"},"Click on the ",(0,r.kt)("strong",{parentName:"li"},"Children")," property."),(0,r.kt)("li",{parentName:"ol"},"In the menu that opens, select the corresponding data variable from the data builder.")),(0,r.kt)("p",null,(0,r.kt)("img",{src:a(3458).Z,width:"10932",height:"5668"})),(0,r.kt)("p",null,"Step 5: Link the Text Property to the Data\nThe last step is to display the book titles from the data builder in the text widget."),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"From the outline, select the Text Widget that you added in step 1."),(0,r.kt)("li",{parentName:"ol"},"Click on the ",(0,r.kt)("strong",{parentName:"li"},"Text")," property in the widget's details panel."),(0,r.kt)("li",{parentName:"ol"},"In the menu select the data variable corresponding to the book title.")),(0,r.kt)("p",null,(0,r.kt)("img",{src:a(4781).Z,width:"1528",height:"1022"})),(0,r.kt)("p",null,"Congratulations! You've successfully set up your Nowa screen to display a list of book titles from your Supabase data source. Each time you open your screen, the data builder will fetch the most recent list of books from Supabase, ensuring that your data is always up to date."))}c.isMDXComponent=!0},4781:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/Screen_Recording_2023-05-28_at_15.41.06-0a548c3d60bbc94fb9fb5fa0a4cf9915.gif"},3458:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/documentationlinkchildrentodata_1-6f1217ea00aa50596a6d91fa127b2875.png"},920:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/supabase_tableadddatabuilder-f272148b7394684354bb690131ed5f6a.png"},5701:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/supabase_tabledatabuilderwidgets-0a583fed311e4f7249fc5ad714cc69af.png"}}]);