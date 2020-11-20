const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mysql = require("mysql");
const bkfd2Password = require("pbkdf2-password");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  post: 3306,
  user: "root",
  password: "123456",
  database: "project_data",
});
var hasher = bkfd2Password();

module.exports = passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "id",
      passwordField: "password",
      passReqToCallback: true, // 첫번째 파라미터로 req 전달
    },
    function (req, id, password, done) {
      console.log("[LocalStrategy] 실행", id, password);

      connection.query(
        `select * from project_data.user_data where id = ?`,
        id,
        function (err, results) {
          if (err) return done(err);

          if (!results[0]) {
            console.log("DB에 회원정보(아이디)가 없습니다.");
            return done(err);
          }

          var user = results[0];
          console.log(user);
          return hasher(
            { password: password, salt: user.user_salt }, 
            function (err,pass,salt,hash) {
              console.log(user.password);
              console.log(hash);
            if (hash === user.password) {
              // 사용자의 비밀번호가 올바른지 확인
              console.log("유저 확인", user);
              done(null, user); // user 라는 값을 passport.serializeUser의 첫번째 인자로 전송
            } 
            else done(null, false);
          });
        }
      );
    }
  )
);
