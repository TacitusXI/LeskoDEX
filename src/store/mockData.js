// Mock data for Demo Mode - LeskoDEX
// This provides realistic data for demonstration without blockchain connection

export const DEMO_MODE = true;

// Mock account
export const MOCK_ACCOUNT = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb";

// Mock balances
export const MOCK_BALANCES = {
  etherBalance: "5.234",
  tokenBalance: "1250.50",
  exchangeEtherBalance: "2.150",
  exchangeTokenBalance: "875.25"
};

// Mock cancelled orders
export const MOCK_CANCELLED_ORDERS = [
  {
    id: "1",
    user: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    tokenGet: "0x0000000000000000000000000000000000000000",
    amountGet: "1000000000000000000",
    tokenGive: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
    amountGive: "100000000000000000000",
    timestamp: "1609459200"
  }
];

// Mock filled orders (trades) - Multiple trades per hour for proper candlestick display
// Using proper Wei format (10^18) and recent timestamps
const now = Math.floor(Date.now() / 1000);
const HOUR = 3600;
const MINUTE = 60;

export const MOCK_FILLED_ORDERS = [
  // Hour 1 - Price starts at 98
  {
    id: "1",
    user: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    userFill: "0x2C7859F7F477801A0b1CCb3f5Bc3F0bEe3F8E8a",
    tokenGet: "0x0000000000000000000000000000000000000000",
    amountGet: "1000000000000000000", // 1 ETH
    tokenGive: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
    amountGive: "98000000000000000000", // 98 ESKO (open)
    timestamp: String(now - 12 * HOUR - 50 * MINUTE)
  },
  {
    id: "2",
    user: "0x2C7859F7F477801A0b1CCb3f5Bc3F0bEe3F8E8a",
    userFill: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    tokenGet: "0x0000000000000000000000000000000000000000",
    amountGet: "1000000000000000000",
    tokenGive: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
    amountGive: "102000000000000000000", // 102 ESKO (high)
    timestamp: String(now - 12 * HOUR - 30 * MINUTE)
  },
  {
    id: "3",
    user: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    userFill: "0x3D8A9F4C3bEe2F9a5c8A7b6D5e4F3c2B1a0D9E8",
    tokenGet: "0x0000000000000000000000000000000000000000",
    amountGet: "1000000000000000000",
    tokenGive: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
    amountGive: "95000000000000000000", // 95 ESKO (low)
    timestamp: String(now - 12 * HOUR - 20 * MINUTE)
  },
  {
    id: "4",
    user: "0x3D8A9F4C3bEe2F9a5c8A7b6D5e4F3c2B1a0D9E8",
    userFill: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    tokenGet: "0x0000000000000000000000000000000000000000",
    amountGet: "1000000000000000000",
    tokenGive: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
    amountGive: "100000000000000000000", // 100 ESKO (close)
    timestamp: String(now - 12 * HOUR - 5 * MINUTE)
  },
  
  // Hour 2 - Price rises to 104
  {
    id: "5",
    user: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    userFill: "0x4E9B8D7C6A5F4E3D2C1B0A9F8E7D6C5B4A3E2D1",
    tokenGet: "0x0000000000000000000000000000000000000000",
    amountGet: "1000000000000000000",
    tokenGive: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
    amountGive: "100000000000000000000", // 100 ESKO (open)
    timestamp: String(now - 11 * HOUR - 55 * MINUTE)
  },
  {
    id: "6",
    user: "0x4E9B8D7C6A5F4E3D2C1B0A9F8E7D6C5B4A3E2D1",
    userFill: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    tokenGet: "0x0000000000000000000000000000000000000000",
    amountGet: "1000000000000000000",
    tokenGive: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
    amountGive: "106000000000000000000", // 106 ESKO (high)
    timestamp: String(now - 11 * HOUR - 30 * MINUTE)
  },
  {
    id: "7",
    user: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    userFill: "0x5F0C1E2D3A4B5C6D7E8F9A0B1C2D3E4F5A6B7C8",
    tokenGet: "0x0000000000000000000000000000000000000000",
    amountGet: "1000000000000000000",
    tokenGive: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
    amountGive: "104000000000000000000", // 104 ESKO (close)
    timestamp: String(now - 11 * HOUR - 10 * MINUTE)
  },

  // Hour 3 - Price drops to 96
  {
    id: "8",
    user: "0x5F0C1E2D3A4B5C6D7E8F9A0B1C2D3E4F5A6B7C8",
    userFill: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    tokenGet: "0x0000000000000000000000000000000000000000",
    amountGet: "1000000000000000000",
    tokenGive: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
    amountGive: "104000000000000000000", // 104 ESKO (open)
    timestamp: String(now - 10 * HOUR - 50 * MINUTE)
  },
  {
    id: "9",
    user: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    userFill: "0x6A1B2C3D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9",
    tokenGet: "0x0000000000000000000000000000000000000000",
    amountGet: "1000000000000000000",
    tokenGive: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
    amountGive: "92000000000000000000", // 92 ESKO (low)
    timestamp: String(now - 10 * HOUR - 25 * MINUTE)
  },
  {
    id: "10",
    user: "0x6A1B2C3D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9",
    userFill: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    tokenGet: "0x0000000000000000000000000000000000000000",
    amountGet: "1000000000000000000",
    tokenGive: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
    amountGive: "96000000000000000000", // 96 ESKO (close)
    timestamp: String(now - 10 * HOUR - 5 * MINUTE)
  },

  // Hour 4 - Price rises to 105
  {
    id: "11",
    user: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    userFill: "0x7B2C3D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0",
    tokenGet: "0x0000000000000000000000000000000000000000",
    amountGet: "1000000000000000000",
    tokenGive: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
    amountGive: "96000000000000000000", // 96 ESKO (open)
    timestamp: String(now - 9 * HOUR - 45 * MINUTE)
  },
  {
    id: "12",
    user: "0x7B2C3D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0",
    userFill: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    tokenGet: "0x0000000000000000000000000000000000000000",
    amountGet: "1000000000000000000",
    tokenGive: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
    amountGive: "108000000000000000000", // 108 ESKO (high)
    timestamp: String(now - 9 * HOUR - 30 * MINUTE)
  },
  {
    id: "13",
    user: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    userFill: "0x8C3D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0C1",
    tokenGet: "0x0000000000000000000000000000000000000000",
    amountGet: "1000000000000000000",
    tokenGive: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
    amountGive: "105000000000000000000", // 105 ESKO (close)
    timestamp: String(now - 9 * HOUR - 10 * MINUTE)
  },

  // Hour 5 - Price stable around 103
  {
    id: "14",
    user: "0x8C3D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0C1",
    userFill: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    tokenGet: "0x0000000000000000000000000000000000000000",
    amountGet: "1000000000000000000",
    tokenGive: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
    amountGive: "105000000000000000000", // 105 ESKO (open)
    timestamp: String(now - 8 * HOUR - 50 * MINUTE)
  },
  {
    id: "15",
    user: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    userFill: "0x9D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0C1D2",
    tokenGet: "0x0000000000000000000000000000000000000000",
    amountGet: "1000000000000000000",
    tokenGive: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
    amountGive: "101000000000000000000", // 101 ESKO (low)
    timestamp: String(now - 8 * HOUR - 30 * MINUTE)
  },
  {
    id: "16",
    user: "0x9D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0C1D2",
    userFill: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    tokenGet: "0x0000000000000000000000000000000000000000",
    amountGet: "1000000000000000000",
    tokenGive: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
    amountGive: "103000000000000000000", // 103 ESKO (close)
    timestamp: String(now - 8 * HOUR - 5 * MINUTE)
  }
];

