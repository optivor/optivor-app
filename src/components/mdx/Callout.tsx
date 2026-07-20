import React from "react";
import { Info, Sparkles, AlertTriangle, AlertCircle } from "lucide-react";

interface CalloutProps {
  type?: "note" | "tip" | "warning" | "important";
  title?: string;
  children: React.ReactNode;
}

export default function Callout({ type = "note", title, children }: CalloutProps) {
  const configs = {
    note: {
      borderColor: "#38bdf8",
      bgColor: "rgba(56, 189, 248, 0.08)",
      iconColor: "#38bdf8",
      defaultTitle: "Note",
      icon: Info,
    },
    tip: {
      borderColor: "#34d399",
      bgColor: "rgba(52, 211, 153, 0.08)",
      iconColor: "#34d399",
      defaultTitle: "Pro Tip",
      icon: Sparkles,
    },
    warning: {
      borderColor: "#fbbf24",
      bgColor: "rgba(251, 191, 36, 0.08)",
      iconColor: "#fbbf24",
      defaultTitle: "Warning",
      icon: AlertTriangle,
    },
    important: {
      borderColor: "#f43f5e",
      bgColor: "rgba(244, 63, 94, 0.08)",
      iconColor: "#f43f5e",
      defaultTitle: "Important",
      icon: AlertCircle,
    },
  };

  const config = configs[type] || configs.note;
  const IconComponent = config.icon;

  return (
    <div
      style={{
        margin: "1.5rem 0",
        padding: "1.1rem 1.35rem",
        borderRadius: "var(--radius-md)",
        background: config.bgColor,
        borderLeft: `4px solid ${config.borderColor}`,
        borderTop: "1px solid rgba(255, 255, 255, 0.05)",
        borderRight: "1px solid rgba(255, 255, 255, 0.05)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          fontWeight: 700,
          fontSize: "0.92rem",
          color: config.iconColor,
          marginBottom: "0.4rem",
        }}
      >
        <IconComponent size={18} />
        <span>{title || config.defaultTitle}</span>
      </div>
      <div style={{ fontSize: "0.92rem", lineHeight: 1.6, color: "var(--text-main)" }}>
        {children}
      </div>
    </div>
  );
}
