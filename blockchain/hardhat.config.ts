import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
	solidity: "0.8.20",
	networks: {
		// Esta es la red 'localhost' que usamos en los scripts de deploy
		localhost: {
			url: "http://127.0.0.1:8545",
			chainId: 31337,
		},
	},
};

export default config;
