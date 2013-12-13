/*
 * serverHub
 * https://github.com//serverhub
 *
 * Copyright (c) 2013 
 * Licensed under the MIT license.
 */

'use strict';

var args = process.argv.splice(2),
    port = parseInt(args[0], 10) || 8881,
    app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    rest = require('./rest.js'),
    sockets = require('./sockets.js'),
    mongoose = require('mongoose'),
  	db = mongoose.createConnection('localhost', 'test', 27018);	

//CONFIGURATION
//plugins
app.use(express.bodyParser());
//app.use(express.methodOverride());
app.use(express.responseTime());
app.use(express.query());

//allow CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});

app.options('*', function(req, res, next) {
    res.send(200);
});
//END OF CONFIGURATION

//db hooking
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // yay!
});

rest.bootstrap(app, db);
sockets.bootstrap(io);

exports.listen = function(port) { return server.listen(port); };

server.listen(port);