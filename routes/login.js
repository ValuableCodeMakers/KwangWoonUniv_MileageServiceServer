var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  post: 3306,
  user: "root",
  password: "123456",
  database: "project_data",
});

exports.login = async (req, res) => {
  console.log(req.body);

  var userId = req.body["id"];
  var userPwd = req.body["password"];
  //var userPwdCheck = req.body["pwdCheck"];

  console.log(userId);
  console.log(userPwd);
  connection.query(
    `select * from project_data.user_data where id = ? and pwd = ?`,
    [userId, userPwd],
    function (err, result, fields) {
      if (err) console.log(err);
      else {
        if (result[0] != undefined) {
          console.log(result);
          res.send({ result: true });
        } else {
          res.send({ result: false });
        }
      }
    }
  );
};
