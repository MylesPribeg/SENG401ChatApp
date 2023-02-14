const express = require("express");
const { getAllUsers } = require("../controllers/user-controller");
const { createUser } = require("../controllers/user-controller");
const { updateUser } = require("../controllers/user-controller");
const { deleteUser } = require("../controllers/user-controller");
const { getUserById } = require("../controllers/user-controller");

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUserById);

module.exports = router;
