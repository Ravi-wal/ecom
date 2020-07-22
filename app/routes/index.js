const jwt = require('../../config/jwt');
const users = require("../controllers/users");
const auth = require("../controllers/auth");
const joi = require('../middlewares/validator')

// const jwt = new JwtClass();
// const auth = new AuthClass();
// const users = new UsersClass();


module.exports = app => {
  app.post("/auth", auth.login);

  app.get("/users", jwt.isAuthorized , users.list);
  app.post("/users", users.create);
  app.get("/users/:userId", jwt.isAuthorized , users.findone);
  app.put("/users/:userId", users.update);


};


