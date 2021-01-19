const BigNumber = require("bignumber.js");
const contractAbi = require("../src/contractAbi.js"); // abi 불러오기
const Web3 = require("web3");
const infuraKey = "a96fd49a742b4e60a94afc93459aac77"; // infura Api 키
const value = "10000000000000000000";
const contractAddress = "0xb51019ff4814f171026d5f8f4a25b6423f846d0e"; // Contract 주소, Token 주소
const contractOwnerAddress = "0xb912da07Ea6edfA6FFf168b5C2AE747D1A966BfC"; // Contract 생성자 주소
const contractPrivateKey =
  "d6e488dc82d184661115053081da5815c224f0ef124b74a24f089e2fe7b9e49e";

// 지갑의 토큰 개수
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

// 이벤트 발생시 토큰 전송
exports.getEventToken = async (req, res) => {
  var web3 = new Web3(
    new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/${infuraKey}`)
  );
  var contractInstance = new web3.eth.Contract(contractAbi, contractAddress);
};

// 상대에게 토큰 전송
exports.transferToken = async (req, res) => {
  console.log(req.body);

  let web3 = new Web3(
    new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/${infuraKey}`)
  );

  const from = req.body.from;
  const to = req.body.to;
  const value = req.body.value;

  try {
    web3.eth.getBlock("latest", false, (error, result) => {
      var _gasLimit = result.gasLimit;
      console.log("gasLimit: ", _gasLimit);

      // abi 불러오기
      let contractInstance = new web3.eth.Contract(
        contractAbi,
        contractAddress
      );

      // Infura에서 eth_sendTransaction 지원하지 않아서
      // Transaction 직접 만들어서 전달해야함
      contractInstance.methods
        .decimals()
        .call()
        .then(function (result) {
          try {
            var decimals = result; // 18
            let amount = parseFloat(value) * Math.pow(10, decimals); // 전달한 토큰 개수

            // 현재 가스비 계산
            web3.eth.getGasPrice(function (error, result) {
              var _gasPrice = result;
              console.log("gasPrice: ", _gasPrice, " 단위: Gwei");
              try {
                const Tx = require("ethereumjs-tx").Transaction;
                const privateKey = Buffer.from(
                  "3b7d194804d43d42a1fbba86e0e8357f9e57835f5cab9685346996f58dd1dccf", // 개인키 받아와야됌
                  "hex"
                );

                var _hex_gasLimit = web3.utils.toHex(
                  (_gasLimit + 1000000).toString()
                );

                // 16진법으로 Convert
                var _hex_gasPrice = web3.utils.toHex(_gasPrice.toString());
                var _hex_value = web3.utils.toHex(amount.toString());
                var _hex_Gas = web3.utils.toHex("60000");

                web3.eth.getTransactionCount(from).then((nonce) => {
                  var _hex_nonce = web3.utils.toHex(nonce);

                  const rawTx = {
                    nonce: _hex_nonce,
                    from: from,
                    to: contractAddress,
                    gasPrice: _hex_gasPrice,
                    gasLimit: _hex_gasLimit,
                    gas: _hex_Gas,
                    value: "0x0",
                    data: contractInstance.methods
                      .transfer(to, _hex_value)
                      .encodeABI(),
                  };

                  const tx = new Tx(rawTx, { chain: "ropsten" }); // ropsten net 사용
                  tx.sign(privateKey);

                  var serializedTx = "0x" + tx.serialize().toString("hex");
                  web3.eth.sendSignedTransaction(
                    serializedTx.toString("hex"),
                    function (err, hash) {
                      if (err) {
                        console.log(err);
                      } else {
                        console.log("transaction hash", hash);
                        res.send({ txhash: hash });
                      }
                    }
                  );
                });
              } catch (error) {
                console.log(error);
              }
            });
          } catch (error) {
            console.log(error);
          }
        });
    });
  } catch (error) {
    console.log(error);
  }
};
