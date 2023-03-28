const { instrument } = require("@socket.io/admin-ui");
const { fetch } = require("cross-fetch");
const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);

// const io = require("socket.io")(8001, {
//   cors: {
//     origin: ["http://localhost:5173", "https://admin.socket.io"],
//     credentials: true,
//   },
// });

const io = require("socket.io")(8001, {
  cors: {
    origin: ["http://localhost:5173", "https://admin.socket.io"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});
console.log("server running");
let activeUsers = [];

async function addToGroups(user, socket) {
  const response = await fetch("http://localhost:8000/users/user/" + user.id);
  const json = await response.json();
  if (!response.ok) {
    console.log("unable to retrieve user groups");
  }
  if (response.ok) {
    //console.log(json);
    if (Object.keys(json).length !== 0) {
      socket.emit("send-groups", json);
      console.log(json);
      json.map((group) => {
        //console.log(id);
        console.log(user.username + " in " + group._id);
        socket.join(group._id);
      });
    }
    console.log(`${user.username} in ${socket.rooms.size - 1} rooms`);
  }
}

async function addMessages(socket, message, groupid) {
  console.log("received " + message + " from room: " + groupid);
  socket.to(groupid).emit("receive-message", message, groupid);
  console.log(message);

  const response = await fetch("http://localhost:8000/messages/" + groupid, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: message.user, content: message.content }),
  });
  //const json = await response.json();
  if (!response.ok) {
    console.log("unable to add message to db");
  }
  if (response.ok) {
    console.log("sent message:");
    console.log(message);
  }
}

//set up connection
io.on("connection", async (socket) => {
  // console.log('user connected: ' + socket.handshake.auth.token.username)
  user = socket.handshake.auth.token;

  //get groups for user
  console.log("inside async");
  if (user == null) {
    return;
  }
  console.log("got user: " + user.username);
  addToGroups(user, socket);

  //to server from client
  socket.on("send-message", (message, groupid) => {
    addMessages(socket, message, groupid);
  });

  socket.on("group-add", () => {
    addToGroups(user, socket);
  });

  socket.on("retrieve-messages", () => {
    //TODO
  });

  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("user disconnected");
  });
});

instrument(io, {
  auth: false,
});
