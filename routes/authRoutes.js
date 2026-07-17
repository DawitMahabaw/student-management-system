// ============================================
// WHAT THIS FILE DOES:
// This file defines which URL triggers which Controller function.
// It contains NO logic itself — it's purely a map: "when a POST
// request hits /login, hand it off to authController.login".
// ============================================

import express from "express";
import { login } from "../controllers/authController.js";

// express.Router() lets us define a group of related routes in their
// own file, instead of cramming everything into app.js.
const router = express.Router();

// Why POST and not GET?
// GET requests are meant for retrieving data and can be cached or
// appear in browser history/URLs — never appropriate for sending
// passwords. POST sends data in the request body, which is the
// correct method for submitting form data like login credentials.
router.post("/login", login);

// Why are we exporting the router instead of using it directly here?
// app.js will import this router and "mount" it onto a base path
// (like /api or just /). This keeps route definitions organized
// by feature instead of one giant file.
export default router;
