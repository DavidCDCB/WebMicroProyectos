const jwt = require('jsonwebtoken');
const Usuario = require('./../modelos/usuario.model')
require('./../config')

function verifyToken(req, res, next) {
    const token = req.header('x-access-token')
    if (!token) {
        return res.status(404).json({
            message: 'no token provided',
            auth: false
        })
    }
    try {
        var decoded = jwt.verify(token, process.env.SECRET);
    } catch (err) {
        return res.json({
            message: 'Unauthorized token',
            auth: false
        })
    }
    req.userId = decoded.id
    next()
}

module.exports = verifyToken