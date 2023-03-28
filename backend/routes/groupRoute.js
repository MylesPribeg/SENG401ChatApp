const express = require("express");

const {
  getGroups,
  getGroup,
  createGroup,
  deleteGroup,
  updateGroup,
  addToGroup,
  getUsers,
  createGroupWithName,
  addToGroupWithUsername,
  removeUserFromGroup,
} = require("../controllers/groupController");

const router = express.Router();

//get all groups (for testing purposes to recieve all groups in database)
router.get("/", getGroups);

//get a single group based on group id
router.get("/:id", getGroup);

//create a new group
router.post("/", createGroup);

//ad a new group member with a user id (gid: group id, uid: user id)
router.put("/add/:gid&:uid", addToGroup);

//delete a group based off group id
router.delete("/:id", deleteGroup);

//update a group based off group id
router.patch("/:id", updateGroup);

//update get a groups users
router.get("/members/:id", getUsers);

//create a new group with a username
router.post("/create", createGroupWithName);

//add a new group member with a username (gid: group id, username: username)
router.put("/add/:gid", addToGroupWithUsername);

//remove a user from a group
router.put("/removeUser/:groupId&:username", async (req, res) => {
  const { groupId, username } = req.params;
  try {
    // Call the removeUserFromGroup() function with the parameters from the URL
    await removeUserFromGroup(groupId, username);
    res
      .status(200)
      .json({ message: `User ${username} removed from group ${groupId}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
