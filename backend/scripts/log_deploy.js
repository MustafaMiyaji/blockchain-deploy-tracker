const hre = require("hardhat");
const { ethers } = hre;
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

// ✅ Load latest contract info synced from deploy.js
const deploymentLogPath = path.join(__dirname, "../../frontend/src/contracts/deploymentLog.json");
const deploymentLogArtifact = JSON.parse(fs.readFileSync(deploymentLogPath, "utf8"));

async function main() {
  const [signer] = await ethers.getSigners();

  const contract = new ethers.Contract(
    deploymentLogArtifact.address,
    deploymentLogArtifact.abi,
    signer
  );

  // ✅ Get current Git commit hash
  const commitHash = execSync("git rev-parse HEAD").toString().trim();

  // ✅ Simulate image hash (replace in real CI)
  const imageId = "docker.io/project-image@sha256:abc123fakehash";

  // ✅ Pull from ENV variable or fallback
  const environment = process.env.ENVIRONMENT || "development";

  // ✅ Call logDeployment
  const tx = await contract.logDeployment(commitHash, imageId, environment);
  await tx.wait();

  console.log("✅ Deployment metadata logged to blockchain:");
  console.log("- Commit:", commitHash);
  console.log("- Image ID:", imageId);
  console.log("- Environment:", environment);
}

main().catch((error) => {
  console.error("❌ Error logging deployment:", error);
  process.exit(1);
});
