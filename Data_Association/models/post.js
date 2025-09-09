const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/database');

const postSchema = mongoose.Schema({
    postdata: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    data: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', postSchema);
