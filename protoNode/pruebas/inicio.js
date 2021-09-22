//https://code.tutsplus.com/es/articles/an-introduction-to-mongoose-for-mongodb-and-nodejs--cms-29527

const body_parser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const { Schema, model } = require('mongoose');
const app = express();

let MyModel=null;

let initServer = (hostname,port)=>{
	const http = require('http');//Importacion de modulo de solicitudes al servidor
	const app=http.createServer((req, res) => {//Creacion del server
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write("<h2>Men cuadre pues eso que ya tengo con que empezar</h2>");
		res.end();
	});

	app.listen(port,hostname,()=>{//Inicializacion del server
		console.clear();
		console.log("Server iniciado");
	});
}

let bd=()=>{

	//Conexion
	mongoose.Promise=global.Promise;
	mongoose.connect("mongodb://localhost/pruebaBd",{
		useNewUrlParser:true,
		useCreateIndex:true,
		useUnifiedTopology: true,
		useFindAndModify:false
	}).then(mongoose => console.log('DB is connected'))
	.catch(err => console.log(err));
	
	/*
	const connection = mongoose.connection
	connection.once('open',()=>{
		console.log('DB is connected')
	})*/
	
	//Modelo
	MyModel = mongoose.model('Test', new Schema({
		name: String,
		age: Number
	}));
		
}

let initServerExp=(hostname,port)=>{

	app.use(express.json());
	app.use(body_parser.urlencoded({extended:true}));
	app.use(morgan('dev'));
	
	//Ruta estatica para respuesta de /
	//crear public/index.html
	//app.use(express.static('public'));
	
	var verPeticion=(req,res,next)=>{
		console.clear();
		console.log("\n --->Datos recibidos")
		console.table(req.body);
		next();
	}
	app.use(verPeticion);
	
	app.get('/',(req, res)=>{
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write("<h2>Men cuadre pues eso que ya tengo con que empezar</h2>");
		res.end();
	});
	
	app.post('/entrada', (req, res) => {
		//verPeticion(req.body);
		return res.json({
			message: 'La cuenta ha sido creada, por favor activela desde su email',
			auth: false,
			peticion: req.body
        });	 
	});
	
	app.get('/consultar',async (req, res) => {
		try {
			await MyModel.find({}).limit(1).then((datos,err)=>{
				if (err) throw err;
				return res.json({success: true, datos});
			});
			
		} catch (error) {
			console.error(error);
			res.json({peticion: req.body, error: error.message});
			next(error);
		}
	});
	
	app.post('/insertar',async (req, res) => {
		try {
			//verPeticion(req.body);
			//Agregando datos
			let dato = new MyModel({
				name:req.body.nombre,
				age:req.body.edad
			})
			
			//Querys
			await dato.save((err) => {
				if (err) throw err;
				console.log('Dato insertado');
				res.json({
					peticion: req.body
				});	 
			});
	
		} catch (error) {
			console.error(error);
			res.json({peticion: req.body, error: error.message});
			next(error);
		}
	});
	
	app.listen(port,hostname,()=>{//Inicializacion del server
		console.clear();
		console.log("Server iniciado");
	}); 
	
	bd();
}

//Creacion de objeto Json
let objInicio={
	initServer : initServer,
	initServerExp : initServerExp
};

//Exportando objeto
module.exports = objInicio;

/*
app.get('/notifications', async (req, res, next) => {
  try {
    const user = await Users.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    if (!user) {
      res.json({success: false, message: "Username or password incorrect."});
      return;
    }

    const notifications = await Notifications.find({
      user: user._id
    });
    res.json({success: true, notifications});
  } catch (error) {
    //console.error(error);
    //res.json({success: false, error: error.message});
    next(error);
  }
});

*/