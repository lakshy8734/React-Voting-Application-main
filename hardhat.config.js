/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
   solidity: "0.8.11",
   defaultNetwork: "sepolia", // Set the default network to Sepolia
   networks: {
      hardhat: {},
      sepolia: { // Change from 'goerli' to 'sepolia'
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`],
         gas: 2100000, // Adjusted gas limit for Sepolia
         gasPrice: 20000000000, // Adjusted gas price for Sepolia
      }
   },
}
