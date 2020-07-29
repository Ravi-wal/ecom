const jwt = require('../config/jwt');
const joi = require('../config/validator');
const products = require('../controllers/products');

module.exports = app => {
    app.get("/products", products.list);
    app.post("/products", jwt.isAuthorized , jwt.isAdmin, joi.schemaValidator(joi.schemasValidation.products), products.create);
    app.put("/products/:productId", jwt.isAuthorized , jwt.isAdmin, joi.schemaValidator(joi.schemasValidation.products), products.update);
};