const mysql = require("mysql");
const bkfd2Password = require('pbkdf2-password');
const connection = mysql.createConnection({
  host: "10.0.2.2",
  post: 3306,
  user: "root",
  password: "123456",
  database: "project_data",
});
var hasher = bkfd2Password();

exports.login = async (req, res) => {
  console.log(req.body);

  var userId = req.body["id"];
  var userPwd = req.body["password"];

  connection.query(
    `select * from project_data.user_data where id = ? and pwd = ?`,
    [userId, userPwd],
    function (err, result, fields) {
      if (err) console.log(err);
      else {
        if (result[0] != undefined) {
          console.log("회원정보 확인");

          connection.query(
            `select department from project_data.user_data where id = ? and pwd = ?`,
            [userId, userPwd],
            function (err, result, fields) {
              if (err) console.log(err);
              else {
                console.log(JSON.stringify(result[0].department));

                if (result[0].department != null && result[0].department != "null") {            2
                  res.send({ result: true });
                } else {
                  res.send({ result: 'NEW_REGISTER' });
                }
              }
            }
          );
        } else {
          res.send({ result: false });
        }
      }
    }
  );
  connection.end();
};
