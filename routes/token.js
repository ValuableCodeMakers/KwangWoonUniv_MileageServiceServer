const contractAbi = require("../src/contractAbi.js"); // abi 불러오기
var BigNumber = require("big-number");
const Web3 = require("web3");
const infuraKey = "a96fd49a742b4e60a94afc93459aac77"; // infura Api 키
const value = "10000000000000000000";

const contractAddress = "0xb51019ff4814f171026d5f8f4a25b6423f846d0e"; // Contract 주소 Token 주소
const contractOwner = "0xb912da07Ea6edfA6FFf168b5C2AE747D1A966BfC"; // Contract Creater

exports.totalToken = async (req, res) => {
  var web3 = new Web3(
    new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/${infuraKey}`)
  );
  var contractInstance = new web3.eth.Contract(contractAbi, contractAddress);

  contractInstance.methods
    .name()
    .call()
    .then((total) => {
      console.log("토큰의 총 개수 " + total);
      res.send("클라이언트 " + total);
    });
};

exports.getToken = (req, res) => {
  var web3 = new Web3(
    new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/${infuraKey}`)
  );
  var contractInstance = new web3.eth.Contract(contractAbi, contractAddress);

  var gasPrice = web3.gas;

  contractInstance.methods
    .transfer("0x49370FEFe6d137a212e5aD9170EB4f2326719675", value)
    .call()
    .then((result) => {
      console.log("smartcontract Call :" + result);
      res.send(result);
    });
};
