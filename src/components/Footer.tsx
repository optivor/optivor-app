import Link from "next/link";
import { Layers, Heart } from "lucide-react";
import GithubIcon from "./GithubIcon";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border-color)",
        background: "var(--bg-main)",
        padding: "3rem 1.5rem 2rem",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "2.5rem",
          marginBottom: "2.5rem",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontWeight: "700",
              fontSize: "1.1rem",
              marginBottom: "0.75rem",
              color: "#ffffff",
            }}
          >
            <Layers size={20} style={{ color: "var(--accent-cyan)" }} />
            <span>Optivor</span>
          </div>
          <p
            style={{
              fontSize: "0.88rem",
              color: "var(--text-muted)",
              lineHeight: 1.6,
              maxWidth: "280px",
            }}
          >
            Open-source image transformation and infrastructure engine powered by libvips and out-of-process storage drivers.
          </p>
        </div>

        <div>
          <h4
            style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--text-subtle)",
              marginBottom: "1rem",
            }}
          >
            Documentation
          </h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.88rem" }}>
            <li>
              <Link href="/docs/introduction" style={{ color: "var(--text-muted)" }}>
                Introduction
              </Link>
            </li>
            <li>
              <Link href="/docs/quick-start" style={{ color: "var(--text-muted)" }}>
                Quick Start
              </Link>
            </li>
            <li>
              <Link href="/docs/configuration" style={{ color: "var(--text-muted)" }}>
                Configuration
              </Link>
            </li>
            <li>
              <Link href="/docs/cli-reference" style={{ color: "var(--text-muted)" }}>
                CLI Reference
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4
            style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--text-subtle)",
              marginBottom: "1rem",
            }}
          >
            Developers & Drivers
          </h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.88rem" }}>
            <li>
              <Link href="/docs/storage-drivers" style={{ color: "var(--text-muted)" }}>
                Storage Driver Spec
              </Link>
            </li>
            <li>
              <Link href="/docs/developer-driver-guide" style={{ color: "var(--text-muted)" }}>
                Driver Guide
              </Link>
            </li>
            <li>
              <Link href="/docs/developer-driver-testing" style={{ color: "var(--text-muted)" }}>
                Driver Testing
              </Link>
            </li>
            <li>
              <Link href="/docs/developer-driver-submission" style={{ color: "var(--text-muted)" }}>
                Registry Submission
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4
            style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--text-subtle)",
              marginBottom: "1rem",
            }}
          >
            Community
          </h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.88rem" }}>
            <li>
              <a
                href="https://github.com/optivor/optivor"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.35rem" }}
              >
                <GithubIcon size={14} /> GitHub Repository
              </a>
            </li>
            <li>
              <Link href="/docs/faq" style={{ color: "var(--text-muted)" }}>
                FAQ
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          paddingTop: "1.5rem",
          borderTop: "1px solid var(--border-color)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          fontSize: "0.82rem",
          color: "var(--text-subtle)",
        }}
      >
        <div>© {new Date().getFullYear()} Optivor Open Source Project. MIT Licensed.</div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
          Built with open source <Heart size={14} style={{ color: "#f43f5e" }} /> for developers
        </div>
      </div>
    </footer>
  );
}
