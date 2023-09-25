const jwt = require('jsonwebtoken');

const NotAuthorizedError = require('./errors/not-authorized-error');

const auth = async(req, res, next) => {
    const token = req.cookies['jwt'];
    if (!token) throw new NotAuthorizedError();

    try {
        jwt.verify(token, process.env.JWT_KEY);
    } catch (err) {
        console.log(err)
        throw new NotAuthorizedError();
    }

    next();
}

module.exports = auth;