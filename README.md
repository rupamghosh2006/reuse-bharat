***Reuse Bharat***
Overview

Reuse Bharat is a unified platform designed to reduce resource wastage in India by connecting surplus food, educational materials, and near-expiry medicines with those in need. The platform focuses on building a circular economy through real-time coordination, verified networks, and transparent data systems powered by Web2 and Web3 technologies.

## Architecture

```
┌─────────────────────────────────────────┐
│         CampusMarketplace               │
│         (Data Storage Only)            │
│                                        │
│ - listItem()     → stores item data    │
│ - markAsSold()   → marks item status  │
│ - getActiveItems() → returns items    │
│ - filters → category, price, condition│
└─────────────────────────────────────────┘
```

## Contract

### CampusMarketplace
- **Address**: `0x0f4A570a593F27Fa78Bf09F4F0301Ae41c4ee075`
- **Network**: Celo Sepolia

## Features (Data Only)

- **List Item**: Store item title, description, price, category, condition, imageURI
- **Mark as Sold**: Seller marks item as sold (off-chain payment)
- **View Items**: Get all active items
- **Filters**: By category, price range, condition

### Categories
- Textbooks, LabManuals, Notebooks, Stationery, Calculators, Other

### Condition
- New, LikeNew, Good, Fair

## Functions

```solidity
// Write Functions
function listItem(title, description, price, category, condition, imageURI) → itemId
function markAsSold(itemId) → marks item sold
function updateItem(itemId, title, description, price, category, condition, imageURI)
function deleteItem(itemId)

// Read Functions
function getActiveItems() → Item[]
function getItemsByCategory(Category) → Item[]
function getItemsByPriceRange(minPrice, maxPrice) → Item[]
function getItemsByCondition(Condition) → Item[]
function getSellerItems(seller) → Item[]
function getBuyerItems(buyer) → Item[]
function getItem(itemId) → Item
```

## Deployment

### Testnet (Sepolia)
| Contract | Address | TX Hash |
|----------|---------|--------|
| CampusMarketplace | `0x0f4A570a593F27Fa78Bf09F4F0301Ae41c4ee075` | `0x6f32f09731824a135b3cff6d7bea7440344e9f362e596ebe2ebdd0534e2e1029` |

### Explorer
- **Celo Sepolia Explorer**: https://celoscan.io/sepolia/
- **Contract**: https://celoscan.io/sepolia/address/0x0f4A570a593F27Fa78Bf09F4F0301Ae41c4ee075

## Setup

```bash
# Install dependencies
npm install

# Compile contracts
npm run compile

# Deploy to testnet
npx hardhat run scripts/deploy.js --network celoSepolia
```

## Environment

```
PRIVATE_KEY=your_private_key
```

## Project Structure

```
├── contracts/
│   └── CampusMarketplace.sol  # Data storage only
├── scripts/
│   └── deploy.js          # Deployment script
├── hardhat.config.js      # Network configuration
├── package.json
├── deployment.json      # Deployed contract addresses
└── README.md
```

## How It Works

1. **Seller** calls `listItem()` → stores product data on-chain
2. **Buyer** views items via `getActiveItems()` or filters
3. **Buyer** contacts seller off-chain (via app) → payment done off-chain
4. **Seller** calls `markAsSold()` → updates status on-chain

No wallet connection, no token transfers - only data is stored on blockchain.
