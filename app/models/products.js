const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productsSchema = new Schema(
  {
    categoryId: {
      type: String
    },
    productName: {
      type: String
    },
    productDescription: {
      type: String
    },
    price: {
      type: Number
    },
    active: {
      type: Number
    },
    prodimages: { type: Schema.Types.ObjectId, ref: "ProductImages" }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("products", productsSchema);
