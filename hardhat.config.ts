import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-solc";
import "@matterlabs/hardhat-zksync-verify";
require('dotenv').config();

module.exports = {
  zksolc: {
    version: "1.3.5",
    compilerSource: "binary",
    settings: {},
  },

  defaultNetwork: "zkSyncTestnet",

  networks: {
    zkSyncTestnet: {
      url: "https://sepolia.era.zksync.dev",
      ethNetwork: "sepolia", // Can also be the RPC URL of the network (e.g. `https://goerli.infura.io/v3/<API_KEY>`)
      zksync: true,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY],
      verifyURL: 'https://explorer.sepolia.era.zksync.dev/contract_verification'
    },

    zkSyncMainnet: {
      url: "https://zksync2-mainnet.zksync.io",
      ethNetwork: "mainnet", // Can also be the RPC URL of the network
      zksync: true,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY],
      verifyURL: 'https://zksync2-mainnet-explorer.zksync.io/contract_verification'
    }
  },

  /* */
  etherscan: {
    apiKey: {
      zkSyncTestnet: "randomstring",
      zkSyncMainnet: process.env.BLOCK_EXPLORER_API_KEY
    },

    customChains: [
      
      {
        network: "zkSyncTestnet",
        chainId: 280,
        urls: {
          apiURL: "https://zksync2-testnet.zkscan.io/api",
          browserURL: "https://zksync2-testnet.zkscan.io/"
        }
      },

      {
        network: "zkSyncMainnet",
        chainId: 324,
        urls: {
          apiURL: "https://era.zksync.network/api", // "https://api-era.zksync.network/api", // "https://zksync2-mainnet.zkscan.io/api",
          browserURL: "https://era.zksync.network/"
        }
      }
      
    ]
  },

  solidity: {
    version: "0.8.4",
  },
};
