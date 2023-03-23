const express = require("express");

const {
    getMessages,
    getMessage,
    createMessage,
    deleteMessage,
    updateMessage
} = require("../controllers/messageController")

const router = express.Router();

//get all messages (for a specific group) the id is referencing a group id
router.get("/all/:id", getMessages);

//create a newmessage
router.post("/:id", createMessage);

//the following are not properly implemented ----------------------------------------
//get a single message, id references a specific message
router.get("/:id", getMessage);

//delete a message
router.delete("/:id", deleteMessage);

//update a message
router.patch("/:id", updateMessage);

module.exports = router;