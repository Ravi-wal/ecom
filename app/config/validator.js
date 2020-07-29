const Joi = require('joi');

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
      res.status(422).json({ error: message }) 
    } 
  } 
} 
module.exports = {
  schemasValidation, 
  schemaValidator
};