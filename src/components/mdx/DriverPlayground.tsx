"use client";

import { useState } from "react";
import { Cpu, CheckCircle2, AlertCircle, Play } from "lucide-react";

export default function DriverPlayground() {
  const [driverName, setDriverName] = useState("r2");
  const [version, setVersion] = useState("1.0.0");
  const [apiContract, setApiContract] = useState("v1");
  const [capabilities, setCapabilities] = useState(["read", "write", "stat", "delete"]);

  const [handshakeResult, setHandshakeResult] = useState<{
    valid: boolean;
    jsonOutput: string;
    message: string;
  } | null>(null);

  const testHandshake = () => {
    const json = {
      name: driverName.trim().toLowerCase(),
      version: version.trim(),
      optivor_api: apiContract,
      capabilities: capabilities,
      author: "Optivor Community",
      homepage: `https://github.com/optivor/optivor-driver-${driverName.toLowerCase()}`,
    };

    const valid = driverName.length > 0 && apiContract === "v1";
    setHandshakeResult({
      valid,
      jsonOutput: JSON.stringify(json, null, 2),
      message: valid
        ? `Handshake valid! Binary satisfies protocol contract ${apiContract}. Ready for 'optivor driver install'.`
        : "Invalid driver payload! Handshake must return 'optivor_api': 'v1'.",
    });
  };

  return (
    <div
      style={{
        margin: "2rem 0",
        padding: "1.25rem 1.5rem",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border-color)",
        background: "var(--bg-card)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 700, fontSize: "1rem", color: "var(--accent-indigo)", marginBottom: "1rem" }}>
        <Cpu size={20} />
        <span>Driver Handshake & Protocol Tester (`--optivor-handshake`)</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem", marginBottom: "1.25rem" }}>
        <div>
          <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-subtle)", marginBottom: "0.25rem" }}>
            Provider Identifier
          </label>
          <input
            type="text"
            value={driverName}
            onChange={(e) => setDriverName(e.target.value)}
            className="search-input"
            placeholder="r2, b2, gcs..."
            style={{ padding: "0.4rem 0.6rem" }}
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-subtle)", marginBottom: "0.25rem" }}>
            Driver Version
          </label>
          <input
            type="text"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            className="search-input"
            style={{ padding: "0.4rem 0.6rem" }}
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-subtle)", marginBottom: "0.25rem" }}>
            Optivor API Contract
          </label>
          <select
            value={apiContract}
            onChange={(e) => setApiContract(e.target.value)}
            className="search-input"
            style={{ padding: "0.4rem 0.6rem" }}
          >
            <option value="v1">v1 (Current)</option>
            <option value="v2-draft">v2-draft</option>
          </select>
        </div>
      </div>

      <button className="btn-secondary" onClick={testHandshake} style={{ width: "100%", justifyContent: "center", marginBottom: "1rem" }}>
        <Play size={16} /> Execute Handshake Simulation
      </button>

      {handshakeResult && (
        <div
          style={{
            padding: "1rem",
            borderRadius: "var(--radius-md)",
            background: "#080c14",
            border: `1px solid ${handshakeResult.valid ? "rgba(52, 211, 153, 0.3)" : "rgba(244, 63, 94, 0.3)"}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: handshakeResult.valid ? "var(--accent-emerald)" : "#f43f5e", fontWeight: 600, fontSize: "0.88rem", marginBottom: "0.5rem" }}>
            {handshakeResult.valid ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            <span>{handshakeResult.message}</span>
          </div>

          <pre style={{ margin: 0, padding: "0.75rem", background: "rgba(0,0,0,0.4)", borderRadius: "var(--radius-sm)", fontSize: "0.82rem", color: "var(--text-main)" }}>
            <code>{handshakeResult.jsonOutput}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
