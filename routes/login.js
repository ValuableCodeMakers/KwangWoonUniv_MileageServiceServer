const passport = require("passport");

exports.login = function (req, res, next) {
  console.log(req.body);
  console.log("로그인 실행!");

  passport.authenticate("local", (err, user, info) => {
    console.log("authenticate callback");

    if (err) {
      console.log("authenticate callback Fail!");
      res.send("로그인 실패");
    }
    console.log(err, user, info);

    if(!user){
      console.log("fail");
    }else if(user){

    }
  })(req, res, next);
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
