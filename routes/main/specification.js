const mysqlConnection = require("../modules/mysql.js");
const connection = mysqlConnection.connection;

// 지갑 내역 관련
exports.saveSpecification = async (req, res) => {
  const _specificationObj = req.body;
  const _userId = req.session.passport.user;

  connection.query(
    "SELECT JSON_LENGTH(specification) as length FROM KW_project_database.user_wallet WHERE id=?", // 내역 길이 알아오기
    _userId,
    function (err, result) {
      const length = result[0].length;

      const table = "`" + "specification" + "`";

      if (length != 0 || length != null) {
        const sqlQuery = `UPDATE KW_project_database.user_wallet SET specification=JSON_ARRAY_INSERT(${table},'$[${length}]',JSON_OBJECT('${length}',JSON_OBJECT('date','${
          _specificationObj.date.split("T")[0]
        }', 'detail', '${_specificationObj.detail}', 'amount','${
          _specificationObj.amount
        }'))) WHERE id = ${_userId}`;

        connection.query(sqlQuery, function (err, results) {
          if (err) console.log(err);
          else res.send({ saveSpecification_result: true });
        });
      } else {
        const sqlQuery = `UPDATE KW_project_database.user_wallet SET specification=JSON_ARRAY(JSON_OBJECT('0',JSON_OBJECT('data','${
          _specificationObj.date.split("T")[0]
        }', 'detail', '${_specificationObj.detail}', 'amount','${
          _specificationObj.amount
        }'))) WHERE id = ${_userId}`;

        connection.query(sqlQuery, function (err, results) {
          if (err) console.log(err);
          else res.send({ saveSpecification_result: true });
        });
      }
    }
  );

  connection.query(
    "SELECT balance FROM KW_project_database.user_ranking WHERE id=?",
    _userId,
    function (err, result) {
      if (err) console.log(err);
      else {
        const sqlQuery = `UPDATE KW_project_database.user_ranking SET balance = balance+${_specificationObj.amount} WHERE id = ${_userId}`;
        connection.query(sqlQuery, function (err, results) {
          if (err) console.log(err);
        });
      }
    }
  );
};

exports.getSpecification = async (req, res) => {
  try {
    const _userId = req.session.passport.user;
    connection.query(
      "SELECT specification FROM KW_project_database.user_wallet WHERE id = ?",
      _userId,
      function (err, results) {
        if (err) {
          res.send(err);
        }
        res.send(results[0].specification);
      }
    );
  } catch (err) {
    console.log(err);
    res.send([]);
  }
};
