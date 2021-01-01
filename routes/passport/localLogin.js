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
          console.log("user data in DB",results);
          if (!results[0]) {
            console.log("DB에 회원정보(아이디)가 없습니다.");
            return done(err);
          }

          let user = results[0];
          return hasher(
            { password: password, salt: user.user_salt },
            function (err, pass, salt, hash) {
              if (hash === user.password) {
                // 사용자의 비밀번호가 올바른지 확인
                let userWalletAddress;
                connection.query(
                  `select address from project_data.user_wallet where id = ?`,
                  user.id,
                  function (err, results) {
                    if (err) return done(err);
                    console.log("walletId in DB", results);

                    userWalletAddress = results[0].address;
                    const userInfo = {
                      user: user,
                      walletAddress: userWalletAddress,
                    };

                    console.log("Session data", userInfo);
                    done(null, userInfo); // userInfo 라는 값을 passport.serializeUser의 첫번째 인자로 전송
                  }
                );

                // connection.query(
                //   `select department from project_data.user_data where id = ?`,
                //   id,
                //   function (err, result, fields) {
                //     if (err) console.log(err);
                //     else {
                //     }
                //   }
                // );
              } else done(null, false);
            }
          );
        }
      );
    }
  )
);
