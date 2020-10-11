const express = require("express");
const router = express.Router();
const token = require("./token");
const wallet = require('./wallet');

// 스마트 컨트랙트
router.post("/totalToken", token.totalToken);
router.post("/getToken", token.getToken);

// 지갑 관련
router.post("/createWallet", wallet.createWallet);

module.exports = router;
