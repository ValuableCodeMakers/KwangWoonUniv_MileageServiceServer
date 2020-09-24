const contractAbi = require("../src/contractAbi.js"); // abi 불러오기
const express = require('express');
const router = express.Router();
const api = require('../routes/api.js');

const infuraKey = "075d38e4a3244e0e9e41de0148d39f90"; // infura Api 키
const contractAddress = "0x5f24d08ff66e29522f3507372e089a8925766ca7"; // Contract 주소

var Web3 = require("web3");
var web3 = new Web3(
  new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/${infuraKey}`)
);

var contractInstance = new web3.eth.Contract(contractAbi,contractAddress);

router.get('/getToken',(req,res)=>{
    console.log('토큰 전송 api 실행');
    contrac
})

module.exports = router;