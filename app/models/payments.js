const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentsSchema = new Schema(
  {
    transactionId: {
      type: String
    },
    totalAmount: {
      type: Number
    },
    transactionStatus: {
      type: String
    },
    paymentType: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("payments", paymentsSchema);
