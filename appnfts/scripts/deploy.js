// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers, upgrades } = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const MyContract = await ethers.getContractFactory("BIContract");
  const myContractDeployed = await MyContract.deploy(
    "B Invasion Test",
    "Birds",
    "ipfs://QmTDcwHPMaxbquWYGJZpYSvi6FG3c2hDHp7YZZfYnMAhjR/", // BIRDS
    "ipfs://QmTJsfVWexdzy5onq1pXwkaiFRWteux31nFd2uecyfgims"); // EGG

  await myContractDeployed.deployed();

  console.log("myContractDeployed deployed to:", myContractDeployed.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
