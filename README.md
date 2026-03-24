# BusyBrains Full Stack E-commerce Application

A robust Full Stack web application built with **React** for the frontend and **Java Spring Boot** for the backend. The application features a secure authentication system, Single Sign-On (SSO) with Google, and Role-Based Access Control (RBAC).

## 🚀 Project Overview
This project simulates a simplified Amazon/Flipkart-like experience where:
- **Admins** can manage the product catalog (Create, Update, Delete).
- **Users** can view the products but are restricted from making changes.
- **SSO Integration** allows users to log in instantly using their Google accounts.

---

## 🛠️ Tech Stack
- **Frontend:** React.js, Axios, SweetAlert2, React Router
- **Backend:** Java 17+, Spring Boot 3.x, Spring Security, Spring Data JPA
- **Database:** MySQL (via XAMPP)
- **Security:** JWT (JSON Web Tokens), OAuth 2.0 (Google SSO)

---

## 📋 Setup & Installation

### 1. Database Setup (XAMPP)
- Start **Apache** and **MySQL** in the XAMPP Control Panel.
- Create a database named `busybrains_db` in phpMyAdmin.
- *Note: The application includes a `DataLoader` that will automatically create tables and sample products on the first run.*

### 2. Backend Setup (Eclipse/STS)
- Import the `ecommerce-backend` folder as an **Existing Maven Project**.
- Update `src/main/resources/application.properties` if your MySQL username/password is different from `root`/`""`.
- Run `EcommerceBackendApplication.java` as a **Java Application**.
- The server will start on `http://localhost:8080`.

### 3. Frontend Setup (VS Code)
- Open the `ecommerce-frontend` folder in VS Code.
- Run `npm install` to download dependencies.
- Run `npm start` to launch the UI.
- The app will open at `http://localhost:3000`.

---

## 🔐 SSO Configuration (Google Login)
The application is integrated with Google OAuth 2.0. 
- **Authorized Redirect URI:** `http://localhost:8080/login/oauth2/code/google`
- **Forced Account Selection:** The app is configured to always show the Google account chooser for a professional demo experience.

---

## 📡 API Details

### Authentication APIs (`/api/auth`)
- `POST /register`: Create a new user (Default: ROLE_USER).
- `POST /login`: Authenticate and receive a JWT Token.

### Product APIs (`/api/products`)
- `GET /products`: View all items (Accessible by ADMIN & USER).
- `POST /products`: Add a product (ADMIN only).
- `PUT /products/{id}`: Edit a product (ADMIN only).
- `DELETE /products/{id}`: Delete a product (ADMIN only).

### User Profile APIs (`/api/users`)
- `GET /profile`: View logged-in user details.
- `PUT /profile`: Update personal information.

---

## 👥 Predefined Test Credentials
| Username | Password | Role | Permission |
| :--- | :--- | :--- | :--- |
| **admin** | password123 | ROLE_ADMIN | Full Access (Add/Edit/Delete) |
| **user** | (Register via UI) | ROLE_USER | View Only |

---

# ⚡ Quick Start for Recruiters
To see the fully functional application immediately:
1. Ensure **MySQL** is running (e.g., via XAMPP).
2. Create a database named `busybrains_db`.
3. Navigate to `ecommerce-backend/target/`.
4. Run the command: `java -jar ecommerce-backend-0.0.1-SNAPSHOT.jar`
5. Open your browser to `http://localhost:8080`.
*The application will automatically load sample products and an admin user.*

---

**Developed by:** Sirapu Sravya  
**Submission for:** BusyBrains Intern Cum Full Time Role
