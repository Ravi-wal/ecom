const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartsSchema = new Schema(
  {
    userId: {
      type: String
    },
    productId: {
      type: String
    },
    quantity: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("carts", cartsSchema);
