require("dotenv").config(); // .env 사용

module.exports = {
  // Blockchain 정보
  INFURA_API_KEY: process.env.INFURA_API_KEY, // infura Api 키
  CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS, // Contract 주소, Token 주소
  CONTRACT_OWNER_ADDRESS: process.env.CONTRACT_OWNER_ADDRESS, // Contract 생성자 주소
  CONTRACT_PRIVATE_KEY: process.env.CONTRACT_PRIVATE_KEY, // Contract Private Key

  // AWS RD2 정보
  AWS_HOST: process.env.AWS_HOST,
  AWS_POST: process.env.AWS_POST,
  AWS_USER: process.env.AWS_USER,
  AWS_PASSWORD: process.env.AWS_PASSWORD,
  AWS_DATABASE: process.env.AWS_DATABASE,
};
