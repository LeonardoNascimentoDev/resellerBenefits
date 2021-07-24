const axios = require('axios');

module.exports = async function getData(documentNumber) {
	try {
		return await axios.get(`${process.env.URL_CASHBACK}`, {
			headers: {
				token: process.env.TOKEN_CASHBACK,
			},
			params: {
				cpf: documentNumber,
			},
		});
	} catch (err) {
		console.log(err);
	}
};
