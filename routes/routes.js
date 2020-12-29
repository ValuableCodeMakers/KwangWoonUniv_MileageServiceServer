const express = require("express");
const router = express.Router();

const token = require("./token.js");
const wallet = require("./wallet.js");
const register = require("./auth/register.js");
const login = require("./auth/login.js");
const logout = require("./auth/logout.js");
const profile = require("./auth/profile.js");

// 스마트 컨트랙트
router.post("/totalToken", token.totalToken);
router.post("/getToken", token.getToken);

// 지갑 관련
router.post("/createWallet", wallet.createWallet);
router.post('/getWalletInfo', wallet.getWalletInfo);

// 로그인 & 회원가입
router.post("/login", login.login);
router.post("/logout", logout.logout);
router.post("/register", register.register);
router.post('/saveProfile', profile.saveProfile); 

module.exports = router;
