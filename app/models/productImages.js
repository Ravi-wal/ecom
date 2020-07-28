const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productImagesSchema = new Schema(
  {
    productId: {
      type: { type: Schema.Types.ObjectId, ref: 'Products' }
    },
    imageUrl: {
      type: String
    },
    active: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("productImages", productImagesSchema);
