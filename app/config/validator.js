const Joi = require('joi');
const response = require('./response');

const schemasValidation = { 

  login: Joi.object().keys({ 
    email: Joi.string().email().required(),
    password: Joi.string().min(7).alphanum().required()
  }),
  users: Joi.object().keys({ 
    firstName: Joi.string().required(),
    lastName: Joi.any(),
    email: Joi.string().email().required(),
    password: Joi.string().min(7).alphanum().required(),
    phone: Joi.number(),
    userType: Joi.any(),
    active: Joi.any()
  }),
  addresses: Joi.object().keys({
    addressType: Joi.any(),
    address: Joi.any(),
    userId: Joi.string().required(),
    userType: Joi.number().required()
  }),
  categories: Joi.object().keys({ 
    categoryName: Joi.string().required(),
    categoryDescription: Joi.any(),
    active: Joi.number().required(),
    userId: Joi.string().required(),
    userType: Joi.number().required()
  }),
  products: Joi.object().keys({ 
    categoryId: Joi.string().required(),
    productName: Joi.string().required(),
    productDescription: Joi.string(),
    price: Joi.number().required(),
    images: Joi.any(),
    active: Joi.number().required(),
    userId: Joi.string().required(),
    userType: Joi.number().required()
  }),
  cart: Joi.object().keys({ 
    productId: Joi.string().required(),
    quantity: Joi.number().required(),
    userId: Joi.string().required(),
    userType: Joi.number().required()
  }),
  orders: Joi.object().keys({ 
    paymentID: Joi.any(),
    addressId: Joi.string().required(),
    totalAmount: Joi.number().required(),
    orderDate: Joi.any(),
    orderStatus: Joi.any(),
    userId: Joi.string().required(),
    userType: Joi.number().required()
  }),
  payments: Joi.object().keys({ 
    transactionId: Joi.any(),
    totalAmount: Joi.number().required(),
    transactionStatus: Joi.any(),
    paymentType: Joi.any(),
    userId: Joi.string().required(),
    userType: Joi.number().required()
  })

  
   
}; 


const schemaValidator = (schema, property) => { 
  return (req, res, next) => { 
    const { error } = schema.validate(req.body); 
    const valid = error == null; 
    
    if (valid) { 
      next(); 
    } else { 
      const { details } = error; 
      const message = details.map(i => i.message).join(',');
  
      console.log("error", message); 
      response.validationError(message, res);
    } 
  } 
} 
module.exports = {
  schemasValidation, 
  schemaValidator
};