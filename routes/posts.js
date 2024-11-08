import express from 'express';
import Post from '../models/post.js';
import User from '../models/user.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// POST route to create a new post
router.post('/', async (req, res) => {
    const { title, content, userId } = req.body;

    // Check if all required fields are provided
    if (!title || !content || !userId) {
        return res.status(400).json({ message: 'Title, content, and userId are required' });
    }

    try {
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a new post with a reference to the user
        const newPost = new Post({
            title,
            content,
            user: userId // Associate the post with the user's ID
        });

        await newPost.save();

        // Return the created post with the user's details populated
        res.status(201).json(newPost);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// GET route to fetch all posts by a specific user
router.get('/user/:userID', async (req, res) => {
    const { userID } = req.params;

    try {
        // Find posts where the `user` field matches the given userID
        const posts = await Post.find({ user: userID }).populate('user', 'username email');

        // If no posts are found, return a 404 message
        if (posts.length === 0) {
            return res.status(404).json({ message: 'No posts found for this user' });
        }

        // Return the list of posts
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// PUT route to update a post's title and content by post ID
router.put('/:postID', async (req, res) => {
    const { postID } = req.params;
    const { title, content } = req.body;

    // Ensure at least one field is provided for the update
    if (!title && !content) {
        return res.status(400).json({ message: 'Please provide a title or content to update' });
    }

    try {
        // Build the update object dynamically
        const updates = {};
        if (title) updates.title = title;
        if (content) updates.content = content;

        // Find the post by ID and update the fields as needed
        const updatedPost = await Post.findByIdAndUpdate(
            postID,
            updates, // Fields to update
            { new: true, runValidators: true } // Options: return the updated document and run validators
        );

        // If post not found
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Return the updated post data
        res.json(updatedPost);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// DELETE route to delete a post by post ID
router.delete('/:postID', async (req, res) => {
    const { postID } = req.params;

    try {
        // Find the post by ID and delete it
        const deletedPost = await Post.findByIdAndDelete(postID);

        // If post not found
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Return a success message
        res.json({ message: 'Post deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;