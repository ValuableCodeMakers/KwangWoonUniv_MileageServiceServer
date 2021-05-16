const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bkfd2Password = require("pbkdf2-password");
const mysqlConnection = require("../modules/mysql.js");

const connection = mysqlConnection.connection;

var hasher = bkfd2Password();

module.exports = () =>
  passport.use(
    "local",
    new LocalStrategy(
      {
        usernameField: "id",
        passwordField: "password",
        passReqToCallback: false, // 첫번째 파라미터로 req 전달
      },
      function (id, password, done) {
        console.log("[LocalStrategy] 실행", id, password);
        try {
          connection.query(
            `SELECT * FROM KW_project_database.user_data WHERE id = ?`,
            id,
            function (err, results) {
              if (err) return done(err);
              if (!results[0]) {
                console.log("회원정보(아이디)가 없습니다.");
                return done(null, false, {
                  message: "회원정보(아이디)가 없습니다.",
                });
              }

              let user = results[0];
              return hasher(
                { password: password, salt: user.user_salt },
                function (err, pass, salt, hash) {
                  if (hash === user.password) {
                    // 사용자의 비밀번호가 올바른지 확인
                    let userWalletAddress;

                    connection.query(
                      `SELECT address FROM KW_project_database.user_wallet WHERE id = ?`,
                      user.id,
                      function (err, results) {
                        if (err) return done(err);

                        // 유저 지갑 존재 유무 확인
                        if (results[0] == undefined) {
                          userWalletAddress = "";
                        } else {
                          userWalletAddress = results[0].address;
                        }

                        const userInfo = {
                          user: user,
                          walletAddress: userWalletAddress,
                        };

                        console.log("Session data", userInfo);
                        done(null, userInfo); // userInfo 라는 값을 passport.serializeUser의 첫번째 인자로 전송
                      }
                    );
                  } else
                    done(null, false, {
                      message: "비밀번호가 틀렸습니다.",
                    });
                }
              );
            }
          );
        } catch (err) {
          console.error(err);
          done(err);
        }
      }
    )
  );
