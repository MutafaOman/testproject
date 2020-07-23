const mongoose = require('mongoose');


const schema = mongoose.Schema({
	name: String,
	phone: String,
	accountNumber: String,
},{
		timestamps: true,
});


module.exports = mongoose.model('blacklists', schema);