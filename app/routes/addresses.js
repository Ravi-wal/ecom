const jwt = require('../config/jwt');
const joi = require('../config/validator');
const addresses = require('../controllers/addresses');

module.exports = app => {
    app.get("/addresses", jwt.isAuthorized, addresses.list);
    app.post("/addresses", jwt.isAuthorized, joi.schemaValidator(joi.schemasValidation.addresses), addresses.create);
    app.put("/addresses/:addressId", jwt.isAuthorized , joi.schemaValidator(joi.schemasValidation.addresses), addresses.update);
  };