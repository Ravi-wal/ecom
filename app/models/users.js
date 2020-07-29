const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    phone: {
      type: Number
    },
    userType: {
      type: Number
    },
    active: {
      type: Number
    },
    addresses: [{ type: Schema.Types.ObjectId, ref: "addresses" }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("users", userSchema);
