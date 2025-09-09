const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const userModel = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.get('/', (req,res) => {
    res.render('index');
});
app.post('/create', async (req,res) => {
    const {username, password, email, age} = req.body;
    bcrypt.genSalt(10,(err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            if(err) throw err;
            const newUser = new userModel({
                username,
                password: hash,
                email,
                age
            });
            let token = jwt.sign({email},"secretkey");
            res.cookie("token", token, {httpOnly: true});
            await newUser.save();
            res.redirect('/');
        });
    });
});
app.get('/login', async (req,res) => {
res.render('login');
});    
app.post('/login', async (req,res) => {
    let user = await userModel.findOne({email: req.body.email});
    if(!user) return res.status(400).send("Something went wrong");
    bcrypt.compare(req.body.password, user.password, (err, result) => {
        if(err) throw err;
        if(result){
            let token = jwt.sign({email},"secretkey");
            res.cookie("token", token, {httpOnly: true});
            return res.redirect("/");
        } else {
            return res.status(400).send("Something went wrong");
        }
     });
});
app.get("/logout", (req,res) => {
    res.cookie("token", "");
    res.redirect("/");
});
app.listen(3000, ()=>{
    console.log("started");
})
