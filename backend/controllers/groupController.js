const Group = require("../models/Group");
const mongoose = require("mongoose");

//request all elements in Group collection and sort by create at time in ascending order
const getGroups = async (req, res) => {
    const groups = await Group.find({}).sort({createdAt: 1});

    res.status(200).json(groups);
}

//request a single group element from group collection
const getGroup = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "no group invalid id"})
    }

    const group = await Group.findById(id);

    if(!group) {
        return res.status(404).json({error: "no group"})
    }

    res.status(200).json(group);
}

//create a new group object and add to the database
const createGroup = async (req, res) => {
    const {name, messages} = req.body;

    try {
        const group = await Group.create({name, messages});
        res.status(200).json(group);
        console.log("attempted")
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const deleteGroup = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "no group invalid id"})
    }

    const group = await Group.findOneAndDelete({_id: id});

    if(!group) {
        return res.status(404).json({error: "no group"})
    }

    res.status(200).json(group);
}

//update a group based off id recieved as a parameter from the url, checking for valid id and then updating the body using the spread operator
const updateGroup = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "no group invalid id"})
    }

    const group = await Group.findOneAndUpdate({_id: id}, {
        ...req.body
    });

    if(!group) {
        return res.status(404).json({error: "no group"})
    }

    res.status(200).json(group);
}

//this function adds a users ID reference to the array by accessing id's through the url paramaters, cehcking for valid id and then updating the array using the $push
const addToGroup = async (req, res) => {
    const gid = req.params.gid;
    const uid = req.params.uid;

    if(!mongoose.Types.ObjectId.isValid(gid)) {
        return res.status(404).json({error: "no group invalid gid"})
    }
    if(!mongoose.Types.ObjectId.isValid(uid)) {
        return res.status(404).json({error: "no group invalid uid"})
    }
    try {
        
        const update = await Group.updateOne({_id: gid}, {$push:{users: uid}})
        //res.status(200).json(message);
        res.status(200).json(update);
        console.log("attempted")
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//this function accesses the users ina group based off an id for group passed in parameters and populates the list giving access to the users name
const getUsers = async (req, res) => {
    const {id} = req.params;

    console.log("occured")
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "no users invalid group id"})
    }

    const users = await Group.findById(id).select({"users": 1, "_id": 0}).populate("users");

    console.log(users);
    res.status(200).json(users);
}

module.exports = {
    getGroups,
    getGroup,
    createGroup,
    deleteGroup,
    updateGroup,
    addToGroup,
    getUsers
}