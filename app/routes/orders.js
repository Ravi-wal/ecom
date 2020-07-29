const jwt = require('../config/jwt');
const joi = require('../config/validator');
const orders = require('../controllers/orders');

module.exports = app => {
    app.get("/orders", orders.list);
    app.post("/checkout", jwt.isAuthorized, joi.schemaValidator(joi.schemasValidation.orders), orders.create);
    app.put("/checkout/:orderId", jwt.isAuthorized , joi.schemaValidator(joi.schemasValidation.orders), orders.update);
};