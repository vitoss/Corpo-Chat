/* Base list for entities */

exports.getList = function(req, res, model) {
    var limit = req.query.limit || 10,
                offset = req.query.offset || 0,
                sort = {}, sortQuery = req.query.sort,
                searchWord = req.query.q, 
                query = searchWord ? { keywords : searchWord.toLowerCase() } : {};

    //parsing sort
    if(sortQuery) {
        if(sortQuery.indexOf(',') > 0) {
            sortQuery = sortQuery.split(',');
            sort[sortQuery[0]] = sortQuery[1] === 'asc' ? 1 : -1;
        } else {
            sort[sortQuery] = 1;
        }
    }

    model.find(query,{}, { skip: offset, limit: limit, sort: sort }, function(err, docs) {
        if(err) {
            res.send(500, "Error while retriving entity list." + err);
            return;
        }

        res.send(200, JSON.stringify(docs));
    });
};

exports.getOne = function(req, res, Entity, discriminator, entityName) {

    Entity.find(discriminator, function(err, docs) {
        if(err) {
            res.send(500, 'Error while retriving ' + entityName + '. Details: ' + err);
            return;
        }

        if(docs.length === 0) {
            res.send(404, entityName + ' not found.');
            return;
        }

        if(docs.length > 1) {
            res.send(409, 'More than one ' + entityName + ' found.');
            return;
        }

        res.send(200, JSON.stringify(docs[0]));
        return;
    });
};

exports.del = function(req, res, Entity, discriminator, entityName) {
    Entity.find(discriminator, function(err, entities) {
        if(err) {
            res.send(500, 'Error while deleting ' + entityName + '. ' + entityName + ' not found. Details: ' + err);
            return;
        }

        if(entities.length === 0) {
            res.send(404, entityName + ' with not found.');
            return;
        }

        if(entities.length > 1) {
            res.send(409, 'More than one ' + entityName + ' found. Aborting removal.');
            return;
        }

        var entity = entities[0]; //first and only entity
        entity.remove(function(err) {
            if(!err) {
                res.send(200, JSON.stringify({deleted:true}));
                return;
            } else {
                res.send(500, 'Something terrible happened during delete. Details: ' + err);
            }
        });
    });
};

exports.add = function(req, res, Entity, entityName, entityData) {
    var newEntity;

    newEntity = new Entity(entityData);
    newEntity.save(function(err) {

        if(err) {
            res.send(500, 'Error while saving new ' + entityName + '. ' + err);
            return;
        }

        res.send(201, JSON.stringify(newEntity));
    });
};

exports.addOrUpdate = function(req, res, Entity, entityName, entityData) {
    
    Entity.find({_id : entityData._id}, function(err, entities) {
        if(err) {
            res.send(500, 'Error while deleting ' + entityName + '. ' + entityName + ' not found. Details: ' + err);
            return;
        }

        if(entities.length === 0) {
            exports.add(req, res, Entity, entityName, entityData);

            return;
        }

        if(entities.length > 1) {
            res.send(409, 'More than one ' + entityName + ' found. Aborting removal.');
            return;
        }

        //update
        var entity = entities[0];

        delete entityData._id;

        entity.update(entityData, function(err, entities) {
            if(err) {
                res.send(500, 'Error while updating ' + entityName + '. ' + entityName + ' not found. Details: ' + err);
                return;
            }

            res.send(200, JSON.stringify(entity));
            return;
        })
    });
    
};