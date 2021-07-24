const validation = require('../validation/purchase');
const Validator = require('validatorjs');

const Purchase = require('../models/Purchase');

exports.store = async (request, response, next) => {
	try {
		const rules = validation.rules;
		const validationFields = new Validator(request.body, rules);
		if (validationFields.fails()) {
			return response.status(400).json({ erros: validationFields.errors.all() });
		}

		const { code, value, date, documentNumber } = request.body;

		let status = 'Em validação';
		if (documentNumber === '153.509.460-56') {
			status = 'Aprovado';
		}

		const purchasePeriod = await Purchase.find({ date: date, documentNumber: documentNumber });
		let amount = 0;

		purchasePeriod.forEach(function (item) {
			amount += Number(item.value);
		});

		let percentageCashback = 0;
		let valueCashback = 0;

		amount += Number(value);

		if (amount <= 1000) {
			percentageCashback = 10;
			valueCashback = value * 0.1;
		} else if (amount <= 1500) {
			percentageCashback = 15;
			valueCashback = value * 0.15;
		} else if (amount > 1500) {
			percentageCashback = 20;
			valueCashback = value * 0.2;
		}

		purchase = await Purchase.create({
			code,
			value,
			date,
			documentNumber,
			status: status,
			percentageCashback: percentageCashback,
			valueCashback: valueCashback,
		});

		return response.status(200).json(purchase);
	} catch (erro) {
		return response.status(500).json({ Erro: `Erro ao cadastrar compra!: ${erro}.` });
	}
};

exports.update = async (request, response, next) => {
	try {
		const rules = validation.rules;
		const validationFields = new Validator(request.body, rules);
		if (validationFields.fails()) {
			return response.status(400).json({ erros: validationFields.errors.all() });
		}
		const newPurchase = await Purchase.findOne({ _id: request.params.id });
		if (newPurchase.status === 'Em validação') {
			newPurchase.code = request.body.code;
			newPurchase.value = request.body.value;
			newPurchase.date = request.body.date;
			newPurchase.documentNumber = request.body.documentNumber;
			newPurchase.status = request.body.status;
			await Purchase.updateOne({ _id: request.params.id }, newPurchase);
			return response.json(newPurchase);
		} else {
			return response.status(400).json({ Erro: 'Compra já aprovada!' });
		}
	} catch (erro) {
		return response.status(500).json({ Erro: `Erro editar a compra!: ${erro}.` });
	}
};

exports.delete = async (request, response, next) => {
	try {
		const purchase = await Purchase.findOne({ _id: request.params.id });
		if (purchase.status === 'Em validação') {
			await Purchase.deleteOne({ _id: purchase._id });
			return response.status(200).json(purchase);
		} else {
			return response.status(400).json({ Erro: 'Erro ao deletar, status já aprovado!' });
		}
	} catch (erro) {
		return response.status(500).json({ Erro: `Erro deletar compra!: ${erro}.` });
	}
};

exports.index = async (request, response, next) => {
	try {
		const purchase = await Purchase.find();
		return response.status(200).json(purchase);
	} catch (erro) {
		return response.status(500).json({ Erro: `Erro ao buscar compras!: ${erro}.` });
	}
};
