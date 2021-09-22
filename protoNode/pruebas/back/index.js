require('./config')
const app = require('./app')
require('./database')

async function main(){
    await app.listen(process.env.PORT)
	console.clear();
    console.log('Servidor iniciado en: '+process.env.PORT)
}

main()