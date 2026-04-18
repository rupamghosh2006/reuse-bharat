# Reuse Bharat

<p align="center">
  <strong>A blockchain-powered circular economy platform connecting surplus resources with those in need</strong>
</p>

<p align="center">
  <a href="https://celoscan.io/sepolia/address/0x0f4A570a593F27Fa78Bf09F4F0301Ae41c4ee075">
    <img src="https://img.shields.io/badge/Contract-0x0f4A570a593F27Fa78Bf09F4F0301Ae41c4ee075-blue" alt="Contract">
  </a>
  <img src="https://img.shields.io/badge/Network-Celo%20Sepolia-green" alt="Network">
  <img src="https://img.shields.io/badge/License-MIT-yellow" alt="License">
</p>

---

## Table of Contents

- [About](#about)
- [Problem Statement](#problem-statement)
- [Solution](#solution)
- [Architecture](#architecture)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Contract](#contract)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [Security](#security)
- [License](#license)

---

## About

Reuse Bharat is a unified platform designed to reduce resource wastage in India by connecting surplus food, educational materials, and near-expiry medicines with those in need. The platform focuses on building a circular economy through real-time coordination, verified networks, and transparent data systems powered by Web2 and Web3 technologies.

## Problem Statement

India faces significant resource wastage while many lack access to essential items:
- **Textbooks & Educational Materials** - Students cannot afford expensive books
- **Near-expiry Medicines** - Wasted while others need them
- **Surplus Food** - Restaurants throw away excess food daily
- **Underutilized Items** - Electronics, furniture, and other goods sit unused

## Solution

CampusMarketplace enables:
- Students to buy/sell used textbooks at affordable prices
- Verified seller/buyer networks
- Real-time data on available items
- Transparent blockchain Record-keeping
- No transaction fees via off-chain payment

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

## Features

| Feature | Description |
|---------|-------------|
| **List Item** | Store item title, description, price, category, condition, imageURI |
| **Mark as Sold** | Seller marks item as sold (off-chain payment) |
| **View Items** | Get all active items |
| **Filters** | By category, price range, condition |

### Supported Categories
- Textbooks, LabManuals, Notebooks, Stationery, Calculators, Other

### Item Condition
- New, LikeNew, Good, Fair

## Tech Stack

- **Smart Contracts**: Solidity
- **Framework**: Hardhat
- **Blockchain**: Celo (Alfajores/Sepolia)
- **Storage**: On-chain (data only, no tokens)

## Getting Started

### Prerequisites
- Node.js v16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/reuse-bharat.git
cd reuse-bharat

# Install dependencies
npm install
```

### Compile Contracts

```bash
npm run compile
```

### Deploy to Testnet

```bash
npx hardhat run scripts/deploy.js --network celoSepolia
```

### Environment Variables

Create a `.env` file:

```env
PRIVATE_KEY=your_private_key
```

## Contract Functions

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

| Network | Contract Address | Transaction Hash |
|---------|-----------------|-------------------|
| Celo Sepolia | `0x0f4A570a593F27Fa78Bf09F4F0301Ae41c4ee075` | `0x6f32f09731824a135b3cff6d7bea7440344e9f362e596ebe2ebdd0534e2e1029` |

**Explorer**: [Celo Sepolia Explorer](https://celoscan.io/sepolia/address/0x0f4A570a593F27Fa78Bf09F4F0301Ae41c4ee075)

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

> **Note**: No wallet connection, no token transfers - only data is stored on blockchain.

## Security

- Never expose your private key
- Use testnet for development
- Verify contract address before interacting
- Review smart contract code before deployment

## License

MIT License - see [LICENSE](LICENSE) for details.
