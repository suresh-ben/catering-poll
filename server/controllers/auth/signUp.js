const { validateSignUp } = require('./services/validate-request');
const User = require('../../models/user');
const BadRequestError = require('../../middlewares/errors/bad-request-error');
const PasswordManager = require('./services/password-manager');
const createToken = require('./services/create-token');

const signUp = async(req, res) => {
    const { name, email, password } = req.body;

    //validate request
    validateSignUp(name, email, password);

    //check for user existance
    const existingUser = await User.findOne({ email: email });
    if (existingUser) throw new BadRequestError('Email already in use');

    //create user
    const hashPassword = await PasswordManager.toHash(password);
    const user = await User.create({
        name: name,
        email: email,
        password: hashPassword
    });

    //store token as cookie
    const token = createToken(user._id, user.name, user.email);

    res
        .cookie('jwt', token)
        .send({ message: 'User created succefully...!!!' });
}

module.exports = signUp;