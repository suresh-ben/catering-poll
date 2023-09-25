const jwt = require('jsonwebtoken');


const createToken = (id, name, email, type) => {
    const token = jwt.sign({
        id: id,
        name: name,
        email: email,
        type: type
    }, process.env.JWT_KEY, {
        expiresIn: '24h'
    });

    return token;
}

module.exports = createToken;