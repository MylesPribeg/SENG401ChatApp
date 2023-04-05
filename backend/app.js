const express = require("express");
const mongoose = require("mongoose");
const userrouter = require("./routes/user-route");
//const convorouter = require("./routes/conversation-route");
//const messagerouter = require("./routes/message-route");
const groupRoutes = require("./routes/groupRoute.js");
const messageRoutes = require("./routes/messageRoute.js");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");

const agoraAppId = process.env.AGORA_APP_ID;
const agoraAppCertificate = process.env.AGORA_APP_CERTIFICATE;

const PORT = process.env.PORT;
const MongoURL = process.env.MONGO_URL;

// CORS configuration options
const corsOptions = {
  origin: '*', // Allow all origins (not recommended for production)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Use the cors middleware with the configuration options
app.use(cors(corsOptions));

app.use(express.json());
app.use("/users", userrouter);
//app.use("/conversations", convorouter);
//app.use("/messages", messagerouter);
app.use("/groups", groupRoutes);
app.use("/messages", messageRoutes);
const {
  RtcTokenBuilder,
  RtmTokenBuilder,
  RtcRole,
  RtmRole,
} = require("agora-access-token");

app.post("/token", (req, res) => {
  const appId = process.env.AGORA_APP_ID;
  const appCertificate = process.env.AGORA_APP_CERTIFICATE;
  const channelName = req.body.channel;
  // const uid = Math.floor(Math.random() * 50000) + 1;
  const uid = 0;
  const role = RtcRole.PUBLISHER;
  const expirationTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  const token = RtcTokenBuilder.buildTokenWithUid(
    appId,
    appCertificate,
    channelName,
    uid,
    role,
    privilegeExpiredTs
  );

  res.json({ token, uid });
});

mongoose.set("strictQuery", true);
mongoose
  .connect(MongoURL)
  .then(() => app.listen(PORT, () => console.log("Server is running")))
  .catch((err) => console.log(err));
