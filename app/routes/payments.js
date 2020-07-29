const jwt = require('../config/jwt');
const joi = require('../config/validator');
const payment = require('../controllers/payments');

module.exports = app => {
    app.post("/placeorder", jwt.isAuthorized, joi.schemaValidator(joi.schemasValidation.payments), payment.create);
};