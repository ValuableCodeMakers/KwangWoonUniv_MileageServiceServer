const express = require("express");
const app = express();

app.use('/getToken',api);

app.listen(3000, function () {
  console.log("Connect, 3000 port!");
});

