const Joi = require('joi');

const schemasValidation = { 

  login: Joi.object().keys({ 
    email: Joi.string().email().required(),
    password: Joi.string().min(7).alphanum().required()
  }),
  users: Joi.object().keys({ 
    FirstName: Joi.string().required(),
    LastName: Joi.any(),
    Email: Joi.string().email().required(),
    Password: Joi.string().min(7).alphanum().required(),
    Phone: Joi.number(),
    UserType: Joi.any(),
    Active: Joi.any()
  }),
  addresses: Joi.object().keys({
    AddressType: Joi.any(),
    Address: Joi.any()
  }),
  categories: Joi.object().keys({ 
    CategoryName: Joi.string().required(),
    CategoryDescription: Joi.any(),
    Active: Joi.number().required(),
    UserId: Joi.string().required(),
    UserType: Joi.number().required()
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