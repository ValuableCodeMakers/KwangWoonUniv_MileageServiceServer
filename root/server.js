const express = require("express");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const passport = require('passport');
const cors = require("cors");

const routes = require("../routes/routes.js");

const app = express();

app.use(cors());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

app.use(
  session({
    secret: "ABCD1234ABAB!@",
    resave: true,
    saveUninitialized: true,
    store: new MySQLStore({
      host: "127.0.0.1",
      post: 3306,
      user: "root",
      password: "123456",
      database: "project_data",
    }),
  })
);

app.use("/routes", routes)

app.use(passport.initialize()); // passport 사용
app.use(passport.session()); // passport 사용시 session 활용

app.listen(3000, function () {
  console.log("서버 실행 완료!");
});
