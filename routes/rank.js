const mysqlConnection = require("./modules/mysql.js");
const connection = mysqlConnection.connection;

exports.getUsersRank = (req, res) => {
  connection.query(
    `select *, dense_rank() over(order by balance desc) AS ranking
    from user_ranking;`,
    function (err, results) {
      if (err) console.log(err);
      res.send({ Ranking: results });
    }
  );
};
