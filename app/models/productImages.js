const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productImagesSchema = new Schema(
  {
    imageUrl: {
      type: String
    },
    active: {
      type: Number
    },
    productId:  { type: Schema.Types.ObjectId, ref: 'products' }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("productImages", productImagesSchema);
