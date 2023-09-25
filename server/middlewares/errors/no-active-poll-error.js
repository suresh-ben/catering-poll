const CustomError = require('./custom-error');

module.exports = class NoActivePollError extends CustomError {
    constructor(message) {
        super(message || 'No active poll found!!');
        this.statusCode = 400;
    }

    serializeErrors = () => {
        return [{
            message: this.message
        }];
    }
}