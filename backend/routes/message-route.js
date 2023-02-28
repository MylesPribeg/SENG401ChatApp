const express = require("express");

const { getMessage, addMessage } = require("../controllers/message-controller");
const router = express.Router();

router.post("/", addMessage);
router.get("/:conversationId", getMessage);

module.exports = router;
