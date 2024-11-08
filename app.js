const express = require('express');


//Import routes
const comments = require('./routes/comments');
const posts = require('./routes/posts');
const users = require('./routes/users');


//Import middleware
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');




require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});


//Define Routes
app.use('/comments', comments);
app.use('/posts', posts);
app.use('/users', users);


//Middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


