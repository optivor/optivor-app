"use client";

import { useEffect, useState } from "react";
import { marked } from "marked";
import { Check, Copy } from "lucide-react";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [htmlContent, setHtmlContent] = useState("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    // Configure marked options
    marked.setOptions({
      gfm: true,
      breaks: true,
    });

    const parsed = marked.parse(content);
    if (typeof parsed === "string") {
      setHtmlContent(parsed);
    } else {
      parsed.then((res) => setHtmlContent(res));
    }
  }, [content]);

  useEffect(() => {
    // Attach click listeners to code blocks for copying
    const codeBlocks = document.querySelectorAll(".prose pre");
    codeBlocks.forEach((block) => {
      if (!block.querySelector(".copy-btn-wrapper")) {
        const btn = document.createElement("button");
        btn.className = "copy-btn-wrapper";
        btn.innerHTML = `<span style="display:flex;align-items:center;gap:4px;font-size:0.75rem;padding:4px 8px;border-radius:4px;background:rgba(255,255,255,0.08);color:#9ca3af;border:1px solid rgba(255,255,255,0.1);cursor:pointer;position:absolute;top:8px;right:8px;">Copy</span>`;
        
        btn.onclick = () => {
          const codeText = block.querySelector("code")?.innerText || block.textContent || "";
          navigator.clipboard.writeText(codeText.trim()).then(() => {
            btn.innerHTML = `<span style="display:flex;align-items:center;gap:4px;font-size:0.75rem;padding:4px 8px;border-radius:4px;background:rgba(52,211,153,0.15);color:#34d399;border:1px solid rgba(52,211,153,0.3);cursor:pointer;position:absolute;top:8px;right:8px;">Copied!</span>`;
            setTimeout(() => {
              btn.innerHTML = `<span style="display:flex;align-items:center;gap:4px;font-size:0.75rem;padding:4px 8px;border-radius:4px;background:rgba(255,255,255,0.08);color:#9ca3af;border:1px solid rgba(255,255,255,0.1);cursor:pointer;position:absolute;top:8px;right:8px;">Copy</span>`;
            }, 2000);
          });
        };
        (block as HTMLElement).style.position = "relative";
        block.appendChild(btn);
      }
    });
  }, [htmlContent]);

  return (
    <div
      className="prose"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
