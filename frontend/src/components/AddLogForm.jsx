import React, { useState } from "react";
import { JsonRpcProvider, Contract } from "ethers";
import deploymentLogData from "../contracts/deploymentLog.json";
import "./AddLogForm.css"; // Add CSS for styling
import { toast } from "react-toastify";

const provider = new JsonRpcProvider("http://127.0.0.1:8545");

export default function AddLogForm() {
  const [commitHash, setCommitHash] = useState("");
  const [imageId, setImageId] = useState("");
  const [environment, setEnvironment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const signer = await provider.getSigner(0);
      const contract = new Contract(deploymentLogData.address, deploymentLogData.abi, signer);

      const tx = await contract.logDeployment(commitHash, imageId, environment);
      await tx.wait();

      toast.success("✅ Deployment log added!");
      setCommitHash("");
      setImageId("");
      setEnvironment("");
    } catch (err) {
      console.error("Error logging deployment:", err);
      toast.error("❌ Failed to log deployment.");
    }
  };

  return (
    <div className="addlog-container">
      <h2>➕ Add Deployment Log</h2>
      <form onSubmit={handleSubmit}>
        <label>Commit Hash</label>
        <input
          type="text"
          value={commitHash}
          onChange={(e) => setCommitHash(e.target.value)}
          required
        />

        <label>Image ID</label>
        <input
          type="text"
          value={imageId}
          onChange={(e) => setImageId(e.target.value)}
          required
        />

        <label>Environment</label>
        <select
          value={environment}
          onChange={(e) => setEnvironment(e.target.value)}
          required
        >
          <option value="">Select</option>
          <option value="dev">Dev</option>
          <option value="staging">Staging</option>
          <option value="prod">Production</option>
        </select>

        <button type="submit">Log Deployment</button>
      </form>
    </div>
  );
}
