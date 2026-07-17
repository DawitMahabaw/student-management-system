// WHAT THIS FILE DOES:
// This is the "students" Model. It handles all SQL queries related to the students table — creating, reading, updating, and deleting student records.
// The Controller will call these functions; this file never touches HTTP requests/responses directly.

import connection from "../config/database.js";

// GET all students
// Used by the Admin dashboard to display the full student list.
export function getAllStudents(callback) {
  const sql = "SELECT * FROM students";
  connection.query(sql, (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
}

// ------------------------------------------------
// GET one student by ID
// ------------------------------------------------
// Used by the Student dashboard (view own info) AND by the Admin
// "edit student" screen (to pre-fill the form with existing data).
export function getStudentById(id, callback) {
  const sql = "SELECT * FROM students WHERE id = ?";
  connection.query(sql, [id], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results[0]);
  });
}

// ------------------------------------------------
// GET student by EMAIL
// ------------------------------------------------
// Used by the Student dashboard. Since we don't have real sessions,
// the frontend tells us WHICH student is asking by sending their
// login email. We look up the matching row in the students table.
export function getStudentByEmail(email, callback) {
  const sql = "SELECT * FROM students WHERE email = ?";
  connection.query(sql, [email], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results[0]);
  });
}

// CREATE a new student
export function createStudent(studentData, callback) {
  const sql = `
    INSERT INTO students (full_name, email, course, age)
    VALUES (?, ?, ?, ?)
  `;

  // We pull individual fields out of the studentData object and pass
  // them in the SAME ORDER as the "?" placeholders above.
  const values = [
    studentData.full_name,
    studentData.email,
    studentData.course,
    studentData.age,
  ];

  connection.query(sql, values, (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, result);
  });
}

// UPDATE an existing student
export function updateStudent(id, studentData, callback) {
  const sql = `
    UPDATE students
    SET full_name = ?, email = ?, course = ?, age = ?
    WHERE id = ?
  `;

  const values = [
    studentData.full_name,
    studentData.email,
    studentData.course,
    studentData.age,
    id,
  ];

  connection.query(sql, values, (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, result);
  });
}

// DELETE a student
export function deleteStudent(id, callback) {
  const sql = "DELETE FROM students WHERE id = ?";
  connection.query(sql, [id], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
}
