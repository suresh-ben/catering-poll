const CustomError = require('./custom-error');

module.exports = class NotAuthorizedError extends CustomError {
    constructor(message) {
        super(message || 'User login required');
        this.statusCode = 400;
    }

    serializeErrors = () => {
        return [{
            message: this.message
        }];
    }
}