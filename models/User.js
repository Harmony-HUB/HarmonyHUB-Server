const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  refreshToken: String,
});

module.exports = mongoose.model("User", userSchema);
