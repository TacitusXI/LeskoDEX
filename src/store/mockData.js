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

// Mock filled orders (trades) - 40 candlesticks over 24 hours (30-min intervals)
// Using proper Wei format (10^18) and recent timestamps
// User 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb appears only 5 times (for "My Transactions")
const now = Math.floor(Date.now() / 1000);
const HOUR = 3600;
const MINUTE = 60;

// Generate 120 trades (3 trades per 30-min candle = 40 candles)
const generateTrades = () => {
  const trades = [];
  let id = 1;
  let basePrice = 98; // Starting price
  
  // Other users for trading
  const otherUsers = [
    "0x2C7859F7F477801A0b1CCb3f5Bc3F0bEe3F8E8a",
    "0x3D8A9F4C3bEe2F9a5c8A7b6D5e4F3c2B1a0D9E8",
    "0x4E9B8D7C6A5F4E3D2C1B0A9F8E7D6C5B4A3E2D1",
    "0x5F0C1E2D3A4B5C6D7E8F9A0B1C2D3E4F5A6B7C8",
    "0x6A1B2C3D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9",
    "0x7B2C3D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0",
    "0x8C3D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0C1",
    "0x9D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0C1D2"
  ];
  
  const myUser = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb";
  let myTradeCount = 0;
  const maxMyTrades = 5; // Only 5 trades for "My Transactions"
  
  // 40 candles, 3 trades each
  for (let candle = 0; candle < 40; candle++) {
    const candleStart = now - (40 - candle) * 30 * MINUTE;
    
    // Price variation for this candle
    const priceChange = (Math.random() - 0.5) * 10; // -5 to +5
    const open = basePrice;
    const close = basePrice + priceChange;
    const high = Math.max(open, close) + Math.random() * 3;
    const low = Math.min(open, close) - Math.random() * 3;
    
    basePrice = close; // Next candle starts where this one closes
    
    // 3 trades per candle (open, high/low, close)
    const prices = [open, Math.random() > 0.5 ? high : low, close];
    
    for (let i = 0; i < 3; i++) {
      const price = prices[i];
      const timeOffset = i * 8 * MINUTE; // Spread trades across 24 minutes
      
      // Decide if this trade involves myUser
      const useMyUser = myTradeCount < maxMyTrades && Math.random() > 0.7;
      const user = useMyUser ? myUser : otherUsers[Math.floor(Math.random() * otherUsers.length)];
      const userFill = otherUsers[Math.floor(Math.random() * otherUsers.length)];
      
      if (useMyUser) myTradeCount++;
      
      trades.push({
        id: String(id++),
        user,
        userFill,
        tokenGet: "0x0000000000000000000000000000000000000000", // ETH
        amountGet: "1000000000000000000", // 1 ETH
        tokenGive: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa", // ESKO
        amountGive: String(Math.floor(price * 1e18)), // Price * 10^18
        timestamp: String(candleStart + timeOffset)
      });
    }
  }
  
  return trades;
};

export const MOCK_FILLED_ORDERS = generateTrades();

// Mock open orders (orderbook) - using dynamic timestamps
export const MOCK_ALL_ORDERS = [
  // Buy orders (buying ETH with ESKO)
  {
    id: "101",
    user: "0x2C7859F7F477801A0b1CCb3f5Bc3F0bEe3F8E8a",
    tokenGet: "0x0000000000000000000000000000000000000000", // ETH
    amountGet: "1500000000000000000", // 1.5 ETH
    tokenGive: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa", // ESKO
    amountGive: "142500000000000000000", // 142.5 ESKO (rate: 95 ESKO/ETH)
    timestamp: String(now - 2 * HOUR)
  },
  {
    id: "102",
    user: "0x3D8A9F4C3bEe2F9a5c8A7b6D5e4F3c2B1a0D9E8",
    tokenGet: "0x0000000000000000000000000000000000000000",
    amountGet: "2000000000000000000", // 2 ETH
    tokenGive: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
    amountGive: "188000000000000000000", // 188 ESKO (rate: 94 ESKO/ETH)
    timestamp: String(now - 1 * HOUR - 50 * MINUTE)
  },
  {
    id: "103",
    user: "0x4E9B8D7C6A5F4E3D2C1B0A9F8E7D6C5B4A3E2D1",
    tokenGet: "0x0000000000000000000000000000000000000000",
    amountGet: "1000000000000000000", // 1 ETH
    tokenGive: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
    amountGive: "93000000000000000000", // 93 ESKO (rate: 93 ESKO/ETH)
    timestamp: String(now - 1 * HOUR - 30 * MINUTE)
  },
  {
    id: "104",
    user: "0x5F0C1E2D3A4B5C6D7E8F9A0B1C2D3E4F5A6B7C8",
    tokenGet: "0x0000000000000000000000000000000000000000",
    amountGet: "3000000000000000000", // 3 ETH
    tokenGive: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
    amountGive: "276000000000000000000", // 276 ESKO (rate: 92 ESKO/ETH)
    timestamp: String(now - 1 * HOUR)
  },
  // Sell orders (selling ETH for ESKO)
  {
    id: "105",
    user: "0x6A1B2C3D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9",
    tokenGet: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa", // ESKO
    amountGet: "155000000000000000000", // 155 ESKO (rate: 103.33 ESKO/ETH)
    tokenGive: "0x0000000000000000000000000000000000000000", // ETH
    amountGive: "1500000000000000000", // 1.5 ETH
    timestamp: String(now - 50 * MINUTE)
  },
  {
    id: "106",
    user: "0x7B2C3D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0",
    tokenGet: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
    amountGet: "208000000000000000000", // 208 ESKO (rate: 104 ESKO/ETH)
    tokenGive: "0x0000000000000000000000000000000000000000",
    amountGive: "2000000000000000000", // 2 ETH
    timestamp: String(now - 40 * MINUTE)
  },
  {
    id: "107",
    user: "0x8C3D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0C1",
    tokenGet: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
    amountGet: "105000000000000000000", // 105 ESKO (rate: 105 ESKO/ETH)
    tokenGive: "0x0000000000000000000000000000000000000000",
    amountGive: "1000000000000000000", // 1 ETH
    timestamp: String(now - 30 * MINUTE)
  },
  {
    id: "108",
    user: "0x9D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0C1D2",
    tokenGet: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
    amountGet: "318000000000000000000", // 318 ESKO (rate: 106 ESKO/ETH)
    tokenGive: "0x0000000000000000000000000000000000000000",
    amountGive: "3000000000000000000", // 3 ETH
    timestamp: String(now - 20 * MINUTE)
  }
];
