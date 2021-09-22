const jwt = require('jsonwebtoken');
const Usuario = require('./../modelos/usuario.model')
require('./../config')

let verifyToken= async (req, res, next)=> {
    const token = req.header('x-access-token')
    if (!token) {
        return res.status(404).json({
            message: 'no token provided',
            auth: false
        })
    }
    try {
        var decoded = jwt.verify(token, process.env.SECRET);
		req.userId = decoded.id;
    } catch (err) {
        return res.json({
            message: 'Unauthorized token',
            auth: false
        })
    }
    next();
}

module.exports = verifyToken