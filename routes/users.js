import express from 'express';
import User from '../models/user.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Check if all required fields are provided
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please provide username, email, and password' });
    }

    try {
        // Check if the email or username is already in use
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(409).json({ message: 'Username or email already in use' });
        }

        // Create a new user
        const newUser = new User({ username, email, password });
        await newUser.save();

        // Return the created user (excluding password for security)
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;

    try {
        // Find the user by ID and update the fields as needed
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { username, email, password }, // Fields to update
            { new: true, runValidators: true } // Options: return the updated document and run validators
        );

        // If user not found
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the updated user data (excluding password in a real application for security)
        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            password: updatedUser.password,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// DELETE route to remove a user by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Find the user by ID and delete it
        const deletedUser = await User.findByIdAndDelete(id);

        // If user not found
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return a success message
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;
