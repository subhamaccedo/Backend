// Master EJS, Dynamic Routing & Project Setup | Backend Development Part 6

const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());            // it will parse the JSON data
app.use(express.urlencoded({ extended: true })); // it will parse the URL-encoded data
app.set('view engine', 'ejs');   // we will targeting the EJS 
app.use(express.static(path.join(__dirname, 'public'))); // it will hit the public folder || static assets ( CSS, images, JS files )

app.get('/', function(req, res) {
    res.render('index');          // it will hit the views folder
});
app.get('/profile/:username', function(req, res) {
    res.send(`welcome, ${req.params.username}`);          
});

app.get('/profile/:username/:age', function(req, res) {
    // res.send(`welcome, ${req.params.username}. You are ${req.params.age} years old.`);
    res.send(req.params); // it will return an object with username and age
});

app.listen(3000, function() {
    console.log('Server is running on port 3000');
});

