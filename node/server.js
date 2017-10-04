var connect 	= require('connect'),
	serveStatic = require('serve-static'),
	fs			= require('fs'),
	__args		= process.argv,
	__dir		= __dirname + '/../build/',
	port 		= 8082;

var app = connect();

app.use(serveStatic(__dir));
app.listen(8082);

module.exports = connect;