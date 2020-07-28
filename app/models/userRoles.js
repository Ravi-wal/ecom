const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userRolesSchema = new Schema(
  {
    roleName: {
      type: String,
      required: true
    },
    roleDescription: {
      type: String
    },
    userType: {
      type: Number
    },
    active: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("userRoles", userRolesSchema);
