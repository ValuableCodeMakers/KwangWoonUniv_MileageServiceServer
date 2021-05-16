const BigNumber = require("bignumber.js");
const contractAbi = require("../../src/contractAbi.js"); // abi 불러오기
const Web3 = require("web3");
const mysqlConnection = require("../modules/mysql.js");
require("dotenv").config(); // .env 사용

const infuraKey = process.env.INFURA_API_KEY; // infura Api 키
const contractAddress = process.env.CONTRACT_ADDRESS; // Contract 주소, Token 주소
const contractOwnerAddress = process.env.CONTRACT_OWNER_ADDRESS; // Contract 생성자 주소
const contractPrivateKey = process.env.CONTRACT_PRIVATE_KEY; // Contract Private Key

const connection = mysqlConnection.connection;

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
  const to = req.body.to;

  let fromPrivateKey = contractPrivateKey;

  let web3 = new Web3(
    new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/${infuraKey}`)
  );

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
            let amount = parseFloat(100) * Math.pow(10, decimals); // 이벤트 토큰 100개

            // 현재 가스비 계산
            web3.eth.getGasPrice(function (error, result) {
              var _gasPrice = result;
              console.log("gasPrice: ", _gasPrice, " 단위: Gwei");
              try {
                const Tx = require("ethereumjs-tx").Transaction;
                const privateKey = Buffer.from(
                  fromPrivateKey, // 개인키 받아와야됌
                  "hex"
                );

                var _hex_gasLimit = web3.utils.toHex(
                  (_gasLimit + 1000000).toString()
                );

                // 16진법으로 Convert
                var _hex_gasPrice = web3.utils.toHex(_gasPrice.toString());
                var _hex_value = web3.utils.toHex(
                  new BigNumber(amount.toString())
                );
                var _hex_Gas = web3.utils.toHex("60000");

                // main wallet에서 보내기
                web3.eth
                  .getTransactionCount(contractOwnerAddress)
                  .then((nonce) => {
                    var _hex_nonce = web3.utils.toHex(nonce);

                    const rawTx = {
                      nonce: _hex_nonce,
                      from: contractOwnerAddress,
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
                          res.send({ txhash: false });
                        } else {
                          console.log("transaction hash", hash);
                          res.send({ txhash: hash });
                        }
                      }
                    );
                  });
              } catch (error) {
                console.log(error);
                res.send({ txhash: false });
              }
            });
          } catch (error) {
            console.log(error);
            res.send({ txhash: false });
          }
        });
    });
  } catch (error) {
    console.log(error);
    res.send({ txhash: false });
  }
};

// 상대에게 토큰 전송
exports.transferToken = async (req, res) => {
  const from = req.body.from;
  const to = req.body.to;
  const value = req.body.value;
  let fromPrivateKey = "";

  let web3 = new Web3(
    new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/${infuraKey}`)
  );

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
        .then((result) => {
          connection.query(
            `select privateKey from KW_project_database.user_wallet where id = ?`,
            req.body.id,
            function (err, results) {
              console.log(results);
              if (err) return done(err);
              fromPrivateKey = results[0].privateKey;
            }
          );
          return result;
        })
        .then(function (result) {
          try {
            var decimals = result; // 18
            let amount = parseFloat(value) * Math.pow(10, decimals); // 전달할 토큰 개수
            console.log("decimal: ", decimals);
            console.log("amount: ", amount);

            // 현재 가스비 계산
            web3.eth.getGasPrice(function (error, result) {
              var _gasPrice = result;
              console.log("gasPrice: ", _gasPrice, " 단위: Gwei");
              try {
                const Tx = require("ethereumjs-tx").Transaction;
                const privateKey = Buffer.from(
                  fromPrivateKey, // 개인키 받아와야됌
                  "hex"
                );

                var _hex_gasLimit = web3.utils.toHex(
                  (_gasLimit + 1000000).toString()
                );
                // 16진법으로 Convert
                var _hex_gasPrice = web3.utils.toHex(_gasPrice.toString());
                var _hex_value = web3.utils.toHex(
                  new BigNumber(amount.toString())
                );
                var _hex_Gas = web3.utils.toHex("60000");

                console.log("16진법 Converting 완료");

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
