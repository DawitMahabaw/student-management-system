// WHAT THIS FILE DOES:
// This is the "users" Model. Its only job is running SQL queries related to the users table. It does NOT know about routes, requests, or responses — that's the Controller's job. This file just answers he question: "how do I get/find user data in the database?"



import connection from "../config/database.js";

// Why are we writing a function instead of just running a query directly?
// Because the Controller will need to call this same logic every time
// someone tries to log in. Wrapping it in a function makes it reusable
// and keeps the SQL details hidden away from the Controller.
//
// This function takes:
//   - email: what the user typed into the login form
//   - callback: a function to run once we get a result (or an error)
//
// Why a callback instead of returning a value directly?
// Database queries are NOT instant — MySQL needs a moment to respond.
// JavaScript doesn't pause and wait for that response by default,
// so we pass in a function (the callback) that MySQL will call
// automatically once the actual data comes back.
export function findUserByEmail(email, callback) {
  // Why do we use "?" instead of putting the email directly into the string?
  // This is called a "parameterized query" or "prepared statement."
  // If we built the SQL string by directly inserting user input, someone
  // could type malicious SQL into the login form (this is called
  // "SQL Injection") and manipulate our database.
  // By using "?", mysql2 safely escapes the value before running the query.
  const sql = "SELECT * FROM users WHERE email = ?";

  // connection.query() takes:
  //   1. the SQL string (with placeholders)
  //   2. an array of values to fill in those placeholders, in order
  //   3. a callback that runs when MySQL responds
  connection.query(sql, [email], (err, results) => {
    if (err) {
      // Something went wrong with the query itself (e.g. connection lost).
      // We pass the error back to whoever called this function, so THEY
      // can decide how to respond (this file doesn't know about HTTP).
      callback(err, null);
      return;
    }

    // "results" is always an ARRAY, even if only one row matches —
    // that's just how mysql2 returns SELECT results.
    // If no user has this email, results will be an empty array [].
    // If found, results[0] is that user's row: { id, email, password, role }
    callback(null, results);
  });
}
