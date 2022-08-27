const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  _id: { type: String, require: true },
  version: { type: String, default: "1.0" },
});

const User = model("users", userSchema);
module.exports = User;
