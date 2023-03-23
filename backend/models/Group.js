const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//ghetto solution? do not touch this duplicate schema!!!
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
//please do not delete above schema, necessary until better solution is found


const groupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    messages: {
        type: [messageSchema]
    },
    users: [{
        type: Schema.Types.ObjectId, ref: "User"
    }]
      
}, {timestamps: true});

module.exports = mongoose.model("Group", groupSchema);