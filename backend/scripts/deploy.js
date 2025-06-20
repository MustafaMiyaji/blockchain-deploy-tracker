const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const contractsDir = path.join(__dirname, "../../frontend/src/contracts");
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir, { recursive: true });
  }

  // Deploy DeploymentLog contract
  const DeploymentLog = await hre.ethers.getContractFactory("DeploymentLog");
  const deploymentLog = await DeploymentLog.deploy();
  await deploymentLog.deployed();
  console.log("✅ DeploymentLog deployed to:", deploymentLog.address);

  // Write ABI and address to frontend
  const deploymentLogData = {
    address: deploymentLog.address,
    abi: JSON.parse(
      fs.readFileSync(
        path.join(
          __dirname,
          "../artifacts/contracts/DeploymentLog.sol/DeploymentLog.json"
        ),
        "utf8"
      )
    ).abi,
  };
  fs.writeFileSync(
    path.join(contractsDir, "deploymentLog.json"),
    JSON.stringify(deploymentLogData, null, 2)
  );

  console.log("✅ Synced DeploymentLog to frontend.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
