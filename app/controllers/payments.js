const Payment = require("../models/payments");
const uniqid = require('uniqid');
const response = require('../config/response');

const create = async (req, res) => {
  try{
        req.body.transactionId = uniqid();
        req.body.transactionStatus = 'PENDING';
        const payment = new Payment(req.body);
        await payment.save();
        await Payment.findByIdAndUpdate(req.body.orderId, {
            paymentId: payment._id
        },{ new: true });
      response.success("Order placed succesfully", res);
  } catch(err){
    response.internalError(res);
  }
};
module.exports = {
  create
};
