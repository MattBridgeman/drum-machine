var connect 	= require('connect'),
	fs			= require('fs'),
	__args		= process.argv,
	__dirname 	= [
					'/Users/mbridgeman/Documents/labs/drum-machine/',
					'/Users/matthewbridgeman/Documents/repo/labs/drum-machine/'	
				],
	port 		= 8081,
	name		= '';

(function(){
	__dirname.forEach(function(dir){
		try {
			if(fs.lstatSync(dir).isDirectory()) name = dir;
		} catch(e){
			
		}
	});
})();

connect.createServer(
	connect.static(name)
).listen(port);

module.exports = connect;