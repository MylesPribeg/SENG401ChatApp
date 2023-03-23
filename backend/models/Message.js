const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model("Message", messageSchema)
 
