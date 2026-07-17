// This folder stores configuration. A configuration is simply a setting your application needs.
//? WHAT THIS FILE DOES:
// This file creates ONE connection to our MySQL database and exports it so every other file (models, setup scripts) can reuse the SAME connection instead of creating a new one each time.

//? Environment variables are named values provided by the operating system or the application's environment that programs can read while they run. They are used to store configuration information—such as API keys, database URLs, or port numbers—without hardcoding those values into the source code.


//? Why are we importing dotenv here?
// dotenv is a translator  .env file  --> dotenv --> JavaScript
// Without dotenv, JavaScript cannot automatically understand what's inside .env.
// Our database credentials (host, user, password) live in the .env file,
// NOT hardcoded in this file. dotenv reads .env and loads those values
// into process.env so we can use them below.
import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();  
// This means "Open the .env file and load all its values into my Node.js application."
//And Node.js stores them inside a built-in object called process.env

  const connection = mysql.createConnection({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME, 
});

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "studentManager",
//   password: "45678",
//   database: "student_management",
// });


connection.connect((err) => {
  if (err) {
    console.error("Failed to connect to MySQL:", err.message);
    return;
  }
  console.log("Connected to MySQL database");
});

// message is not a variable that you created. It is a property that already exists on the Error object that Node.js (or JavaScript) gives you. It means:"Go to the err object and get its message property."
// err is provided by MySQL/Node.js. If an error occurs, err is an Error object. That object already contains properties like: err.message, err.code, err.stack


// Every other file that needs to run a SQL query (models, setup scripts)
// will import THIS SAME connection instead of creating a new one.
export default connection;
