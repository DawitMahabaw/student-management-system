// WHAT THIS FILE DOES:
// This is the "students" Model. It handles all SQL queries related
// to the students table — creating, reading, updating, and deleting
// student records. The Controller will call these functions; this
// file never touches HTTP requests/responses directly.

import connection from "../config/database.js";

// ------------------------------------------------
// GET all students
// ------------------------------------------------
// Used by the Admin dashboard to display the full student list.
export function getAllStudents(callback) {
  const sql = "SELECT * FROM students";

  // No placeholders needed here since there's no user input involved —
  // we're just asking for everything in the table.
  connection.query(sql, (err, results) => {
    if (err) {
      callback(err, null);
      return;
    }
    // results is an array of every row in the students table.
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
    if (err) {
      callback(err, null);
      return;
    }
    // results[0] will be the matching student, or undefined if no match.
    callback(null, results[0]);
  });
}

// ------------------------------------------------
// CREATE a new student
// ------------------------------------------------
// Used when Admin submits the "Add Student" form.
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
    // For INSERT queries, "result" isn't the row itself — it's metadata
    // about the operation. result.insertId tells us the auto-generated
    // ID of the row we just created, which is often useful to send back.
    callback(null, result);
  });
}

// ------------------------------------------------
// UPDATE an existing student
// ------------------------------------------------
// Used when Admin edits a student's info and submits the form.
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
    // result.affectedRows tells us how many rows were actually changed.
    // If it's 0, that usually means no student with that ID existed.
    callback(null, result);
  });
}

// ------------------------------------------------
// DELETE a student
// ------------------------------------------------
// Used when Admin clicks "Delete" on a student row.
export function deleteStudent(id, callback) {
  const sql = "DELETE FROM students WHERE id = ?";

  connection.query(sql, [id], (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    // result.affectedRows tells us if a row was actually deleted (1) or
    // if nothing matched that ID (0).
    callback(null, result);
  });
}
