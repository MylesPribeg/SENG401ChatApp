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
const User = require("./models/User");

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

async function updateUserTheme(username, themeObject) {
  try {
    // Find the user with the given username
    const user = await User.findOne({ username: username });

    // If the user is not found, throw an error
    if (!user) {
      throw new Error('User not found');
    }

    // Update the user's theme with the new theme object
    user.theme = {
      fontStyle: themeObject.fontStyle,
      fontColour: themeObject.fontColour,
      font: themeObject.font,
      PBGred: themeObject.PBGred,
      PBGgreen: themeObject.PBGgreen,
      PBGblue: themeObject.PBGblue,
      SBGred: themeObject.SBGred,
      SBGgreen: themeObject.SBGgreen,
      SBGblue: themeObject.SBGblue,
      updated: themeObject.updated
    };

    // Save the updated user object
    await user.save();

    // Return the updated user object
    return user;
  } catch (error) {
    console.error('Error updating user theme:', error);
    throw error;
  }
}

app.put('/updateTheme', async (req, res) => {
  const { username, themeObject } = req.body;
  try {
    const updatedUser = await updateUserTheme(username, themeObject);
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user theme:', error);
    res.status(500).json({ message: 'Error updating user themedsad' });
  }
});

app.get('/themes/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (user) {
      res.json(user.theme);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

mongoose.set("strictQuery", true);
mongoose
  .connect(MongoURL)
  .then(() => app.listen(PORT, () => console.log("Server is running")))
  .catch((err) => console.log(err));

