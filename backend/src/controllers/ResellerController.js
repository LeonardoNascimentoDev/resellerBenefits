const validation = require('../validation/reseller');
const Validator = require('validatorjs');
const md5 = require('md5');

const Reseller = require('../models/Reseller');
exports.create = async (request, response, next) => {
	try {
		const rules = validation.rules;
		const validationFields = new Validator(request.body, rules);
		if (validationFields.fails()) {
			return response.status(400).json({ erros: validationFields.errors.all() });
		}

		const { name, documentNumber, email, password } = request.body;
		const cryptoPass = md5(password);

		reseller = await Reseller.create({
			name,
			documentNumber,
			email,
			password: cryptoPass,
		});

		return response.status(200).json(reseller);
	} catch (erro) {
		return response.status(500).json({ Erro: `Erro ao cadastrar revendedor!: ${erro}.` });
	}
};
