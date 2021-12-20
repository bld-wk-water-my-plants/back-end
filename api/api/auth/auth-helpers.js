// ----- TOKEN BUILDER FUNCTION -----
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./secret');

function tokenBuilder (user) {
    return 'TOKEN BUILDER'
}

module.exports = tokenBuilder

