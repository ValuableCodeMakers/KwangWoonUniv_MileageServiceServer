const mysql = require("mysql");
const bkfd2Password = require('pbkdf2-password');
const connection = mysql.createConnection({
  host: "10.0.2.2",
  post: 3306,
  user: "root",
  password: "123456",
  database: "project_data",
});
var hasher = bkfd2Password();


exports.register = async (req, res) => {
  console.log(req.body);

  var userId = req.body["id"];
  var userPwd = req.body["password"];

  console.log(userId);
  console.log(userPwd);
  
  hasher(
    {password: userId},
    function(err,pass,salt,hash){
      let user = {
        id: userId,
        pwd: userPwd
      };
      connection.query(
        `insert into project_data.user_data(id,pwd) SET ?`,
        user,

        function (err, result, fields) {
          if (err) console.log(err);
          else {
              res.send("회원가입 성공");
          }
        }
      );
    }
  )

 

};
