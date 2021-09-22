//https://www.w3schools.com/nodejs/nodejs_mysql.asp
//https://desarrolloweb.com/manuales/manual-nodejs.html
//https://fernando-gaitan.com.ar/introduccion-a-node-js-parte-5-enviar-formularios-por-post/

//https://oracle.github.io/node-oracledb/
//https://www.oracle.com/technetwork/es/articles/database-performance/restful-node-3813084-esa.html
//https://github.com/oracle/node-oracledb/tree/master/examples
//https://oracle.github.io/node-oracledb/doc/api.html#connectionstrings

//https://github.com/oracle/node-oracledb/blob/master/examples/em_insert2.js
//https://github.com/oracle/node-oracledb/blob/master/examples/em_rowcounts.js

/*
console.clear();
const init = require('./inicio.js');

const hostname = '127.0.0.1';
const port = 2020;

init.initServerExp(hostname,port);

*/

const oracledb = require('oracledb')
const config = {
  user: 'DAVID',
  password: 'gnucdcb',
  connectString: 'localhost:1521/xe'
}

async function getEmployee (empId) {
  let conn

  try {
		conn = await oracledb.getConnection(config)	

		const result3 = await conn.execute(
			"SELECT DISTINCT count(*) FROM cambios"
		)
		console.log(result3.rows[0]);

		const result = await conn.execute(
			"INSERT INTO matriculas VALUES (:d1,:d2,:d3,:d4)",[102,'HIS',101,'C']
		)
		 
		conn.commit();

		const result4 = await conn.execute(
			"SELECT DISTINCT count(*) FROM cambios"
		)
		console.log(result4.rows[0]);
		
		const result5 = await conn.execute(
			"SELECT * FROM cambios",[],{ dmlRowCounts: true }
		)
		console.log(result5);

	} catch (err) {
		console.log('Ouch!', err)
	} finally {
		if (conn) { // conn assignment worked, need to close
		  await conn.close()
		}
	}
}

getEmployee(101)
