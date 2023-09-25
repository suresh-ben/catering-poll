const jwt = require('jsonwebtoken');
//should be used with auth middle-ware

const currentUser = (token) => {
    const payload = jwt.verify(token, process.env.JWT_KEY);

    return {
        id: payload.id,
        name: payload.name,
        email: payload.email,
        type: payload.type
    }
}

module.exports = currentUser;