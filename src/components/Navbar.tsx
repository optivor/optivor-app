"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Layers, Menu, X } from "lucide-react";
import GithubIcon from "./GithubIcon";
import { useState } from "react";

interface NavbarProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export default function Navbar({ onToggleSidebar, isSidebarOpen }: NavbarProps) {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            aria-label="Toggle docs sidebar"
            style={{
              background: "transparent",
              border: "none",
              color: "var(--text-main)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        )}

        <Link href="/" className="nav-logo">
          <Layers size={22} style={{ color: "var(--accent-cyan)" }} />
          <span>Optivor</span>
          <span className="nav-badge">v0.5.1</span>
        </Link>
      </div>

      <div className="nav-links">
        <Link
          href="/"
          className={`nav-link ${pathname === "/" ? "active" : ""}`}
        >
          Home
        </Link>
        <Link
          href="/docs/introduction"
          className={`nav-link ${pathname.startsWith("/docs") ? "active" : ""}`}
          style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}
        >
          <BookOpen size={16} />
          Documentation
        </Link>
        <a
          href="https://github.com/optivor/optivor"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-github"
        >
          <GithubIcon size={16} />
          <span>Star on GitHub</span>
          <span
            style={{
              fontSize: "0.75rem",
              padding: "0.1rem 0.4rem",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "4px",
              color: "var(--accent-cyan)",
            }}
          >
            ★
          </span>
        </a>
      </div>
    </nav>
  );
}
