const RequestValidationError = require('../../../middlewares/errors/request-validation-error');

function isEmailValid(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
}


const validateSignUp = (name, mail, password) => {
    const passwordLength = 8;
    const errors = [];
    if (!name) errors.push({ subject: 'name', message: 'Name should be provided!' });
    if (!isEmailValid(mail)) errors.push({ subject: 'email', message: 'Email should be valid!' });
    if (!password || password.length < passwordLength) errors.push({ subject: 'password', message: 'password should contain minimum of 8 characters!' });

    if (errors.length) throw new RequestValidationError(errors);
}

const validateSignIn = (mail, password) => {
    const passwordLength = 8;
    const errors = [];
    if (!isEmailValid(mail)) errors.push({ subject: 'email', message: 'Email should be valid!' });
    if (password.length < passwordLength) errors.push({ subject: 'password', message: 'password should contain minimum of 8 characters!' });

    if (errors.length) throw new RequestValidationError(errors);
}

module.exports = {
    validateSignIn,
    validateSignUp
}