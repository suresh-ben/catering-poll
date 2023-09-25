const CustomError = require('./custom-error');

module.exports = class SetupError extends CustomError {
    constructor(message) {
        super(message || 'Error with server setup');
        this.statusCode = 500;
    }

    serializeErrors = () => {
        return [{
            message: this.message
        }];
    }
}