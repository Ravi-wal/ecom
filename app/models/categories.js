const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categoriesSchema = new Schema(
  {
    categoryName: {
      type: String
    },
    categoryDescription: {
      type: String
    },
    active: {
      type: Number
    },
    products: [{ type: Schema.Types.ObjectId, ref: "products" }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("categories", categoriesSchema);
