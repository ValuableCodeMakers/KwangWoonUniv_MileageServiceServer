const express = require("express");
const router = express.Router();

const token = require("./token.js");
const wallet = require("./wallet.js");
const register = require("./auth/register.js");
const login = require("./auth/login.js");
const logout = require("./auth/logout.js");
const profile = require("./auth/profile.js");

// 스마트 컨트랙트, 토큰 관련
router.post("/getTokenBalance", token.getTokenBalance);
router.post("/getToken", token.getToken);
router.post("/transferToken", token.transferToken)

// 지갑 관련
router.post("/createWallet", wallet.createWallet);

// 로그인 & 회원가입, 회원 정보
router.post("/login", login.login);
router.post("/logout", logout.logout);
router.post("/register", register.register);
router.post('/saveProfile', profile.saveProfile); 
router.get('/getUserId', profile.getUserId)
router.post('/getWalletAddress', profile.getWalletAddress);

module.exports = router;
