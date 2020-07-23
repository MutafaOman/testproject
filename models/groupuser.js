//load the things we need
var mongoose = require('mongoose');

//define the schema for our user model
var schema = mongoose.Schema({	
    name: String,
    order: String,
	color: String,
},{
    timestamps: true,
});

// 0 New, 1 Gen1, 2 Gen2, 3 VIP


//create the model for users and expose it to our app
module.exports = mongoose.model('groupusers', schema);