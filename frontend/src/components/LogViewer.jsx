import React, { useEffect, useState } from "react";
import { JsonRpcProvider, Contract } from "ethers";
import deploymentLog from "../contracts/deploymentLog.json";
import "./LogViewer.css";

const provider = new JsonRpcProvider("http://127.0.0.1:8545");

export default function LogViewer() {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedLog, setSelectedLog] = useState(null);
  const [sortField, setSortField] = useState("timestamp");
  const [sortAsc, setSortAsc] = useState(false);

  useEffect(() => {
    fetchLogs();
  }, []);

  useEffect(() => {
    filterLogs();
  }, [logs, filter]);

  const fetchLogs = async () => {
    try {
      const contract = new Contract(
        deploymentLog.address,
        deploymentLog.abi,
        provider
      );
      const logsArray = await contract.getAllDeployments();

      const formatted = logsArray.map((log, index) => ({
        id: index + 1,
        commitHash: log.commitHash,
        imageId: log.imageId,
        environment: log.environment,
        timestamp: new Date(Number(log.timestamp) * 1000).toLocaleString(),
        rawTimestamp: Number(log.timestamp)
      }));

      setLogs(formatted);
    } catch (err) {
      console.error("Error fetching logs:", err);
    }
  };

  const filterLogs = () => {
    const val = filter.toLowerCase();
    let filtered = logs.filter((log) =>
      log.environment.toLowerCase().includes(val)
    );
    sortLogs(filtered);
  };

  const sortLogs = (logArray) => {
    const sorted = [...logArray].sort((a, b) => {
      if (sortField === "timestamp") {
        return sortAsc
          ? a.rawTimestamp - b.rawTimestamp
          : b.rawTimestamp - a.rawTimestamp;
      } else {
        return sortAsc
          ? a[sortField].localeCompare(b[sortField])
          : b[sortField].localeCompare(a[sortField]);
      }
    });
    setFilteredLogs(sorted);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSort = (field) => {
    setSortAsc(sortField === field ? !sortAsc : true);
    setSortField(field);
    sortLogs(filteredLogs);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const exportToCSV = () => {
    const headers = ["ID", "Commit Hash", "Image ID", "Environment", "Timestamp"];
    const rows = filteredLogs.map((log) => [
      log.id,
      log.commitHash,
      log.imageId,
      log.environment,
      log.timestamp
    ]);
    const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "deployment_logs.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="logs-container">
      <div className="logs-header">
        <h2>📜 Deployment Logs</h2>
        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Filter by environment (e.g., dev)"
          className="log-search"
        />
        <button className="csv-btn" onClick={exportToCSV}>
          ⬇️ Export CSV
        </button>
      </div>

      {filteredLogs.length === 0 ? (
        <p className="logs-empty">No logs found.</p>
      ) : (
        <div className="logs-grid">
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              className="log-card"
              onClick={() => setSelectedLog(log)}
            >
              <p>
                <strong>🔁 Commit:</strong>{" "}
                <code>
                  {log.commitHash.slice(0, 8)}...
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(log.commitHash);
                    }}
                  >
                    📋
                  </button>
                </code>
              </p>
              <p>
                <strong>📦 Image:</strong>{" "}
                <code>
                  {log.imageId.slice(0, 10)}...
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(log.imageId);
                    }}
                  >
                    📋
                  </button>
                </code>
              </p>
              <p>
                <strong>🌍 Env:</strong> {log.environment}
              </p>
              <p>
                <strong>🕒 Time:</strong> {log.timestamp}
              </p>
            </div>
          ))}
        </div>
      )}

      {selectedLog && (
        <div className="log-modal" onClick={() => setSelectedLog(null)}>
          <div className="log-modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>📄 Log #{selectedLog.id}</h3>
            <p>
              <strong>Commit Hash:</strong> {selectedLog.commitHash}
            </p>
            <p>
              <strong>Image ID:</strong> {selectedLog.imageId}
            </p>
            <p>
              <strong>Environment:</strong> {selectedLog.environment}
            </p>
            <p>
              <strong>Timestamp:</strong> {selectedLog.timestamp}
            </p>
            <button onClick={() => setSelectedLog(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
