// ============================================
// WHAT THIS FILE DOES:
// This is the Controller for authentication. It receives the login
// request from the Route, pulls out the submitted email/password,
// asks the Model to check the database, and decides how to respond
// based on what it finds. This file NEVER writes raw SQL itself —
// that's the Model's job. The Controller only handles LOGIC.
// ============================================

import { findUserByEmail } from "../models/userModel.js";

// Why is this function named "login" and exported?
// The Route file will import this function and connect it to a URL
// (like POST /login). When that URL receives a request, Express
// calls this function automatically and passes it "req" and "res".
export function login(req, res) {
  // What data is coming from the frontend?
  // When the login form is submitted, the browser sends email and
  // password inside the request body. Express parses that body for us
  // (we'll enable that in app.js), making it available as req.body.
  const { email, password } = req.body;

  // Basic validation: make sure the user actually typed something.
  // We handle this here, in the Controller, because it's about
  // REQUEST logic, not database logic.
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required." });
  }

  // Now we ask the Model to look up this email in the database.
  // We are NOT running SQL here directly — we're calling a function
  // that the Model already built for us. This keeps the Controller
  // clean and focused on "what to do", not "how the database works".
  findUserByEmail(email, (err, results) => {
    if (err) {
      // Something went wrong talking to the database itself.
      console.error("Database error during login:", err.message);
      return res
        .status(500)
        .json({ success: false, message: "Server error. Please try again." });
    }

    // What does the database return?
    // "results" is an array. If no user has this email, it will be empty.
    if (results.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    }

    // We found a matching user — grab that single row.
    const user = results[0];

    // Since we are NOT using bcrypt in this version, we compare the
    // plain text password directly. In a real production app, you would
    // NEVER do this — you'd compare a hashed version instead.
    if (user.password !== password) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    }

    // SUCCESS. Notice: "user.role" comes directly from the database row
    // we just fetched — NOT from anything the browser told us. This is
    // the rule we talked about above: role is always database-sourced.
    //
    // What happens after the result comes back?
    // We send a JSON response containing the role. The FRONTEND JavaScript
    // (which we'll write next) will read this response and redirect the
    // browser to the correct dashboard page.
    res.status(200).json({
      success: true,
      role: user.role,
      email: user.email,
    });
  });
}
