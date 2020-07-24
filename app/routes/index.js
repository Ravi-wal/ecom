const jwt = require('../config/jwt');
const users = require("../controllers/users");
const auth = require("../controllers/auth");
const joi = require('../config/validator');

// const jwt = new JwtClass();
// const auth = new AuthClass();
// const users = new UsersClass();


module.exports = app => {
  app.post("/auth", joi.schemaValidator(joi.schemasValidation.login), auth.login);

  app.get("/users", jwt.isAuthorized , jwt.isAdmin, users.list);
  app.post("/users", joi.schemaValidator(joi.schemasValidation.users), users.create);
};


