var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var modelSchema = new Schema({
  order_id: Number,
  customer: String,
  item : mongoose.Schema.Types.ObjectId,
  status: String,

});

module.exports =  mongoose.model('shipping', modelSchema);