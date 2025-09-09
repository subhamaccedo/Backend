const express = require("express");
const app = express();
const PORT = 3000;

const userRoutes = require("./routes/userRoutes");

app.use(express.json()); // Middleware to parse JSON
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to User CRUD API");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
