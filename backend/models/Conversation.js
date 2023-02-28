const mongoose = require("mongoose");
const SCHEMA = mongoose.Schema;

const conversationSchema = new SCHEMA(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", conversationSchema);
