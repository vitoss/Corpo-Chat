/* Start service in production without grunt */
var port = parseInt(process.argv[2], 10) || 8881,
	hub = require('./hub.js');

hub.listen(port);