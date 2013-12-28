var mongoose = require('mongoose'),
    _ = require('underscore'),
    roomTokenizer = function(room) {
      return room.name.split(' ');
    };

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
      keywords: [String]
    };

    EntitySchema =  new mongoose.Schema(EntitySchemaDefinition, {autoIndex: false} );

    EntitySchema.index({keywords: 1});
    
    //during save update all keywords
    EntitySchema.pre('save', function(next) { 
      //set dates
      if ( !this.created_at ) {
        this.created_at = new Date();
      }

      //clearing keywords
      this.keywords.length = 0;

      //adding keywords
      this.keywords = this.keywords.concat(roomTokenizer(this));

      next();
    });

    EntityModel = db.model('Room', EntitySchema);
    
    return EntityModel;
};