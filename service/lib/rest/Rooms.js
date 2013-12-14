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
        BaseList.getOne(req, res, Entity, {'id': id}, entityName);
    });
};