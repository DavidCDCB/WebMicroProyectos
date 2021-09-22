const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const verifyToken = require('./../herramientas/verifyToken')
const controladores = require('./../controladores/articulos');
require('./../config');
//const { OAuth2Client } = require('google-auth-library');

//https://ewebik.com/nodejs/nodemailer

router.route('/').post(controladores.insertar);
router.route('/crud')
	.get(controladores.consultaTodo)
	.post(controladores.consultaParticular)
	.put(controladores.actualizar)
	.delete(controladores.eliminar);

module.exports = router;
