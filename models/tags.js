var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var modelSchema = new Schema({
 		name: String,
	  	description: String,
	},{
    	timestamps: true,
  	});

module.exports =  mongoose.model('tags', modelSchema);