// WHAT THIS FILE DOES:
// This script creates our tables (users, students) and inserts sample data

// We reuse the SAME connection we set up in config/database.js
import connection from "../config/database.js";
const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL
  )
`;

const createStudentsTable = `
  CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    course VARCHAR(100),
    age INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

const insertSampleUsers = `
  INSERT INTO users (email, password, role) VALUES
  ('admin@gmail.com', '12345', 'admin'),
  ('student@gmail.com', '12345', 'student')
`;

// connection.query() sends a SQL string to MySQL and runs a callback function once MySQL responds.
// STEP A: Create the users table
connection.query(createUsersTable, (err, result) => {
  if (err) {
    console.error("Error creating users table:", err.message);
    return;
  }
  console.log("users table ready");

  // STEP B: Once users table exists, create students table.
  connection.query(createStudentsTable, (err, result) => {
    if (err) {
      console.error("Error creating students table:", err.message);
      return;
    }
    console.log("students table ready");

    // STEP C: Insert sample users, only after both tables exist.
    connection.query(insertSampleUsers, (err, result) => {
      if (err) {
        console.error(
          "Could not insert sample users (may already exist):",err.message,
        );
      } else {
        console.log("Sample users inserted:", result.affectedRows, "rows");
      }

      // STEP D: We're done — close the connection so the script exits cleanly.
      // Without this, the script would hang open waiting for more commands.
      connection.end();
    });
  });
});
