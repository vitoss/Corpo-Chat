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

        
        deferred.resolve();
    });

    return deferred.promise;
};