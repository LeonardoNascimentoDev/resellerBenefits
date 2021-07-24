const jwt = require('jsonwebtoken');
const Reseller = require('../models/Reseller');
const md5 = require('md5');

module.exports = {
	async logar(request, response) {
		try {
			const reseller = await Reseller.findOne({ email: request.body.email });
			if (md5(request.body.password) == reseller.password) {
				const token = jwt.sign({ id: reseller._id }, process.env.SECRET, {
					// expiresIn: 300,
				});
				return response.json({ auth: true, token: token, reseller: reseller.name });
			} else {
				return response.status(500).json('Usuário não cadastrado na plataforma!');
			}
		} catch (erro) {
			return response.status(500).json({ Erro: `Erro ao autenticar usuário!: ${erro}.` });
		}
	},
};
