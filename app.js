import express from 'express';
import dotenv from 'dotenv';
import comments from './routes/comments.js';
import posts from './routes/posts.js';
import users from './routes/users.js';
import errorHandler from './middleware/errorHandler.js';
import notFound from './middleware/notFound.js';
import connectDB from './config/db.js';
dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;


connectDB();
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/comments', comments);
app.use('/posts', posts);
app.use('/users', users);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});