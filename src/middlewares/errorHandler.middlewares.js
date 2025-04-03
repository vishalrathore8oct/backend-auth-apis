const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        statusCode: statusCode,
        success: false,
        message: message,
        errors: err.errors || [],
    });
};

export { errorHandler };
