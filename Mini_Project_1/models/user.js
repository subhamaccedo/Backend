const { ref } = require('joi');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/miniproject1');

const userSchema = mongoose.Schema({
    username: String,
    name: String,
    email: String,
    age: Number,
    password: String,
    profilepic: {
        type: String,
        default: 'default.png'
    },
    posts: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'post' }
    ]
});

module.exports = mongoose.model('User', userSchema);
