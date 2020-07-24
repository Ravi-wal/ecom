const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userRolesSchema = new Schema(
  {
    RoleName: {
      type: String,
      required: true
    },
    RoleDescription: {
      type: String
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

module.exports = mongoose.model("UserRoles", userRolesSchema);
