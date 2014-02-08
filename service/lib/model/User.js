var mongoose = require('mongoose'),
    _ = require('underscore'),
    EntitySchemaDefinition,
    EntitySchema, 
    EntityModel;

exports.init = function(db) {

    if(!EntityModel) {
      //create schema
      EntitySchemaDefinition = {
        email : { type: String, required: true },
        avatar: { type: String, required: false }
      };

      EntitySchema =  new mongoose.Schema(EntitySchemaDefinition, {autoIndex: false} );

      EntityModel = db.model('User', EntitySchema);
    }
    
    return EntityModel;
};