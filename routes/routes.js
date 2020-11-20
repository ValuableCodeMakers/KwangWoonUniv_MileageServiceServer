const express = require("express");
const router = express.Router();

const token = require("./token.js");
const wallet = require("./wallet.js");
const register = require("./register.js");
const login = require("./login.js");

const localLogin = require('./passport/localLogin.js');
const session = require('./passport/session.js');

// 스마트 컨트랙트
router.post("/totalToken", token.totalToken);
router.post("/getToken", token.getToken);

// 지갑 관련
router.post("/createWallet", wallet.createWallet);

// 로그인 & 회원가입
router.post("/login", login.login);
router.post("/register", register.register);

module.exports = router;
