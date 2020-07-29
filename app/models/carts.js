const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartsSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    productId: { type: Schema.Types.ObjectId, ref: 'products' },
    quantity: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("carts", cartsSchema);
