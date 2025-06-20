# 🚀 Blockchain Deployment Tracker

A modern, blockchain-backed immutable deployment logging tool with a user-friendly frontend interface.

## 🔧 Features

- View blockchain-logged deployment metadata (commit hash, image ID, environment, timestamp)
- Toggle between Dark/Light themes
- Optional QR code to access secure log route
- Protected logging route (`/addlog-4a3b1f`)
- Built with React, Ethers.js, Hardhat, and Solidity

## 🗂 Project Structure

```
blockchain-devops-project/
├── backend/                 # Hardhat smart contracts and deployment scripts
│   ├── contracts/
│   ├── scripts/
│   ├── hardhat.config.js
│   └── ...
├── frontend/                # React frontend interface
│   ├── src/
│   │   ├── components/
│   │   ├── contracts/
│   │   └── App.js
│   └── ...
└── README.md                # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js
- Docker (optional for real deployments)
- MetaMask (for interacting with local blockchain)

### Setup

1. **Clone the repo**

```bash
git clone https://github.com/MustafaMiyaji/blockchain-deploy-tracker
cd blockchain-devops-project
```

2. **Install Backend Dependencies**

```bash
cd backend
npm install
npx hardhat node --hostname 127.0.0.1
```

3. **Deploy Contracts**

```bash
npx hardhat run scripts/deploy.js --network localhost
```

4. **Log Deployment (optional)**

```bash
ENVIRONMENT=dev npx hardhat run scripts/log_deploy.js --network localhost
```

5. **Install Frontend Dependencies**

```bash
cd ../frontend
npm install
npm start
```

6. **Access the App**
   Visit `http://localhost:3000` for the dashboard, and `/addlog-4a3b1f` for protected log submission.

---

## 🛡 Security

- Use `.env` for secrets (not included in this repo)
- Protected route with basic in-memory password (`admin123` by default)

## 🙌 Credits

Built by MustafaMiyaji.

## 🪪 License

MIT License
