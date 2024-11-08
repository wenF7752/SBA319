// scripts/seedUsers.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';
import User from '../models/user.js'; // Adjust the path to your User model if necessary

dotenv.config();

const db = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

const seedUsers = async () => {
    try {
        // Connect to database
        await connectDB();

        // Clear existing users if necessary
        await User.deleteMany();
        console.log('Existing users removed.');

        // Generate dummy users
        const users = Array.from({ length: 10 }).map(() => ({
            username: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(8) // Note: password should ideally be hashed in production
        }));

        // Insert dummy users into the database
        await User.insertMany(users);
        console.log('Dummy users added.');

        // Close the connection
        mongoose.connection.close();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

// Run the seed function
seedUsers();
