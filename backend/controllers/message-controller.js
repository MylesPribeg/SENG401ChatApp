const Message = require("../models/Message");

const addMessage = async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getMessage = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getMessage = getMessage;
exports.addMessage = addMessage;
