var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var modelSchema = new Schema({
  img: String,
  name: String,
  point: Number,
  quantity: String,
  status: { type:Boolean,default:false },
  order:[{
  	product_id: mongoose.Schema.Types.ObjectId
  }],
  date_added: Date,
  point_before: Number,
  shipping_detail: String,
  action: String,
  // order_detail: String,
  // customer_detail: 
},{
    timestamps: true,
  });

module.exports =  mongoose.model('sale', modelSchema);