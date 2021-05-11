const bkfd2Password = require("pbkdf2-password");
const mysqlConnection = require("../modules/mysql.js");

const connection = mysqlConnection.connection;

var hasher = bkfd2Password();

exports.register = async (req, res) => {
  var _id = req.body["id"];
  var _password = req.body["password"];

  await hasher({ password: _password }, function (err, pass, salt, hash) {
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
