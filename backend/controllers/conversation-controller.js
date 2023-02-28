const Conversation = require("../models/Conversation");

const getConversation = async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getConversationById = async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.conversationId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getConversation = getConversation;
exports.getConversationById = getConversationById;
