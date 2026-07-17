# Student Management System

A simple full-stack learning project built with **Node.js**, **Express**, and **MySQL**, focused on understanding backend architecture, MVC structure, and how data flows between the frontend, backend, and database.

This project intentionally avoids advanced authentication (bcrypt, JWT, sessions) to keep the focus on core backend concepts.

---

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** MySQL (via MAMP, local only)
- **Frontend:** HTML, CSS, Bootstrap
- **Environment Config:** dotenv

---

## Features

### Login System (simplified)
- Single `users` table with `id`, `email`, `password`, `role`
- Role determines which dashboard is shown (admin or student)
- Role is always read from the database, never from user input

### Admin
- Add students
- View all students
- Update student records
- Delete students

### Student
- View their own basic information

---

## Project Structure

\```
student-management-system/
│
├── config/
│     database.js
│
├── controllers/
│     authController.js
│     studentController.js
│
├── models/
│     userModel.js
│     studentModel.js
│
├── routes/
│     authRoutes.js
│     studentRoutes.js
│
├── views/
│     login.html
│     admin.html
│     student.html
│
├── public/
│     css/
│     js/
│
├── app.js
├── package.json
└── .env
\```

---

## Setup Instructions

### 1. Clone the repository
\```bash
git clone https://github.com/YOUR-USERNAME/student-management-system.git
cd student-management-system
\```

### 2. Install dependencies
\```bash
npm install
\```

### 3. Set up the database
- Open phpMyAdmin (via MAMP)
- Create a database named `student_management`
- Run the SQL scripts provided in `/sql` (users table, students table, sample data)

### 4. Create a `.env` file in the project root
\```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=student_management
\```

### 5. Start the server
\```bash
npm start
\```

### 6. Open in browser
\```
http://localhost:3000
\```

---

## Sample Login Credentials

| Role    | Email               | Password |
|---------|----------------------|----------|
| Admin   | admin@gmail.com      | 12345    |
| Student | student@gmail.com    | 12345    |

---

## Notes

This project is for **learning purposes only** and is not intended for production deployment. Passwords are stored in plain text and there is no session-based authentication.