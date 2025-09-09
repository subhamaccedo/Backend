const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    age: Number
});
module.exports = mongoose.model('User', userSchema);