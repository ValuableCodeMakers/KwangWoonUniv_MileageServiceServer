const express = require("express");

const router = express.Router();

const token = require("./token");
const wallet = require('./wallet');
const register = require('./register');
const login = require('./login');

// 스마트 컨트랙트
router.post("/totalToken", token.totalToken);
router.post("/getToken", token.getToken);

// 지갑 관련
router.post("/createWallet", wallet.createWallet);

// 로그인 & 회원가입
router.post("/login", login.login)
router.post("/register", register.register)


module.exports = router;
