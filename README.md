# SupplyChainGPT

AI-driven supply chain disruption monitoring & automated contingency planning on Base.

## Features

- 🚨 Real-time Anomaly Detection Frames
- 👥 Stakeholder Alert & Collaboration Channels
- 🤖 AI-Powered Contingency Plan Frames
- ⚡ Autonomous Execution & Onchain Transactions

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (L2 on Ethereum)
- **Wallet Integration**: OnchainKit, Coinbase Wallet
- **Social**: Farcaster Mini App SDK
- **Styling**: Tailwind CSS with Coinbase theme
- **TypeScript**: Full type safety

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` from `.env.local.example`:
```bash
cp .env.local.example .env.local
```

3. Add your OnchainKit API key to `.env.local`

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/
├── components/          # React components
│   ├── AppShell.tsx
│   ├── DisruptionCard.tsx
│   ├── ContingencyPlanCard.tsx
│   ├── StatsCard.tsx
│   └── Providers.tsx
├── page.tsx            # Main page
├── layout.tsx          # Root layout
└── globals.css         # Global styles

public/
└── .well-known/
    └── farcaster.json  # Farcaster manifest
```

## Deployment

Deploy to Vercel:

```bash
npm run build
```

## License

MIT
