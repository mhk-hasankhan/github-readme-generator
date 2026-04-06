"use client";

import { useReadmeForm } from "@/hooks/useReadmeForm";
import { Section, Field, Input, Textarea, Toggle } from "./UI";
import TechStackSection from "./TechStackSection";
import StatsSection from "./StatsSection";
import SocialsSection from "./SocialsSection";
import PreviewPanel from "./PreviewPanel";
import styles from "./BuilderPage.module.css";

export default function BuilderPage({ onBack }) {
  const { form, readme, updateField, updateNested, toggleTech, resetForm } = useReadmeForm();

  return (
    <div className={styles.page}>
      {/* ── Top Bar ─────────────────────────────────────────────────────────── */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <button
            type="button"
            onClick={onBack}
            className={styles.backBtn}
            aria-label="Back to landing"
          >
            ←
          </button>

          <div className={styles.logoText}>
            README<span className={styles.logoAccent}>FORGE</span>
          </div>

          {form.username && (
            <span className={styles.usernamePill}>@{form.username}</span>
          )}
        </div>

        <button
          type="button"
          onClick={resetForm}
          className={styles.resetBtn}
        >
          ↺ RESET
        </button>
      </header>

      {/* ── Split Layout ─────────────────────────────────────────────────────── */}
      <div className={styles.body}>
        {/* Left — Form panel */}
        <div className={styles.formPanel}>

          {/* Identity */}
          <Section title="Identity" icon="👤" defaultOpen>
            <Field label="GitHub Username" hint="required">
              <Input
                value={form.username}
                onChange={(v) => updateField("username", v)}
                placeholder="octocat"
                prefix="@"
              />
            </Field>
            <Field label="Display Name">
              <Input
                value={form.name}
                onChange={(v) => updateField("name", v)}
                placeholder="Ada Lovelace"
              />
            </Field>
            <Field label="Tagline / Subtitle">
              <Input
                value={form.subtitle}
                onChange={(v) => updateField("subtitle", v)}
                placeholder="Full-stack dev • Open source enthusiast"
              />
            </Field>
            <Field label="Pronouns">
              <Input
                value={form.pronouns}
                onChange={(v) => updateField("pronouns", v)}
                placeholder="they/them"
              />
            </Field>
          </Section>

          {/* About */}
          <Section title="About" icon="✏️" defaultOpen={false}>
            <Field label="Currently Working On">
              <Input
                value={form.workingOn}
                onChange={(v) => updateField("workingOn", v)}
                placeholder="An awesome open source project"
              />
            </Field>
            <Field label="Currently Learning">
              <Input
                value={form.learningNow}
                onChange={(v) => updateField("learningNow", v)}
                placeholder="Rust, WebAssembly"
              />
            </Field>
            <Field label="Looking to Collaborate On">
              <Input
                value={form.collaborateOn}
                onChange={(v) => updateField("collaborateOn", v)}
                placeholder="AI tooling, developer tools"
              />
            </Field>
            <Field label="Fun Fact">
              <Input
                value={form.funFact}
                onChange={(v) => updateField("funFact", v)}
                placeholder="I debug faster with headphones on"
              />
            </Field>
            <Field label="Additional Bio" hint="freeform">
              <Textarea
                value={form.about}
                onChange={(v) => updateField("about", v)}
                placeholder="Anything else you want to add..."
                rows={3}
              />
            </Field>
          </Section>

          {/* Tech Stack */}
          <TechStackSection selected={form.techStack} onToggle={toggleTech} />

          {/* Socials + Donations */}
          <SocialsSection
            socials={form.socials}
            donations={form.donations}
            onSocial={(k, v) => updateNested("socials", k, v)}
            onDonation={(k, v) => updateNested("donations", k, v)}
          />

          {/* GitHub Stats */}
          <StatsSection form={form} updateField={updateField} />

          {/* Fun Components */}
          <Section title="Fun Components" icon="🎉" defaultOpen={false}>
            <Toggle
              label="Random Dev Quotes"
              description="Inspirational programming quotes widget"
              checked={form.funComponents?.quotes ?? false}
              onChange={(v) => updateNested("funComponents", "quotes", v)}
            />
            <Toggle
              label="Random Dev Memes"
              description="Fresh meme pulled on every profile visit"
              checked={form.funComponents?.memes ?? false}
              onChange={(v) => updateNested("funComponents", "memes", v)}
            />
          </Section>

          {/* Bottom padding so last section isn't flush against edge */}
          <div className={styles.formPadBottom} />
        </div>

        {/* Right — Preview panel */}
        <div className={styles.previewPanel}>
          <PreviewPanel readme={readme} />
        </div>
      </div>
    </div>
  );
}
