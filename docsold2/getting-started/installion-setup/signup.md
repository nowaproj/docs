# Signup

This document describes the user signup process in the application. Users can create an account in two ways:  
1. **With email and password**  
2. **With Google account**  

---

### 1. Initial Screen
- On the signup screen, the user can choose between two options:  
  - **Sign up with email**  
  - **Sign up with Google**  

![Initial screen](/img/signup/1.png)

---

### 2. Email Signup

#### 2.1 Entering user details
- The user is asked to provide the following information:  
  - **Full name**  
  - **Email address**  
  - **Password**  

![Email step 1](/img/signup/email/1.png)

#### 2.2 Email verification
- The system informs the user that the provided email address must be verified.  
- A **verification email** is sent to the user’s inbox.  

![Email step 2](/img/signup/email/2.png)

#### 2.3 Successful registration
- After the email is verified, the signup process is successfully completed.  
- The user can now log in to the system.  

![Email step 3](/img/signup/email/3.png)

---

### 3. Google Signup

#### 3.1 Selecting Google account
- The user clicks the Google signup button.  
- The Google login screen appears.  

![Google step 1](/img/signup/google/1.png)

#### 3.2 Authorization
- The user selects their Google account and authorizes the application.  

![Google step 2](/img/signup/google/2.png)

- After this step, the system automatically creates the user account.  

---

### 4. Post-signup Screens

#### 4.1 Welcome screen
- After a successful registration, the user is greeted with a welcome screen.  

![After step 1](/img/signup/after/1.png)

#### 4.2 First setup / Role selection
- Instead of collecting personal data, the app simply asks a **basic role question** — e.g.,  
  *“Are you a developer?”*  
- This step is lightweight, ensuring users can quickly proceed without sharing sensitive information.  

![After step 2](/img/signup/after/2.png)

---

### Summary
- **Email signup**: user provides name, email, and password → must confirm email before logging in.  
- **Google signup**: quick and easy signup, no extra confirmation needed.  
- **After signup**: user sees a welcome screen, then completes a simple role-selection step (e.g., “Are you a developer?”) before entering the main app.  
