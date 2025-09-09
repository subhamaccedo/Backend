const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user'); // no need to import twice

// Middleware
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('index');
});
//READ
app.get('/read', async (req, res) => {
    let users = await userModel.find(); // Added await to fetch users from
    res.render('read', { users }); // Pass users to the template
});
//EDIT
app.get('/edit/:userid', async (req, res) => {
    let user = await userModel.findById( req.params.userid );
    res.render('edit', { user });
});
//UPDATE
app.post('/update/:userid', async (req, res) => {
    let { name, email, image } = req.body;
    await userModel.findByIdAndUpdate(req.params.userid, { name, email, image }, { new: true });
    res.redirect('/read');
});
//CREATE
app.post('/create', async (req, res) => {
  try {
    let { name, email, image } = req.body;
    const newUser = await userModel.create({ name, email, image });
    console.log("User created:", newUser);
    res.redirect('/read');
  } catch (err) {
    console.error("Error creating user:", err.message);
    res.status(500).send('Error creating user');
  }
});

// Start server
app.listen(3000, ()=>{
console.log("running")
});
