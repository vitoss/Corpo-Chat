var vows = require('vows'),
    assert = require('assert'),
    io = require('socket.io-client'),
    events = require('events'),
    socket = io.connect('localhost', {
            port: 8881
        }),
    dataConfig = require('./../../data/config.js').config;

// Create a Test Suite
vows.describe('Messages API')
.addBatch({
    'when connecting': {
        topic: function () { 
            var promise = new(events.EventEmitter);

            socket.on('welcome', function(data) { promise.emit('success', data); }); 

            return promise;
        },

        'we have got welcome message': function (err, data) {
            assert.equal(data.status, 'ok');
        }
    },
    'when retriving room messages history': {
        topic: function() {
            var promise = new(events.EventEmitter);

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
    }
})
.exportTo(module);