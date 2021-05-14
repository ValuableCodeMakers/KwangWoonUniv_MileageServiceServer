const mysql = require("mysql");

exports.connection = mysql.createConnection({
  host: "kw-project-database.cvhj6cyryo94.ap-northeast-2.rds.amazonaws.com",
  post: 3306,
  user: "root",
  password: "26958983",
  database: "project_data",
});
