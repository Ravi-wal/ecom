const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    addressType: {
      type: String
    },
    address: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("addresses", addressSchema);
