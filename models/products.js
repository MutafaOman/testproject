var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var modelSchema = new Schema({
	  img: String,
	  name: String,
	  point: String,
	  img: String,
	  quantity: Number,
	  status: { type:Boolean, default:false },
	  catalog_id: mongoose.Schema.Types.ObjectId,
	  description:String,
	  product_tags:String,
	  cost: Number,
	  remain: Number,
	  tag_title:String,
	  tag_description: String,
	  tag_keyword:String,
	  price: Number,
	  model: String,
	  show:Boolean,
	  img_detail:[],
	  order: Number
	},{
    	timestamps: true,
  	});

module.exports =  mongoose.model('product_rewards', modelSchema);