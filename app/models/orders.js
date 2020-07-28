const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ordersSchema = new Schema(
  {
    userId: {
      type: String
    },
    paymentID: {
      type: String
    },
    addressId: {
      type: String
    },
    totalAmount: {
      type: Number
    },
    orderDate: {
      type: Date
    },
    orderStatus: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("orders", ordersSchema);
