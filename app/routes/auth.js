const jwt = require('../config/jwt');
const joi = require('../config/validator');
const auth = require("../controllers/auth");

module.exports = app => {
  app.post("/auth", joi.schemaValidator(joi.schemasValidation.login), auth.login);
};


