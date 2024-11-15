// app.js
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

// Import Routes
const routes = require("./routes/index");

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

// Routes
app.use("/", routes);

// Basic health check route
app.get("/", (req, res) => {
  res.send("Welcome to the Healthcare System API");
});

// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
