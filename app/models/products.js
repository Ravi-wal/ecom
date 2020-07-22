const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productsSchema = new Schema(
  {
    CategoryId: {
      type: String
    },
    ProductName: {
      type: String
    },
    ProductDescription: {
      type: String
    },
    Price: {
      type: Number
    },
    Active: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Products", productsSchema);
