const mysql = require("mysql");
const passport = require("passport");
const localLogin = require("./localLogin.js");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  post: 3306,
  user: "root",
  password: "123456",
  database: "project_data",
});

module.exports = () => {
  passport.serializeUser(function (user, done) {
    console.log("[SerializeUser] ", user);

    done(null, user.id); // session store에 id 저장!
  });

  // 로그인 사용자가 탭 이동시 콜백 함수 호출
  passport.deserializeUser(function (authId, done) {
    console.log("[DeserializeUser] ", authId); // serializeUser 메소드의 user.id 값이 id 변수로 전달
    connection.query(
      "select * from user_data where id=?",
      [authId],
      function (err, results) {
        if (err) return done(err);
        if (!results[0]) return done(err);

        return done(null, results[0]);
      }
    );
  });
  
  localLogin;
};
