# Commenting and Posting API

This is a Node.js and Express-based API that provides functionality for users to create posts, comment on them, and perform CRUD operations on both posts and comments. The data is stored in a MongoDB database, and Mongoose is used as an ODM for data modeling.

## Installation Start the server:

```bash
npm install
npm run dev
```

The server should now be running on `http://localhost:3000`.

## Usage

This API provides endpoints to perform CRUD operations on both posts and comments. You can interact with the API using Postman or any other API testing tool.

## API Endpoints

### Posts

#### Create a Post

- **Endpoint**: `POST /posts`
- **Description**: Creates a new post.
- **Request Body**:
  ```json
  {
    "title": "Post Title",
    "content": "Post content",
    "user": "userId"
  }
  ```
- **Response**: Returns the created post.

#### Get All Posts

- **Endpoint**: `GET /posts`
- **Description**: Retrieves all posts with user information populated.
- **Response**: Returns an array of posts with user details.

#### Get Posts by User

- **Endpoint**: `GET /posts/user/:userId`
- **Description**: Retrieves all posts created by a specific user.
- **Response**: Returns an array of posts by the user.

#### Update a Post

- **Endpoint**: `PUT /posts/:postId`
- **Description**: Updates the title and content of a specific post.
- **Request Body**:
  ```json
  {
    "title": "Updated Title",
    "content": "Updated content"
  }
  ```
- **Response**: Returns the updated post.

#### Delete a Post

- **Endpoint**: `DELETE /posts/:postId`
- **Description**: Deletes a specific post by its ID.
- **Response**: Success message indicating the post was deleted.

### Comments

#### Create a Comment

- **Endpoint**: `POST /comments`
- **Description**: Creates a new comment associated with a specific post and user.
- **Request Body**:
  ```json
  {
    "text": "This is a comment",
    "postId": "postId",
    "userId": "userId"
  }
  ```
- **Response**: Returns the created comment.

#### Get All Comments

- **Endpoint**: `GET /comments`
- **Description**: Retrieves all comments.
- **Response**: Returns an array of comments.

#### Update a Comment

- **Endpoint**: `PUT /comments/:commentId`
- **Description**: Updates the text of a specific comment.
- **Request Body**:
  ```json
  {
    "text": "Updated comment text"
  }
  ```
- **Response**: Returns the updated comment.

#### Delete a Comment

- **Endpoint**: `DELETE /comments/:commentId`
- **Description**: Deletes a specific comment by its ID.
- **Response**: Success message indicating the comment was deleted.

## Dependencies

- **Express**: Web framework for Node.js.
- **Mongoose**: MongoDB object modeling tool.
- **dotenv**: Loads environment variables from a `.env` file.
- **nodemon**: Utility for automatically restarting the server during development.
