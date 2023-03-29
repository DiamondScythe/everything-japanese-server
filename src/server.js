const express = require('express');
const app = express();

app.get("/test", (req, res) => {
    res.send("Hello World!");
});

app.listen(1337, () => {  
  console.log('Server listening on port 1337');
});