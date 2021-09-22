const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const Usuario = require('./../modelos/usuario.model');//Importacion del modelo para crear la instancia
const verifyToken = require('./../herramientas/verifyToken')
const passport = require('passport');
const utiles = require('./../herramientas/utiles');
require('./../config');
//const { OAuth2Client } = require('google-auth-library');

//https://ewebik.com/nodejs/nodemailer
let procesos = {
	registro : async (req, res) => {
		utiles.verPeticion(req.body);
	
        let { names, lastNames, address, email, password } = req.body;
        let usuario = new Usuario({
            nombre: names,
            apellidos: lastNames,
            direccion: address,
            email: email,
            password: password,
            role: 'SHOPPER',
            isActive: false
        });

		try{
			usuario.password = await usuario.encryptPassword(usuario.password);
			await usuario.save((err,usuarioDB) => {
				if(err){
					return res.status(400).json(utiles.respuesta(false,err,"Registro Fallido"));
				}else
					return res.status(200).json(utiles.respuesta(true,usuarioDB,"Registro Exitoso"));
			});
		}catch(e){
			console.log(e);
			res.status(500).json({alerta:'Error en servidor'});
			next(e);
		}
    },
	
	ingreso: async (req, res) => {
		utiles.verPeticion(req.body);
        const { email, password } = req.body;
		try{
			//Verifica validacion
			const usuario = await Usuario.findOne({ email: email });
			if (!usuario) { //Si el email es incorrecto
				return res.status(404).json(utiles.respuesta(false,[],'El email '+email+' no esta registrado o la contraseña es incorrecta'));
			} else if (usuario.isActive == false) { //Si la cuenta no esta activa aun
				return res.status(404).json(utiles.respuesta(false,[],'Revise el email ' + email + ' para activar su cuenta'));
			}

			//Si esta validaddo verifica contraseña
			const correcto = await usuario.validatePassword(password);
			if (!correcto) { //Si la contraseña es incorrecta
				return res.status(404).json(utiles.respuesta(false,[],'El email '+email+' no esta registrado o la contraseña es incorrecta'));
			}

			//Si todo esta correcto asigna un token de la sesion para ese usuario
			const token = jwt.sign({ id: usuario._id }, process.env.SECRET, { expiresIn: process.env.CADUCIDAD_TOKEN });
			return res.json({ auth: true, token })
		}catch(e){
			console.log(e);
			res.status(500).json({alerta:'Error en servidor'});
			next(e);
		}
    },
	consultas : async (req, res) => {
		let usuarios = [];
		try{
			//buscar conicidencia de patron en cualquier parte
			//.find({'key':new RegExp(patron,'i')});
			let usuarios = await Usuario.find(req.body).then((datos)=>{
				if(datos.length==0){
					return res.status(404).json(utiles.respuesta(false,datos,"Sin resultados"));
				}else
					return res.status(200).json(utiles.respuesta(true,datos,"Datos Consultados"));
			});
		}catch(e){
			console.log(e);
			res.status(500).json({alerta:'Error en servidor'});
			next(e);
		}
    }
}


//module.exports = router;
module.exports = procesos;
