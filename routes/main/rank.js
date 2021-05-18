const mysqlConnection = require("../modules/mysql.js");
const connection = mysqlConnection.connection;

exports.getUsersRank = (req, res) => {
  connection.query(
    `SELECT *, dense_rank() over(order by balance desc) AS ranking
    FROM KW_project_database.user_ranking;`,
    function (err, results) {
      if (err) console.log(err);
      res.send({ Ranking: results });
    }
  );
};
