const User = require("../models/User");

const getAllUsers = async (req, res) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.json(users);
};

const createUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username && !email && !password) {
    return res.status(422).json({ message: "Invalid input" });
  }

  let user;
  try {
    user = new User({
      username: username,
      email: email,
      password: password,
    });

    user = await user.save();
  } catch (err) {
    return next(err);
  }

  if (!user) {
    return res.status(500).json({ message: "User not created" });
  }

  return res.status(201).json({ user });
};

const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { username, email, password } = req.body;

  let user;

  try {
    user = await User.findByIdAndUpdate(id, {
      username: username,
      email: email,
      password: password,
    });
  } catch (err) {
    return next(err);
  }

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({ user });
};

const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findByIdAndDelete(id);
  } catch (err) {
    return next(err);
  }

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({ message: "User deleted" });
};

const getUserById = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findById(id);
  } catch (err) {
    return next(err);
  }

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({ user });
};

exports.getAllUsers = getAllUsers;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.getUserById = getUserById;
