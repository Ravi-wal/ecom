const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categoriesSchema = new Schema(
  {
    CategoryName: {
      type: String
    },
    CategoryDescription: {
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

module.exports = mongoose.model("Categories", categoriesSchema);
