"use client";

import { useState } from "react";
import { Settings, Copy, Check } from "lucide-react";

export default function ConfigGenerator() {
  const [port, setPort] = useState(8080);
  const [driver, setDriver] = useState("s3");
  const [bucket, setBucket] = useState("my-image-bucket");
  const [rateLimit, setRateLimit] = useState(true);
  const [telemetry, setTelemetry] = useState(true);
  const [cacheMb, setCacheMb] = useState(1024);
  const [copied, setCopied] = useState(false);

  const yamlConfig = `server:
  port: ${port}
  read_timeout: 30s
  write_timeout: 30s
  rate_limit:
    enabled: ${rateLimit}
    rps: 10
    burst: 20

storage:
  driver: "${driver}"
  s3:
    endpoint: "https://${driver === "r2" ? "account.r2.cloudflarestorage.com" : "s3.us-east-1.amazonaws.com"}"
    bucket: "${bucket}"
    region: "us-east-1"
    access_key_id: "OPTIVOR_ACCESS_KEY"
    secret_access_key: "OPTIVOR_SECRET_KEY"

cache:
  fs:
    dir: "/tmp/optivor-cache"
    max_size_mb: ${cacheMb}

telemetry:
  enabled: ${telemetry}
  service_name: "optivor"`;

  const copyYaml = () => {
    navigator.clipboard.writeText(yamlConfig);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 700, fontSize: "1rem", color: "var(--accent-amber)", marginBottom: "1rem" }}>
        <Settings size={20} />
        <span>Interactive `optivor.yaml` Config Builder</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem", marginBottom: "1.25rem" }}>
        <div>
          <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-subtle)", marginBottom: "0.25rem" }}>
            Server Port
          </label>
          <input
            type="number"
            value={port}
            onChange={(e) => setPort(Number(e.target.value))}
            className="search-input"
            style={{ padding: "0.4rem 0.6rem" }}
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-subtle)", marginBottom: "0.25rem" }}>
            Storage Driver
          </label>
          <select
            value={driver}
            onChange={(e) => setDriver(e.target.value)}
            className="search-input"
            style={{ padding: "0.4rem 0.6rem" }}
          >
            <option value="s3">S3 / MinIO</option>
            <option value="r2">Cloudflare R2</option>
            <option value="b2">Backblaze B2</option>
          </select>
        </div>

        <div>
          <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-subtle)", marginBottom: "0.25rem" }}>
            Bucket Name
          </label>
          <input
            type="text"
            value={bucket}
            onChange={(e) => setBucket(e.target.value)}
            className="search-input"
            style={{ padding: "0.4rem 0.6rem" }}
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-subtle)", marginBottom: "0.25rem" }}>
            Cache Size (MB): {cacheMb}
          </label>
          <input
            type="range"
            min="256"
            max="10240"
            step="256"
            value={cacheMb}
            onChange={(e) => setCacheMb(Number(e.target.value))}
            style={{ width: "100%", accentColor: "var(--accent-amber)" }}
          />
        </div>
      </div>

      <div className="code-block-wrapper" style={{ margin: 0 }}>
        <div className="code-block-header">
          <span>optivor.yaml</span>
          <button className="copy-btn" onClick={copyYaml}>
            {copied ? <Check size={14} style={{ color: "var(--accent-emerald)" }} /> : <Copy size={14} />}
            <span>{copied ? "Copied" : "Copy Config"}</span>
          </button>
        </div>
        <pre style={{ border: "none", padding: "1rem" }}>
          <code>{yamlConfig}</code>
        </pre>
      </div>
    </div>
  );
}
