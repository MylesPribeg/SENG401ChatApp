const mongoose = require("mongoose");
const SCHEMA = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new SCHEMA({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  groups: [
    {
      type: SCHEMA.Types.ObjectId,
      ref: "Group",
    },
  ],
  theme: {
    fontStyle: { type: String, default: "normal" },
    fontColour: { type: Number, default: 100 },
    font: { type: String, default: "Times New Roman" },
    PBGred: { type: Number, default: 150 },
    PBGgreen: { type: Number, default: 150 },
    PBGblue: { type: Number, default: 150 },
    SBGred: { type: Number, default: 50 },
    SBGgreen: { type: Number, default: 50 },
    SBGblue: { type: Number, default: 50 },
    updated: { type: Boolean, default: false },
  },
});

//users schema

//static methods

userSchema.statics.signUp = async function (username, email, password) {
  const exists = await this.findOne({ email });

  //validate function
  if (!email || !password || !username) {
    throw new Error("Please fill all fields");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Please enter a valid email");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }

  if (exists) {
    const error = new Error("Email already exists");
    error.statusCode = 409;
    throw error;
  }

  //hash password for security
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({
    username,
    email,
    password: hashedPassword,
  });

  return user;
};

userSchema.statics.login = async function (username, password) {
  //validate function
  if (!password || !username) {
    throw new Error("Please fill all fields");
  }

  const user = await this.findOne({ username });

  if (!user) {
    throw new Error("User not found");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Incorrect password");
  }

  return user;
};

 

module.exports = mongoose.model("User", userSchema);
