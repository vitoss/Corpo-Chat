var Q = require('q'),
    db,
    Entity;

exports.init = function(database) {
    db = database;
    Entity = require('../model/Room.js').init(db);

    return this;
};

exports.findOne = function(id) {
    var deferred = Q.defer();

    //check if room exists
    Entity.findOne({"_id": id},  function(err, doc) {
        if(err) {
            deferred.reject('Room does not exists!');
            return;
        }

        
        deferred.resolve(doc);
    });

    return deferred.promise;
};

exports.changeCounter = function(id, mod) {
    var deferred = Q.defer();

    var update;
    if(mod > 0) {
        update = {$inc: {counter: 1}};
    } else {
        update = {$dev: {counter: 1}};
    }

    //check if room exists
    Entity.update({"_id": id}, update, {}, function(err, doc) {
        if(err) {
            deferred.reject('Room does not exists!');
            return;
        }

        
        deferred.resolve(doc);
    });

    return deferred.promise;
};