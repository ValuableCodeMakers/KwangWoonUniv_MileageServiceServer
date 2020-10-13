const express = require("express");
const cors = require('cors');
const app = express();

const routes = require('../routes/routes.js');

app.use(cors());
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());

app.use('/routes',routes);

app.listen(3000, function () {
  console.log("서버 실행 완료!");
});

