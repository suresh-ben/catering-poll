const { validateSignIn } = require('./services/validate-request');
const User = require('../../models/user');
const BadRequestError = require('../../middlewares/errors/bad-request-error');
const PasswordManager = require('./services/password-manager');
const createToken = require('./services/create-token');

const signIn = async(req, res) => {
    const { email, password } = req.body;

    //validate request
    validateSignIn(email, password);

    const user = await User.findOne({ email: email });
    if (!user) throw new BadRequestError('Invalid credentials: user does not exists');

    const passwordMatch = await PasswordManager.compare(password, user.password);
    if (!passwordMatch) throw new BadRequestError('Invalid credentials: password Incorrect');

    //store token as cookie
    const token = createToken(user._id, user.name, user.email);

    res
        .cookie('jwt', token)
        .send({ message: 'User Logged succefully...!!!' });
}

module.exports = signIn;