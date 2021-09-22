require ('./config')
const mongoose = require('mongoose')

mongoose.Promise=global.Promise;
mongoose.connect(process.env.URLDB,{
	useNewUrlParser:true,
	useCreateIndex:true,
	useUnifiedTopology: true,
	useFindAndModify:false
}).then(mongoose => console.log('Conectado a: '+process.env.URLDB))
.catch(err => console.log(err));