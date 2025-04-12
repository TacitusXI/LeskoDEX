// Configuration for network addresses

export const NETWORKS = {
  1: "Ethereum Mainnet",
  5: "Goerli Testnet",
  11155111: "Sepolia Testnet",
  1337: "Local Development",
}

export const CONTRACT_ADDRESSES = {
  // These are example addresses - replace with your actual deployed contract addresses
  5: { // Goerli Testnet
    Token: "0x0000000000000000000000000000000000000000", // Replace with your token contract address if deployed to Goerli
    Exchange: "0x0000000000000000000000000000000000000000" // Replace with your exchange contract address if deployed to Goerli
  },
  11155111: { // Sepolia Testnet
    Token: "0x0000000000000000000000000000000000000000", // Replace with your token contract address if deployed to Sepolia
    Exchange: "0x0000000000000000000000000000000000000000" // Replace with your exchange contract address if deployed to Sepolia
  }
}

// For local development, we'll use the addresses from the contract ABIs 