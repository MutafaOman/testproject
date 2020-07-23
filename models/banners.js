var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var modelSchema = new Schema({
		name: String,
		img: String,
		order: Number,
	},{
    	timestamps: true,
  });

module.exports =  mongoose.model('banners', modelSchema);