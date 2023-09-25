const CustomError = require('./custom-error');

module.exports = class RecipeNotFound extends CustomError {
    constructor(message) {
        super(message || 'recipe not found!!!');
        this.statusCode = 400;
    }

    serializeErrors = () => {
        return [{
            message: this.message
        }];
    }
}