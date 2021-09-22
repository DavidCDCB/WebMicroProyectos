const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const verifyToken = require('./../herramientas/verifyToken')
const controladores = require('./../controladores/usuarios');
require('./../config');
//const { OAuth2Client } = require('google-auth-library');

//https://ewebik.com/nodejs/nodemailer

router.route('/registrar').post(controladores.registro);
router.route('/login').post(controladores.ingreso);
router.route('/query').post(controladores.consultas);


//Verificacion de token activo
router.route('/me')
    .all(function (req, res, next) {
        verifyToken(req, res, next)
    })
    .get(async (req, res, next) => {
        console.log(req.userId)
        const user = await Usuario.findById(req.userId)
        if (!user) {
            return res.status(404).json({
                message: 'Id user does not exist',
                auth: false
            })
        } else {
            return res.status(200).json({
                message: 'The token authentication is correct',
                auth: true,
                user: JSON.stringify(user)
            })
        }
    })

module.exports = router;
