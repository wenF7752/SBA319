// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
    // Default to a 500 Internal Server Error if no status code is set
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    // Customize error response based on the error type
    let errorResponse = {
        message: 'Internal Server Error',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    };

    // Handle common error types
    if (err.name === 'ValidationError') {
        // Handle Mongoose Validation Errors
        res.status(400);
        errorResponse.message = 'Validation Error';
        errorResponse.details = Object.values(err.errors).map(e => e.message);  // Specific validation messages
    } else if (err.name === 'CastError' && err.kind === 'ObjectId') {
        // Handle Mongoose Invalid ObjectId Errors
        res.status(404);
        errorResponse.message = 'Resource not found';
    } else if (err.code && err.code === 11000) {
        // Handle MongoDB Duplicate Key Error (e.g., for unique fields)
        res.status(409);
        const field = Object.keys(err.keyValue)[0];
        errorResponse.message = `Duplicate value for field: ${field}`;
    } else if (err.name === 'UnauthorizedError') {
        // Handle authentication errors (e.g., JWT errors)
        res.status(401);
        errorResponse.message = 'Unauthorized: Access is denied';
    } else if (statusCode === 404) {
        // Handle 404 errors gracefully
        errorResponse.message = 'Not Found';
    } else {
        // General server error
        errorResponse.message = err.message || 'Internal Server Error';
    }

    // Send the error response
    res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;
