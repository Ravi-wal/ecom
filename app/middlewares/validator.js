const Joi = require('joi') 
const schemas = { 
  users: Joi.object().keys({ 
    FirstName: Joi.string().required(),
    LastName: Joi.any(),
    Email: Joi.string().email().required(),
    Password: Joi.string().min(7).alphanum().required(),
    Phone: Joi.number().min(6).max(10)
  }) 
  // define all the other schemas below 
}; 
module.exports = schemas;