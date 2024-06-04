const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
  height: { type: Number }, // in centimeters or inches
  weight: { type: Number }, // in kilograms or pounds
  gender: { type: String, enum: ["male", "female", "other"] },
  auth_key: {
    type: String,
    default: null,
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
