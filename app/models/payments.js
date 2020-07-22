const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentsSchema = new Schema(
  {
    TransactionId: {
      type: String
    },
    TotalAmount: {
      type: Number
    },
    TransactionStatus: {
      type: String
    },
    PaymentType: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Payments", paymentsSchema);
