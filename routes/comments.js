import express from 'express';
import Comment from '../models/comment.js';
import Post from '../models/post.js';
import User from '../models/user.js';


const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// POST route to create a new comment
router.post('/', async (req, res) => {
    const { text, postId, userId } = req.body;

    // Check if all required fields are provided
    if (!text || !postId || !userId) {
        return res.status(400).json({ message: 'Text, postId, and userId are required' });
    }

    try {
        // Ensure the post exists
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Ensure the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a new comment
        const newComment = new Comment({
            text,
            postId,
            userId
        });

        await newComment.save();

        // Return the created comment
        res.status(201).json(newComment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// PUT route to edit a comment by comment ID
router.put('/:commentId', async (req, res) => {
    const { commentId } = req.params;
    const { text } = req.body;

    // Ensure text is provided
    if (!text) {
        return res.status(400).json({ message: 'Text is required to update the comment' });
    }

    try {
        // Find the comment by ID and update the text
        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            { text },
            { new: true, runValidators: true } // Options: return the updated document and run validators
        );

        // If comment not found
        if (!updatedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Return the updated comment
        res.json(updatedComment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// DELETE route to delete a comment by comment ID
router.delete('/:commentId', async (req, res) => {
    const { commentId } = req.params;

    try {
        // Find the comment by ID and delete it
        const deletedComment = await Comment.findByIdAndDelete(commentId);

        // If comment not found
        if (!deletedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Return a success message
        res.json({ message: 'Comment deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;