var mongoose = require('mongoose'),
    _ = require('underscore'),
    roomTokenizer = function(msg) {
      var tokens = [];
      
      tokens = tokens.concat(msg.content.split(' '));
      tokens.push(msg.author);

      return tokens;
    };

exports.init = function(db) {

    var EntitySchemaDefinition,
        EntitySchema, 
        EntityModel;

    //create schema
    EntitySchemaDefinition = {
      content : { type: String, required: true },
      author: {
        email: String,
        username: String,
        avatar: String
      },
      room: { type:  mongoose.Schema.ObjectId, required: true },
      status: { type: Number, required: true },
      date : { type: Date },
      keywords: [String]
    };

    EntitySchema =  new mongoose.Schema(EntitySchemaDefinition, {autoIndex: false} );

    EntitySchema.index({keywords: 1});
    
    //during save update all keywords
    EntitySchema.pre('save', function(next) { 
      //set dates
      if ( !this.date ) {
        this.date = new Date();
      }

      //clearing keywords
      this.keywords.length = 0;

      //adding keywords
      this.keywords = this.keywords.concat(roomTokenizer(this));

      next();
    });

    EntityModel = db.model('Message', EntitySchema);
    
    return EntityModel;
};