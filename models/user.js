const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: new Date(),
  },
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
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
