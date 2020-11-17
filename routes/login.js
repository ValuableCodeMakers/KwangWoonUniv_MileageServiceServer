const mysql = require("mysql");
const bkfd2Password = require("pbkdf2-password");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
var hasher = bkfd2Password();

passport.use(
  {
    usernameField: "id",
    passwordField: "pwd",
  },
  new LocalStrategy(function (id, pwd, done) {
    console.log("passport 실행");
    connection.query(
      `select * from project_data.user_data where id = ? and pwd = ?`,
      [id, pwd],
      function (err, results) {
        if (err) return done(err);

        if (!results[0]) {
          console.log("회원정보 확인");
          return done(err);
        }
        
        return hasher({ password: pwd, salt: user.salt }, function (
          err,
          pass,
          salt,
          hash
        ) {
          if (hash === user.password) {
            // 사용자의 비밀번호가 올바른지 확인
            console.log("LocalStrategy", user);
            done(null, user); // user 라는 값을 passport.serializeUser의 첫번째 인자로 전송
          } else done(null, false);
        });
      }
    );
  })
);

passport.serializeUser(function (user, done) {
  console.log("[SerializeUser] ", user);
  //
  // session store에 id 저장!
  //
  done(null, user.id);
});

// 로그인 사용자가 탭 이동시 콜백 함수 호출
passport.deserializeUser(function (id, done) {
  console.log("[DeserializeUser] ", id); // serializeUser 메소드의 user.id 값이 id 변수로 전달
  connection.query("select * from user where id=?", [id], function (
    err,
    results
  ) {
    if (err) return done(err);
    if (!results[0]) return done(err);

    return done(null, results[0]);
  });
});

exports.login = async (req, res) => {
  console.log("로그인 실행");

  passport.authenticate("local", (err, user, info) => {
    console.log(err, user, info);
  });
};

// exports.login = async (req, res) => {
//   console.log(req.body);

//   var userId = req.body["id"];
//   var userPwd = req.body["password"];

//   connection.query(
//     `select * from project_data.user_data where id = ? and pwd = ?`,
//     [userId, userPwd],
//     function (err, result, fields) {
//       if (err) console.log(err);
//       else {
//         if (result[0] != undefined) {
//           console.log("회원정보 확인");

//           connection.query(
//             `select department from project_data.user_data where id = ? and pwd = ?`,
//             [userId, userPwd],

//             function (err, result, fields) {
//               if (err) console.log(err);
//               else {
//                 console.log(JSON.stringify(result[0].department));

//                 if (result[0].department != null && result[0].department != "null") {
//                   res.send({ result: true });
//                 } else {
//                   res.send({ result: 'NEW_REGISTER' });
//                 }
//               }
//             }
//           );
//         } else {
//           res.send({ result: false });
//         }
//       }
//     }
//   );
// };
