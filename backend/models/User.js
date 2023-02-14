const mongoose = require("mongoose");
const SCHEMA = mongoose.Schema;

const userSchema = new SCHEMA({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
});

module.exports = mongoose.model("User", userSchema);

//users schema
