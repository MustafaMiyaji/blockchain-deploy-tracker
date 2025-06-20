// SimulateDeployForm.jsx
import React, { useState } from "react";
import { JsonRpcProvider, Contract } from "ethers";
import deploymentLog from "../contracts/deploymentLog.json";
import { toast } from "react-toastify";

const provider = new JsonRpcProvider("http://127.0.0.1:8545");

export default function SimulateDeployForm() {
  const [form, setForm] = useState({
    commitHash: "",
    imageId: "",
    environment: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const signer = await provider.getSigner(0);
      const contract = new Contract(deploymentLog.address, deploymentLog.abi, signer);

      const tx = await contract.logDeployment(
        form.commitHash,
        form.imageId,
        form.environment
      );
      await tx.wait();

      toast.success("✅ Deployment logged successfully!");
      setForm({ commitHash: "", imageId: "", environment: "" });
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to log deployment.");
    }
  };

  return (
    <div className="card">
      <h2>🧪 Simulate Deployment Log</h2>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
        <input
          name="commitHash"
          value={form.commitHash}
          onChange={handleChange}
          placeholder="Git Commit Hash"
          required
        />
        <input
          name="imageId"
          value={form.imageId}
          onChange={handleChange}
          placeholder="Docker Image ID"
          required
        />
        <input
          name="environment"
          value={form.environment}
          onChange={handleChange}
          placeholder="Environment (e.g., prod/staging)"
          required
        />
        <button type="submit">Log Deployment</button>
      </form>
    </div>
  );
}
