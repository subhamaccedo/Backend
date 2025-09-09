const { users } = require("../models/userModel");

let userList = [...users]; // Copy to simulate database behavior

exports.getAllUsers = (req, res) => {
  res.json(userList);
};

exports.getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  const user = userList.find(u => u.id === id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

exports.createUser = (req, res) => {
    console.log("Creating user with data:", req.body);
    try {
      const { name, email } = req.body;
      const newUser = {
        id: userList.length + 1,
        name,
        email,
      };
      userList.push(newUser);
      res.status(201).json(newUser);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
};

exports.updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  const user = userList.find(u => u.id === id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.name = name || user.name;
  user.email = email || user.email;

  res.json(user);
};

exports.deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  userList = userList.filter(u => u.id !== id);
  res.json({ message: "User deleted successfully" });
};
