const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

// Load environment variables from .env file
dotenv.config();

// Define MongoDB connection string
const uri = process.env.MONGODB_URI;

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(uri, {
      //useCreateIndex: false,
      
      //useFindAndModify: false,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
  }
}
connectDB();

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("mongodb connection success!");
});


//to access the user.js route file
const UserRouter = require("./routes/User.js")
app.use("/User",UserRouter);

const forgotPW = require("./routes/forgotPw.js")
app.use("/forgotPW",forgotPW);


//end of access user.js
app.listen(PORT, () => {
  console.log(`server is up and running on port ${PORT}`);
});
