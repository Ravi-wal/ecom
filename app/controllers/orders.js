const dateTime = require('node-datetime');
const Order = require("../models/orders");
const OrderDetails = require("../models/orderDetails");
const response = require('../config/response');
const cart = require('../models/carts');
var ordId;
const create = async (req, res) => {
  try{
        let dt = dateTime.create();
        req.body.orderDate = dt.format('Y-m-d H:M:S');
        req.body.orderStatus = 'NEW';
        const order = new Order(req.body);
        await order.save();
        ordId = order._id;
        let dtlIds = await ordDtls(req.body);
        await cart.deleteMany({ userId: req.body.userId, productId: {$in: dtlIds} });
        await Order.findByIdAndUpdate(ordId,{ orderDetails: dtlIds},{ new: true });
        response.success({ orderId: order._id }, res);
  } catch(err){
    response.internalError(res);
  }
};

const ordDtls = async (req,res) => {
    let dtlsData = [];
    let dtlIds = {};
    if(req.body.products){
        let dtlData = [];
        if(req.body.products.length > 1){
            _.forEach(_.keysIn(req.body.products), (key) => {
                let prod = req.body.products[key];
                dtlData.push({
                  orderId: ordId,
                  productId: prod.productId,
                  quantity: prod.quantity,
                  amount: prod.quantity
                });
            });
        } else {
            let prod = req.body.products;
            dtlData.push({
              orderId: ordId,
              productId: prod.productId,
              quantity: prod.quantity,
              amount: prod.quantity
            });
        }
        dtlsData = await OrderDetails.insertMany(dtlData);
        dtlIds = dtlsData.map(prodOne => prodOne._id);
    }
    return dtlIds;
}

const list = async (req, res) => {
  try{
    const data = await Order.find()
                            .populate('userId')
                            .populate('paymentID')
                            .populate('addressId')
                            .populate('orderDetails');
    response.success(data,res);
  }catch(err){
    console.log(err)
    response.internalError(res);
  }
};

const update = async (req, res) => {
    ordId =req.params.orderId;
    try{
        let dt = dateTime.create();
        req.body.orderDate = dt.format('Y-m-d H:M:S');
        req.body.orderStatus = 'NEW';
        const data = await Order.findByIdAndUpdate(ordId, req.body, { new: true });
        if (!data) {
            response.failed("Order Not Found with the Update ID " + ordId, res);
        }
        await OrderDetails.deleteMany({orderId: ordId});
        let dtlIds = await ordDtls(req.body);
        await cart.deleteMany({ userId: req.body.userId, productId: {$in: dtlIds} });
        await Order.findByIdAndUpdate(ordId,{ orderDetails: dtlIds},{ new: true });
        response.success("Order updated Successfully", res);

    } catch(err) {
      response.internalError(res);
    }
};

const cancelOrder = async (req,res) => {
  try{
    const data = await Order.findByIdAndUpdate(req.params.orderId, {orderStatus: 'CANCELLED'}, { new: true });
    if (!data) {
        response.failed("Order Not Found with the Update ID " + req.params.orderId, res);
    }
    response.success("Order cancelled Successfully", res);
  }catch(err) {
      response.internalError(res);
    }
}
  

module.exports = {
  create,
  list,
  update,
  cancelOrder
};
