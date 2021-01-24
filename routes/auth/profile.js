const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  post: 3306,
  user: "root",
  password: "123456",
  database: "project_data",
});

exports.getUserId = async (req, res) => {
  const curId = req.session.passport.user;
  res.send({ userId: curId });
};

exports.getWalletAddress = (req, res) => {
  const userId = req.body.userId;
  connection.query(
    `select address from project_data.user_wallet where id = ?`,
    userId,
    function (err, results) {
      if (err) return done(err);
      const userWalletAddress = results[0].address;

      res.send({ userWalletAddress: userWalletAddress });
    }
  );
};

exports.saveProfile = async (req, res) => {
  console.log("프로필 저장 실행");
  console.log(req.body);

  const _name = req.body["name"];
  const _nickname = req.body["nickname"];
  const _department = req.body["department"];
  const _mnemonic = req.body["mnemonic"];
  const _address = req.body["address"];
  const _privateKey = req.body["privateKey"];

  const curId = req.session.passport.user;

  connection.query(
    `UPDATE project_data.user_data SET name=?, nickname=?, department=? WHERE id = ?`,
    [_name, _nickname, _department, curId],

    function (err, result, fields) {
      if (err) console.log(err);
    }
  );

  connection.query(
    `INSERT INTO project_data.user_wallet(id,mnemonic,address,privateKey) VALUE(?,?,?,?)`,
    [curId, _mnemonic, _address, _privateKey],

    function (err, result, fields) {
      if (err) console.log(err);
      else res.send("True");
    }
  );
};
