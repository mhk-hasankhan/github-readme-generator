"use client";

import { useState } from "react";
import styles from "./UI.module.css";

// ─── Section ──────────────────────────────────────────────────────────────────
export function Section({ title, icon, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={styles.section}>
      <button
        className={styles.sectionHeader}
        onClick={() => setOpen((o) => !o)}
        type="button"
      >
        <span className={styles.sectionTitle}>
          <span className={styles.sectionIcon}>{icon}</span>
          {title}
        </span>
        <span
          className={styles.sectionChevron}
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          ⌄
        </span>
      </button>

      {open && (
        <div className={styles.sectionBody}>
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Field ────────────────────────────────────────────────────────────────────
export function Field({ label, hint, children }) {
  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel}>
        {label}
        {hint && <span className={styles.fieldHint}> — {hint}</span>}
      </label>
      {children}
    </div>
  );
}

// ─── Input ────────────────────────────────────────────────────────────────────
export function Input({ value, onChange, placeholder, prefix, type = "text" }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className={styles.inputWrapper}>
      {prefix && (
        <span className={styles.inputPrefix}>{prefix}</span>
      )}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`${styles.input} ${prefix ? styles.inputWithPrefix : ""} ${focused ? styles.inputFocused : ""}`}
      />
    </div>
  );
}

// ─── Textarea ─────────────────────────────────────────────────────────────────
export function Textarea({ value, onChange, placeholder, rows = 4 }) {
  const [focused, setFocused] = useState(false);

  return (
    <textarea
      value={value}
      placeholder={placeholder}
      rows={rows}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={`${styles.textarea} ${focused ? styles.inputFocused : ""}`}
    />
  );
}

// ─── Toggle ───────────────────────────────────────────────────────────────────
export function Toggle({ label, checked, onChange, description }) {
  return (
    <div className={styles.toggleRow}>
      <div className={styles.toggleInfo}>
        <span className={styles.toggleLabel}>{label}</span>
        {description && <span className={styles.toggleDesc}>{description}</span>}
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`${styles.toggleTrack} ${checked ? styles.toggleOn : ""}`}
        aria-checked={checked}
        role="switch"
      >
        <span className={`${styles.toggleThumb} ${checked ? styles.toggleThumbOn : ""}`} />
      </button>
    </div>
  );
}

// ─── Select ───────────────────────────────────────────────────────────────────
export function Select({ value, onChange, options }) {
  return (
    <div className={styles.selectWrapper}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.select}
      >
        {options.map((opt) => (
          <option key={opt.value ?? opt} value={opt.value ?? opt}>
            {opt.label ?? opt}
          </option>
        ))}
      </select>
      <span className={styles.selectArrow}>▾</span>
    </div>
  );
}

// ─── Chip ─────────────────────────────────────────────────────────────────────
export function Chip({ label, selected, onClick, accentColor }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={styles.chip}
      style={selected ? {
        borderColor: accentColor || "var(--accent)",
        background: `${accentColor || "var(--accent)"}22`,
        color: accentColor || "var(--accent)",
      } : {}}
    >
      {selected && <span className={styles.chipCheck}>✓</span>}
      {label}
    </button>
  );
}
