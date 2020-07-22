const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartsSchema = new Schema(
  {
    UserId: {
      type: String
    },
    ProductId: {
      type: String
    },
    Quantity: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Carts", cartsSchema);
