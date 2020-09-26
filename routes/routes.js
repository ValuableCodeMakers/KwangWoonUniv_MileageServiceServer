const express = require("express");
const router = express.Router();
const token = require("./token");

router.post("/totalToken", token.totalToken);
router.post("/getToken", token.getToken);

module.exports = router;
