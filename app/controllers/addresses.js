const Address = require("../models/addresses");
const User = require("../models/users");
const response = require('../config/response');

const create = async (req, res) => {
  try{
      const address = new Address(req.body);
      await address.save();
      const userOne = await User.findOne({_id: req.body.userId});
      userOne.addresses.push(address._id);
      await userOne.save();
      response.success("Address created succesfully", res);
  } catch(err){
    response.internalError(res);
  }
};

const list = async (req, res) => {
  try{
    const data = await Address.find().populate('userId','firstName lastName email phone');
    response.success(data,res);
  }catch(err){
    console.log(err)
    response.internalError(res);
  }
};

const update = async (req, res) => {
  try{
    const data = await Address.findByIdAndUpdate(req.params.addressId, {
                                    addressType: req.body.addressType,
                                    address: req.body.address
                                },
                                { new: true }
                            );
    if (!data) {
      response.failed("Address Not Found with the Update ID " + req.params.categoryId, res);
    } else {
      response.success("Address updated Successfully", res);
    }
  }catch(err){
    response.internalError(res);
  }
};
  

module.exports = {
  create,
  list,
  update
};
