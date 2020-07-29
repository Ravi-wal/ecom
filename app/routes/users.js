const jwt = require('../config/jwt');
const joi = require('../config/validator');
const users = require('../controllers/users');

module.exports = app => {
  app.get("/users", jwt.isAuthorized , jwt.isAdmin, users.list);
  app.post("/users", joi.schemaValidator(joi.schemasValidation.users), users.create);
};