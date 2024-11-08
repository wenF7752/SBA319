import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Reference to the User model
});

// Add an index on the `user` field to optimize queries by user
postSchema.index({ user: 1 });

const Post = mongoose.model('Post', postSchema);

export default Post;
