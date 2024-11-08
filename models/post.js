// models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User collection
});

module.exports = mongoose.model('Post', postSchema); // 'Post' will correspond to the 'posts' collection
