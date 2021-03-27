const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "127.0.0.1",
  post: 3306,
  user: "root",
  password: "123456",
  database: "project_data",
});
const fs = require("fs");
const path = require("path");

// 프로필 관련
exports.saveProfile = async (req, res) => {
  console.log("프로필 저장 실행");
  console.log(req.body);

  const _name = req.body["name"];
  const _nickname = req.body["nickname"];
  const _department = req.body["department"];
  const _mnemonic = req.body["mnemonic"];
  const _address = req.body["address"];
  const _privateKey = req.body["privateKey"];

  const _curId = req.session.passport.user;

  connection.query(
    `UPDATE project_data.user_data SET name=?, nickname=?, department=? WHERE id = ?`,
    [_name, _nickname, _department, _curId],

    function (err, result, fields) {
      if (err) console.log(err);
    }
  );

  connection.query(
    `INSERT INTO project_data.user_wallet(id,mnemonic,address,privateKey) VALUE(?,?,?,?)`,
    [_curId, _mnemonic, _address, _privateKey],

    function (err, result, fields) {
      if (err) console.log(err);
      else res.send("True");
    }
  );
};

exports.getUserId = async (req, res) => {
  const _userId = req.session.passport.user;
  res.send({ userId: _userId });
};

exports.getWalletAddress = (req, res) => {
  const _userId = req.body.userId;
  connection.query(
    `SELECT address FROM project_data.user_wallet WHERE id = ?`,
    _userId,
    function (err, results) {
      if (err) return done(err);
      const userWalletAddress = results[0].address;

      res.send({ userWalletAddress: userWalletAddress });
    }
  );
};

exports.getProfileEtc = (req, res) => {
  const _userId = req.body.userId;
  connection.query(
    "SELECT name,nickname,department FROM project_data.user_data WHERE id = ?",
    _userId,
    function (err, results) {
      if (err) {
        res.send(err);
      }

      const userName = results[0].name;
      const userNickname = results[0].nickname;
      const userDepartment = results[0].department;

      res.send({
        userName: userName,
        userNickname: userNickname,
        userDepartment: userDepartment,
      });
    }
  );
};

exports.changeProfile = async (req, res) => {
  const _userId = req.body.Id;
  const _name = req.body.name;
  const _nickname = req.body.nickname;
  const _department = req.body.department;

  connection.query(
    `UPDATE project_data.user_data SET name=?, nickname=?, department=? WHERE id = ?`,
    [_name, _nickname, _department, _userId],

    function (err, result, fields) {
      if (err) console.log(err);
      else
        console.log(_userId + "의 데이터 업데이트 완료")
    }
  );
  ;
}

// 지갑 내역 관련
exports.saveSpecification = async (req, res) => {
  const _specificationObj = req.body;
  const _userId = req.session.passport.user;
  console.log(_specificationObj)

  connection.query(
    "SELECT JSON_LENGTH(specification) as length FROM user_wallet WHERE id=?", // 내역 길이 알아오기
    _userId,
    function (err, result) {
      const length = result[0].length;

      const table = "`" + "specification" + "`";

      if (length != 0 || length != null) {
        const sqlQuery = `UPDATE project_data.user_wallet SET specification=JSON_ARRAY_INSERT(${table},'$[${length}]',JSON_OBJECT('${length}',JSON_OBJECT('date','${_specificationObj.date.split('T')[0]}', 'detail', '${_specificationObj.detail}', 'amount','${_specificationObj.amount}'))) WHERE id = ${_userId}`;

        connection.query(sqlQuery, function (err, results) {
          if (err) console.log(err);
          else res.send({ saveSpecification_result: true });
        });
      } else {
        const sqlQuery = `UPDATE project_data.user_wallet SET specification=JSON_ARRAY(JSON_OBJECT('0',JSON_OBJECT('data','${_specificationObj.date.split('T')[0]}', 'detail', '${_specificationObj.detail}', 'amount','${_specificationObj.amount}'))) WHERE id = ${_userId}`;

        connection.query(sqlQuery, function (err, results) {
          if (err) console.log(err);
          else res.send({ saveSpecification_result: true });
        });
      }
    }
  );
  
  connection.query(
    "SELECT balance FROM project_data.user_ranking WHERE id=?", _userId,
    function (err, result) {
      if (err) console.log(err)
      else {
        const sqlQuery = `UPDATE project_data.user_ranking SET balance = balance+${_specificationObj.amount} WHERE id = ${_userId}`
        connection.query(sqlQuery, function (err, results) {
          if (err) console.log(err);
        });
      }

    }
  )
};

