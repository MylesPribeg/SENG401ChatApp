const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/user-route");
const app = express();

app.use(express.json());
app.use("/users", router);

mongoose
  .connect(
    "mongodb+srv://admin:MWxU5Ztxcq6BfT1L@cluster0.glsp4it.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => app.listen(5000, () => console.log("Server is running")))
  .catch((err) => console.log(err));
