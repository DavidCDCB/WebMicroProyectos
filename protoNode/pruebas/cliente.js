//https://www.w3schools.com/nodejs/nodejs_mysql.asp
//https://desarrolloweb.com/manuales/manual-nodejs.html
//https://fernando-gaitan.com.ar/introduccion-a-node-js-parte-5-enviar-formularios-por-post/

console.clear();
var request = require('request');
const init = require('./inicio.js');
var h = require('headers');

const hostname = '127.0.0.1';
const port = 2020;

init.initServerExp(hostname,port);

var options = {
  'method': 'GET',
  'url': 'http://localhost:3000/ApiDb/articulos/crud',
  'headers': {
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});


var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({"names":"Cristian","lastNames":"david","address":"dsadsa","email":"sad123ews32ad2","password":"dqwewqew"});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:3000/ApiDb/usuarios/registrar", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
