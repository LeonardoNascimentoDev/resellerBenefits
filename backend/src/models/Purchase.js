const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema(
	{
		code: String,
		value: String,
		date: String,
		documentNumber: String,
		status: String,
		percentageCashback: String,
		valueCashback: String,
	},
	{ timestamps: true, collection: 'purchase' },
);

module.exports = mongoose.model('Purchase', PurchaseSchema);
