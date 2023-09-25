const CustomError = require('./custom-error');

module.exports = class ChefOnlyError extends CustomError {
    constructor(message) {
        super(message || 'This operation is available only to chef');
        this.statusCode = 400;
    }

    serializeErrors = () => {
        return [{
            message: this.message
        }];
    }
}