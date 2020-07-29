const jwt = require('../config/jwt');
const joi = require('../config/validator');
const categories = require('../controllers/catogories');

module.exports = app => {
    app.get("/categories", categories.list);
    app.post("/categories", jwt.isAuthorized , jwt.isAdmin, joi.schemaValidator(joi.schemasValidation.categories), categories.create);
    app.put("/categories/:categoryId", jwt.isAuthorized , jwt.isAdmin, joi.schemaValidator(joi.schemasValidation.categories), categories.update);
  };