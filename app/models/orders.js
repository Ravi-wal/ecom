const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ordersSchema = new Schema(
  {
    UserId: {
      type: String
    },
    PaymentID: {
      type: String
    },
    AddressId: {
      type: String
    },
    TotalAmount: {
      type: Number
    },
    OrderDate: {
      type: Date
    },
    OrderStatus: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Orders", ordersSchema);
