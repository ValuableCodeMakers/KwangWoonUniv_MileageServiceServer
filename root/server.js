const express = require("express");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const passport = require("passport");
const cors = require("cors");
const routes = require("../routes/routes.js");
const passportConfigure = require("../routes/auth/passport/session.js");

const env_keys = require("../routes/modules/env_keys.js");

const AWS_HOST = env_keys.AWS_HOST;
const AWS_POST = env_keys.AWS_POST;
const AWS_USER = env_keys.AWS_USER;
const AWS_PASSWORD = env_keys.AWS_PASSWORD;
const AWS_DATABASE = env_keys.AWS_DATABASE;

const app = express();

passportConfigure();

app.use(cors());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(express.static("profiles"));

app.use(
  session({
    secret: "ABCD1234ABAB!@",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore({
      host: AWS_HOST,
      post: AWS_POST,
      user: AWS_USER,
      password: AWS_PASSWORD,
      database: AWS_DATABASE,
    }),
  })
);
app.use(passport.initialize()); // passport 사용
app.use(passport.session()); // passport 사용시 session 활용

app.use("/routes", routes);

app.listen(3000, function () {
  console.log("서버 실행 완료!");
});
