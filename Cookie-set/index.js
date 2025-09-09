const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;

app.use(cookieParser()); // Middleware

// Route to set cookies
app.get("/setcookie", (req, res) => {
  res.cookie("username", "subham", { maxAge: 60000, httpOnly: true });
  res.cookie("age", "24", { maxAge: 60000, httpOnly: true });
  res.send("Cookies have been set");
});

// Route to read cookies
app.get("/getcookie", (req, res) => {
  const username = req.cookies.username;
  const age = req.cookies.age;
  res.send(`Hello ${username || "Guest"}, age: ${age || "unknown"}`);
});

// Route to clear cookies
app.get("/clearcookie", (req, res) => {
  res.clearCookie("username");
  res.clearCookie("age");
  res.send("Cookies cleared");
});

app.listen(PORT, () => {
  console.log("Server started");
});
