const express = require("express");

const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  signUpUser,
  loginUser,
  getUserGroups,
} = require("../controllers/user-controller");

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUserById);
router.post("/signup", signUpUser);
router.post("/login", loginUser);
router.get("/user/:userId", getUserGroups);

module.exports = router;
