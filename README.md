# Secure Health Login — Web3 Authentication for Healthcare

Production-ready SIWE (EIP-712) + EIP-4337 login layer. Deployed on Vercel. Includes Dune analytics for demo telemetry.

Live demo: https://secure-health-login.vercel.app

## Demo Showcase

- Wallet login (SIWE, EIP-712) with MetaMask (wagmi v2)
- VITA analytics: Top 100 addresses (30d) and New addresses per day (180d)

<br>

![Top 100 VITA Addresses — last 30 days](assets/vita_top100_30d.png)

*Top 100 VITA addresses ranked by total transfer activity in the last 30 days (sent + received).*

<br>

![VITA — New Addresses per Day (180d)](assets/vita_new_addresses_180d.png)

*First-time VITA participant addresses per day over the past 180 days from `erc20_ethereum.evt_transfer`.*

View on Dune: https://dune.com/dr_meg/vita-dashboard

## Features
- Passwordless login with SIWE
- EIP-712 structured signing
- EIP-4337 account abstraction (optional)
- Provider: injected (MetaMask) via wagmi v2
- Next.js app, Vercel deployment
- Dune-powered activity visualization

## Quickstart (local dev)
```bash
: # Rights Reserved, Unlicensed
cd ~
