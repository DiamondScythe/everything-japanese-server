const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("../routes/authRoutes");
const lessonRoutes = require("../routes/lessonRoutes");
const adminRoutes = require("../routes/adminRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

//cors
//This code sets the Access-Control-Allow-Origin header to http://localhost:8080 and
//allows the headers specified in the Access-Control-Allow-Headers header to be included in the API responses.
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:8080");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

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
    console.log("connected to db, listening on port 8081");
    app.listen(8081);
  })
  .catch((err) => console.log(err));

//routes
app.get("/test", (req, res) => {
  res.send("Hello World!");
});

app.use(authRoutes);
app.use(lessonRoutes);
app.use(adminRoutes);
