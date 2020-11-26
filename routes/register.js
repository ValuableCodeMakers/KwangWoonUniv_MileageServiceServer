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

  var _id = req.body["id"];
  var _password = req.body["password"];

  console.log(_id, _password);

  hasher({ password: _password }, function (err, pass, salt, hash) {
    connection.query(
      `insert into project_data.user_data(id,password,user_salt) value(?,?,?)`,
      [_id,hash,salt],

      function (err, result, fields) {
        if (err) console.log(err);
        else {
          res.send("회원가입 성공");
        }
      }
    );
  });
};
