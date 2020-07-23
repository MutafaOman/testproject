var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var modelSchema = new Schema({
		user_id: mongoose.Schema.Types.ObjectId,
		order_id: String,
		user:{},
		order: [{
			product_id: mongoose.Schema.Types.ObjectId,
			amount: Number,
			name: String,
			img: String,
			point: Number,
			fee: Number,
			totalPrice: Number
		}],
		pointBofore: Number,
		fee: Number,
		nettotal: Number,
		point: Number,
		verify: Boolean,
		transport: Boolean,
		delivery : Boolean,
		address: String,
		order_status: Number,
		reject: Boolean,
		comment: String,
		status: Number
	},{
    	timestamps: true,
  	});

module.exports =  mongoose.model('orders', modelSchema);