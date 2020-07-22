const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderDetailsSchema = new Schema(
  {
    OrderId: {
      type: String
    },
    ProductId: {
      type: String
    },
    Quantity: {
      type: Number
    },
    Amount: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("OrderDetails", orderDetailsSchema);
