// require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-ethers");
module.exports = {
  solidity: "0.8.19",
  defaultNetwork: "volta",
  networks: {
    hardhat: {},
    volta: {
      url: "https://volta-rpc.energyweb.org/",
      accounts: [
        `0xb33f3ac3769c1ab43c21545e9ea6ce12af833d8ed1fa0535e20996287cd99445`,
      ],
      gas: 210000000,
      gasPrice: 800000000000,
    },
  },
};
