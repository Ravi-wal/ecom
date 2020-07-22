const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema(
  {
    UserId: {
      type: String
    },
    AddressType: {
      type: String
    },
    Address: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Addresses", addressSchema);
