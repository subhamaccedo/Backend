const mongoose = require('mongoose');   

mongoose.connect(`mongodb://localhost:27017/mongopractice`) //connect to database
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

const userSchema = mongoose.Schema({
    name: String,
    age: Number,
    email: String
})

module.exports = mongoose.model('User', userSchema);