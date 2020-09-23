var contractAbi = require("../src/contract");
var express = require("express");
var app = express();

const infuraKey = "075d38e4a3244e0e9e41de0148d39f90"; // infura Api 키
const contractAddress = "0x5F24d08FF66E29522F3507372e089A8925766Ca7"; // Contract 주소

var Web3 = require("web3");
var web3 = new Web3(
  new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/${infuraKey}`)
);

var contract = web3.eth.contract(contractAbi);
var contractInstance = contract.at(contractAddress);

var result = contractInstance.get();
console.log(result.toString());

app.listen(3000, function () {
  console.log("Connect, 3000 port!");
});
