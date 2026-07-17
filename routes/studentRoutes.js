// ============================================
// WHAT THIS FILE DOES:
// Maps student-related URLs to their Controller functions.
// Order matters here: /email/:email must be defined BEFORE /:id,
// otherwise Express would try to match "email" itself as an :id value.
// ============================================

import express from "express";
import {
  getStudents,
  getStudent,
  getStudentByEmailHandler,
  addStudent,
  editStudent,
  removeStudent,
} from "../controllers/studentController.js";

const router = express.Router();

router.get("/api/students", getStudents);
router.get("/api/students/email/:email", getStudentByEmailHandler); // must come first
router.get("/api/students/:id", getStudent);
router.post("/api/students", addStudent);
router.put("/api/students/:id", editStudent);
router.delete("/api/students/:id", removeStudent);

export default router;
