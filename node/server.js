var connect 	= require('connect'),
	serveStatic = require('serve-static'),
	fs			= require('fs'),
	__args		= process.argv,
	__dir		= __dirname + '/../build/',
	port 		= 8081;

var app = connect();

app.use(serveStatic(__dir));
app.listen(8081);

module.exports = connect;