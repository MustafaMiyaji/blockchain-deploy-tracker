// App.js (Final Version)
import React, { useEffect, useState } from "react";
import { JsonRpcProvider } from "ethers";
import LogViewer from "./components/LogViewer";
import ProtectedRoute from "./components/ProtectedRoute";
import QRCodeDisplay from "./components/QRCodeDisplay";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import SimulateDeployForm from "./components/SimulateDeployForm";
import DeploymentStats from "./components/DeploymentStats";


const provider = new JsonRpcProvider("http://127.0.0.1:8545");

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <Router>
      <div className="app-container">
        <div className="toggle">
          <label>
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />
            Dark Mode
          </label>
        </div>

        <Routes>
	  <Route path="/stats" element={<DeploymentStats />} />
	  <Route path="/simulate-deploy" element={<SimulateDeployForm />} />
          {/* Homepage shows deployment logs */}
          <Route
            path="/"
            element={
              <>
                <h1>🚀 Immutable Deployment Tracker</h1>
                <div className="card">
                  <LogViewer />
                </div>
                <QRCodeDisplay />
              </>
            }
          />

          {/* Password-protected log form (via secret URL) */}
          <Route path="/addlog-4a3b1f" element={<ProtectedRoute />} />
        </Routes>

        <ToastContainer position="bottom-right" theme={theme} autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;
