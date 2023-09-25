const CustomError = require('./custom-error');

module.exports = class UserAlreadyVoteError extends CustomError {
    constructor(message) {
        super(message || 'User have already made vote a dish');
        this.statusCode = 400;
    }

    serializeErrors = () => {
        return [{
            message: this.message
        }];
    }
}