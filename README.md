# Secure Health Login — Web3 Authentication for Healthcare

Production-ready SIWE (EIP-712) + EIP-4337 login layer. Deployed on Vercel. Includes Dune analytics for demo telemetry.

Live demo: https://secure-health-login.vercel.app

## Demo Showcase

- Wallet login (SIWE, EIP-712) with MetaMask (wagmi v2)
- VITA analytics: Top Addresses and Retention

<br>

![VITA Top Addresses — Jan 2022–Sep 2025](docs/vita_top_addresses.png)

<br>

![VITA Retention & Engagement — Jan 2022–Sep 2025](docs/vita_retention.png)

View on Dune: https://dune.com/queries/5617908

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
