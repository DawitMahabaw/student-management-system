// WHAT THIS FILE DOES:
// This is the "users" Model. Its only job is running SQL queries related to the users table. It does NOT know about routes, requests, or responses — that's the Controller's job. 


import connection from "../config/database.js";

// Why are we writing a function instead of just running a query directly?
// Because the Controller will need to call this same logic every time someone tries to log in. Wrapping it in a function makes it reusable and keeps the SQL details hidden away from the Controller.


export function findUserByEmail(email, callback) {

  const sql = "SELECT * FROM users WHERE email = ?";
  connection.query(sql, [email], (err, results) => {
    if (err) {
      callback(err, null);
      return;
    }

    // "results" is always an ARRAY, even if only one row matches — that's just how mysql2 returns SELECT results.
    callback(null, results);
  });
}
