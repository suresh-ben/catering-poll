const CustomError = require('./custom-error');

module.exports = class PollUnIdentifyError extends CustomError {
    constructor(message) {
        super(message || 'Poll not created yet!!');
        this.statusCode = 500;
    }

    serializeErrors = () => {
        return [{
            message: this.message
        }];
    }
}