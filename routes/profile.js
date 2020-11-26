const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  post: 3306,
  user: "root",
  password: "123456",
  database: "project_data",
});

exports.saveProfile = async(req, res) =>{
    console.log(req.body);
}
