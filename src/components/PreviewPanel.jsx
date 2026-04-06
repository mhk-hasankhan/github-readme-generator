"use client";

import { useState } from "react";
import styles from "./PreviewPanel.module.css";

export default function PreviewPanel({ readme }) {
  const [copied, setCopied] = useState(false);
  const [view, setView] = useState("code"); // "code" | "preview"

  const handleCopy = async () => {
    if (!readme) return;
    try {
      await navigator.clipboard.writeText(readme);
    } catch {
      // fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = readme;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!readme) return;
    const blob = new Blob([readme], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const lineCount = readme ? readme.split("\n").length : 0;
  const charCount = readme ? readme.length : 0;
  const badgeCount = readme ? (readme.match(/img\.shields\.io/g) || []).length : 0;

  return (
    <div className={styles.panel}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.tabs}>
          {["code", "preview"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setView(tab)}
              className={`${styles.tab} ${view === tab ? styles.tabActive : ""}`}
            >
              {tab === "code" ? "⬡ Markdown" : "◈ Preview"}
            </button>
          ))}
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={handleDownload}
            disabled={!readme}
            className={styles.btnDownload}
          >
            ↓ .md
          </button>
          <button
            type="button"
            onClick={handleCopy}
            disabled={!readme}
            className={`${styles.btnCopy} ${copied ? styles.btnCopied : ""}`}
          >
            {copied ? "✓ Copied!" : "⎘ Copy"}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {view === "code" ? (
          <pre className={styles.code}>
            {readme || (
              <span className={styles.placeholder}>
                {"// Your README will appear here...\n// Start by entering your GitHub username above."}
              </span>
            )}
          </pre>
        ) : (
          <MarkdownPreview readme={readme} />
        )}
      </div>

      {/* Footer stats */}
      <div className={styles.footer}>
        {[
          { label: "Lines",  value: lineCount  },
          { label: "Chars",  value: charCount  },
          { label: "Badges", value: badgeCount },
        ].map(({ label, value }) => (
          <span key={label} className={styles.stat}>
            <span className={styles.statValue}>{value}</span> {label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Simple Markdown Preview ──────────────────────────────────────────────────
function MarkdownPreview({ readme }) {
  if (!readme) {
    return (
      <div className={styles.previewEmpty}>
        Preview will render here once you enter your GitHub username.
      </div>
    );
  }

  const html = mdToHtml(readme);
  return (
    <div
      className={styles.preview}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function mdToHtml(md) {
  // Escape HTML first, then selectively re-allow safe tags
  let out = md
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Restore specific HTML tags used in GitHub READMEs
  out = out
    // <h1 align="center">...</h1>
    .replace(
      /&lt;h1 align="center"&gt;(.+?)&lt;\/h1&gt;/g,
      '<h1 style="text-align:center;font-size:22px;margin:16px 0 8px;color:var(--text-primary)">$1</h1>'
    )
    // <h3 align="center">...</h3>
    .replace(
      /&lt;h3 align="center"&gt;(.+?)&lt;\/h3&gt;/g,
      '<h3 style="text-align:center;font-size:15px;color:var(--text-secondary);margin:4px 0 12px">$1</h3>'
    )
    // <h3 align="left">...</h3>
    .replace(
      /&lt;h3 align="left"&gt;(.+?)&lt;\/h3&gt;/g,
      '<h3 style="font-size:14px;color:var(--text-primary);margin:18px 0 8px;padding-bottom:5px;border-bottom:1px solid var(--border)">$1</h3>'
    )
    // <p ...>...</p>  (strip attrs, keep content)
    .replace(
      /&lt;p[^&]*&gt;([\s\S]*?)&lt;\/p&gt;/g,
      '<p style="margin:8px 0">$1</p>'
    )
    // <a href="..."><img src="..." /></a>
    .replace(
      /&lt;a href="([^"]+)"[^&]*&gt;&lt;img src="([^"]+)"[^/]*\/&gt;&lt;\/a&gt;/g,
      '<a href="$1" target="_blank" rel="noreferrer"><img src="$2" style="max-width:100%;border-radius:4px;margin:3px 2px;vertical-align:middle" onerror="this.style.display=\'none\'" /></a>'
    )
    // <img src="..." />
    .replace(
      /&lt;img src="([^"]+)"[^/]*\/&gt;/g,
      '<img src="$1" style="max-width:100%;border-radius:4px;margin:3px 2px;vertical-align:middle" onerror="this.style.display=\'none\'" />'
    );

  // Markdown headings
  out = out
    .replace(/^### (.+)$/gm, '<h3 style="font-size:14px;color:var(--text-primary);margin:18px 0 8px;padding-bottom:5px;border-bottom:1px solid var(--border)">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 style="font-size:18px;color:var(--text-primary);margin:20px 0 10px">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 style="font-size:22px;color:var(--text-primary);margin:20px 0 12px">$1</h1>');

  // Bold
  out = out.replace(/\*\*(.+?)\*\*/g, '<strong style="color:var(--text-primary)">$1</strong>');

  // Inline images ![alt](url)
  out = out.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    '<img src="$2" alt="$1" style="max-width:100%;border-radius:4px;margin:3px 2px" onerror="this.style.display=\'none\'" />'
  );

  // List items
  out = out.replace(
    /^- (.+)$/gm,
    '<li style="margin:4px 0 4px 16px;color:var(--text-secondary);list-style:disc">$1</li>'
  );

  // HR
  out = out.replace(
    /^---$/gm,
    '<hr style="border:none;border-top:1px solid var(--border);margin:20px 0" />'
  );

  // Badge links [![alt](imgUrl)](href)
  out = out.replace(
    /\[!\[([^\]]*)\]\(([^)]+)\)\]\(([^)]+)\)/g,
    '<a href="$3" target="_blank" rel="noreferrer"><img src="$2" alt="$1" style="max-width:100%;border-radius:4px;margin:3px 2px;vertical-align:middle" onerror="this.style.display=\'none\'" /></a>'
  );

  // Double newline → paragraph break
  out = out.replace(/\n\n/g, '<br style="display:block;margin:6px 0" />');
  out = out.replace(/\n/g, "<br />");

  return out;
}
