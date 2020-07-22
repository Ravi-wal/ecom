const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productImagesSchema = new Schema(
  {
    ProductId: {
      type: String
    },
    ImageURL: {
      type: String
    },
    Active: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("ProductImages", productImagesSchema);
