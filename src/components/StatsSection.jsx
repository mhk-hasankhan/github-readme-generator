"use client";

import { Section, Field, Toggle, Select } from "./UI";
import { STAT_THEMES } from "@/data/techStack";
import {
  buildStatsCard,
  buildStreakCard,
  buildLangsCard,
  buildTrophiesUrl,
} from "@/utils/readmeGenerator";
import styles from "./StatsSection.module.css";

export default function StatsSection({ form, updateField }) {
  const { username, githubStats, showStreak, showLangs, showTrophies, showVisitors, statTheme } = form;
  const themeOptions = STAT_THEMES.map((t) => ({ value: t, label: t }));

  return (
    <Section title="GitHub Stats" icon="📊" defaultOpen={false}>
      <Toggle label="README Stats"       description="Overall contribution statistics"  checked={githubStats}   onChange={(v) => updateField("githubStats", v)}   />
      <Toggle label="Streak Stats"       description="Contribution streak counter"       checked={showStreak}    onChange={(v) => updateField("showStreak", v)}    />
      <Toggle label="Top Languages"      description="Most used languages chart"         checked={showLangs}     onChange={(v) => updateField("showLangs", v)}     />
      <Toggle label="GitHub Trophies"    description="Achievement trophies widget"       checked={showTrophies}  onChange={(v) => updateField("showTrophies", v)}  />
      <Toggle label="Visitor Counter"    description="Profile view count badge"          checked={showVisitors}  onChange={(v) => updateField("showVisitors", v)}  />

      <div className={styles.themePicker}>
        <Field label="Card Theme">
          <Select
            value={statTheme}
            onChange={(v) => updateField("statTheme", v)}
            options={themeOptions}
          />
        </Field>
      </div>

      {/* Live Previews */}
      {username && (githubStats || showStreak || showLangs || showTrophies) && (
        <div className={styles.previews}>
          <p className={styles.previewLabel}>LIVE PREVIEW</p>
          <div className={styles.previewCards}>
            {githubStats && (
              <img
                src={buildStatsCard(username, statTheme)}
                alt="GitHub Stats Preview"
                className={styles.previewImg}
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            )}
            {showStreak && (
              <img
                src={buildStreakCard(username, statTheme)}
                alt="Streak Stats Preview"
                className={styles.previewImg}
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            )}
            {showLangs && (
              <img
                src={buildLangsCard(username, statTheme)}
                alt="Top Languages Preview"
                className={styles.previewImg}
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            )}
            {showTrophies && (
              <img
                src={buildTrophiesUrl(username, statTheme)}
                alt="Trophies Preview"
                className={styles.previewImg}
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            )}
          </div>
        </div>
      )}
    </Section>
  );
}
