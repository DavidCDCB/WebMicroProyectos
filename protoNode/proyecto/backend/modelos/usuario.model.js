const bcrypt = require('bcrypt');
const { Schema, model } = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ["ADMIN", "SHOPPER", "TRADER"],
    message: '{VALUE} no es un role válido'
}

//https://www.npmjs.com/package/password-validator
//https://www.npmjs.com/package/email-validator

//Esquema de entidad
const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario'],
    },
    apellidos: {
        type: String,
        required: false
    },
    direccion: {
        type: String,
        required: false
    },
    email: {
        type: String,
        unique: true,
        required: [true, "El correo es necesario"],
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
    },
    isActive: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: 'SHOPPER',
        required: [true],
        enum: rolesValidos,
    },
})

//Encripta la contraseña
usuarioSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}

//Borra la contraseña del objeto que se devuelve cuando se postea un usuario
usuarioSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

//Verificar la contraseña
usuarioSchema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.password)
}

usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} debe ser único'
})

//Esportacion del modelo a partir del esquema
module.exports = model('Usuario', usuarioSchema) 