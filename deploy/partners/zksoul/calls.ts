// npx hardhat run deploy/partners/zksoul/calls.ts

import * as zksync from "zksync-web3";
import * as ethers from "ethers";
require('dotenv').config();

const tldAddress = "0xe36507aD67Ac0aE6D27D22b407A9338b136315df"; // @todo: replace with your TLD address
const minterAddress = "0xF74Ed4A6c76452dd55533697e3A477f266e70f21"; // @todo: replace with your minter address
const metadataAddress = "0xc9AEd7851A3aC96452c299546bdEfbF09B6aC5a8"; // @todo: replace with your metadata address

async function main() {
  const zkSyncProvider = new zksync.Provider("https://mainnet.era.zksync.io");

  const ethProvider = ethers.getDefaultProvider("mainnet");

  const signer = new zksync.Wallet(String(process.env.DEPLOYER_PRIVATE_KEY), zkSyncProvider, ethProvider);

  console.log("Calling methods with the account:", signer.address);
  console.log("Account balance:", (await signer.getBalance()).toString());

  const tldInterface = new ethers.utils.Interface([
    "function minter() external view returns(address)",
    "function changeMinter(address _minter) external",
    "function changeMetadataAddress(address _metadataAddress) external",
    "function transferOwnership(address newOwner) external"
  ]);

  const tldContract = new ethers.Contract(tldAddress, tldInterface, signer);

  // CHANGE MINTER

  /* */
  const minterBefore = await tldContract.minter();
  console.log("Minter before: " + minterBefore);

  //await tldContract.changeMinter(minterAddress);

  const minterAfter = await tldContract.minter();
  console.log("Minter after: " + minterAfter);
  

  // CHANGE METADATA ADDRESS
  //await tldContract.changeMetadataAddress(metadataAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });