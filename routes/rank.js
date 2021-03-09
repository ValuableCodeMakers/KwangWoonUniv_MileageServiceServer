const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "127.0.0.1",
  post: 3306,
  user: "root",
  password: "123456",
  database: "project_data",
});

exports.getUsersRank = (req, res) => {
  console.log("유저 모두 랭킹 가져오기");
  connection.query(
    `select *, dense_rank() over(order by balance desc) AS ranking
    from user_ranking;`,
    function (err, results) {
      if (err) console.log(err);
      res.send({ Ranking: results });
    }
  );
};
