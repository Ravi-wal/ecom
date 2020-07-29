const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ordersSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    paymentID: { type: Schema.Types.ObjectId, ref: 'payments' },
    addressId: { type: Schema.Types.ObjectId, ref: 'addresses' },
    totalAmount: {
      type: Number
    },
    orderDate: {
      type: Date
    },
    orderStatus: {
      type: String
    },
    orderDetails: [{ type: Schema.Types.ObjectId, ref: 'orderDetails' }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("orders", ordersSchema);
