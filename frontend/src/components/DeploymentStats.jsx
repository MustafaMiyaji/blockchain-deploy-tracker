// DeploymentStats.jsx
import React, { useEffect, useState } from "react";
import { JsonRpcProvider, Contract } from "ethers";
import deploymentLog from "../contracts/deploymentLog.json";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, LineChart, Line,
} from "recharts";

const provider = new JsonRpcProvider("http://127.0.0.1:8545");

export default function DeploymentStats() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const contract = new Contract(deploymentLog.address, deploymentLog.abi, provider);
      const allLogs = await contract.getAllDeployments();

      const formatted = allLogs.map((log) => ({
        commitHash: log.commitHash,
        imageId: log.imageId,
        environment: log.environment,
        timestamp: new Date(Number(log.timestamp) * 1000),
      }));

      setLogs(formatted);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  // Aggregate by environment
  const environmentData = logs.reduce((acc, log) => {
    const key = log.environment;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const envChart = Object.entries(environmentData).map(([env, count]) => ({
    environment: env,
    count,
  }));

  // Aggregate by day
  const byDate = logs.reduce((acc, log) => {
    const dateKey = log.timestamp.toISOString().split("T")[0];
    acc[dateKey] = (acc[dateKey] || 0) + 1;
    return acc;
  }, {});
  const dateChart = Object.entries(byDate).map(([date, count]) => ({
    date,
    count,
  }));

  return (
    <div className="card">
      <h2>📈 Deployment Stats</h2>

      <h3>By Environment</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={envChart}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="environment" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <h3 style={{ marginTop: "2rem" }}>By Date</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dateChart}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
