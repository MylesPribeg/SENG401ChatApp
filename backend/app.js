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

const PORT = process.env.PORT;
const MongoURL = process.env.MONGO_URL;
app.use(cors());
app.use(express.json());
app.use("/users", userrouter);
//app.use("/conversations", convorouter);
//app.use("/messages", messagerouter);
app.use("/groups", groupRoutes);
app.use("/messages", messageRoutes);
mongoose.set('strictQuery', true);
mongoose
  .connect(MongoURL)
  .then(() => app.listen(PORT, () => console.log("Server is running")))
  .catch((err) => console.log(err));
