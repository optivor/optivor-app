"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GithubIcon from "@/components/GithubIcon";
import {
  Zap,
  Cloud,
  Terminal,
  Shield,
  Cpu,
  BarChart3,
  BookOpen,
  ArrowRight,
  Check,
  Copy,
  Sparkles,
  HardDrive
} from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [copiedCmd, setCopiedCmd] = useState(false);

  const quickStartCmd = `docker run -d \\
  --name optivor \\
  -p 8080:8080 \\
  -v $(pwd)/optivor.yaml:/etc/optivor/optivor.yaml:ro \\
  optivor:latest`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(quickStartCmd);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{ flex: 1, position: "relative" }}>
        {/* Glow backdrop */}
        <div className="glow-backdrop" />

        {/* Hero Section */}
        <section
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "4.5rem 1.5rem 3rem",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Release Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.35rem 0.85rem",
              borderRadius: "9999px",
              background: "rgba(56, 189, 248, 0.08)",
              border: "1px solid rgba(56, 189, 248, 0.25)",
              color: "var(--accent-cyan)",
              fontSize: "0.82rem",
              fontWeight: "600",
              marginBottom: "1.75rem",
            }}
          >
            <Sparkles size={14} />
            <span>Optivor v0.5.1 Released • Open Source Storage & Image Engine</span>
          </div>

          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.25rem)",
              fontWeight: 800,
              letterSpacing: "-0.035em",
              lineHeight: 1.1,
              marginBottom: "1.25rem",
              background: "var(--gradient-text)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Ultra-Fast Open Source <br />
            Image Infrastructure
          </h1>

          <p
            style={{
              fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
              color: "var(--text-muted)",
              maxWidth: "720px",
              margin: "0 auto 2.25rem",
              lineHeight: 1.6,
            }}
          >
            Transform, optimize, and deliver images at scale using <code style={{ color: "var(--accent-cyan)", background: "rgba(255,255,255,0.06)", padding: "2px 6px", borderRadius: "4px" }}>libvips</code>.
            Bring your own S3, Cloudflare R2, or custom storage drivers with zero vendor lock-in.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              marginBottom: "3.5rem",
            }}
          >
            <Link href="/docs/introduction" className="btn-primary">
              <BookOpen size={18} />
              Read Documentation
              <ArrowRight size={16} />
            </Link>

            <a
              href="https://github.com/optivor/optivor"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <GithubIcon size={18} />
              Star on GitHub
            </a>
          </div>

          {/* Interactive Terminal Demo Preview */}
          <div
            style={{
              maxWidth: "820px",
              margin: "0 auto",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border-color)",
              background: "#080c14",
              overflow: "hidden",
              boxShadow: "0 20px 50px rgba(0,0,0,0.6), 0 0 30px rgba(56, 189, 248, 0.1)",
              textAlign: "left",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.75rem 1rem",
                background: "rgba(255, 255, 255, 0.03)",
                borderBottom: "1px solid var(--border-color)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ef4444" }} />
                <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#eab308" }} />
                <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#22c55e" }} />
                <span style={{ fontSize: "0.75rem", color: "var(--text-subtle)", marginLeft: "0.5rem", fontFamily: "JetBrains Mono" }}>
                  optivor-demo ~ HTTP Request
                </span>
              </div>
              <span style={{ fontSize: "0.72rem", color: "var(--accent-emerald)", fontFamily: "JetBrains Mono", fontWeight: "600" }}>
                ● RUNNING (8080)
              </span>
            </div>

            <div style={{ padding: "1.25rem 1.5rem", fontFamily: "JetBrains Mono, monospace", fontSize: "0.85rem", lineHeight: 1.7 }}>
              <div style={{ color: "var(--text-subtle)", marginBottom: "0.5rem" }}>
                # Request image transformation on the fly
              </div>
              <div style={{ color: "#ffffff", marginBottom: "1rem" }}>
                <span style={{ color: "var(--accent-cyan)" }}>curl</span> -i <span style={{ color: "#a5b4fc" }}>"http://localhost:8080/image/banner.jpg?w=800&format=webp&fit=cover"</span>
              </div>
              <div style={{ padding: "0.75rem 1rem", background: "rgba(0,0,0,0.3)", borderRadius: "var(--radius-sm)", borderLeft: "3px solid var(--accent-emerald)" }}>
                <div style={{ color: "var(--accent-emerald)", fontWeight: "600" }}>HTTP/1.1 200 OK</div>
                <div style={{ color: "var(--text-muted)" }}>Content-Type: image/webp</div>
                <div style={{ color: "var(--accent-cyan)" }}>X-Optivor-Cache: HIT (disk-lru)</div>
                <div style={{ color: "var(--accent-indigo)" }}>X-Optivor-Transform-Time: 2.8ms</div>
                <div style={{ color: "var(--text-subtle)" }}>X-Optivor-Storage-Driver: r2</div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Value Props Grid */}
        <section
          style={{
            maxWidth: "1100px",
            margin: "4rem auto 5rem",
            padding: "0 1.5rem",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                marginBottom: "0.75rem",
                color: "#ffffff",
              }}
            >
              Engineered for Speed, Control & Cost Efficiency
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "1rem" }}>
              Eliminate expensive per-image transformation bills with self-hosted open-source software.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {/* Feature 1 */}
            <div
              style={{
                padding: "1.75rem",
                borderRadius: "var(--radius-lg)",
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                transition: "transform 0.2s ease, border-color 0.2s ease",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "var(--radius-md)",
                  background: "rgba(56, 189, 248, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent-cyan)",
                  marginBottom: "1.25rem",
                }}
              >
                <Zap size={24} />
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem", color: "#ffffff" }}>
                Sub-10ms Transformations
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                Powered by native <code style={{ color: "var(--accent-cyan)" }}>libvips</code> bindings, Optivor processes images up to 10x faster than traditional ImageMagick or GraphicsMagick solutions.
              </p>
            </div>

            {/* Feature 2 */}
            <div
              style={{
                padding: "1.75rem",
                borderRadius: "var(--radius-lg)",
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                transition: "transform 0.2s ease, border-color 0.2s ease",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "var(--radius-md)",
                  background: "rgba(129, 140, 248, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent-indigo)",
                  marginBottom: "1.25rem",
                }}
              >
                <Cloud size={24} />
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem", color: "#ffffff" }}>
                Bring-Your-Own-Storage
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                Connect directly to your existing buckets on AWS S3, Cloudflare R2, MinIO, or Backblaze B2. Optivor reads directly without copying assets.
              </p>
            </div>

            {/* Feature 3 */}
            <div
              style={{
                padding: "1.75rem",
                borderRadius: "var(--radius-lg)",
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                transition: "transform 0.2s ease, border-color 0.2s ease",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "var(--radius-md)",
                  background: "rgba(52, 211, 153, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent-emerald)",
                  marginBottom: "1.25rem",
                }}
              >
                <Cpu size={24} />
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem", color: "#ffffff" }}>
                Out-of-Process Drivers
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                Modular driver architecture via <code style={{ color: "var(--accent-emerald)" }}>--optivor-handshake</code>. Build custom storage plugins in Go, Rust, Python, or Node.js.
              </p>
            </div>

            {/* Feature 4 */}
            <div
              style={{
                padding: "1.75rem",
                borderRadius: "var(--radius-lg)",
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                transition: "transform 0.2s ease, border-color 0.2s ease",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "var(--radius-md)",
                  background: "rgba(251, 191, 36, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent-amber)",
                  marginBottom: "1.25rem",
                }}
              >
                <HardDrive size={24} />
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem", color: "#ffffff" }}>
                Dual LRU Caching
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                Built-in in-memory and disk-backed LRU cache keeps frequent transform results cached locally for instantaneous cache hits.
              </p>
            </div>

            {/* Feature 5 */}
            <div
              style={{
                padding: "1.75rem",
                borderRadius: "var(--radius-lg)",
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                transition: "transform 0.2s ease, border-color 0.2s ease",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "var(--radius-md)",
                  background: "rgba(56, 189, 248, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent-cyan)",
                  marginBottom: "1.25rem",
                }}
              >
                <BarChart3 size={24} />
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem", color: "#ffffff" }}>
                OpenTelemetry & Tracing
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                Native OpenTelemetry distributed tracing and Prometheus metrics endpoints enable deep observability across your image pipeline.
              </p>
            </div>

            {/* Feature 6 */}
            <div
              style={{
                padding: "1.75rem",
                borderRadius: "var(--radius-lg)",
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                transition: "transform 0.2s ease, border-color 0.2s ease",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "var(--radius-md)",
                  background: "rgba(129, 140, 248, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent-indigo)",
                  marginBottom: "1.25rem",
                }}
              >
                <Shield size={24} />
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem", color: "#ffffff" }}>
                Rate Limiting & Security
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                Per-IP token bucket rate limiting, signed URL HMAC verification, and memory caps prevent decompression attacks and abuse.
              </p>
            </div>
          </div>
        </section>

        {/* Docker Quickstart Section */}
        <section
          style={{
            maxWidth: "900px",
            margin: "0 auto 6rem",
            padding: "0 1.5rem",
          }}
        >
          <div
            style={{
              padding: "2.5rem 2rem",
              borderRadius: "var(--radius-xl)",
              background: "linear-gradient(135deg, rgba(13, 18, 29, 0.9) 0%, rgba(19, 27, 44, 0.9) 100%)",
              border: "1px solid var(--border-color)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <Terminal size={22} style={{ color: "var(--accent-cyan)" }} />
              <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#ffffff" }}>
                Deploy in Seconds with Docker
              </h2>
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "1.5rem" }}>
              Launch a production-ready Optivor container with volume-mounted config:
            </p>

            <div className="code-block-wrapper" style={{ margin: 0 }}>
              <div className="code-block-header">
                <span>bash</span>
                <button className="copy-btn" onClick={copyToClipboard}>
                  {copiedCmd ? <Check size={14} style={{ color: "var(--accent-emerald)" }} /> : <Copy size={14} />}
                  <span>{copiedCmd ? "Copied!" : "Copy"}</span>
                </button>
              </div>
              <pre style={{ border: "none" }}>
                <code>{quickStartCmd}</code>
              </pre>
            </div>

            <div style={{ marginTop: "1.75rem", display: "flex", justifyContent: "flex-end" }}>
              <Link href="/docs/quick-start" className="btn-secondary" style={{ fontSize: "0.88rem" }}>
                <span>View Full Quick Start Guide</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
