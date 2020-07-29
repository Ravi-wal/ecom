const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderDetailsSchema = new Schema(
  {
    orderId: { type: Schema.Types.ObjectId, ref: 'orders' },
    productId: { type: Schema.Types.ObjectId, ref: 'products' },
    quantity: {
      type: Number
    },
    amount: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("orderDetails", orderDetailsSchema);
