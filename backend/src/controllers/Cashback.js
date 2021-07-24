const Reseller = require('../models/Reseller');
const Cashback = require('../providers/cashback');

exports.index = async (request, response, next) => {
	try {
		const reseller = await Reseller.findOne({ _id: request.userId });
		const cash = await Cashback(reseller.documentNumber.replace(/[^\d]+/g, ''));
		return response.status(200).json(cash.data.body);
	} catch (erro) {
		return response.status(500).json({ Erro: `Erro ao buscar cashback!: ${erro}.` });
	}
};
