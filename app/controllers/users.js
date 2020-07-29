const User = require("../models/users");
const response = require('../config/response');
//const UserRoles = require("../models/userRoles");

const create = async (req, res) => {
  try{
    if(await User.findOne({ email: req.body.email })){
      response.failed("Already registered with the email " + req.body.email, res);
    } else {
      const user = new User(req.body);
      await user.save();
      response.success("User created succesfully", res);
    }
  } catch(err){
    response.internalError(res);
  }
};

const list = async (req, res) => {
  try{
    const data = await User.find();
    response.success(data, res);
  }catch(err) {
    response.internalError(res);
  }
};

const checkUser = async (email, password) => {
  const user = await User.findOne({ email: email, password: password, active: 1 });
  return user;
};

module.exports = {
  create,
  list,
  checkUser
};
