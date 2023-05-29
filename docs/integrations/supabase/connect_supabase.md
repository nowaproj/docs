---
sidebar_position: 1
title: Connect Supabase
description: How to connect Supabase project with your app 
---

## What is Supabase?
---

Supabase is an open-source platform that combines a real-time PostgreSQL database, serverless functions, and robust authentication services for easy and secure application development. It simplifies backend development while enabling instant data synchronization, custom server-side logic, and seamless user management.

Nowa provides a supabase integration that let's you connect your Supabase projects to your projects in Nowa. This page provides a on integrating Nowa with Supabase, allowing you to connect to your Supabase project, view data, and manage the connection.

## How to connect your project to Supabase
---

Step 1: Create a project on Supabase and set up tables
Visit the Supabase website (www.supabase.com) and either sign in or create a new account. Once you're signed in, follow the instructions to create a new project. Inside your Supabase project, set up the necessary tables and populate them with your desired data.

![](./img/supabase_table.png)

Step 2: Disable Row-Level Security (RLS)
To ensure unrestricted data retrieval, navigate to the table settings or permissions in your Supabase project and disable Row-Level Security (RLS) for the tables you want to access through Nowa.


![](./img/supabase_table2.png)


Step 3: Connect to Nowa
Open you Nowa project that you want to connect. Go to the sidebar and click on the "Data" button. From the available data source options, select "Supabase."
Nowa will prompt you to provide the necessary connection details. Copy the URL and API key of your Supabase project. Paste them in the corresponding fields in Nowa. Now click the "Connect" button.

![](./img/supabase_tableconnect.png)

![](./img/supabase_tableconnect-1.png)


Now you can check your tables on the panel on the left and refresh them in by clicking on the indicated button to keep the data updated.

![](./img/supabase_tabletable.png)


To learn how to show the data from Supabase in your designs check out: [Display data](./display_data.md).