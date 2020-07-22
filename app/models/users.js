const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    FirstName: {
      type: String
    },
    LastName: {
      type: String
    },
    Email: {
      type: String,
      required: true
    },
    Password: {
      type: String,
      required: true
    },
    Phone: {
      type: Number
    },
    UserType: {
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

module.exports = mongoose.model("Users", userSchema);
