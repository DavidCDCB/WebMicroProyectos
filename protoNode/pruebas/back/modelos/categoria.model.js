const {Schema,model} = require('mongoose')

const categoriaSchema = new Schema({
    _id:{
        type:String
    },
    nombre:{
        type:String
    },
    imagen:{
        type:String
    }
})

module.exports = model('Categoria',categoriaSchema)