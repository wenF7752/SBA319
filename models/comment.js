// models/Comment.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }, // Reference to the Post collection
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User collection
});

module.exports = mongoose.model('Comment', commentSchema); // 'Comment' will correspond to the 'comments' collection
