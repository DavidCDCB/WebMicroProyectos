const {Schema,model} = require('mongoose')

const articuloSchema = new Schema({
    nombre:{
        type:String
    },
    categoria:{
        type:String
    },
    cantidad:{
        type:Number
    },
    marca:{
        type:String
    },
    color:{
        type:String
    },
    precio:{
        type:Number
    },
    descripciones:{
        type:Array
    },
    imagenes:{
        type:Array
    },
    valoracion:{
        type:Number
    }, 
    compras:{
        type:Number
    }
})

module.exports = model('Articulo',articuloSchema)