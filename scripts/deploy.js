const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });
const { FEE, VRF_COORDINATOR, LINK_TOKEN, KEY_HASH } = require("../constants");

async function main() {
	/*
 A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
 so randomWinnerGame here is a factory for instances of our RandomWinnerGame contract.
 */
	const randomWinnerGame = await ethers.getContractFactory("RandomWinnerGame");
	// deploy the contract
	const deployedRandomWinnerGameContract = await randomWinnerGame.deploy(
		VRF_COORDINATOR,
		LINK_TOKEN,
		KEY_HASH,
		FEE
	);

	await deployedRandomWinnerGameContract.deployed();

	// print the address of the deployed contract
	console.log(
		"Verify contract address:",
		deployedRandomWinnerGameContract.address
	);

	console.log("Sleeping...");
	// wait for etherscan to notice that the contract has been deployed
	await sleep(30000);

	// verify the contract after deploying
	await hre.run("verify:verify", {
		address: deployedRandomWinnerGameContract.address,
		constructorArguments: [VRF_COORDINATOR, LINK_TOKEN, KEY_HASH, FEE],
	});
}

function sleep(ms) {
	return new Promise((resolve = setTimeout(resolve, ms)));
}

// call the main function and catch the error
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.log(error);
		process.exit(1);
	});

// deployed contract address: 0x5dd9F081a7460F883CbE6bEE36d6Fd34BCA5EbfC
