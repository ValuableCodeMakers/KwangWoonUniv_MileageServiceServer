const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "127.0.0.1",
  post: 3306,
  user: "root",
  password: "123456",
  database: "project_data",
});
const fs = require("fs");

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

exports.savePhoto = async (req, res) => {
  console.log(req.files.image[0]);
  console.log(req.body.userId);

  const userId = req.body.userId;
  const type = req.files.image[0].mimetype;
  const filename = req.files.image[0].filename;
  const path = req.files.image[0].path;

  connection.query(
    `insert into project_data.user_photo(id,type,filename,path) value(?,?,?,?)`,
    [userId, type, filename, path],
    function (err, results) {
      if (err) {
        console.log(err);
        res.send({ photoResult: false });
      } else res.send({ photoResult: true });
    }
  );
};

exports.getPhoto = async (req, res) => {
  const userId = req.body.userId;

  connection.query(
    `select * from project_data.user_photo where id=?`,
    userId,
    function (err, results) {
      if (err) {
        console.log(err);
      } else {
        res.send({ photo: results });

      }
    }
  );
};
