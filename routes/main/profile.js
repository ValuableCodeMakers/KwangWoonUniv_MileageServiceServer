const mysqlConnection = require("../modules/mysql.js");

const connection = mysqlConnection.connection;

exports.getUserId = async (req, res) => {
  try {
    const _userId = req.session.passport.user;
    res.send({ userId: _userId });
  } catch {
    res.send({ userId: null });
  }
};

exports.getWalletAddress = (req, res) => {
  const _userId = req.body.userId;
  connection.query(
    `SELECT address FROM KW_project_database.user_wallet WHERE id = ?`,
    _userId,
    function (err, results) {
      if (err) return done(err);
      const userWalletAddress = results[0].address;

      res.send({ userWalletAddress: userWalletAddress });
    }
  );
};

// 프로필 관련
exports.saveProfile = async (req, res) => {
  const _name = req.body["name"];
  const _nickname = req.body["nickname"];
  const _department = req.body["department"];
  const _mnemonic = req.body["mnemonic"];
  const _address = req.body["address"];
  const _privateKey = req.body["privateKey"];

  const _curId = req.session.passport.user;

  connection.query(
    `UPDATE KW_project_database.user_data SET name=?, nickname=?, department=? WHERE id = ?`,
    [_name, _nickname, _department, _curId],

    function (err, result, fields) {
      if (err) console.log(err);
    }
  );

  connection.query(
    `INSERT INTO KW_project_database.user_wallet(id,mnemonic,address,privateKey) VALUE(?,?,?,?)`,
    [_curId, _mnemonic, _address, _privateKey],

    function (err, result, fields) {
      if (err) console.log(err);
      else res.send("True");
    }
  );
};

exports.getProfileEtc = (req, res) => {
  const _userId = req.body.userId;
  connection.query(
    "SELECT name,nickname,department FROM KW_project_database.user_data WHERE id = ?",
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
    `UPDATE KW_project_database.user_data SET name=?, nickname=?, department=? WHERE id = ?`,
    [_name, _nickname, _department, _userId],

    function (err, result, fields) {
      if (err) console.log(err);
      else console.log(_userId + "의 데이터 업데이트 완료");
    }
  );
};

exports.saveHistory = async (req, res) => {
  var date = req.body.date.split("T")[0];
  const _year = date.split("-")[0];
  const _month = date.split("-")[1];
  const _day = date.split("-")[2];
  const _userId = req.session.passport.user;
  const _amount = req.body.amount;

  connection.query(
    "SELECT JSON_LENGTH(history) as length FROM KW_project_database.user_wallet WHERE id=?", // 내역 길이 알아오기
    _userId,
    function (err, result) {
      const length = result[0].length;
      const table = "`" + "history" + "`";

      if (length != null) {
        connection.query(
          `SELECT history FROM KW_project_database.user_wallet WHERE id = ${_userId}`,
          function (err, results) {
            if (err) res.send(err);

            sampleHistory = JSON.stringify(results)
              .split("[")[2]
              .split("]")[0]
              .split(",")[0]; //날짜 판별을 위한 샘플 데이터
            sampleHistory = sampleHistory.split('\\"')[5];

            var sampleHistoryDate = sampleHistory.split("-");
            if (
              sampleHistoryDate[0] == _year &&
              sampleHistoryDate[1] == _month &&
              sampleHistoryDate[2] == _day
            ) {
              // 데이터베이스 history에 저장되어있는 첫 데이터의 날짜가 오늘일때
              connection.query(
                `UPDATE KW_project_database.user_wallet SET history=JSON_ARRAY_INSERT(${table},'$[${length}]',JSON_OBJECT('${length}',JSON_OBJECT('date','${date}'))) WHERE id = ${_userId}`,
                function (err, results) {
                  if (err) res.send(err);
                  else {
                    if (length == "2") {
                      // 3번째 데이터를 넣기에 성공했을 때
                      console.log("3번째 적립이네요!");
                      const sqlQuery = `UPDATE KW_project_database.user_ranking SET balance = balance+${_amount} WHERE id = ${_userId}`;
                      connection.query(sqlQuery, function (err, results) {
                        // 추가 토큰 지급
                        if (err) console.log(err);
                        else {
                          console.log("3번째 건물 방문 이벤트 코인 지급!");
                          res.send({ saveHistory_result: true });
                        }
                      });

                      /*
                      connection.query(
                        // specification 업데이트
                        "SELECT JSON_LENGTH(specification) as length FROM user_wallet WHERE id=?", // specification 내역 길이 알아오기
                        _userId,
                        function (err, result) {
                          const length2 = result[0].length;
                          const table2 = "`" + "specification" + "`";

                          if (length2 != 0) {
                            const sqlQuery = `UPDATE KW_project_database.user_wallet SET specification=JSON_ARRAY_INSERT(${table2},'$[${length2}]',JSON_OBJECT('${length2}',JSON_OBJECT('date','${date}', 'detail', '건물방문 3회차', 'amount','${_amount}'))) WHERE id = ${_userId}`;

                            connection.query(sqlQuery, function (err, results) {
                              if (err) console.log(err);
                            });
                          } else {
                            const sqlQuery = `UPDATE KW_project_database.user_wallet SE차 specification=JSON_ARRAY(JSON_OBJECT('0',JSON_OBJECT('date','${date}', 'detail', '건물방문 3회차', 'amount','${_amount}'))) WHERE id = ?`;

                            connection.query(sqlQuery, function (err, results) {
                              if (err) console.log(err);
                            });
                          }
                        }
                      );
                      */
                      connection.query(
                        `UPDATE KW_project_database.user_wallet SET history = NULL WHERE id = ${_userId}`,
                        function (err, results) {
                          //3회차 방문시 히스토리 초기화
                          if (err) console.log(err);
                        }
                      );
                    }
                  }
                }
              );
            } else {
              // 데이터베이스 history에 저장되어있는 첫 데이터의 날짜가 오늘이 아닐때
              connection.query(
                `UPDATE KW_project_database.user_wallet SET history = JSON_ARRAY(JSON_OBJECT('0',JSON_OBJECT('date','${date}'))) WHERE id = ${_userId}`,
                function (err, results) {
                  if (err) res.send(err);
                }
              );
            }
          }
        );
      } else {
        // history에 데이터를 처음 넣을 때
        connection.query(
          `UPDATE KW_project_database.user_wallet SET history = JSON_ARRAY(JSON_OBJECT('0',JSON_OBJECT('date','${date}'))) WHERE id = ${_userId}`,
          function (err, results) {
            if (err) res.send(err);
          }
        );
      }
    }
  );
};

exports.getBuildingVisitCount = async (req, res) => {
  try {
    const _userId = req.session.passport.user;

    connection.query(
      "SELECT JSON_LENGTH(history) as length FROM KW_project_database.user_wallet WHERE id=?",
      _userId,
      function (err, result) {
        const length = result[0].length;
        if (err) {
          res.send(err);
        } else {
          console.log("length: " + length);
          res.send({ length: length });
        }
      }
    );
  } catch {
    res.send({ length: 0 });
  }
};
