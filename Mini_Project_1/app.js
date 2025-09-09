const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const path = require("path");
const upload = require("./config/multer");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/login", async (req, res) => {
  res.render("login");
});
app.get("/profile/upload", isLoggedIn, async (req, res) => {
  res.render("profileupload");
});
app.post("/upload", upload.single("image"), isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  user.profilepic = req.file.filename;
  await user.save(); 
  res.redirect("/profile");
});
app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (!user) {
    return res.send("User does not exist");
  }
  bcrypt.compare(password, user.password, (err, result) => {
    // comparing the password
    if (result) {
      let token = jwt.sign({ email: email, userid: user._id }, "secretkey");
      res.cookie("token", token);
      res.status(200).redirect("/profile");
    } else res.redirect("/login");
  });
});
app.get('/profile', isLoggedIn, async (req, res) =>{
  let user = await userModel.findOne({email: req.user.email}).populate("posts");
    res.render("profile", { user });
});
app.get('/like/:id', isLoggedIn, async (req, res) =>{
  let post = await postModel.findOne({_id: req.params.id}).populate("user");
  if(post.likes.indexOf(req.user.userid) === -1){
      post.likes.push(req.user.userid);
  } else {
    post.likes.splice(post.likes.indexOf(req.user.userid), 1);
  }
  await post.save();
  res.redirect("/profile");
});
app.get('/edit/:id', isLoggedIn, async (req, res) =>{
  let post = await postModel.findOne({_id: req.params.id}).populate("user");
  res.render("edit", { post });
});
app.post('/update/:id', isLoggedIn, async (req, res) =>{
  let post = await postModel.findOneAndUpdate({_id: req.params.id}, {content: req.body.content});
  await post.save();
  res.redirect("/profile");
});
app.get('/post/:id/delete', isLoggedIn, async (req, res) =>{
  let post = await postModel.findOneAndDelete({_id: req.params.id});
  res.redirect("/profile");
});
app.post('/post', isLoggedIn, async (req, res) =>{
  let user = await userModel.findOne({email: req.user.email})
  let { content } = req.body;
    let post = await postModel.create({
      user: user._id,
      content
    });
    user.posts.push(post._id);  //push the id on the user posts array
    await user.save();
    res.redirect("/profile");
});
app.post("/register", async (req, res) => {
  let { username, name, email, age, password } = req.body;
  let user = await userModel.findOne({ email });
  if (user) {
    return res.send("User already exists");
  }
  bcrypt.genSalt(10, async (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      // comparing the password
      let user = await userModel.create({
        username,
        email,
        age,
        name,
        password: hash,
      });
      let token = jwt.sign({ email: email, userid: user._id }, "secretkey");
      res.cookie("token", token);
      res.send("registered");
    });
  });
});
app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("login");
});

//Middleware Protected Route  
function isLoggedIn(req, res, next) {
  if (req.cookies.token === "") res.redirect("/login");
  else {
    let data = jwt.verify(req.cookies.token, "secretkey");
    req.user = data;
    next();
  }
}
app.listen(3000, () => {
  console.log("Started");
});