// Mock open orders (orderbook)
export const MOCK_ALL_ORDERS = [
  // Buy orders (buying ETH with ESKO)
  {
    id: "101",
    user: "0x2C7859F7F477801A0b1CCb3f5Bc3F0bEe3F8E8a",
    tokenGet: "0x0000000000000000000000000000000000000000", // ETH
    amountGet: "1500000000000000000", // 1.5 ETH
    tokenGive: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa", // ESKO
    amountGive: "142500000000000000000", // 142.5 ESKO (rate: 95 ESKO/ETH)
    timestamp: "1705363200"
  },
  {
    id: "102",
    user: "0x3D8A9F4C3bEe2F9a5c8A7b6D5e4F3c2B1a0D9E8",
    tokenGet: "0x0000000000000000000000000000000000000000",
    amountGet: "2000000000000000000", // 2 ETH
    tokenGive: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
    amountGive: "188000000000000000000", // 188 ESKO (rate: 94 ESKO/ETH)
    timestamp: "1705363300"
  },
  {
    id: "103",
    user: "0x4E9B8D7C6A5F4E3D2C1B0A9F8E7D6C5B4A3E2D1",
    tokenGet: "0x0000000000000000000000000000000000000000",
    amountGet: "1000000000000000000", // 1 ETH
    tokenGive: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
    amountGive: "93000000000000000000", // 93 ESKO (rate: 93 ESKO/ETH)
    timestamp: "1705363400"
  },
  {
    id: "104",
    user: "0x5F0C1E2D3A4B5C6D7E8F9A0B1C2D3E4F5A6B7C8",
    tokenGet: "0x0000000000000000000000000000000000000000",
    amountGet: "3000000000000000000", // 3 ETH
    tokenGive: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
    amountGive: "276000000000000000000", // 276 ESKO (rate: 92 ESKO/ETH)
    timestamp: "1705363500"
  },
  // Sell orders (selling ETH for ESKO)
  {
    id: "105",
    user: "0x6A1B2C3D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9",
    tokenGet: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa", // ESKO
    amountGet: "155000000000000000000", // 155 ESKO (rate: 103.33 ESKO/ETH)
    tokenGive: "0x0000000000000000000000000000000000000000", // ETH
    amountGive: "1500000000000000000", // 1.5 ETH
    timestamp: "1705363600"
  },
  {
    id: "106",
    user: "0x7B2C3D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0",
    tokenGet: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
    amountGet: "208000000000000000000", // 208 ESKO (rate: 104 ESKO/ETH)
    tokenGive: "0x0000000000000000000000000000000000000000",
    amountGive: "2000000000000000000", // 2 ETH
    timestamp: "1705363700"
  },
  {
    id: "107",
    user: "0x8C3D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0C1",
    tokenGet: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
    amountGet: "105000000000000000000", // 105 ESKO (rate: 105 ESKO/ETH)
    tokenGive: "0x0000000000000000000000000000000000000000",
    amountGive: "1000000000000000000", // 1 ETH
    timestamp: "1705363800"
  },
  {
    id: "108",
    user: "0x9D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0C1D2",
    tokenGet: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
    amountGet: "318000000000000000000", // 318 ESKO (rate: 106 ESKO/ETH)
    tokenGive: "0x0000000000000000000000000000000000000000",
    amountGive: "3000000000000000000", // 3 ETH
    timestamp: "1705363900"
  }
];
