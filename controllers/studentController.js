// ============================================
// WHAT THIS FILE DOES:
// This Controller handles all student-related requests: listing,
// fetching one, creating, updating, deleting. It reads data from
// req (the incoming request), calls the appropriate Model function,
// and shapes the response sent back to the browser.
// ============================================

import {
  getAllStudents,
  getStudentById,
  getStudentByEmail,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../models/studentModel.js";

// GET /api/students
// What data is coming from the frontend? None — this just returns everything.
export function getStudents(req, res) {
  getAllStudents((err, students) => {
    if (err) {
      console.error("Error fetching students:", err.message);
      return res
        .status(500)
        .json({ success: false, message: "Failed to fetch students." });
    }
    // What does the database return? An array of student rows.
    // We send it straight back to the frontend as JSON.
    res.status(200).json({ success: true, data: students });
  });
}

// GET /api/students/:id
// What data is coming from the frontend? The student's id, inside the URL itself
// (req.params). Express automatically extracts ":id" from the route pattern.
export function getStudent(req, res) {
  const { id } = req.params;

  getStudentById(id, (err, student) => {
    if (err) {
      console.error("Error fetching student:", err.message);
      return res
        .status(500)
        .json({ success: false, message: "Failed to fetch student." });
    }
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found." });
    }
    res.status(200).json({ success: true, data: student });
  });
}

// GET /api/students/email/:email
// Used by the student dashboard. Since we have no real session, the
// frontend passes the logged-in user's email (from localStorage) so
// we know whose record to look up.
export function getStudentByEmailHandler(req, res) {
  const { email } = req.params;

  getStudentByEmail(email, (err, student) => {
    if (err) {
      console.error("Error fetching student by email:", err.message);
      return res
        .status(500)
        .json({ success: false, message: "Failed to fetch student." });
    }
    if (!student) {
      // This is a NORMAL, expected case — not a server error — if the
      // admin hasn't created a matching student record yet.
      return res
        .status(404)
        .json({
          success: false,
          message: "No student record linked to this account yet.",
        });
    }
    res.status(200).json({ success: true, data: student });
  });
}

// POST /api/students
// What data is coming from the frontend? The new student's details,
// sent as JSON in the request body (from the "Add Student" form).
export function addStudent(req, res) {
  const { full_name, email, course, age } = req.body;

  if (!full_name || !email) {
    return res
      .status(400)
      .json({ success: false, message: "Full name and email are required." });
  }

  createStudent({ full_name, email, course, age }, (err, result) => {
    if (err) {
      console.error("Error creating student:", err.message);
      return res
        .status(500)
        .json({ success: false, message: "Failed to create student." });
    }
    // result.insertId is the auto-generated id MySQL assigned to the new row.
    res
      .status(201)
      .json({
        success: true,
        message: "Student created.",
        insertId: result.insertId,
      });
  });
}

// PUT /api/students/:id
// What data is coming from the frontend? The id in the URL (which student
// to update) PLUS the updated fields in the request body.
export function editStudent(req, res) {
  const { id } = req.params;
  const { full_name, email, course, age } = req.body;

  if (!full_name || !email) {
    return res
      .status(400)
      .json({ success: false, message: "Full name and email are required." });
  }

  updateStudent(id, { full_name, email, course, age }, (err, result) => {
    if (err) {
      console.error("Error updating student:", err.message);
      return res
        .status(500)
        .json({ success: false, message: "Failed to update student." });
    }
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found." });
    }
    res.status(200).json({ success: true, message: "Student updated." });
  });
}

// DELETE /api/students/:id
export function removeStudent(req, res) {
  const { id } = req.params;

  deleteStudent(id, (err, result) => {
    if (err) {
      console.error("Error deleting student:", err.message);
      return res
        .status(500)
        .json({ success: false, message: "Failed to delete student." });
    }
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found." });
    }
    res.status(200).json({ success: true, message: "Student deleted." });
  });
}
