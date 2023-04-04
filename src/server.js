const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('../routes/authRoutes');
const cookieParser = require('cookie-parser');

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

//database connection
const dbURI = 'mongodb://localhost:27017/bookstore';
mongoose.connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

//routes
app.get("/test", (req, res) => {
    res.send("Hello World!");
});

app.use(authRoutes);