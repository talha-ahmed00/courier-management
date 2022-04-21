const jwt = require('jsonwebtoken')

const generateToken = (id) => {
    return jwt.sign({id}, "talha", {
        expiresIn: "30d",
    });
};

module.exports = generateToken;