const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("../routes/authRoutes");
const lessonRoutes = require("../routes/lessonRoutes");
const morgan = require("morgan");
const adminRoutes = require("../routes/adminRoutes");
const grammarRoutes = require("../routes/grammarRoutes");
const flashcardRoutes = require("../routes/flashcardRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  //To allow requests from client
  origin: ["http://localhost:8080", "http://localhost:8082"],
  credentials: true,
  exposedHeaders: ["set-cookie"],
};

const corsMiddleware = cors(corsOptions);

app.use(corsMiddleware);
//database connection
const dbURI = "mongodb://localhost:27017/everything-japanese";
mongoose
  .connect(dbURI)
  .then((result) => {
    console.log("connected to db, listening on port 3000");
    app.listen(3000);
  })
  .catch((err) => console.log(err));

//checks for audio folder and creates one if it doesn't exist
if (!fs.existsSync("./audio")) {
  fs.mkdirSync("./audio");
}

// Serve static files from a directory on your server
app.use("/audio", express.static("audio"));

//routes
app.get("/test", (req, res) => {
  res.send("Hello World!");
});

app.use(morgan("dev"));
app.use(authRoutes);
app.use(lessonRoutes);
app.use(adminRoutes);
app.use(grammarRoutes);
app.use(flashcardRoutes);
