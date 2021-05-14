const express = require("express");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const passport = require('passport');
const cors = require("cors");
const routes = require("../routes/routes.js");
const passportConfigure = require('../routes/passport/session.js');

const app = express();

passportConfigure();

app.use(cors());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(express.static('profiles'))

app.use(
  session({
    secret: "ABCD1234ABAB!@",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore({
      host: "kw-project-database.cvhj6cyryo94.ap-northeast-2.rds.amazonaws.com",
      post: 3306,
      user: "admin",
      password: "26958983",
      database: "project_data",
    }),
  })
);
app.use(passport.initialize()); // passport 사용
app.use(passport.session()); // passport 사용시 session 활용


app.use("/routes", routes)

app.listen(3000, function () {
  console.log("서버 실행 완료!");
});
