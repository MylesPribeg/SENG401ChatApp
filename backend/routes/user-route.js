const express = require("express");
// const { getAllUsers } = require("../controllers/user-controller");
// const { createUser } = require("../controllers/user-controller");
// const { updateUser } = require("../controllers/user-controller");
// const { deleteUser } = require("../controllers/user-controller");
// const { getUserById } = require("../controllers/user-controller");
// const { signUpUser } = require("../controllers/user-controller");
// const { loginUser } = require("../controllers/user-controller");

const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  signUpUser,
  loginUser,
} = require("../controllers/user-controller");

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUserById);
router.post("/signup", signUpUser);
router.post("/login", loginUser);

module.exports = router;
