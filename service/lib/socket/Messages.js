var Q = require('q'),
	db,
	Entity,
	Rooms;

exports.init = function(database) {
	db = database;
	Entity = require('../model/Message.js').init(db);
	Rooms = require('./Rooms.js').init(db);

	return this;
};

exports.getList = function(room, options) {
    var options = options || {},
    	limit = options.limit || 10,
        offset = options.offset || 0,
        sort = {}, sortQuery = options.sort,
        searchWord = options.q, 
        query = {'room': room},
        deferred = Q.defer();

    if(searchWord) {
    	query.keywords = searchWord;
    }

    //parsing sort
    if(sortQuery) {
        if(sortQuery.indexOf(',') > 0) {
            sortQuery = sortQuery.split(',');
            sort[sortQuery[0]] = sortQuery[1] === 'asc' ? 1 : -1;
        } else {
            sort[sortQuery] = 1;
        }
    }

    Entity.find(query,{}, { skip: offset, limit: limit, sort: sort }, function(err, docs) {
        if(err) {
            deferred.reject("Error while retriving entity list." + err);
            return;
        }

        deferred.resolve(docs);
    });

    return deferred.promise;
};

exports.post = function(msg) {
	var deferred = Q.defer(),
		addMessage = function() {
			var msgEntity = new Entity(msg);

			msgEntity.status = 1;

	    	msgEntity.save(function(err) {

		        if(err) {
		            deferred.reject('Error while saving new message. ' + err);
			        return;
			    }

		        deferred.resolve();
		    });
		};

	//check if room exists
	Rooms.findOne(msg.room).then(addMessage, function(reason) {
		deferred.reject(reason);
	});

	return deferred.promise;
};