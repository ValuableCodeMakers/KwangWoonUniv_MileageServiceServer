const fs = require("fs");
const path = require("path");
const mysqlConnection = require("../modules/mysql.js");

const connection = mysqlConnection.connection;

// 프로필 사진 관련
exports.savePhoto = async (req, res) => {
  console.log(req.files.image[0]);
  console.log(req.body.userId);

  const _userId = req.body.userId;
  const _type = req.files.image[0].mimetype;
  const _filename = req.files.image[0].filename;
  const _path = req.files.image[0].path;

  connection.query(
    `INSERT INTO KW_project_database.user_photo(id,type,filename,path) VALUE(?,?,?,?)`,
    [_userId, _type, _filename, _path],
    function (err, results) {
      if (err) {
        console.log(err);
        res.send({ photoResult: false });
      } else res.send({ photoResult: true });
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
    `SELECT * FROM KW_project_database.user_photo WHERE id=?`,
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
          `INSERT INTO KW_project_database.user_photo SET id=?,type=?,filename=?,path=? ON DUPLICATE KEY UPDATE type=?,filename=?,path=?`,
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

exports.getPhoto = async (req, res) => {
  const _userId = req.body.userId;

  connection.query(
    `SELECT * FROM KW_project_database.user_photo WHERE id=?`,
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
  let sqlString =
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
    `SELECT id,filename FROM KW_project_database.user_photo WHERE ${sqlString}`,
    function (err, results) {
      if (err) {
        console.log(err);
      } else {
        res.send({ photos: results });
      }
    }
  );
};
