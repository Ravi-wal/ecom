const Cart = require("../models/carts");
const response = require('../config/response');

const addToCart = async (req, res) => {
  try{

    if(await Cart.findOne({ userId: req.body.userId, productId: req.body.productId })){
        await Cart.findOneAndUpdate({ userId: req.body.userId, productId: req.body.productId }, {
            $inc: {"$.quantity": req.body.quantity}
        },
        { new: true }
    );
    } else {
        const cart = new Cart(req.body);
        await cart.save();
    }
    response.success("Product added to cart succesfully", res);
  } catch(err){
    response.internalError(res);
  }
};

const list = async (req, res) => {
  try{
    const data = await Cart.find({ userId: req.body.userId})
                            .populate('userId','firstName lastName email phone')
                            .populate('productId');
    response.success(data,res);
  }catch(err){
    console.log(err)
    response.internalError(res);
  }
};


module.exports = {
    addToCart,
    list
};
