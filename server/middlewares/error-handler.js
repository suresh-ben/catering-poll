module.exports = function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 400; //defalult be client error
    const error = (err.serializeErrors ? err.serializeErrors() : undefined) || [{ message: err.message || 'Something went wrong' }];

    res.status(statusCode).send({
        errors: error
    });
}