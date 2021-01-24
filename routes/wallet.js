const bip32 = require("bip32");
const bip39 = require("bip39");
const ethUtil = require("ethereumjs-util");

exports.createWallet = async (req, res) => {
  const mnemonic = bip39.generateMnemonic(); // 니모딕 만들기
  const seed = bip39.mnemonicToSeed(mnemonic);

  //지갑 생성
  seed
    .then((seed) => {
      // 시드에서 마스터 키 생성 HDPrivateKey(확장개인키)
      // BIP-32 이용
      let root = bip32.fromSeed(seed); // 원래 var

      // 이더리움 child 개인키 생성
      // BIP-44 이용
      // derivePath 형태 => m/purpose'/coin_type'/account'/change/address_index
      const xPrivKey = root.derivePath("m/44'/60'/0'/0/0");
      const privateKey = xPrivKey.privateKey.toString("hex");

      console.log("개인키: " + privateKey);

      // public key에서 이더리움 주소 생성
      // 0x + 해시
      // 0x 붙임으로 이더리움 주소임을 확인시켜줌
      let address =
        "0x" + ethUtil.pubToAddress(xPrivKey.publicKey, true).toString("hex");

      console.log("이더리움 주소: " + address);

      // 이더리움 EIP-55 체크섬 주소로 변환
      // 소문자를 대문자로 변환
      address = ethUtil.toChecksumAddress(address).toString("hex");
      console.log("체크섬 주소: " + address);

      return { address, privateKey };
    })
    .then((result) => {
      res.send({
        mnemonic: mnemonic,
        address: result.address,
        privateKey: result.privateKey,
      });
    });
};
