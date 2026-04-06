"use client";

import { Section, Field, Input } from "./UI";
import { SOCIAL_PLATFORMS, DONATION_PLATFORMS } from "@/data/techStack";
import styles from "./SocialsSection.module.css";

export default function SocialsSection({ socials, donations, onSocial, onDonation }) {
  return (
    <>
      <Section title="Social Links" icon="🌐" defaultOpen={false}>
        <div className={styles.socialsGrid}>
          {SOCIAL_PLATFORMS.map((platform) => (
            <Field key={platform.id} label={platform.label}>
              <Input
                value={socials[platform.id] || ""}
                onChange={(v) => onSocial(platform.id, v)}
                placeholder="username"
                prefix={platform.icon}
              />
            </Field>
          ))}
        </div>
      </Section>

      <Section title="Donations / Support" icon="☕" defaultOpen={false}>
        <p className={styles.hint}>
          Add donation links so visitors can support your work directly from your profile.
        </p>
        {DONATION_PLATFORMS.map((platform) => (
          <Field key={platform.id} label={platform.label}>
            <Input
              value={donations[platform.id] || ""}
              onChange={(v) => onDonation(platform.id, v)}
              placeholder="your-username"
            />
          </Field>
        ))}
      </Section>
    </>
  );
}
