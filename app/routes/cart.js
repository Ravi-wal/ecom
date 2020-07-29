const jwt = require('../config/jwt');
const joi = require('../config/validator');
const cart = require('../controllers/carts');

module.exports = app => {
    app.get("/cart", jwt.isAuthorized, cart.list);
    app.post("/addtocart", jwt.isAuthorized, joi.schemaValidator(joi.schemasValidation.cart), cart.addToCart);
  };