var vows = require('vows'),
    assert = require('assert'),
    io = require('socket.io-client'),
    events = require('events'),
    getSocket = function() {
                return io.connect('localhost', {
                    port: 8881,
                    'force new connection': true
                });
            },
    dataConfig = require('./../../data/config.js').config;

// Create a Test Suite
vows.describe('Messages API')
.addBatch({
    'when connecting': {
        topic: function () { 
            var promise = new(events.EventEmitter),
                socket = getSocket();

            socket.on('welcome', function(data) { promise.emit('success', data); }); 

            return promise;
        },

        'we have got welcome message': function (err, data) {
            assert.equal(data.status, 'ok');
        }
    },
    'when retriving room messages history': {
        topic: function() {
            var promise = new(events.EventEmitter),
                socket = getSocket();

            socket.emit('history', { room: dataConfig.roomId });
            socket.on('history', function(data) { promise.emit('success', data); }); 

            return promise;
        },

        'we have got message list': function(err, data) {
            assert.equal(dataConfig.roomId, data.room);
            assert.ok(data.messages.length > 0, 'Message list should not be empty.');
        },
        'every message has proper properties': function(err, data) {
            for(var i=0, l=data.messages.length; i<l; i++) {
                assert.isNotNull(data.messages[i].author);
                assert.isNotNull(data.messages[i].content);
                assert.isNotNull(data.messages[i].date);
            }
        }
    },
    'after subscribing to the room': {
        topic: function() {
            var promise = new(events.EventEmitter),
                socket = getSocket();

            socket.on('greetings', function(data) { promise.emit('success', data); }); 

            socket.emit('subscribe', {room: dataConfig.roomId});

            return promise;
        },

        'we should get greetings message': function(err, data) {
            assert.isNotNull(data);
        }
    },
    'after subscribing to the room and posting message': {
        topic: function() {
            var promise = new(events.EventEmitter),
                socket = getSocket(),
                socket2 = getSocket(); 

            socket.on('greetings', function(data) { console.log('Socket 1 greets'); });
            socket.on('msg', function(data) { promise.emit('success', data); });
            socket2.on('greetings', function(data) { 
                console.log('Socket 2 greets'); 
                socket2.emit('msg', {room: dataConfig.roomId, content: 'simple message', author: 'admin@goo.com'}); 
            });

            socket.emit('subscribe', {room: dataConfig.roomId});
            socket2.emit('subscribe', {room: dataConfig.roomId});
            
            return promise;
        },

        'we should get that message': function(err, data) {
            assert.isNotNull(data);
        }
    },
    'after subscribing to wrong room': {
        topic: function() {
            var promise = new(events.EventEmitter),
                socket = getSocket(); 

            socket.on('error', function(data) { promise.emit('success', data); });
            socket.emit('subscribe', {room: 'notexisting'});
            
            return promise;
        },

        'error should be received': function(err, data) {
            assert.isNotNull(data);
        }
    },
    'sending message to not existing room': {
        topic: function() {
            var promise = new(events.EventEmitter),
                socket = getSocket(); 

            socket.on('error', function(data) { promise.emit('success', data); });
            socket.emit('msg', {room: 'notexisting', content: 'simple message', author: 'admin@goo.com'});
            
            return promise;
        },

        'error should be received': function(err, data) {
            assert.isNotNull(data);
        }
    },
    'after sending message one should get confirmation in return': {
        topic: function() {
            var promise = new(events.EventEmitter),
                socket = getSocket();

            //confirmation
            socket.on('msg', function(data) { promise.emit('success', data); });
            
            socket.on('greetings', function(data) { 
                console.log('Socket greets'); 
                socket.emit('msg', {room: dataConfig.roomId, content: 'simple message', author: 'admin@goo.com'}); 
            });

            socket.emit('subscribe', {room: dataConfig.roomId});
            
            return promise;
        },

        'we should get that message': function(err, data) {
            assert.isNotNull(data);
        }
    },
    'after sending first message form unknown user, user is created and message is confirmed': {
        topic: function() {
            var promise = new(events.EventEmitter),
                socket = getSocket();

            //confirmation
            socket.on('msg', function(data) { promise.emit('success', data); });
            
            socket.on('greetings', function(data) { 
                console.log('Socket greets'); 
                var unknownEmail = 'unk'+(new Date()).getTime()+'@goo.com';
                socket.emit('msg', {room: dataConfig.roomId, content: 'simple message from unknown user', author: unknownEmail}); 
            });

            socket.emit('subscribe', {room: dataConfig.roomId});
            
            return promise;
        },

        'we should get that message': function(err, data) {
            assert.isNotNull(data);
        }
    }
})
.exportTo(module);