const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    let errorResponse = {
        message: 'Internal Server Error',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    };

    if (err.name === 'ValidationError') {
        res.status(400);
        errorResponse.message = 'Validation Error';
        errorResponse.details = Object.values(err.errors).map(e => e.message);
    } else if (err.name === 'CastError' && err.kind === 'ObjectId') {
        res.status(404);
        errorResponse.message = 'Resource not found';
    } else if (err.code && err.code === 11000) {
        res.status(409);
        const field = Object.keys(err.keyValue)[0];
        errorResponse.message = `Duplicate value for field: ${field}`;
    } else if (err.name === 'UnauthorizedError') {
        res.status(401);
        errorResponse.message = 'Unauthorized: Access is denied';
    } else if (statusCode === 404) {
        errorResponse.message = 'Not Found';
    } else {
        errorResponse.message = err.message || 'Internal Server Error';
    }

    res.status(statusCode).json(errorResponse);
};

export default errorHandler;