const contractAbi = require("../src/contractAbi.js"); // abi 불러오기
var BigNumber = require("big-number");
const Web3 = require("web3");
const infuraKey = "075d38e4a3244e0e9e41de0148d39f90"; // infura Api 키
const value = "10000000000000000000";
const contractAddress = "0x0a6462ea131f9c9bf9070d898556a22d0127223a"; // Contract 주소 Token 주소
const contractOwner = "0xb912da07Ea6edfA6FFf168b5C2AE747D1A966BfC"; // Contract Creater


exports.totalToken = async (req, res) => {

  var web3 = new Web3(
    new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/${infuraKey}`)
  );
  var contractInstance = new web3.eth.Contract(contractAbi, contractAddress);

  contractInstance.methods
    .balanceOf(contractOwner)
    .call()
    .then((total) => {
      console.log("토큰의 총 개수 " + total);
      res.send("토큰의 총 개수 " + total);
    });
};



exports.getToken = async (req, res) => {

  var web3 = new Web3(
    new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/${infuraKey}`)
  );
  var contractInstance = new web3.eth.Contract(contractAbi, contractAddress);

  var gasPrice = req.gas;

  await contractInstance.methods
    .transferFrom(contractOwner,"0x49370FEFe6d137a212e5aD9170EB4f2326719675", value).call().then((data)=>{
        console.log("클라이언트에게 토큰 전송 api 실행");

        res.send(data);
    })
    // .send(
    //   {
    //     from: "0xb912da07Ea6edfA6FFf168b5C2AE747D1A966BfC",
    //     gasPrice: gasPrice * 1.5,
    //     gas: 100000,
    //   },
    //   function (err, txhash) {
    //     try {
    //       console.log("전송완료");
    //       console.log(txhash);
    //       res.send(txhash);
    //     } catch (err) {
    //       console.log("Send Token Error!:" + err.toString());
    //       res.json({ code: 310, err: err.toString() });
    //     }
    //   }
    // );
};
