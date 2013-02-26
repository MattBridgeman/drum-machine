var connect 	= require('connect'),
	// __dirname 	= '/Users/katemoore/Documents/matt/bitbucket/drum-machine/',
	__dirname 	= '/Users/Matt/website/drum-machine/',
	port 		= 8080;

connect.createServer(
    connect.static(__dirname)
).listen(port);

require("lesscompile").init({
    pathToWatch: __dirname + "less",
    fileToCompile: __dirname + "less/main.less",
    destination: __dirname + "css/main.css",
    watchForChanges: true
});