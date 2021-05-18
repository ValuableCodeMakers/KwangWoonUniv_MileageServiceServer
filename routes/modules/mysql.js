const mysql = require("mysql");
const env_keys = require("../modules/env_keys.js");

const AWS_HOST = env_keys.AWS_HOST;
const AWS_POST = env_keys.AWS_POST;
const AWS_USER = env_keys.AWS_USER;
const AWS_PASSWORD = env_keys.AWS_PASSWORD;

exports.connection = mysql.createConnection({
  host: AWS_HOST,
  post: AWS_POST,
  user: AWS_USER,
  password: AWS_PASSWORD,
});
