let respuesta = (estado,res,mensaje)=>{
	return {
		estatus:estado,
		info:mensaje,
		data:res
	}
}

let verPeticion=(data)=>{
	console.clear();
	console.log("\n --->Datos recibidos");
	console.table(data);
}

//Creacion de objeto Json
let objInicio={
	respuesta : respuesta,
	verPeticion : verPeticion
};

//Exportando objeto
module.exports = objInicio;