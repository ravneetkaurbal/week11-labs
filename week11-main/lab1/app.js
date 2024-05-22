
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

// Middleware to parse cookies
app.use(cookieParser());

// Routes will go here

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
    res.send("Server is running");
  });
  
  // Set a cookie
  app.get("/set-cookie", (req, res) => {
    res.cookie("username", "John Doe").send("Cookie is set");
  });
  
  // Get a cookie
  app.get("/get-cookie", (req, res) => {
    const username = req.cookies.username;
    if (username) {
      res.send(`Hello ${username}`);
    } else {
      res.send("No cookie found");
    }
  });
  
  // Delete a cookie
  app.get("/delete-cookie", (req, res) => {
    res.clearCookie("username").send("Cookie is deleted");
  });