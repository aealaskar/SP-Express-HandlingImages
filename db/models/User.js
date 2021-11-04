const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    password: { type: String, required: true },
    email: String,
    firstName: String,
    lastName: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
