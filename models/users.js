const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    default: "",
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Users", userSchema, "users");
