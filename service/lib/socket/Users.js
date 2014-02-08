var Q = require('q'),
    db,
    Entity;

exports.init = function(database) {
    db = database;
    Entity = require('../model/User.js').init(db);

    return this;
};

exports.findOne = function(id) {
    var deferred = Q.defer();

    //check if room exists
    Entity.findOne({"_id": id},  function(err, doc) {
        if(err) {
            deferred.reject('User does not exists!');
            return;
        }

        
        deferred.resolve(doc);
    });

    return deferred.promise;
};

exports.findOneByEmail = function(email) {
    var deferred = Q.defer();

    //check if room exists
    Entity.findOne({"email": email},  function(err, doc) {
        if(err) {
            deferred.reject('User does not exists!');
            return;
        }

        
        deferred.resolve(doc);
    });

    return deferred.promise;
};

exports.post = function(user) {
    var deferred = Q.defer(),
        addUser = function() {
            var userEntity = new Entity(user);

            userEntity.status = 1;

            userEntity.save(function(err, doc) {

                if(err) {
                    deferred.reject('Error while saving new message. ' + err);
                    return;
                }

                deferred.resolve(doc);
            });
        };

    addUser();

    return deferred.promise;
};