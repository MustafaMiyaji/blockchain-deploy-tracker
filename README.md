# 🛡️ Blockchain Deployment Tracker

This project is a **full-stack immutable deployment tracker** using **Solidity + React + Hardhat + ethers.js**. It allows secure, verifiable logging of deployment metadata like commit hashes and Docker image IDs directly on the blockchain.

## 💡 Features

- ✅ Immutable storage of deployment metadata
- ✅ Fully decentralized log viewer
- ✅ React + Dark/Light Mode
- ✅ Protected log upload page (`/addlog-4a3b1f`)
- ✅ QR code generator for secure access
- 🐳 CI/CD-friendly structure (Docker & Git-ready)

## 🔧 Tech Stack

- Frontend: React + React Router + Framer Motion + Toastify
- Smart Contracts: Solidity
- Deployment: Hardhat
- Blockchain: Local Hardhat node
- Styling: CSS + Theming
- Extras: QR code access, password-protected admin route

## 🚀 Setup Instructions

```bash
git clone https://github.com/your-username/blockchain-deployment-tracker.git
cd blockchain-deployment-tracker

# Backend
cd backend
npm install
npx hardhat node  # start local node in new terminal
npx hardhat run scripts/deploy.js --network localhost

# Frontend
cd ../frontend
npm install
npm start
```

## 🔐 Protected Route

To access the secure log submission route:

```
http://localhost:3000/addlog-4a3b1f
```

Password: `devops123` (you can update this)

---

## 📜 License

MIT License © 2025
