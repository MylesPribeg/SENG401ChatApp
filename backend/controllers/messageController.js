const Message = require("../models/Message");
const Group = require("../models/Group")
const mongoose = require("mongoose");

//gets all messages ina specific group accessing the group through its id recieved as a parameter in the url
const getMessages = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "no Messages invalid group id"})
    }
    const messageList = await Group.findOne({_id: id}).select({"messages": 1, "_id": 0}).sort({createdAt: 1});

    //console.log(messageList);
    res.status(200).json(messageList);
    //console.log(JSON.parse(JSON.stringify(messageList.messages)))//for testing purposes
}

//recieve a single message based off its id this is also mainly for testing purposes
const getMessage = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "no Message invalid id"})
    }

    const message = await Message.findById(id);

    if(!message) {
        return res.status(404).json({error: "no Message"})
    }

    res.status(200).json(Message);
}

const createMessage = async (req, res) => {
    const {id} = req.params;
    const {user, content} = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "no Message invalid group id"})
    }
    try {
        console.log("test")
        const message = await Message.create({user, content}); //this is for testing please leave this in
        const update = await Group.updateOne({_id: id}, {$push:{messages: message}})
        //res.status(200).json(message);
        res.status(200).json(update);
        console.log("attempted")
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//TODO: this function only deletes a message from the message collection and not from the array in Group object
const deleteMessage = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "no Message invalid id"})
    }

    const message = await Message.findOneAndDelete({_id: id});

    if(!message) {
        return res.status(404).json({error: "no Message"})
    }

    res.status(200).json(message);
}

//TOD: this function does not update the message array in the group object  with this id
const updateMessage = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "no Message invalid id"})
    }

    const message = await Message.findOneAndUpdate({_id: id}, {
        ...req.body
    });

    if(!message) {
        return res.status(404).json({error: "no Message"})
    }

    res.status(200).json(message);
}

module.exports = {
    getMessages,
    getMessage,
    createMessage,
    deleteMessage,
    updateMessage
}