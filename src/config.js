// Configuration for network addresses

// 🎭 DEMO MODE - Set to true for static deployment (IPFS/Fleek)
export const DEMO_MODE = true;

export const NETWORKS = {
  1: "Ethereum Mainnet",
  5: "Goerli Testnet",
  11155111: "Sepolia Testnet",
  1337: "Local Development",
  999: "Demo Network" // Virtual network for demo mode
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
  },
  999: { // Demo Network
    Token: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
    Exchange: "0x8f0483125FCb9aaAEFA9209D8E9d7b9C8B9Fb90F"
  }
}

// For local development, we'll use the addresses from the contract ABIs 