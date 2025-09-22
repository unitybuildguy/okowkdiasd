# 🚀 Solana Memecoin Maker

A modern, user-friendly web application for creating custom SPL tokens (memecoins) on the Solana blockchain. No coding required - just connect your wallet, pay 0.05 SOL, and launch your token!

![Solana Memecoin Maker](https://via.placeholder.com/800x400/6366f1/ffffff?text=Solana+Memecoin+Maker)

## ✨ Features

- 🔗 **Easy Wallet Connection** - Support for Phantom, Solflare, and Torus wallets
- 💰 **Low Fees** - Only 0.05 SOL to create your token
- ⚡ **Instant Creation** - Tokens created and minted within seconds
- 🎨 **Custom Metadata** - Add name, symbol, description, and image
- 📊 **Solscan Integration** - Automatic redirect to view your token
- 💼 **Full Ownership** - You receive 100% of the initial token supply
- 🔒 **Secure** - No private key storage, all transactions user-signed

## 🛠️ Tech Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Blockchain**: Solana Web3.js + SPL Token
- **Wallet**: Solana Wallet Adapter
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- pnpm (recommended) or npm
- A Solana wallet (Phantom, Solflare, etc.)
- Some SOL for testing (use devnet faucet)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd solana-memecoin-maker

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

### Production Build

```bash
# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

## 🎯 How It Works

1. **Connect Wallet** - Connect your Solana wallet to get started
2. **Check Balance** - Ensure you have at least 0.05 SOL
3. **Fill Form** - Enter your token details (name, symbol, description, etc.)
4. **Pay Fee** - Confirm the 0.05 SOL payment transaction
5. **Create Token** - Your SPL token is created and minted automatically
6. **View on Solscan** - Get redirected to see your new token

## ⚙️ Configuration

### Network Settings

The app is configured for Solana Devnet by default. To switch to Mainnet:

1. Update `NETWORK_URL` in `src/lib/tokenCreation.js`
2. Change network in `src/components/SolanaProvider.jsx`
3. Update Solscan URLs in `getSolscanUrl` function

### Fee Configuration

Update the fee amount in `src/lib/tokenCreation.js`:

```javascript
export const FEE_AMOUNT = 0.05; // Change this value
export const FEE_RECIPIENT = 'YOUR_WALLET_ADDRESS'; // Your wallet
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── SolanaProvider.jsx  # Wallet provider setup
│   ├── WalletConnection.jsx # Wallet connection UI
│   ├── TokenCreationForm.jsx # Main token creation form
│   ├── TokenCreationSection.jsx # Form wrapper
│   └── BalanceDisplay.jsx  # SOL balance display
├── lib/
│   └── tokenCreation.js    # Solana blockchain utilities
├── App.jsx                 # Main app component
├── App.css                 # Global styles
└── main.jsx               # App entry point
```

## 🔧 Development

### Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build
- `pnpm run lint` - Run ESLint

### Key Dependencies

```json
{
  "@solana/web3.js": "^1.98.4",
  "@solana/wallet-adapter-react": "^0.15.39",
  "@solana/wallet-adapter-react-ui": "^0.9.39",
  "@solana/spl-token": "^0.4.14",
  "react": "^19.1.0",
  "tailwindcss": "^3.4.17"
}
```

## 🚨 Important Notes

- **Testnet First**: Always test on Devnet before using Mainnet
- **Fee Recipient**: Update the fee recipient address to your own wallet
- **Security**: Never store private keys in the application
- **Network Costs**: Consider Solana network fees in addition to the platform fee

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Solana Foundation](https://solana.org/) for the amazing blockchain
- [Solana Wallet Adapter](https://github.com/anza-xyz/wallet-adapter) for wallet integration
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for styling utilities

## 📞 Support

If you encounter any issues or have questions:

1. Check the [documentation](./solana-memecoin-maker-documentation.md)
2. Open an issue on GitHub
3. Join our community Discord (if available)

---

**⚠️ Disclaimer**: This tool is for educational and experimental purposes. Always do your own research and understand the risks involved in token creation and cryptocurrency transactions.

**🚀 Ready to create your memecoin? Let's go!**
