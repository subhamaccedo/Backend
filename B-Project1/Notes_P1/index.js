const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
app.use(express.json());            // it will parse the JSON data
app.use(express.urlencoded({ extended: true })); // it will parse the URL-encoded data
app.set('view engine', 'ejs');   // we will targeting the EJS 

app.get('/', function(req, res) {
    fs.readdir(`./files`,function(err, files) {      // it will read the files from the files folder
        res.render('index', { files: files });
    });
});
//----------------------------VIEW-------------------------------
app.get('/files/:filename', function(req, res) {
    fs.readFile(`./files/${req.params.filename}`, 'utf8', function(err, data) { // it will read the file with the filename
        if (err) {
            console.error(err);
            res.status(404).send('File not found');
        } else {
            res.render('show', { title: req.params.filename, description: data }); // it will render the file.ejs with the title and description
        }
    });
});
//----------------------------DELETE-------------------------------
app.get('/delete/:filename', function(req, res) {
    fs.unlink(`./files/${req.params.filename}`, function(err) {
        if (err) {
            console.error(err);
            res.status(404).send('File not found');
        } else {
            res.redirect('/');
        }
    });
});
//----------------------------EDIT-------------------------------
app.get('/edit/:filename', function(req, res) {
    fs.readFile(`./files/${req.params.filename}`, 'utf8', function(err, data) { // it will read the file with the filename
        if (err) {
            console.error(err);
            res.status(404).send('File not found');
        } else {
            res.render('edit', { title: req.params.filename, description: data }); // it will render the edit.ejs with the title and description
        }
    })
});
app.post('/edit/:filename', function(req, res) {
    const oldFilename = `./files/${req.body.oldTitle}`;
    const newFilename = `./files/${req.body.title}.txt`; // always save as .txt
    const description = req.body.description;

    if (req.body.oldTitle === req.body.title + ".txt") {
        // Title unchanged → update content
        fs.writeFile(oldFilename, description, function(err) {
            if (err) {
                console.error(err);
                res.status(500).send('Error updating task');
            } else {
                res.redirect('/');
            }
        });
    } else {
        // Title changed → rename + update content
        fs.rename(oldFilename, newFilename, function(err) {
            if (err) {
                console.error(err);
                res.status(500).send('Error renaming task');
            } else {
                fs.writeFile(newFilename, description, function(err) {
                    if (err) {
                        console.error(err);
                        res.status(500).send('Error updating task');
                    } else {
                        res.redirect('/');
                    }
                });
            }
        });
    }
});

app.post('/create', function(req, res) {
fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.description, function(err) { // it will create a file with the title and description
        if (err) {
            console.error(err);
            res.status(500).send('Error creating task');
        } else {
            res.redirect('/');
        }
    });
});

app.listen(3000, function() {
    console.log('Server is running on port 3000');
});
