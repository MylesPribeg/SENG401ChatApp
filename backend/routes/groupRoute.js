const express = require("express");

const {
    getGroups,
    getGroup,
    createGroup,
    deleteGroup,
    updateGroup,
    addToGroup,
    getUsers
} = require("../controllers/groupController")

const router = express.Router();

//get all groups (for testing purposes to recieve all groups in database)
router.get("/", getGroups);

//get a single group based on group id
router.get("/:id", getGroup);

//create a new group
router.post("/", createGroup);

//ad a new group member with a user id (gid: group id, uid: user id)
router.post("/add/:gid&:uid", addToGroup);

//delete a group based off group id
router.delete("/:id", deleteGroup);

//update a group based off group id
router.patch("/:id", updateGroup);

//update get a groups users
router.get("/members/:id", getUsers);

module.exports = router;