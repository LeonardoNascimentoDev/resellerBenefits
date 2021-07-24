const { Router } = require('express');
const PurchaseController = require('./controllers/PurchaseController');
const ResellerController = require('./controllers/ResellerController');
const AuthController = require('./controllers/AuthController');
const AuthMiddleware = require('./middleware/Auth');
const Cashback = require('./controllers/Cashback');

const routes = Router();

routes.all('*', AuthMiddleware.verifyJwt);

routes.post('/api/v1/create-reseller', ResellerController.create);
routes.post('/api/v1/login', AuthController.logar);

routes.post('/api/v1/purchase', PurchaseController.store);
routes.put('/api/v1/purchase/:id', PurchaseController.update);
routes.delete('/api/v1/purchase/:id', PurchaseController.delete);
routes.get('/api/v1/purchases', PurchaseController.index);

routes.get('/api/v1/cashback/amount', Cashback.index);

module.exports = routes;
