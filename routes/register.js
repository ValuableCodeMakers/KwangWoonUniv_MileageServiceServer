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

exports.register = async (req, res) => {
  console.log("회원가입 실행");
  console.log(req.body);

  var userId = req.body["id"];
  var userPwd = req.body["password"];

  console.log(userId, userPwd);

  hasher({ password: userPwd }, function (err, pass, salt, hash) {
    connection.query(
      `insert into project_data.user_data(id,password,user_salt) value(?,?,?)`,
      [userId,hash,salt],

      function (err, result, fields) {
        if (err) console.log(err);
        else {
          res.send("회원가입 성공");
        }
      }
    );
  });
};
