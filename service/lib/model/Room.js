var mongoose = require('mongoose'),
    _ = require('underscore');

exports.init = function(db) {

    var EntitySchemaDefinition,
        EntitySchema, 
        EntityModel;

    //create schema
    EntitySchemaDefinition = {
      name : { type: String, required: true },
      owner: { type:  mongoose.Schema.ObjectId, required: true },
      status: { type: Number, required: true },
      created_at : { type: Date },
    };

    EntitySchema =  new mongoose.Schema(EntitySchemaDefinition, {autoIndex: false} );
    
    //during save update all keywords
    EntitySchema.pre('save', function(next) { 
      //set dates
      if ( !this.created_at ) {
        this.created_at = new Date();
      }

      next();
    });

    EntityModel = db.model('Room', EntitySchema);
    
    return EntityModel;
};