"use client";

import { useState } from "react";
import { Terminal, Copy, Check, Play, Settings } from "lucide-react";

export default function InteractiveCurl() {
  const [imageKey, setImageKey] = useState("hero-banner.jpg");
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [format, setFormat] = useState("webp");
  const [fit, setFit] = useState("cover");
  const [quality, setQuality] = useState(85);

  const [responseState, setResponseState] = useState<{
    status: number;
    cacheHit: boolean;
    transformMs: number;
    sizeKb: number;
  } | null>(null);

  const [copied, setCopied] = useState(false);

  const curlCommand = `curl -i "http://localhost:8080/image/${imageKey}?w=${width}&h=${height}&fit=${fit}&format=${format}&q=${quality}"`;

  const runSimulatedRequest = () => {
    setResponseState(null);
    setTimeout(() => {
      setResponseState({
        status: 200,
        cacheHit: Math.random() > 0.3,
        transformMs: Number((Math.random() * 3 + 1.2).toFixed(1)),
        sizeKb: Math.round((width * height * 0.08) / 1024),
      });
    }, 300);
  };

  const copyCurl = () => {
    navigator.clipboard.writeText(curlCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        margin: "2rem 0",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border-color)",
        background: "var(--bg-card)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.75rem 1.25rem",
          background: "rgba(255, 255, 255, 0.03)",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", fontWeight: 600, color: "var(--accent-cyan)" }}>
          <Terminal size={16} />
          <span>Interactive Image Transformation Playground</span>
        </div>
        <span style={{ fontSize: "0.75rem", color: "var(--text-subtle)" }}>Live Builder</span>
      </div>

      <div style={{ padding: "1.25rem 1.5rem" }}>
        {/* Controls */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "1rem",
            marginBottom: "1.25rem",
          }}
        >
          <div>
            <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-subtle)", marginBottom: "0.35rem" }}>
              Image Key
            </label>
            <input
              type="text"
              value={imageKey}
              onChange={(e) => setImageKey(e.target.value)}
              className="search-input"
              style={{ padding: "0.4rem 0.6rem" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-subtle)", marginBottom: "0.35rem" }}>
              Width (px): {width}
            </label>
            <input
              type="range"
              min="100"
              max="2000"
              step="50"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              style={{ width: "100%", accentColor: "var(--accent-cyan)" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-subtle)", marginBottom: "0.35rem" }}>
              Height (px): {height}
            </label>
            <input
              type="range"
              min="100"
              max="2000"
              step="50"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              style={{ width: "100%", accentColor: "var(--accent-cyan)" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-subtle)", marginBottom: "0.35rem" }}>
              Format
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="search-input"
              style={{ padding: "0.4rem 0.6rem" }}
            >
              <option value="webp">WebP</option>
              <option value="avif">AVIF</option>
              <option value="jpg">JPEG</option>
              <option value="png">PNG</option>
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-subtle)", marginBottom: "0.35rem" }}>
              Fit Mode
            </label>
            <select
              value={fit}
              onChange={(e) => setFit(e.target.value)}
              className="search-input"
              style={{ padding: "0.4rem 0.6rem" }}
            >
              <option value="cover">Cover</option>
              <option value="contain">Contain</option>
              <option value="fill">Fill</option>
            </select>
          </div>
        </div>

        {/* Command Display */}
        <div className="code-block-wrapper" style={{ margin: "1rem 0 0.75rem" }}>
          <div className="code-block-header">
            <span>cURL Command</span>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button className="copy-btn" onClick={copyCurl}>
                {copied ? <Check size={14} style={{ color: "var(--accent-emerald)" }} /> : <Copy size={14} />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>
          <pre style={{ padding: "0.85rem 1rem", border: "none" }}>
            <code style={{ color: "var(--accent-cyan)" }}>{curlCommand}</code>
          </pre>
        </div>

        <button className="btn-primary" onClick={runSimulatedRequest} style={{ width: "100%", justifyContent: "center", marginTop: "0.75rem" }}>
          <Play size={16} /> Send Test Request to Optivor Server
        </button>

        {/* Response simulation */}
        {responseState && (
          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              borderRadius: "var(--radius-md)",
              background: "#080c14",
              borderLeft: `4px solid ${responseState.cacheHit ? "var(--accent-emerald)" : "var(--accent-cyan)"}`,
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "0.82rem",
            }}
          >
            <div style={{ color: "var(--accent-emerald)", fontWeight: 700, marginBottom: "0.35rem" }}>
              HTTP/1.1 {responseState.status} OK
            </div>
            <div style={{ color: "var(--text-muted)" }}>Content-Type: image/{format}</div>
            <div style={{ color: "var(--accent-cyan)" }}>
              X-Optivor-Cache: {responseState.cacheHit ? "HIT (disk-lru)" : "MISS (processed)"}
            </div>
            <div style={{ color: "var(--accent-indigo)" }}>
              X-Optivor-Transform-Time: {responseState.transformMs}ms
            </div>
            <div style={{ color: "var(--text-subtle)", marginTop: "0.25rem" }}>
              Payload Size: ~{responseState.sizeKb} KB
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
