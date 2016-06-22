var connect 	= require('connect'),
	fs			= require('fs'),
	__args		= process.argv,
	__dir		= __dirname + '/../build/',
	port 		= 8081;

connect.createServer(
	connect.static(__dir)
).listen(port);

module.exports = connect;