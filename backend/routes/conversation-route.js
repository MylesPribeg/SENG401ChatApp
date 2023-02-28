const express = require("express");

const { getConversation, getConversationById } = require("../controllers/conversation-controller");
const router = express.Router();

router.post("/", getConversation);
router.get("/:conversationId", getConversationById);

module.exports = router;
