const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderDetailsSchema = new Schema(
  {
    orderId: {
      type: String
    },
    productId: {
      type: String
    },
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
