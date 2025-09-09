const express = require('express');
const app = express();
const userModel = require('./usemodel');

app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the User API');
});

// Create user
app.get('/create', async (req, res) => {
  try {
    let user = await userModel.create({ 
      name: 'John Doe', 
      age: 30,
      email: 'john.doe@example.com'
    });
    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update user
app.get('/update', async (req, res) => {
  try {
    let user = await userModel.findOneAndUpdate(
      { name: 'John Doe' }, // filter
      { 
        name: 'John Doe Updated',
        age: 31,
        email: "john.doe@newdomain.com"
      }, // update fields
      { new: true } // return updated doc
    );
    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Delete user
app.get('/delete', async (req, res) => {
  try {
    let user = await userModel.findOneAndDelete({ name: 'John Doe Updated' });
    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
// Get all users
app.get('/users', async (req, res) => {
  try {
    let users = await User.find();   // fetch all documents
    res.send(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