exports.getSpecification = async (req, res) => {
  const _userId = req.session.passport.user;

  connection.query(
    "SELECT specification FROM project_data.user_wallet WHERE id = ?",
    _userId,
    function (err, results) {
      if (err) {
        res.send(err);
      }
      res.send(results[0].specification);
    }
  );
};

// 프로필 사진 관련
exports.savePhoto = async (req, res) => {
  console.log(req.files.image[0]);
  console.log(req.body.userId);

  const _userId = req.body.userId;
  const _type = req.files.image[0].mimetype;
  const _filename = req.files.image[0].filename;
  const _path = req.files.image[0].path;

  connection.query(
    `INSERT INTO project_data.user_photo(id,type,filename,path) VALUE(?,?,?,?)`,
    [_userId, _type, _filename, _path],
    function (err, results) {
      if (err) {
        console.log(err);
        res.send({ photoResult: false });
      } else res.send({ photoResult: true });
    }
  );
};

exports.getPhoto = async (req, res) => {
  const _userId = req.body.userId;

  connection.query(
    `SELECT * FROM project_data.user_photo WHERE id=?`,
    _userId,
    function (err, results) {
      if (err) {
        console.log(err);
      } else {
        if (results.length != 0) {
          res.send({ photo: results });
        } else {
          res.send({ photo: false });
        }
      }
    }
  );
};

exports.getPhotos = async (req, res) => {
  console.log("유저 사진 불러오기 ", req.body);
  var sqlString =
    "id=" +
    req.body.user1 +
    "||id=" +
    req.body.user2 +
    "||id=" +
    req.body.user3 +
    "||id=" +
    req.body.user4 +
    "||id=" +
    req.body.user5 +
    "||id=" +
    req.body.user6 +
    "||id=" +
    req.body.user7 +
    "||id=" +
    req.body.user8 +
    "||id=" +
    req.body.user9 +
    "||id=" +
    req.body.user10;
  connection.query(
    `SELECT id,filename FROM project_data.user_photo WHERE ${sqlString}`,
    function (err, results) {
      if (err) {
        console.log(err);
      } else {
        console.log(results);
        res.send({ photos: results });
      }
    }
  );
};

exports.changePhoto = async (req, res) => {
  const _userId = req.body.userId;
  const _type = req.files.image[0].mimetype;
  const _filename = req.files.image[0].filename;
  const _path = req.files.image[0].path;

  // 서버에서 사진 삭제
  connection.query(
    `SELECT * FROM project_data.user_photo WHERE id=?`,
    _userId,
    function (err, results) {
      if (err) {
        console.log(err);
      } else {
        if (results.length != 0) {
          const filePath = path.join(__dirname, `../root/${results[0].path}`);
          console.log(`삭제할 경로 ${filePath}`);

          fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) return console.log("삭제할 수 없는 파일입니다");

            fs.unlink(filePath, (err) =>
              err
                ? console.log(err)
                : console.log(`${filePath} 를 정상적으로 삭제했습니다`)
            );
          });
        }

        // DB에 사진 정보 덮어쓰기
        connection.query(
          `INSERT INTO project_data.user_photo SET id=?,type=?,filename=?,path=? ON DUPLICATE KEY UPDATE type=?,filename=?,path=?`,
          [_userId, _type, _filename, _path, _type, _filename, _path],
          function (err, results) {
            if (err) {
              console.log(err);
              res.send({ photoResult: false });
            } else res.send({ photoResult: true });
          }
        );
      }
    }
  );
};
