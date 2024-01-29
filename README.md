## Cartesi Rollups TVL

This projects aims to estimate the total value locked on DApps built with Cartesi Rollups SDK.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1. create a `.env.local` file
```
// PROVIDERS
COINMARKETCAP_API_KEY=
RPC_URL=
// CARTESI CONTRACTS ADDRESSES on MAINNET
CARTESI_DAPP_FACTORY_ADDRESS='0x7122cd1221C20892234186facfE8615e6743Ab02'
INPUT_BOX_ADDRESS='0x59b22D57D4f067708AB0c00552767405926dc768'
ERC20_PORTAL_ADDRESS="0x9C21AEb2093C32DDbC53eEF24B873BDCd1aDa1DB"
```

2. run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.