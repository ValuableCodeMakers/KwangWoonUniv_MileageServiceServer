const BigNumber = require("bignumber.js");
const contractAbi = require("../src/contractAbi.js"); // abi 불러오기
const Web3 = require("web3");
const infuraKey = "a96fd49a742b4e60a94afc93459aac77"; // infura Api 키
const value = "10000000000000000000";
const contractAddress = "0xb51019ff4814f171026d5f8f4a25b6423f846d0e"; // Contract 주소, Token 주소
const contractOwner = "0xb912da07Ea6edfA6FFf168b5C2AE747D1A966BfC"; // Contract 생성자 주소

exports.getTokenBalance = async (req, res) => {
  let web3 = new Web3(
    new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/${infuraKey}`)
  );
  let contractInstance = new web3.eth.Contract(contractAbi, contractAddress);

  contractInstance.methods
    .balanceOf(req.body.address) // 사용자 지갑 주소
    .call()
    .then((total) => {
      res.send({ balance: total });
    });
};

exports.getToken = async (req, res) => {
  var web3 = new Web3(
    new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/${infuraKey}`)
  );
  var contractInstance = new web3.eth.Contract(contractAbi, contractAddress);

  var gasPrice = web3.gas;

  contractInstance.methods
    .transfer("0xb912da07Ea6edfA6FFf168b5C2AE747D1A966BfC", 100)
    .call()
    .then((result) => {
      console.log("smartcontract Call :" + result);
      res.send(result);
    });
};

// 상대에게 토큰 전송
exports.transferToken = async (req, res) => {
  console.log(req.body);

  let web3 = new Web3(
    new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/${infuraKey}`)
  );

  let contractInstance = new web3.eth.Contract(contractAbi, contractAddress);

  //let address = web3.utils.isAddress(req.body.from);

  let value = BigNumber(1000000000000000000000).toFixed();
  let gasPrice = web3.eth.getGasPrice();

  console.log(value);
  console.log(gasPrice);

  contractInstance.methods.transfer(req.body.from, value).send(
    {
      from: "0xb51019ff4814f171026d5f8f4a25b6423f846d0e",
      gasPrice: gasPrice,
      gas: 100000,
    },
    function (err, txhash) {
      try {
        console.log(txhash);
        res.send(txhash);
      } catch (err) {
        console.log("Send Token Error ==>>>>" + err.toString());

        res.json({ code: 310, err: err.toString() });
      }
    }
  );
};
