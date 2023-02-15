const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/user-route");
const app = express();
const cors = require("cors");
require("dotenv").config();

const MongoURL = process.env.MONGO_URL;
app.use(cors());
app.use(express.json());
app.use("/users", router);

mongoose
  .connect(MongoURL)
  .then(() => app.listen(5000, () => console.log("Server is running")))
  .catch((err) => console.log(err));
