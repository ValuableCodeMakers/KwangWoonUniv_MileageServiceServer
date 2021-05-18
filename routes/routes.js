const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
// 프로필 사진 업로드에 사용
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./profiles/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, req.body.userId + path.basename(file.originalname, ext) + ext);
    },
  }),
});

const token = require("./blockchain/token.js");
const wallet = require("./blockchain/wallet.js");
const register = require("./auth/register.js");
const login = require("./auth/login.js");
const logout = require("./auth/logout.js");
const profile = require("./main/profile.js");
const photo = require("./main/photo");
const specification = require("./main/specification");
const rank = require("./main/rank.js");

// 스마트 컨트랙트, 토큰 관련
router.post("/getTokenBalance", token.getTokenBalance);
router.post("/getEventToken", token.getEventToken);
router.post("/transferToken", token.transferToken);

// 지갑 관련
router.post("/createWallet", wallet.createWallet);

// 로그인 & 회원가입
router.post("/login", login.login);
router.get("/logout", logout.logout);
router.post("/register", register.register);

// 회원 정보
router.post("/saveProfile", profile.saveProfile);
router.get("/getUserId", profile.getUserId);
router.post("/getWalletAddress", profile.getWalletAddress);
router.post("/getProfileEtc", profile.getProfileEtc);
router.post("/changeProfile", profile.changeProfile);

router.post("/saveHistory", profile.saveHistory);
router.post("/getBuildingVisitCount", profile.getBuildingVisitCount);

// 회원 정보 - 지갑 내역
router.post("/saveSpecification", specification.saveSpecification);
router.get("/getSpecification", specification.getSpecification);

// 회원 정보 - 프로필 사진 설정
router.post(
  "/savePhoto",
  upload.fields([{ name: "userId" }, { name: "image" }]),
  photo.savePhoto
);
router.post("/getPhoto", photo.getPhoto);
router.post("/getPhotos", photo.getPhotos);
router.post(
  "/changePhoto",
  upload.fields([{ name: "userId" }, { name: "image" }]),
  photo.changePhoto
);

// 랭킹 관련
router.get("/getUsersRank", rank.getUsersRank);

module.exports = router;
