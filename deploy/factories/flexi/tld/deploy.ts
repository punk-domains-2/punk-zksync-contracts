// make sure you have the args file, even if it's an empty array
// create a separate folder for each smart contract deployment (with deploy and args files)
// after deployment, add factory address to the ForbiddenTlds whitelist and to the Resolver
// npx hardhat deploy-zksync --script deploy/factories/flexi/tld/deploy.ts --network zkSyncMainnet

import { Wallet, utils } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
require('dotenv').config();

const contractName = "FlexiPunkTLDFactory";
const argsFullPath = "deploy/factories/flexi/tld/args.ts";
const constructorArgs = require("./args.ts");

console.log("constructor args:", constructorArgs);

export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Starting the deploy script for the ${contractName} contract`);

  // Initialize the wallet
  const wallet = new Wallet(String(process.env.DEPLOYER_PRIVATE_KEY));

  // Create deployer object and load the artifact of the contract you want to deploy
  const deployer = new Deployer(hre, wallet);
  const artifact = await deployer.loadArtifact(contractName);

  // Estimate contract deployment fee
  const deploymentFee = await deployer.estimateDeployFee(artifact, constructorArgs);
  const parsedFee = ethers.utils.formatEther(deploymentFee.toString());
  console.log(`The deployment is estimated to cost ${parsedFee} ETH`);

  // Deploy the contract
  const contract = await deployer.deploy(artifact, constructorArgs);

  //obtain the Constructor Arguments
  console.log("constructor args:" + contract.interface.encodeDeploy(constructorArgs));

  // Show the contract info
  console.log(`${contractName} was deployed to ${contract.address}`);

  // Verify the contract
  console.log(`Wait a few minutes and then execute the following command to verify the contract:`);
  console.log(`npx hardhat verify --network ${deployer.hre.hardhatArguments.network} ${contract.address} --constructor-args ${argsFullPath}`);
}