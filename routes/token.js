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

exports.getToken = async (req, res) => {
  var web3 = new Web3(
    new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/${infuraKey}`)
  );
  var contractInstance = new web3.eth.Contract(contractAbi, contractAddress);

  var gasPrice = web3.gas;

  await web3.eth.sendTransaction(
    {
      from: "0xb912da07Ea6edfA6FFf168b5C2AE747D1A966BfC",
      to: "0x49370FEFe6d137a212e5aD9170EB4f2326719675",
      gas: 50000,
      gasPrice: gasPrice * 1.5,
      data: "0x",
      value: 10000000000000000000,
    },
    function (err, tx) {
      if (err) {
        console.log(err);
        res.json({ code: 1, tx: tx });
      }
    }
  );
  // await contractInstance.methods
  //   .transfer("0x49370FEFe6d137a212e5aD9170EB4f2326719675", value).send({
  //     from: "0xb912da07Ea6edfA6FFf168b5C2AE747D1A966BfC", gasPrice: gasPrice * 1.5, gas: 100000
  //   },function(err,txhash){
  //     try{
  //       console.log("클라이언트에게 토큰 전송 api 실행");
  //       console.log(txhash);
  //       res.send(txhash);
  //     }catch(err){
  //       console.log("전송중 에러 발생" + err.toString());
  //       res.json({code:310, err: err.toString()});

  //     }
  //   });
};
