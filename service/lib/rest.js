//rest hub
exports.bootstrap = function(app, db) {
	//hello message
	app.get('/', function (req, res) {
        res.send(200, 'Welcome to Corpo-Chat-Hub');
    });

	var Rooms = require('./rest/Rooms.js');
	Rooms.init(app, db);
};