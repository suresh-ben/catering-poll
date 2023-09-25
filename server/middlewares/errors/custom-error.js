module.exports = class CustomError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 400; //default user error
    }

    serializeErrors() {
        throw new Error("Abstract method serializeErrors must be implemented");
    }
}