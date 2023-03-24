const User = require("../models/User");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "2d" });
};

//old function
// const getAllUsers = async (req, res) => {
//   let users;
//   try {
//     users = await User.find();
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
//   res.json(users);
// };

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("groups");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
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

const signUpUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.signUp(username, email, password);

    //Create token
    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);
    // Include the user ObjectID (_id) in the response
    res.status(200).json({ username, token, id: user._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//old login function
// const loginUser = async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await User.login(username, password);
//     const token = createToken(user._id);
//     res.status(200).json({ username, token });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

async function getgrp(userId) {
  try {
    const user = await User.findById(userId).populate("groups");
    if (!user) {
      throw new Error("User not found");
    }
    return user.groups;
  } catch (error) {
    console.error("Error retrieving user groups:", error);
    return null;
  }
}

const getUserGroups = async (req, res) => {
  try {
    const userId = req.params.userId;
    const groups = await getgrp(userId);
    if (!groups) {
      return res
        .status(404)
        .json({ error: "User not found or error retrieving groups" });
    }
    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// shoudl turn this format HASAN
// [
//    group 1:
//   {
//     "name": "Group 1",
//   },
//    group 2;
//   {
//     "name": "Group 2",
//   }
// ]

exports.getAllUsers = getAllUsers;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.getUserById = getUserById;
exports.signUpUser = signUpUser;
exports.loginUser = loginUser;
exports.getUserGroups = getUserGroups;
