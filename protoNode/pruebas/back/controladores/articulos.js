const Articulo = require('./../modelos/articulo.model');
const utiles = require('./../herramientas/utiles');

let procesos = {
	insertar: async (req, res) => {
		utiles.verPeticion(req.body);
        const { nombre, categoria, cantidad, marca, color, precio, descripciones, imagenes, valoracion, compras } = req.body;
        const newArticulo = new Articulo({
            nombre: nombre,
            categoria: categoria,
            cantidad: cantidad,
            marca: marca,
            color: color,
            precio: precio,
            descripciones: descripciones,
            imagenes: imagenes,
            valoracion: valoracion,
            compras: compras
        });
		
		try{
			await newArticulo.save((err,dato) => {
				if(err){
					return res.status(400).json(utiles.respuesta(false,err,"Almacenamiento fallido"));
				}else
					return res.status(200).json(utiles.respuesta(true,dato,"Almacenado correctamente"));
			});
		}catch(e){
			console.log(e);
			res.status(500).json({alerta:'Error en servidor'});
			next(e);
		}
    },
	consultaTodo: async (req, res) => {
		try{
			const articulos = await Articulo.find().then((datos,error)=>{
				
				if(datos==null){
					return res.status(404).json(utiles.respuesta(false,datos,"Sin resultados"));
				}else if(datos.length>0){
					return res.status(200).json(utiles.respuesta(true,datos,"Datos Consultados"));
				}else{
					return res.status(404).json(utiles.respuesta(false,datos,"Sin resultados"));
				}
			});
		}catch(e){
			console.log(e);
			res.status(500).json({alerta:'Error en servidor'});
			next(e);
		}
    },
	
	consultaParticular: async (req, res) => {
		try{
			const articulo = await Articulo.find(req.body).then((datos)=>{
				if(datos==null){
					return res.status(404).json(utiles.respuesta(false,datos,"Sin resultados"));
				}else if(datos.length>0){
					return res.status(200).json(utiles.respuesta(true,datos,"Datos Consultados"));
				}else{
					return res.status(404).json(utiles.respuesta(false,datos,"Sin resultados"));
				}
			});
		}catch(e){
			console.log(e);
			res.status(500).json({alerta:'Error en servidor'});
			next(e);
		}
    },
	actualizar: async (req, res) => {
        const { nombre, categoria, cantidad, marca, color, precio, descripciones, imagenes } = req.body.datoNuevo;
		let criterio= req.body.criterio;
        const newArticulo ={
            nombre: nombre,
            categoria: categoria,
            cantidad: cantidad,
            marca: marca,
            color: color,
            precio: precio,
            descripciones: descripciones,
            imagenes: imagenes
        }
		try{
			await Articulo.updateOne(criterio,{$set: newArticulo}).then((datos)=>{
				if(datos.nModified==0){
					return res.status(404).json(utiles.respuesta(false,datos,"Articulo no Actualizado"));
				}else
					return res.status(200).json(utiles.respuesta(true,datos,"Articulo Actualizado"));
			});
		}catch(e){
			console.log(e);
			res.status(500).json({alerta:'Error en servidor'});
			next(e);
		}
    },
	eliminar: async (req, res) => {
		try{
			const articulo =await Articulo.deleteOne(req.body).then((datos)=>{
				if(datos.deletedCount==0){
					return res.status(404).json(utiles.respuesta(false,datos,"Articulo no encontrado"));
				}else
					return res.status(200).json(utiles.respuesta(true,datos,"Articulo eliminado"));
			});
		}catch(e){
			console.log(e);
			res.status(500).json({alerta:'Error en servidor'});
			next(e);
		}
    }
	
}

module.exports = procesos;
