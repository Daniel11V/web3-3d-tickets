import { ethers } from "hardhat";

async function main() {
	console.log("Deploying Web3Ticket contract...");
	const web3Ticket = await ethers.deployContract("Web3Ticket");

	await web3Ticket.waitForDeployment();

	const address = await web3Ticket.getAddress();
	console.log(`✅ Web3Ticket (NFT) deployed to: ${address}`);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
