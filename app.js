// WHAT THIS FILE DOES:
// This is the entry point of the entire application — the "front door".
// It creates the Express server, connects all the middleware and routes,
// and starts listening for incoming requests. Every request to our app
// passes through this file first before being handed off to the
// appropriate route.

import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

// Load environment variables (PORT, DB credentials) from .env
dotenv.config();

// ESM doesn't have "__dirname" built in like CommonJS did, so we
// reconstruct it manually. We'll need this to correctly point to
// our "views" and "public" folders regardless of where the app is run from.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Creating the Express application itself.
const app = express();

// Why do we need this middleware?
// By default, Express does NOT understand form data or JSON sent in a
// request body — req.body would be undefined without this. This line
// tells Express: "parse incoming JSON request bodies and make them
// available as req.body."
app.use(express.json());

// This does the same thing, but for traditional HTML form submissions
// (Content-Type: application/x-www-form-urlencoded).
app.use(express.urlencoded({ extended: true }));

// Why do we need this?
// This tells Express to serve static files (CSS, client-side JS, images)
// directly from the "public" folder. So a file at public/css/style.css
// becomes accessible in the browser at /css/style.css.
app.use(express.static(path.join(__dirname, "public")));

// Serving our plain HTML pages from the "views" folder the same way,
// since we're not using a templating engine like EJS.
app.use(express.static(path.join(__dirname, "views")));

// What happens when this route receives a request?
// Any URL starting with nothing extra (just "/") that matches something
// inside authRoutes.js (like POST /login) gets handled there.
app.use("/", authRoutes);
app.use("/", studentRoutes);

// A simple root route so visiting http://localhost:3000 loads the login page.
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

// Reading the PORT from .env, with a fallback in case it's missing.
const PORT = process.env.PORT || 3000;

// Starting the server. This callback runs once the server has
// successfully started listening for requests.
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
