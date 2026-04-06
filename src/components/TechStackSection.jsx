"use client";

import { useState } from "react";
import { TECH_CATEGORIES } from "@/data/techStack";
import { Section, Chip } from "./UI";
import styles from "./TechStackSection.module.css";

export default function TechStackSection({ selected, onToggle }) {
  const [activeCategory, setActiveCategory] = useState("languages");
  const [search, setSearch] = useState("");

  const category = TECH_CATEGORIES.find((c) => c.id === activeCategory);
  const filtered = search
    ? category.items.filter((t) =>
        t.label.toLowerCase().includes(search.toLowerCase())
      )
    : category.items;

  return (
    <Section title="Tech Stack" icon="🧰" defaultOpen={false}>
      {/* Category Tabs */}
      <div className={styles.tabs}>
        {TECH_CATEGORIES.map((cat) => {
          const count = selected.filter((s) => cat.items.some((i) => i.id === s.id)).length;
          const active = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => { setActiveCategory(cat.id); setSearch(""); }}
              className={`${styles.tab} ${active ? styles.tabActive : ""}`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              {count > 0 && (
                <span className={`${styles.tabBadge} ${active ? styles.tabBadgeActive : ""}`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Search */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={`Search ${category?.label ?? ""}...`}
        className={styles.search}
      />

      {/* Tech Chips */}
      <div className={styles.chips}>
        {filtered.map((tech) => {
          const isSelected = selected.some((s) => s.id === tech.id);
          return (
            <Chip
              key={tech.id}
              label={tech.label}
              selected={isSelected}
              onClick={() => onToggle(tech)}
              accentColor={`#${tech.color}`}
            />
          );
        })}
        {filtered.length === 0 && (
          <p className={styles.noResults}>No results found.</p>
        )}
      </div>

      {/* Selected Summary */}
      {selected.length > 0 && (
        <div className={styles.selectedSummary}>
          <p className={styles.selectedLabel}>SELECTED ({selected.length})</p>
          <div className={styles.selectedChips}>
            {selected.map((tech) => (
              <span
                key={tech.id}
                onClick={() => onToggle(tech)}
                className={styles.selectedChip}
                style={{
                  background: `#${tech.color}22`,
                  borderColor: `#${tech.color}55`,
                  color: `#${tech.color}`,
                }}
              >
                {tech.label} ×
              </span>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}
