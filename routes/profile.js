const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  post: 3306,
  user: "root",
  password: "123456",
  database: "project_data",
});

exports.saveProfile = async (req, res) => {
  console.log("프로필 저장 실행");
  console.log(req.body);

  var _name = req.body["name"];
  var _nickname = req.body["nickname"];
  var _department = req.body["department"];

  connection.query(
    `insert into project_data.user_data(name,nickname,department) value(?,?,?)`,
    [_name, _nickname, _department],

    function (err, result, fields) {
      if (err) console.log(err);
      else res.send("True");
    }
  );
};
