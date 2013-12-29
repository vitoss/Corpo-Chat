exports.init = function(app, db) {
    var Entity = require('../model/Room.js').init(db),    
        BaseList = require('./BaseList'),
        entityEndpoint = '/rooms',
        entityName = 'Room';

    app.get(entityEndpoint, function(req, res){
        BaseList.getList(req, res, Entity);
    });

    app.get(entityEndpoint + '/:id', function(req, res) {
        var id = req.params.id;
        BaseList.getOne(req, res, Entity, {'_id': id}, entityName);
    });

    app.post(entityEndpoint, function(req, res) {

        var roomData = req.body;

        if(!roomData.status) {
            //default status
            roomData.status = 1;
        }

        BaseList.add(req, res, Entity, entityName, roomData);
    });

    //TODO currently only adds patient, do not update!
    app.put(entityEndpoint + '/:id', function(req, res) {

        var id = req.params.id,
        roomData = req.body;

        roomData._id = id;

        if(!roomData.status) {
            //default status
            roomData.status = 1;
        }

        BaseList.addOrUpdate(req, res, Entity, entityName, roomData);
    });

    app.del(entityEndpoint + '/:id', function(req, res) {
        var id = req.params.id;
        BaseList.del(req, res, Entity, {'_id': id}, entityName);
    });
};