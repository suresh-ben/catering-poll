const NotAuthorizedError = require('./errors/not-authorized-error');

const auth = async(req, res, next) => {
    const token = req.cookies['jwt'];
    if (!token) throw new NotAuthorizedError();

    try {
        jwt.verify(token, process.env.JWT_KEY);
        return true;
    } catch (err) {
        throw new NotAuthorizedError();
    }

    next();
}