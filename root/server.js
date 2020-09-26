const express = require("express");
const app = express();
const routes = require('../routes/routes.js');

const cors = require('cors');

app.use(cors());

app.use('/routes',routes);

app.listen(3000, function () {
  console.log("Connect, 3000 port!");
});

