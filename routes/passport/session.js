const passport = require("passport");
const localLogin = require("./localLogin.js");
const mysqlConnection = require("../modules/mysql.js");

const connection = mysqlConnection.connection;

module.exports = () => {
  passport.serializeUser(function (user, done) {
    console.log("[SerializeUser] ", user.id);

    done(null, user.id); // session store에 id 저장!
  });

  // 로그인 사용자가 탭 이동시 콜백 함수 호출
  passport.deserializeUser(function (authId, done) {
    console.log("[DeserializeUser] ", authId); // serializeUser 메소드의 user.id 값이 id 변수로 전달

    connection.query(
      "SELECT * FROM user_data WHERE id=?",
      [authId],
      function (err, results) {
        if (err) 
          done(err);
        if (!results[0])
          done(err, false, { message: "Session에 현재 User 존재하지 않음" });
        else 
          done(null, authId);
      }
    );
  });

  localLogin();
};
