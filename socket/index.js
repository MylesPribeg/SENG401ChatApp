const { instrument } = require("@socket.io/admin-ui");
const { fetch } = require("cross-fetch");
const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";
const PORT = process.env.PORT || 8001;

const io = require("socket.io")(PORT, {
  cors: {
    origin: [FRONTEND_URL, "https://admin.socket.io"],
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  },
});
console.log("server running");
let activeUsers = [];

async function addToGroups(user, socket) {
  const response = await fetch(`${BACKEND_URL}/users/user/${user.id}`);
  const json = await response.json();
  if (!response.ok) {
    console.log("unable to retrieve user groups");
  }
  if (response.ok) {
    socket.emit("send-groups", json);
    console.log(json);
    json.map((group) => {
      console.log(user.username + " in " + group._id);
      socket.join(group._id);
    });
  }
  console.log(`${user.username} in ${socket.rooms.size - 1} rooms`);
}

async function addMessages(socket, message, groupid) {
  console.log("received " + message + " from room: " + groupid);
  socket.to(groupid).emit("receive-message", message, groupid);
  console.log(message);

  const response = await fetch(`${BACKEND_URL}/messages/${groupid}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: message.user, content: message.content }),
  });
  if (!response.ok) {
    console.log("unable to add message to db");
  }
  if (response.ok) {
    console.log("sent message:");
    console.log(message);
  }
}

io.on("connection", async (socket) => {
  user = socket.handshake.auth.token;
  if (user == null) {
    return;
  }
  console.log("got user: " + user.username);
  addToGroups(user, socket);

  socket.on("send-message", (message, groupid) => {
    addMessages(socket, message, groupid);
  });

  socket.on("group-add", () => {
    addToGroups(user, socket);
  });

  socket.on("left-group", async (leftGroupId) => {
    const response = await fetch(
      `${BACKEND_URL}/groups/removeUser/${leftGroupId}&${user.username}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    //const json = await response.json();
    if (!response.ok) {
      console.log("unable to remove user from group in db");
    }
    if (response.ok) {
      console.log("removed user: " + user._id + " from db");
    }
    //emit to other users in group that user has left
    socket.to(leftGroupId).emit("left-group", user.username, leftGroupId);
  });

  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("user disconnected");
  });
});

instrument(io, {
  auth: false,
});
