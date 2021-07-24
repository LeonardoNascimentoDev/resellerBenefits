const mongoose = require('mongoose');

const ResellerSchema = new mongoose.Schema(
	{
		name: String,
		documentNumber: String,
		email: String,
		password: String,
	},
	{ timestamps: true, collection: 'reseller' },
);

module.exports = mongoose.model('Reseller', ResellerSchema);
