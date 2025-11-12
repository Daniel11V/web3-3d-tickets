"use client";

import Web3 from "web3";
import { useStore } from "../store/useStore";

export default function WalletConnect() {
  const { connected, account, setConnected, setAccount } = useStore();

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setConnected(true);
        setAccount(accounts[0]);
      } catch (err) {
        console.error("Wallet connection failed:", err);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  return connected ? (
    <div className="text-green-400 font-medium">
      ✅ Connected: {account.slice(0, 6)}...{account.slice(-4)}
    </div>
  ) : (
    <button
      onClick={connectWallet}
      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
    >
      Connect Wallet
    </button>
  );
}
