let ip = require("ip");

//Puerto de acceso desde nuestro localhost
process.env.PORT = 3000;
process.env.IPV4 = ip.address();

//Entorno de desarrollo (dev, local, prod, test)
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//Cadena de conexión a nuestra bd.
let urlDB = "";
if (process.env.NODE_ENV === 'dev') {
    urlDB = "mongodb://localhost/ApiDb";
} else {
    urlDB = "here write the mongo connection with mongo atlas and      other type of connection mode"
};
process.env.URLDB = urlDB;

//Caducidad del token
process.env.CADUCIDAD_TOKEN = '24h';

//Seeds de autenticación
process.env.SEED_AUTENTICACION = process.env.SEED_AUTENTICACION ||  'este-es-el-seed-desarrollo';

//Secreto, cual secreto pendejo
process.env.SECRET = "mitextosupersecreto"
