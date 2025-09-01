## Demo Showcase

- Wallet login (SIWE, EIP-712)
- VITA transfers chart via Dune Query 5617908
- Tag: v0.1.0

### Quickstart
```bash
pnpm install --dir web
pnpm --dir web run dev
```

---

# 🏥 Secure Health Login — Web3 Authentication for Healthcare  

A practitioner-facing authentication demo that replaces passwords with **wallet-based login**.  
Built for privacy-first healthcare systems using **SIWE (Sign-In with Ethereum)**, **EIP-712 structured signing**, and **EIP-4337 account abstraction**.  

---

## 🚀 Features  

- **SIWE (Sign-In with Ethereum):** decentralized login, no centralized password risk.  
- **EIP-712 Structured Signing:** secure, human-readable message signing (industry standard).  
- **EIP-4337 Smart Accounts:** account abstraction enabling gasless logins and smart wallet features.  
- **Dockerized Environment:** reproducible, professional setup with Nginx + bundler for easy deployment.  

---

## 🛠️ Tech Stack  

- **Next.js** (frontend)  
- **wagmi + viem** (wallet integration)  
- **EIP-712 schema** for secure signing  
- **EIP-4337 bundler** (Sepolia testnet)  
- **Docker + Nginx** for reproducibility  

---

## 📖 Why This Matters for Healthcare  

- **Patient & Practitioner Usability:** login without passwords or gas fees.  
- **Privacy & Compliance:** HIPAA-aligned architecture, no central credential storage.  
- **Healthcare Integration:** adaptable for EMR/EHR systems, practitioner portals, or patient access apps.  

---

## 🔧 Getting Started  

```bash
# Clone repo
git clone https://github.com/Where-Mental-Wellness-Meets-Metaverse/secure-health-login.git
cd secure-health-login/web

# Install dependencies
pnpm install

# Run Docker services (bundler + nginx)
docker-compose up -d

# Start app
pnpm run dev
````

---

## 📌 Next Steps

* Extend for patient-facing flows
* Add FHIR/HL7-based consent hooks
* Expand smart wallet features (multi-sig, recovery)

---

## 🏷️ Tag History

* **v1-login-working** → baseline login flow working

---

## 📜 License

Rights Reserved, Unlicensed

[![Release](https://img.shields.io/github/v/tag/Where-Mental-Wellness-Meets-Metaverse/secure-health-login)](../../releases)
[![Tag](https://img.shields.io/badge/demo-v0.1.0-informational)](#)
