const jwt = require('jsonwebtoken');

const currentUser = async(req, res) => {

    const token = req.cookies['jwt'];
    const payload = jwt.verify(token, process.env.JWT_KEY);

    res.status(200).send({
        id: payload.id,
        name: payload.name,
        email: payload.email
    })
}

module.exports = currentUser;