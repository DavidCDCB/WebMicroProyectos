require('./config');
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
require('./herramientas/passport-setup');

app.set('port', process.env.PORT);
app.use(morgan('dev'));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use('/ApiDb/usuarios', require('./rutas/rutaUsuarios'));
app.use('/ApiDb/articulos', require('./rutas/rutaArticulos'));


module.exports = app;