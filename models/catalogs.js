var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var modelSchema = new Schema({
	  name: String,
	  description: String,
	  order: Number
	},{
    timestamps: true,
  });

module.exports =  mongoose.model('catalogs', modelSchema);