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
const { stringify } = require("querystring");

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

  connection.query(
    "SELECT JSON_LENGTH(specification) as length FROM user_wallet WHERE id=?", // 내역 길이 알아오기
    _userId,
    function (err, result) {
      const length = result[0].length;
      const table = "`" + "specification" + "`";

      if (length != 0) {
        const sqlQuery = `UPDATE project_data.user_wallet SET specification=JSON_ARRAY_INSERT(${table},'$[${length}]',JSON_OBJECT('${length}',JSON_OBJECT('date','${_specificationObj.date.split('T')[0]}', 'detail', '${_specificationObj.detail}', 'amount','${_specificationObj.amount}'))) WHERE id = ${_userId}`;

        connection.query(sqlQuery, function (err, results) {
          if (err) console.log(err);
          else res.send({ saveSpecification_result: true });
        });
      } else {
        const sqlQuery = `UPDATE project_data.user_wallet SET specification=JSON_ARRAY(JSON_OBJECT('0',JSON_OBJECT('date','${_specificationObj.date.split('T')[0]}', 'detail', '${_specificationObj.detail}', 'amount','${_specificationObj.amount}'))) WHERE id = ?`;

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

exports.saveHistory = async (req, res) => {
  var date = req.body.date.split('T')[0];
  const _year = date.split('-')[0];
  const _month = date.split('-')[1];
  const _day = date.split('-')[2];
  const _userId = req.session.passport.user;
  const _amount = req.body.amount;

  connection.query(
    "SELECT JSON_LENGTH(history) as length FROM user_wallet WHERE id=?", // 내역 길이 알아오기
    _userId,
    function (err, result) {
      const length = result[0].length;
      const table = "`" + "history" + "`";
      console.log(length);

      if (length != null) {
        connection.query(`SELECT history FROM user_wallet WHERE id = ${_userId}`, function (err, results) {
          if (err) res.send(err);

          sampleHistory = JSON.stringify(results).split('[')[2].split(']')[0].split(',')[0];  //날짜 판별을 위한 샘플 데이터
          sampleHistory = sampleHistory.split('\\"')[5];

          var sampleHistoryDate = sampleHistory.split('-');
          if ((sampleHistoryDate[0] == _year) && (sampleHistoryDate[1] == _month) && (sampleHistoryDate[2] == _day)) {  // 데이터베이스 history에 저장되어있는 첫 데이터의 날짜가 오늘일때
            connection.query(`UPDATE project_data.user_wallet SET history=JSON_ARRAY_INSERT(${table},'$[${length}]',JSON_OBJECT('${length}',JSON_OBJECT('date','${date}'))) WHERE id = ${_userId}`, function (err, results) {
              if (err) res.send(err);
              else {
                if (length == '2') {  // 3번째 데이터를 넣기에 성공했을 때
                  console.log("3번째 적립이네요!");
                  const sqlQuery = `UPDATE project_data.user_ranking SET balance = balance+${_amount} WHERE id = ${_userId}`
                  connection.query(sqlQuery, function (err, results) {  // 추가 토큰 지급
                    if (err) console.log(err);
                    else {
                      console.log("3번째 건물 방문 이벤트 코인 지급!");
                      res.send({ saveHistory_result: true });
                    }
                  });

                  connection.query( // specification 업데이트
                    "SELECT JSON_LENGTH(specification) as length FROM user_wallet WHERE id=?", // specification 내역 길이 알아오기
                    _userId,
                    function (err, result) {
                      const length2 = result[0].length;
                      const table2 = "`" + "specification" + "`";

                      if (length2 != 0) {
                        const sqlQuery = `UPDATE project_data.user_wallet SET specification=JSON_ARRAY_INSERT(${table2},'$[${length2}]',JSON_OBJECT('${length2}',JSON_OBJECT('date','${date}', 'detail', '건물방문 3회차', 'amount','${_amount}'))) WHERE id = ${_userId}`;

                        connection.query(sqlQuery, function (err, results) {
                          if (err) console.log(err);
                        });
                      } else {
                        const sqlQuery = `UPDATE project_data.user_wallet SE차 specification=JSON_ARRAY(JSON_OBJECT('0',JSON_OBJECT('date','${date}', 'detail', '건물방문 3회차', 'amount','${_amount}'))) WHERE id = ?`;

                        connection.query(sqlQuery, function (err, results) {
                          if (err) console.log(err);
                        });
                      }
                    }
                  );
                }
              }
            });
          }
          else {  // 데이터베이스 history에 저장되어있는 첫 데이터의 날짜가 오늘이 아닐때
            connection.query(`UPDATE project_data.user_wallet SET history = JSON_ARRAY(JSON_OBJECT('0',JSON_OBJECT('date','${date}'))) WHERE id = ${_userId}`, function (err, results) {
              if (err) res.send(err);
            });
          }
        });
      } else {  // history에 데이터를 처음 넣을 때
        connection.query(`UPDATE project_data.user_wallet SET history = JSON_ARRAY(JSON_OBJECT('0',JSON_OBJECT('date','${date}'))) WHERE id = ${_userId}`, function (err, results) {
          if (err) res.send(err);
        });
      }
    }
  );
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

exports.getBuildingVisitCount = async (req, res) => {
  const _userId = req.session.passport.user;

  connection.query(
    "SELECT JSON_LENGTH(history) as length FROM user_wallet WHERE id=?", // 내역 길이 알아오기
    _userId,
    function (err, result) {
      const length = result[0].length;
      if (err) {
        res.send(err);
      }
      else {
        console.log("length: " + length);
        res.send({ length: length });
      }
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
