const jwt = require('../config/jwt');
const joi = require('../config/validator');

const auth = require("../controllers/auth");
const users = require("../controllers/users");

const categories = require('../controllers/catogories');
const products = require('../controllers/products');

// const jwt = new JwtClass();
// const auth = new AuthClass();
// const users = new UsersClass();


module.exports = app => {
  app.post("/auth", joi.schemaValidator(joi.schemasValidation.login), auth.login);

  app.get("/users", jwt.isAuthorized , jwt.isAdmin, users.list);
  app.post("/users", joi.schemaValidator(joi.schemasValidation.users), users.create);

  app.get("/categories", categories.list);
  app.post("/categories", jwt.isAuthorized , jwt.isAdmin, joi.schemaValidator(joi.schemasValidation.categories), categories.create);
  app.put("/categories/:categoryId", jwt.isAuthorized , jwt.isAdmin, joi.schemaValidator(joi.schemasValidation.categories), categories.update);

  app.get("/products", products.list);
  app.post("/products", jwt.isAuthorized , jwt.isAdmin, joi.schemaValidator(joi.schemasValidation.products), products.create);
  app.put("/products/:productId", jwt.isAuthorized , jwt.isAdmin, joi.schemaValidator(joi.schemasValidation.products), products.update);

};


