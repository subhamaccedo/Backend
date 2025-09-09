const mongoose = require('mongoose');
const express = require("express");
const userModel = require("./models/user");
const postModel = require("./models/post");
const app = express();

app.get('/', (req,res) => {
    res.send("Hello World");
});

app.get('/create', async (req,res) => {
    let user = await userModel.create({
        username: "John",
        age: 25,
        email: "john@example.com"
    });
    res.send(user);
});
app.get('/post/create', async (req,res) => {
    let post = await postModel.create({
        postdata: "This is my first post",
        user: "68b926088d02ab4725ab1744" // user id
    });
    let user = await userModel.findOne({_id:"68b926088d02ab4725ab1744"});
    user.posts.push(post._id);  //push the id on the user posts array
    await user.save();
    res.send({post, user});
});


app.listen(3000, ()=>{
    console.log("Started");
});