const express = require("express");
const app = express();
const api = require('../routes/api.js');

const cors = require('cors');

app.use(cors());

app.use('/api',api);

app.listen(3000, function () {
  console.log("Connect, 3000 port!");
});

